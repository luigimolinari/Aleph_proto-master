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
  selector: 'app-add-serie',
  templateUrl: './add-serie.component.html',
  styleUrls: ['./add-serie.component.css']
})
export class AddSerieComponent implements OnInit {
  id;
  faBuilding=faBuilding;
  faEdit=faEdit;
  esito;
  msgerror:string;
  tipoalert;
  tipoalertdanger;
  tipoalertuncomplete;
  dati;
  proto_serie;
  form: FormGroup;
  tipo;
  tipi;
  descrizione;
  numerazione;
  annuale;
  accesso;
  attivo;
  entratauscita;
  interno;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { 
      
  }





  Trasmetti(): void {

    if (this.form.valid) {
    this.apiService.AddSerie(this.proto_serie=this.form.value).subscribe((dati)=>{
      this.dati = dati['Esito'];
      if(this.dati=="si"){
        if(confirm("Serie correttamente registrata")) {
        this.router.navigate(['/viewserie']);
        }
       }
       else{
        alert("Attenzione. Impossibile inserire la tipologia");
       }
    });
  } else {
alert("Attenzione. Non tutti i campi obbligatori hanno un valore valido");
  }
    }

  
    ngOnInit(): void {
        this.form = this.formBuilder.group({
        descrizione: new FormControl('', Validators.required),
        numerazione: new FormControl(''),
        entratauscita: new FormControl(''),
        interno: new FormControl(''),
        annuale: new FormControl('')
            });
    }
}