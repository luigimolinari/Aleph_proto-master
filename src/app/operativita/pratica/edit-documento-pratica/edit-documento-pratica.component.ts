import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, NgModel } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-edit-documento-pratica',
  templateUrl: './edit-documento-pratica.component.html',
  styleUrls: ['./edit-documento-pratica.component.css']
})
export class EditDocumentoPraticaComponent implements OnInit {

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
  pratica;
  id_documento_flusso
  documento;
  dati;
  fileUploaded = true;
  id;
  upFile;
  testo;
  privilegi;




  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(
      params => {
        this.id = params['id'];
        this.privilegi = params['privilegi'];
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
      pratica: new FormControl('', Validators.required)
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
      this.form.patchValue(this.pratica = this.dati[0].id_pratica);

      this.id_documento_flusso = this.dati[0].id_documento_flusso;

      this.percorso = this.dati[0].percorso;
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
          this.apiService.UpdateDocPratica(this.id, this.upFile, this.percorso, this.documento = this.form.value, this.file_data).subscribe((dati) => {
            alert(dati['Esito']);
            if(dati['esito_codice']==1){
              let navigationExtras: NavigationExtras = {
                queryParams: { 'id_pratica': this.pratica,'gruppo':'lavoro','id_workflow':this.workflow,'p':this.privilegi}
              };
              this.router.navigate(['/documentiview'],navigationExtras);
            }
          });
        } else {
          this.apiService.UpdateDocCollPratica(this.id, this.documento = this.form.value, this.id_documento_flusso).subscribe((dati) => {
            alert(dati['Esito']);
            if(dati['esito_codice']==1){
              let navigationExtras: NavigationExtras = {
                queryParams: { 'id_pratica': this.pratica,'gruppo':'lavoro','id_workflow':this.workflow,'p':this.privilegi}
              };
              this.router.navigate(['/documentiview'],navigationExtras);
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

