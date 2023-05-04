import { Component, OnInit} from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import jspdf from 'jspdf';

@Component({
  selector: 'app-add-documento',
  templateUrl: './add-documento.component.html',
  styleUrls: ['./add-documento.component.css']
})
export class AddDocumentoComponent implements OnInit {

  form: FormGroup;
  faFolderOpen = faFolderOpen;
  file;
  file_data;
  workflow;
  operatore;
  descrizione;
  versione;
  note;
  firmato;
  giorno;
  ora;
  documento_padre;
  elimina;
  procedura;
  fascicolo;
  documento;
  dati;
  fileUploaded = true;
  validazione;
  gruppo_procedura;
  //tutti gli operatori del gruppo:
  allGroup = [];
  
  todo = [
  ];

  done = [
  ];

  listGroup;
  
  idSelectedGroup;
  id_documento;

  ordine;
  orderedCheck;
  
  controlAllGroup;
  controlOrder;

  id_documento_flusso;
  
  formData;
  a4w = 793.706;
  a4h = 1122.52;
  blob;
  doc;
  
  loading;
  activeNumIndex:any;
  

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.operatore = JSON.parse(localStorage.getItem('ID'));
    this.route.queryParams.subscribe(
      params => {
        this.procedura = params['id_procedura'];
        this.workflow = params['id_workflow'];
		
		this.id_documento_flusso = params['id_documento_flusso'];

        this.apiService.getProceduraGruppoProcedura(this.procedura).subscribe((dati) => {
          this.listGroup = dati;
        });
		
		if (this.id_documento_flusso!=undefined){
			//    
		}
	  });

    let today = new Date();
    let dp = new DatePipe('en-US');
    this.giorno = dp.transform(today, 'y-MM-dd');
    this.ora = dp.transform(today, 'HH:mm');

    this.form = this.formBuilder.group({

      workflow: new FormControl(this.workflow, Validators.required),
      operatore: new FormControl(this.operatore, Validators.required),
      descrizione: new FormControl('', Validators.required),
      versione: new FormControl('1'),
      note: new FormControl(''),
      //firmato: new FormControl('', Validators.required),
      giorno: new FormControl(this.giorno, Validators.required),
      ora: new FormControl(this.ora, Validators.required),
      elimina: new FormControl('0'),
      procedura: new FormControl(this.procedura, Validators.required),
      validazione: new FormControl('', Validators.required),
      gruppo_procedura: new FormControl(''),
      findOp : new FormControl('')
    });

  }

  Trasmetti():void{
    if (this.validazione == 1 && (this.idSelectedGroup == undefined || this.idSelectedGroup == null || this.done.length == 0)) {
      alert('Attenzione! Devono essere specificati gruppo e operatori firmatari');
    }
    else {
		
		if(this.id_documento_flusso == undefined){
		//insert con allegato
		  if (this.fileUploaded && this.file_data != undefined) {
			if (this.form.valid) {
			  this.apiService.AddDoc(this.documento = this.form.value, this.file_data).subscribe((dati) => {

				this.dati = dati['Esito'];
				this.id_documento = dati['ID'];

				if (this.dati == 'Upload eseguito correttamente!' && this.validazione == 1) {
				  this.ordine =  this.orderedCheck ? 1 : 0;   
				  this.apiService.AddValidazione(this.done, this.id_documento,this.ordine).subscribe((dati) => {
					alert(dati['Esito']);
					this.router.navigate(['/background']);
				  });
				}
				else {
				  alert(this.dati);
				  this.router.navigate(['/background']);
				}
			  });

			} else {
			  alert("Attenzione. Non tutti i campi obbligatori hanno un valore valido");
			}
		  } else {
			alert("Attenzione. Non è stato caricato alcun file");
			this.fileUploaded = false;
		  }
		}
		else{
			
			if (this.form.valid) {
					//chiamo una funzione asincrona
					this.esporta_e_aggiungi();			
			}else {
					 alert("Attenzione. Non tutti i campi obbligatori hanno un valore valido");
			}
		}			
	}
  }
  
  async esporta_e_aggiungi(): Promise<void>{
	  this.loading=true;
	  this.documento = this.form.value;
	  this.doc = new jspdf('p','pt',[this.a4w,this.a4h],true);
		   let view = this;
		   document.getElementById('content').classList.remove('ck-focused');
		   await this.doc.html(document.getElementById('content_wrapper'), {				
				callback: async function (doc) {							
					view.blob = await doc.output('blob', {returnPromise:true});					
					view.formData = new FormData();
					view.formData.append('file', view.blob);
					//aggiornamento DB - nuova versione del documento
					view.apiService.AddDocColl(view.documento,view.id_documento_flusso,view.formData).subscribe((dati: any) => {
						if (dati['esito_codice'] == 1 && view.validazione == 1) {
									//aggiornamento DB - aggancio dell'eventuale validazione
									view.ordine =  view.orderedCheck ? 1 : 0;  
									view.apiService.AddValidazione(view.done, dati['ID'],view.ordine).subscribe((dati) => {									
										alert(dati['Esito']);
										view.loading=false;										
										view.router.navigate(['/background']);
									  });							  							
						}
						else {
							alert(dati['Esito']);
							view.loading=false;	
							view.router.navigate(['/background']);
						}
					});
				}
		  });
  }
  

  onFileSelect(event): void {
    this.file = undefined;
    this.fileUploaded = event.target.files.length > 0;
    if (this.fileUploaded) {
      this.file = event.target.files[0];
      this.file_data = new FormData();
      this.file_data.append('file', this.file);
    }
  }

  enter(item) {
    this.activeNumIndex = item.id_operatore;
  }
  
  /* idx è l'indice dell'operatore selezionato nella lista todo non filtrata 
     event.previousIndex va bene se si usa todo non filtrata
  */
  drop(event: CdkDragDrop<string[]>,myitem) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {     
      let idx = this.todo.findIndex(x => x.id_operatore == this.activeNumIndex);    
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        //event.previousIndex,
        idx,
        event.currentIndex);

    }
  }

  selectAll(e):void{
    if(e) { 
		this.todo = [];
		this.done = [];
		this.done = this.allGroup.slice(); 
	} else{
		this.todo = [];
		this.done = [];
		this.todo = this.allGroup.slice();
	}
  }

  selected(idSelectedGroup) {
    this.idSelectedGroup = idSelectedGroup;
	this.controlAllGroup = false;
	this.controlOrder = false;
    this.done = [];
	this.todo = [];
	this.allGroup = [];
    this.apiService.getOperatoreGruppoProcedura(this.idSelectedGroup).subscribe((dati: any) => {
      if(dati!= null){
		  this.allGroup = dati;
		  this.todo = this.allGroup.slice();
	  }
    });
  }

  toOrder(e):void{
    if(e) { this.orderedCheck = true; }
    else  {this.orderedCheck = false; }
  }

  filtra_op(input) {
    if(input.value==''){
      return this.todo;
    }
      else{
        return this.todo.filter(x=>(x.nome+' '+x.cognome).toUpperCase().includes(input.value.toUpperCase())); 
      }
  }
 

}
