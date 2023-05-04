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
  selector: 'app-add-tipo-rubrica',
  templateUrl: './add-tipo-rubrica.component.html',
  styleUrls: ['./add-tipo-rubrica.component.css']
})
export class AddTipoRubricaComponent implements OnInit {
  id;
  faBuilding=faBuilding;
  faEdit=faEdit;
  esito;
  msgerror:string;
  tipoalert;
  tipoalertdanger;
  tipoalertuncomplete;
  dati;
  proto_tipo;
  form: FormGroup;
  tipo;
  tipi;
  descrizione;
  numerazione;
  annuale;
  accesso;
  attivo;
  tipologia;
  note;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { 
      
  }





  Trasmetti(): void {

    if (this.form.valid) {
    this.apiService.AddTipoRubrica(this.proto_tipo=this.form.value).subscribe((dati)=>{
      this.dati = dati['Esito'];
      if(this.dati=="si"){
        if(confirm("Tipo correttamente registrato")) {
        this.router.navigate(['/viewtiporubrica']);
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
        tipologia: new FormControl('', Validators.required),
        note: new FormControl('')
            });
    }
}