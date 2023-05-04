import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common'


@Component({
  selector: 'app-edit-documento',
  templateUrl: './edit-documento.component.html',
  styleUrls: ['./edit-documento.component.css']
})
export class EditDocumentoComponent implements OnInit {

  form: FormGroup;
  faFolderOpen = faFolderOpen;
  file;
  file_data;
  percorso;
  workflow;
  operatore;
  descrizione;
  versione;
  note;
  giorno;
  ora;
  documento_padre;
  elimina;
  procedura;
  id_documento_flusso
  documento;
  dati;
  fileUploaded = true;
  id;
  upFile;
  validazione = 0;
  gruppo_procedura;
  item;
  done = [];
  listDoc;
  listFascicolo;
  ordine;
  testo;




  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(
      params => {
        this.id = params['id'];
      });

    this.form = this.formBuilder.group({

      workflow: new FormControl('', Validators.required),
      operatore: new FormControl('', Validators.required),
      descrizione: new FormControl('', Validators.required),
      versione: new FormControl(''),
      note: new FormControl(''),
      giorno: new FormControl('', Validators.required),
      ora: new FormControl('', Validators.required),
      documento_padre: new FormControl(''),
      elimina: new FormControl(''),
      procedura: new FormControl('', Validators.required)
    });

    this.apiService.getSingleDoc(this.id).subscribe((data) => {

      this.dati = data;

      this.testo = this.dati[0].testo;

      this.form.patchValue(this.workflow = this.dati[0].id_workflow);
      this.form.patchValue(this.operatore = this.dati[0].id_operatore);
      this.form.patchValue(this.descrizione = this.dati[0].descrizione);
      this.form.patchValue(this.versione = this.dati[0].versione);
      this.form.patchValue(this.note = this.dati[0].note != null ? this.dati[0].note : '');
      this.form.patchValue(this.giorno = this.dati[0].giorno != null ? this.dati[0].giorno : '');
      this.form.patchValue(this.ora = this.dati[0].ora != null ? this.dati[0].ora : '');
      this.form.patchValue(this.documento_padre = this.dati[0].id_documento_padre != null ? this.dati[0].id_documento_padre : '');
      this.form.patchValue(this.elimina = this.dati[0].elimina);
      this.form.patchValue(this.procedura = this.dati[0].id_procedura);
      
      this.id_documento_flusso = this.dati[0].id_documento_flusso;
      

      //gruppo è undefined se non è prevista validazione
      if (this.dati[0].gruppo != undefined)
        this.form.patchValue(this.gruppo_procedura = this.dati[0].gruppo);

      //se esite un record in alla_firma per questo documento ovvero se questo documento richiede di essere firmato
      if (this.dati[0].firma != null)
        this.validazione = 1;

      this.percorso = this.dati[0].percorso;

      this.ordine = this.dati[0].ordine;

      for (let i = 0; i < this.dati.length; i++) {
        this.item = new Object();
        this.item.id_operatore = this.dati[i].firmatari;
        this.item.nome = this.dati[i].nome;
        this.item.cognome = this.dati[i].cognome;
        this.item.id_gruppo = this.dati[i].gruppo;
        this.item.ruolo = this.dati[i].ruolo;
        this.done.push(this.item);
      }

    });

  }

  Trasmetti(): void {

    this.upFile = this.file_data == undefined ? 0 : 1
    this.operatore = JSON.parse(localStorage.getItem('ID'));
    let today = new Date();
    let dp = new DatePipe('en-US');
    this.form.controls['operatore'].setValue(JSON.parse(localStorage.getItem('ID')));
    this.form.controls['giorno'].setValue(dp.transform(today, 'y-MM-dd'));
    this.form.controls['ora'].setValue(dp.transform(today, 'HH:mm'));

    if (this.form.valid) {
      if (confirm('Le modifiche genereranno una nuova versione del documento. Procedere con le modifiche?')) {
        
        //testo==''/null -> documento allegato; viceversa -> documento in collaborazione
        if (this.testo == '' || this.testo == null) {
  
          this.apiService.UpdateDoc(this.id, this.upFile, this.percorso, this.documento = this.form.value, this.file_data).subscribe((dati) => {

            if (dati['esito_codice'] == 1) {
              console.log(dati['ID']);
              if (this.validazione == 1) {
                //la cancellazione logica riguarda solo il documento, non le regole di validazione
                //perciò le esistenti regole di validazione non vengono modificate/cancellate
                //ma assegnate alla nuova versione del documento

                this.apiService.AddValidazione(this.done, dati['ID'], this.ordine).subscribe((dati) => {
                  alert(dati['Esito']);
                  this.router.navigate(['/background']);
                });
              } else {
                alert(dati['Esito']);
                this.router.navigate(['/background']);
              }
            }
            else {
              alert(dati['Esito']);
              this.router.navigate(['/background']);
            }
          });
        } else {
          console.log(this.form.value);
          this.apiService.UpdateDocColl(this.id, this.documento = this.form.value, this.id_documento_flusso).subscribe((dati) => {

            if (dati['esito_codice'] == 1) {
              console.log(dati['ID']);
              if (this.validazione == 1) {
                //la cancellazione logica riguarda solo il documento, non le regole di validazione
                //perciò le esistenti regole di validazione non vengono modificate/cancellate
                //ma assegnate alla nuova versione del documento

                this.apiService.AddValidazione(this.done, dati['ID'], this.ordine).subscribe((dati) => {
                  alert(dati['Esito']);
                  this.router.navigate(['/background']);
                });
              } else {
                alert(dati['Esito']);
                this.router.navigate(['/background']);
              }
            }
            else {
              alert(dati['Esito']);
              this.router.navigate(['/background']);
            }
          });
        }
      }
    } else {
      alert("Attenzione. Non tutti i campi obbligatori hanno un valore valido");
    }

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

}

