/**
Giorgia

A4 -> 793.706 px X 1122.52 px -> 21 cm X 29.7 cm
conversione cm - px -> 1cm = 1pt*2.54/96
--> in cm:
const initialHeight = this.Editor.ui.view.editable.element.offsetHeight*2.54/96;
const initial_page = Math.ceil(initialHeight/29.7);
const top_position = top_offset+(29.7*i);
const newHeight = this.Editor.ui.view.editable.element.offsetHeight*2.54/96;			
const page = Math.floor(newHeight/29.7);
--> nel foglio di stile -> .content_wrapper:
width: 21cm;
min-height: 29.7cm;

margin_wrapper -> costrutto creato per gestire i marigini laterali del documento
(L'Editor lavora solo sul conentenuto di #content, che viene resettato alle impostazioni di defult ad ogni click sulla pagina)

*/
import { HostListener, Component, OnInit, ViewChild, Input, Renderer2, ElementRef } from '@angular/core';
//import { CKEditorComponent, CKEditorModule } from '@ckeditor/ckeditor5-angular';
import * as CustomEditor from '../../../assets/ckeditor.js';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
	selector: 'app-editor',
	templateUrl: './editor.component.html',
	styleUrls: ['./editor.component.css'],
})

export class EditorComponent implements OnInit {

	//@ViewChild('editor') editorComponent: CKEditorComponent;

	operatore;
	loading;
	testo;
	initial_content = '';
	titolo;
	readOnly;
	id;
	id_documento_flusso;
	is_template;
	id_to_update;
	doc;
	pdf;
	blob;
	formData;
	a4w = 793.706; //px
	a4h = 1122.52; //px
	//a4h = 1108.12; ///(considero il margine superiore della prima pagina, di 14.4px)
	wrapper_margin;
	validazione;
	ordine;
	done = [];
	item;
	disableToolbar = false;


	//accesso tramite editor al documento (edit-modello) o view-documento
	@Input() doc_id: any; //id del documento oggetto di modifica/visualizzazione
	@Input() doc_read: any; //modalità di accesso - se true -> sola lettura
	//accesso tramite componente add-documento
	@Input() doc_flusso: any; // id del documento_flusso a partire di cui si sta inserendo un'istanza
	@Input() short_template: any; // template senza <br> e senza footer
	//+ accesso tramite view-documento
	@Input() invisibleToolbar: any; // opzione per rimozione toolbar

	@ViewChild('editor_container') editor_container: ElementRef;

	@HostListener('window:save_editor_content', ['$event'])
	save_content(event) {
		console.log('salva');
		this.save();
	}

	@HostListener('window:pdf_editor_content', ['$event'])
	pdf_content(event) {
		console.log('esporta in pdf');
		this.scaricaPdf();

	}

	@HostListener('window:add_padding', ['$event'])
	add_padding_event(event) {
		this.setPadding('+');
	}

	@HostListener('window:reduce_padding', ['$event'])
	remove_padding_event(event) {
		this.setPadding('-');
	}


	public Editor = CustomEditor;

	toolbar: any = ['save', '|', 'pdf', '|', 'heading', '|', 'bold', 'italic', 'underline', 'strikethrough', '|',
		'fontSize', 'fontFamily', 'fontBackgroundColor', 'fontColor', '|',
		'alignment', 'indent', 'outdent', 'add_padding', 'reduce_padding', '|',
		'numberedList', 'bulletedList', '|',
		'horizontalLine', 'specialCharacters', '|',
		'link', 'blockquote', 'insertTable', 'uploadImage', '|',
		'undo', 'redo','findAndReplace'];


	toolbar_readOnly: any = ['|', 'pdf', '|'];

