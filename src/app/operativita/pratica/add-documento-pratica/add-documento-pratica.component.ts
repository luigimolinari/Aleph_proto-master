import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, NgModel } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-documento-pratica',
  templateUrl: './add-documento-pratica.component.html',
  styleUrls: ['./add-documento-pratica.component.css']
})
export class AddDocumentoPraticaComponent implements OnInit {

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
  documento;
  dati;
  fileUploaded = true;
  id_documento;
  id_documento_flusso;
  formData;
  a4w = 793.706;
  a4h = 1122.52;
  blob;
  doc;
  loading;
  pratica;
  gruppo;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.operatore = JSON.parse(localStorage.getItem('ID'));
    this.route.queryParams.subscribe(
      params => {
        this.pratica = params['id_pratica'];
        this.gruppo = params['gruppo'];
        this.workflow = params['id_workflow'];
        this.id_documento_flusso = params['id_documento_flusso'];
        if (this.id_documento_flusso != undefined) {
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
      pratica: new FormControl(this.pratica, Validators.required)
    });

  }

  Trasmetti(): void {
    if (this.id_documento_flusso == undefined) {
      //insert con allegato
      if (this.fileUploaded && this.file_data != undefined) {
        if (this.form.valid) {
          this.apiService.AddDocPratica(this.documento = this.form.value, this.file_data).subscribe((dati) => {
            alert(dati['Esito']);
            if(dati['esito_codice']==1){
              let navigationExtras: NavigationExtras = {
                queryParams: { 'id_pratica': this.pratica, 'gruppo':this.gruppo}
              };
              this.router.navigate(['/workflowpratica'],navigationExtras);
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
    else {
      if (this.form.valid) {

        this.loading = true;
        this.documento = this.form.value;
        /*prima di recuperare l'html elimino i widget che altrimenti mi ritrovo nel pdf*/
        $('.ck-widget__type-around__button').hide();
        $('.ck-widget__selection-handle').hide();
        //documento da stampare, comprensivo di margini
        let doc_file = document.getElementById('content_wrapper').innerHTML;

        this.apiService.AddDocCollPratica(this.documento, this.id_documento_flusso, doc_file).subscribe((dati: any) => {
          alert(dati['Esito']);
          this.loading = false;
          if(dati['esito_codice']==1){
            let navigationExtras: NavigationExtras = {
              queryParams: { 'id_pratica': this.pratica, 'gruppo':this.gruppo}
            };
            this.router.navigate(['/workflowpratica'],navigationExtras);
          }          
        });

      } else {
        alert("Attenzione. Non tutti i campi obbligatori hanno un valore valido");
      }
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
