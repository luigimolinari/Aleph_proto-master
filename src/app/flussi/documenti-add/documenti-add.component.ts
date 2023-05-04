import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-documenti-add',
  templateUrl: './documenti-add.component.html',
  styleUrls: ['./documenti-add.component.css']
})
export class DocumentiAddComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  faFolderOpen = faFolderOpen;
  isEditable = false;
  documento;
  tipologia;
  doc;
  valido;
  dati;
  file;
  file_data = new FormData();
  fileUploaded = true;
  lista;
  fileCollection = [];
  operatore;

  constructor(private _formBuilder: FormBuilder, private apiService: ApiService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
	this.operatore = JSON.parse(localStorage.getItem('ID'));
	  
    this.firstFormGroup = this._formBuilder.group({
      nome_doc: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      tipo_doc: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      modelli: ['']
    });
  }

  onFileSelect(event): void {
    this.file = undefined;
    this.fileUploaded = event.target.files.length > 0;
    if (this.fileUploaded) {
      for(let i=0; i< event.target.files.length; i++){
            this.file = event.target.files[i];
            const singleFile: any = [];
            singleFile.keyName =this.file.name;
            singleFile.file =this.file; 
            this.fileCollection.push(singleFile);
      }
    }
 
    
  }

  deleteElFromList(i,filename):void{ 
        this.fileCollection.splice(i,1);
  }

  verifica(){

    this.valido="si";
    this.documento=JSON.stringify(this.firstFormGroup.value);
    this.tipologia=JSON.stringify(this.secondFormGroup.value);

    const obj1 = JSON.parse(this.documento);
    const obj2 = JSON.parse(this.tipologia);
    
    const mergedObject = {
      ...obj1,
      ...obj2
    };

    this.file_data = new FormData();
    for (let i=0;i<this.fileCollection.length;i++){
      this.file_data.append('file[]', this.fileCollection[i].file);
    }

    const documentoflusso=JSON.stringify(mergedObject);
    if (this.firstFormGroup.valid && this.secondFormGroup.valid){
      this.apiService.AddDocumentoFlusso(documentoflusso,this.file_data,this.operatore).subscribe((dati)=>{
        this.dati = dati['Esito'];
        if(dati['esito_codice']==1){
          if(confirm("Documento di flusso correttamente registrato")) {
          this.router.navigate(['/documenti']);
          }
         }
         else{
          alert("Attenzione. Impossibile inserire il documento di flusso");
         }
      });
    }else{
      alert("Attenzione. Non tutti i campi obbligatori: NOME, TIPOLOGIA sono stati correttamente riempiti");
    }
 

      }
  }