	heading = {
		options: [
			{ model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
			{ model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
			{ model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
			{ model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
			{ model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
			{ model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
			{ model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
		]
	};

	constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router, private elem: ElementRef, public renderer: Renderer2) {

	}

	/**
	scenari
	is_template = true 	-> documenti_flusso (sto elaborando un template) o add_docuento (sto inserendo un'istanza di documento a partire da un template in collaborazione)
							  ---------> 	doc_flusso != undefined	= add_documento
						  ---------> 	doc_flusso == undefined	= documenti_flusso
	is_template = false 	-> documenti (sto elaborando l'istanza di un template)
	*/

	ngOnInit(): void {

		this.operatore = JSON.parse(localStorage.getItem('ID'));
		//this.doc_id != undefined => ho accesso all'editor dal componente EDIT-MODELLO - sto agendo sull'istanza di documento per modificarne il testo 
		//this.doc_flusso != undefined => ho accesso all'editor in lettura dal componente ADD-DOCUMENTO (sto creando un'istanza di documento)
		//altrimenti => ho accesso all'editor tramite il componente EDITOR - sto agendo sul modello di documento_flusso

		if (this.doc_id == undefined) {
			if (this.doc_flusso != undefined) {
				//accesso all'editor dal componete add-documento
				this.disableToolbar = true;
				this.is_template = true;
				this.id = this.doc_flusso;
			} else {
				this.is_template = true;
				this.route.queryParams.subscribe(
					params => {
						//procedura di update di modello esistente
						this.id_documento_flusso = params['id'];
						this.readOnly = params['r'] == 1 ? true : false;
					});

				this.id = this.id_documento_flusso;
			}
		} else {
			this.readOnly = this.doc_read;
			this.is_template = false;
			this.id = this.doc_id;
			this.disableToolbar = this.invisibleToolbar;
		}

		if (this.readOnly) {
			this.toolbar.shift();
			this.toolbar = this.toolbar_readOnly;
		}


		CustomEditor.create(document.querySelector('.document-editor__editable'), {
			fontSize: { options: [8, 9, 10, 11, 12, 13, 'default', 17, 19, 21] },
			toolbar: this.toolbar,
			heading: this.heading,

		}).then(editor => {
			if (!this.disableToolbar) {
				const toolbarContainer = document.querySelector('.document-editor__toolbar');
				toolbarContainer.appendChild(editor.ui.view.toolbar.element);
			}
			this.Editor = editor;
			setTimeout(() => {

				this.apiService.getTesto(this.id, this.is_template).subscribe((dati: any) => {

					//1) recupero i dati
					this.initial_content = dati[0].testo;
					this.id_to_update = dati[0].id;
					this.titolo = dati[0].nome;
					if (dati[0].testo_margini != null) {
						let wrap = <HTMLElement>document.querySelector('#margin_wrapper')
						wrap.style.paddingRight = dati[0].testo_margini;
						wrap.style.paddingLeft = dati[0].testo_margini;
					}
					
					//dati di validazione//
					if (dati[0].firma != null) {
						this.validazione = 1;
						console.log(this.validazione);
						this.ordine = dati[0].ordine;
						for (let i = 0; i < dati.length; i++) {
							this.item = new Object();
							this.item.id_operatore = dati[i].firmatari;
							this.item.nome = dati[i].nome;
							this.item.cognome = dati[i].cognome;
							this.item.id_gruppo = dati[i].gruppo;
							this.item.ruolo = dati[i].ruolo;
							this.done.push(this.item);
						}
					}

					//2) inizializzo l'editor - carico il testo html
					this.Editor.setData(this.initial_content);

					//3) inizializzo l'editor - determino le dimensioni iniziali e il numero di pagine (max 500)
					//pt
					const initialHeight = this.Editor.ui.view.editable.element.offsetHeight;
					// offsetHeight -> 1122 se c'è solo una pagina - min height
					console.log(this.Editor);
					const initial_page = Math.ceil(initialHeight / this.a4h);
					//500 pagine - limite massimo del documento (creo tutti i divisori ma mostro soltanto quelli utili in base alla grandezza del testo esistente)
					for (let i = 1; i <= 500; i++) {
						const top_offset = 0;
						const top_position = top_offset + (this.a4h * i);
						const p: HTMLParagraphElement = this.renderer.createElement('p');
						this.renderer.addClass(p, 'p_divisor');
						this.renderer.setProperty(p, 'id', 'p' + i);
						if (i >= initial_page) {
							this.renderer.setAttribute(p, "style", "display:none");
						}
						else {
							this.renderer.setAttribute(p, "style", "top:" + top_position + 'px;border-left: 20px solid #dee2e6;');
							//non legge il folgio di stile
							this.renderer.setProperty(p, 'innerHTML', '<span style = "background:#6c757d36;display:inline-block;width:19px;padding-right: 5px;color:#6c757d;">' + String(i + 1) + '</span>');
						}
						this.renderer.appendChild(this.editor_container.nativeElement, p);
					}
				});

				//4) inizializzo l'editor - se sono in lettura, predispongo opportunamente la toolbar, altrimenti resto in ascolto di ogni cambiamento per aggiornare i divisori di pagina
				if (this.readOnly) {
					this.Editor.isReadOnly = true;
				} else {
					//in ascolto delle modifiche al testo per aggiornare la paginazione
					this.Editor.model.document.on('change:data', () => {

						const newHeight = this.Editor.ui.view.editable.element.offsetHeight;
						const page = Math.floor(newHeight / this.a4h);

						for (let i = page; i <= 500; i++) {
							if (document.getElementById("p" + i) != undefined) {
								document.getElementById("p" + i).setAttribute('style', 'display:none;');
							}
						}

						for (let j = page; j > 0; j--) {

							const top_offset = 0;
							const top_position = top_offset + (this.a4h * j);

							if (document.getElementById("p" + j) != undefined) {
								document.getElementById("p" + j).setAttribute('style', 'top:' + top_position + 'px; border-left: 20px solid #dee2e6;');
								document.getElementById("p" + j).innerHTML = '<span style = "background:#6c757d36;display:inline-block;width:19px;padding-right: 5px;color:#6c757d;">' + String(j + 1) + '</span>';

							}
						}
					});
				}


			}, 1);

		}).catch(err => {
			console.error(err);
		});

	}

	/**
	 * GET SELECTED HTML
	 */
	 formatNode = (node) => {
		switch (node.parent.name) {
		case 'heading1': return `<h1>${node.data}</h1>`;
		case 'heading2': return `<h2>${node.data}</h2>`;
		case 'heading3': return `<h3>${node.data}</h3>`;
		case 'paragraph': return `<p>${node.data}</p>`;
		default: return '';
	  }
	};
	getSelectedHTML = (editor) => {
		const
		result = [],
		selection = editor.model.document.selection,
		range = selection.getFirstRange();
	  return [...range.getItems()]
		.filter(node => node.data)
		.map(this.formatNode)
		.join('\n');
	}
	//this.getSelectedHTML(this.Editor)


	/*export file pdf*/
	scaricaPdf(): void {

		/*prima di recuperare l'html elimino i widget che altrimenti mi ritrovo nel pdf*/
		$('.ck-widget__type-around__button').hide();
		$('.ck-widget__selection-handle').hide();

		//documento da stampare, comprensivo di margini
		let documento = document.getElementById('content_wrapper').innerHTML;

		this.apiService.exportPdf(documento).subscribe((data: any) => {
			let blob = new Blob([data], { type: data.type });
			var fileURL = URL.createObjectURL(blob);
			window.open(fileURL);
		});
	}


	save(): void {
		document.getElementById('content').classList.remove('ck-focused');
		let wrapper = <HTMLElement>document.querySelector('#margin_wrapper');
		this.wrapper_margin = wrapper.style.paddingRight;
		this.testo = this.Editor.getData(); //get data esclude i costrutti esterni al #content, dunque i margini
		if (this.is_template) {
			this.salvaTemplate();
		} else {
			this.exportPdftoServer();
		}
	}

	exportPdftoServer(): void {
		if (confirm('Sei sicuro di procedere alla modifica? Sarà generato un nuovo documento e resettata la procedura di validazione eventualmente iniziata')) {
			this.loading = true;

			/*prima di recuperare l'html elimino i widget che altrimenti mi ritrovo nel pdf*/
			$('.ck-widget__type-around__button').hide();
			$('.ck-widget__selection-handle').hide();

			let documento = document.getElementById('content_wrapper').innerHTML;
			let wrapper = <HTMLElement>document.querySelector('#margin_wrapper');
			this.wrapper_margin = wrapper.style.paddingRight;
			console.log(documento);
			//aggiornamento DB - nuova versione del documento
			this.apiService.UpdateDocTesto(this.doc_id, this.operatore, documento, this.testo, this.wrapper_margin).subscribe((dati: any) => {
				if (dati['esito_codice'] == 1) {
					if (this.validazione == 1) {
						//aggiornamento DB - aggancio dell'eventuale validazione
						this.apiService.AddValidazione(this.done, dati['ID'], this.ordine).subscribe((dati) => {
							this.loading = false;
							alert(dati['Esito']);
							this.router.navigate(['/background']);
						});
					} else {
						alert('Documento correttamente registrato');
						this.loading = false;
						this.router.navigate(['/background']);
					}
				}
				else {
					alert("Attenzione. Qualcosa è andato storto nell'operazione di salvataggio del documento");
					this.loading = false;
				}
			});

		}
	}

	/*salvaTemplate - scrive nel DB (MODELLI_DOCUMENTI_FLUSSO)*/
	salvaTemplate() {
		this.titolo = prompt("Salva con nome:");
		if (this.titolo != null && this.titolo != "") {

			this.loading = true;
			this.apiService.UpdateModelloTesto(this.id_to_update, this.id_documento_flusso, this.testo, this.wrapper_margin, this.titolo, this.operatore).subscribe((dati: any) => {
				if (dati['esito_codice'] == 1) {
					this.loading = false;
					if (confirm("Documento correttamente registrato")) {
						this.router.navigate(['/documenti']);
					}
				}
				else {
					alert("Attenzione. Qualcosa è andato storto nell'operazione di salvataggio del documento");
					this.loading = false;
				}
			});
		}
	}

	setPadding(action) {
		let wrap = <HTMLElement>document.querySelector('#margin_wrapper');
		let pR = isNaN(parseInt(wrap.style.paddingRight)) ? 40 : parseInt(wrap.style.paddingRight);
		let pL = isNaN(parseInt(wrap.style.paddingLeft)) ? 40 : parseInt(wrap.style.paddingLeft);
		if (action == '+') {
			wrap.style.paddingRight = (pR + 10) + 'px';
			wrap.style.paddingLeft = (pL + 10) + 'px';
		} else {
			if (pR > 0 && pL > 0) {
				wrap.style.paddingRight = (pR - 10) + 'px';
				wrap.style.paddingLeft = (pL - 10) + 'px';
			}
		}
	}

}