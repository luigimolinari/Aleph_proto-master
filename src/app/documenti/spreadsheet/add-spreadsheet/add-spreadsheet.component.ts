import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {NavigationExtras} from '@angular/router';


@Component({
  selector: 'app-add-spreadsheet',
  templateUrl: './add-spreadsheet.component.html',
  styleUrls: ['./add-spreadsheet.component.css']
})
export class AddSpreadsheetComponent implements OnInit {

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

  constructor(private _formBuilder: FormBuilder, private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.operatore = JSON.parse(localStorage.getItem('ID'));

    this.firstFormGroup = this._formBuilder.group({
      nome_doc: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      tipo_doc: ['', Validators.required]
    });
  }

  verifica() {


    this.documento = JSON.stringify(this.firstFormGroup.value);
    this.tipologia = JSON.stringify(this.secondFormGroup.value);

    const obj1 = JSON.parse(this.documento);
    const obj2 = JSON.parse(this.tipologia);

    const mergedObject = {
      ...obj1,
      ...obj2
    };

    const documentoflusso = mergedObject;
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      /*AddDocumentoColl - input:
        content: testo (html) del documento
        content_margin: margini del documento pdf
        title: titolo del documento
        documentoflusso: valori dei fields (nome documento e tipologia)
        operatore: id operatore che esegue l'operazione
      */
      this.apiService.AddSpreadsheetStruttura(documentoflusso, this.operatore).subscribe((dati) => {
        this.dati = dati['Esito'];
        if (dati['Esito'] == 'si') {
          let navigationExtras: NavigationExtras = {
            queryParams: {'id': dati['ID'],'nome': dati['nome'], 'first': "si", 'operatore': this.operatore }
          };
          dati['modello_id']
          this.router.navigate(['/spreadsheet'], navigationExtras);
        }
        else {
          alert("Attenzione, qualcosa è andato storto");
        }
      });
    } else {
      alert("Attenzione. Non tutti i campi obbligatori: NOME, TIPOLOGIA sono stati correttamente riempiti");
    }


  }
}
