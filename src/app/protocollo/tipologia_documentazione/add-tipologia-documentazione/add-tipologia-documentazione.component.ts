import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router'; 
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, FormBuilder,  Validators, NgModel } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-tipologia-documentazione',
  templateUrl: './add-tipologia-documentazione.component.html',
  styleUrls: ['./add-tipologia-documentazione.component.css']
})
export class AddTipologiaDocumentazioneComponent implements OnInit {
  id;
  faBuilding=faBuilding;
  faEdit=faEdit;
  esito;
  msgerror:string;
  tipoalert;
  tipoalertdanger;
  tipoalertuncomplete;
  dati;
  tipologia_documentazione;
  form: FormGroup;
  tipo;
  tipi;
  descrizione;
  is_mail;
  is_pec;
  accesso;
  attivo;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { 
      
  }





  Trasmetti(): void {

    if (this.form.valid) {
    this.apiService.AddTipologiaDocumentazione(this.tipologia_documentazione=this.form.value).subscribe((dati)=>{
      this.dati = dati['Esito'];
      if(this.dati=="si"){
        if(confirm("Tipologia di documentazione correttamente registrata")) {
        this.router.navigate(['/viewtipologiadocumentazione']);
        }
       }
       else{
        alert("Attenzione. Impossibile inserire il tipo operatore");
       }
    });
  } else {
alert("Attenzione. Non tutti i campi obbligatori hanno un valore valido");
  }
    }

  
    ngOnInit(): void {
        this.form = this.formBuilder.group({
        descrizione: new FormControl('', Validators.required),

            });
    }
}