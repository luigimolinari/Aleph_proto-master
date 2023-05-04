import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ApiprotoService } from '../../../apiproto.service';
import { ActivatedRoute } from '@angular/router'; 
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, FormBuilder,  Validators, NgModel } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-titolario',
  templateUrl: './add-titolario.component.html',
  styleUrls: ['./add-titolario.component.css']
})
export class AddTitolarioComponent implements OnInit {
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
  conservazione;
  anni;
  cod1;
  cod2;
  cod3;
  accesso;
  attivo;
  note;
  codice;

  constructor(private apiService: ApiService, private apiprotoService: ApiprotoService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { 
      
  }


  Trasmetti(): void {

    if (this.form.valid) {

      this.apiprotoService.getCodeTitolario(this.form.value).subscribe((dati: any) => {
        if (dati != null) {
          alert('Codifica già presente. Devi sceglierne una nuova');
        }  else {
    this.apiService.AddTitolario(this.proto_serie=this.form.value).subscribe((dati)=>{
      this.dati = dati['Esito'];
      if(this.dati=="si"){
        if(confirm("Voce correttamente registrata")) {
        this.router.navigate(['/viewtitolario']);
        }
       }
       else{
        alert("Attenzione. Impossibile inserire la voce");
       }
    });
  }
});
} else {
alert("Attenzione. Non tutti i campi obbligatori hanno un valore valido");
  }
}
  
    ngOnInit(): void {
        this.form = this.formBuilder.group({
        descrizione: new FormControl('', Validators.required),
        conservazione: new FormControl('', Validators.required),
        anni: new FormControl('', Validators.required),
        cod1: new FormControl('', Validators.required),
        cod2: new FormControl('', Validators.required),
        cod3: new FormControl('', Validators.required),
        note: new FormControl(''),
            });
    }
}