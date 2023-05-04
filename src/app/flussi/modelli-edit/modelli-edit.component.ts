import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modelli-edit',
  templateUrl: './modelli-edit.component.html',
  styleUrls: ['./modelli-edit.component.css']
})
export class ModelliEditComponent implements OnInit {

  operatore;
  thirdFormGroup: FormGroup;
  faFolderOpen = faFolderOpen;
  dati;
  file;
  file_data = new FormData();
  fileUploaded = true;
  lista;
  //fileCollection - nuovi modelli da caricare
  fileCollection = [];

  id_documento_flusso = [];
  originalModel = [];

  constructor(private _formBuilder: FormBuilder, private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
	  
	this.operatore = JSON.parse(localStorage.getItem('ID'));

    this.thirdFormGroup = this._formBuilder.group({
      modelli: ['']
    });

    this.route.queryParams.subscribe(
      params => {
        this.id_documento_flusso.push(params['id']);
        console.log(this.id_documento_flusso);

        this.apiService.getModelli(this.id_documento_flusso).subscribe((dati: any) => {
          console.log(dati);
          for (let i = 0; i < dati.length; i++) {
            const singleFile: any = [];
            singleFile.id = dati[i].info.id;
            singleFile.keyName = dati[i].info.nome;
            singleFile.percorso = dati[i].info.percorso;
            this.originalModel.push(singleFile);
          }
          console.log(this.originalModel);
        });
      });


  }

  onFileSelect(event): void {
    this.file = undefined;
    this.fileUploaded = event.target.files.length > 0;
    if (this.fileUploaded) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.file = event.target.files[i];
        const singleFile: any = [];
        singleFile.keyName = this.file.name;
        singleFile.file = this.file;
        this.fileCollection.push(singleFile);
      }
    }


  }

  deleteElFromList(i): void {
    this.fileCollection.splice(i, 1);
  }

  deleteElFromOriginalList(i, id, filename): void {
    //Delete model from DB - cancellazione logica
    if (confirm('Sei sicuro di eliminare il modello ' + filename + '?')) {
      //api
      console.log(id);
      this.apiService.DeleteModelli(id).subscribe((dati) => {
        this.dati = dati['Esito'];
        if (dati['esito_codice'] == 1) {
          alert("Operazione correttamente effetuata");
          this.originalModel.splice(i, 1);
        }
        else {
          alert("Attenzione. L'operazione di delete non è andata a buon fine ");
        }

      });

    }
  }

  downloadFile(path): void {
    this.apiService.downloadDocumento(path).subscribe(data =>{
      let blob = new Blob([data],{ type: data.type });
      var fileURL = URL.createObjectURL(blob);
      window.open(fileURL);
    });
  }

  verifica() {
    this.file_data = new FormData();
    for (let i = 0; i < this.fileCollection.length; i++) {
      this.file_data.append('file[]', this.fileCollection[i].file);
    }

    //Add new Models in DB
    this.apiService.AddModello(this.id_documento_flusso,this.file_data,this.operatore).subscribe((dati)=>{
        this.dati = dati['Esito'];
        if(dati['esito_codice']==1){
          if(confirm("Caricamento dei nuovi modelli andato a buon fine")) {
          this.router.navigate(['/documenti']);
          }
         }
         else{
          alert("Attenzione. Impossibile inserire il documento di flusso");
         }
    });

  }

}