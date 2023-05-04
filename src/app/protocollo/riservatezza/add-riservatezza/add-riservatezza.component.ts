import { Component, OnInit } from '@angular/core';
import { ApiprotoService } from 'src/app/apiproto.service';
import { ActivatedRoute } from '@angular/router'; 
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, FormBuilder,  Validators, NgModel } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-riservatezza',
  templateUrl: './add-riservatezza.component.html',
  styleUrls: ['./add-riservatezza.component.css']
})
export class AddRiservatezzaComponent implements OnInit {
  id;
  faBuilding=faBuilding;
  faEdit=faEdit;
  esito;
  msgerror:string;
  tipoalert;
  tipoalertdanger;
  tipoalertuncomplete;
  dati;
  proto_riservatezza;
  form: FormGroup;
  tipo;
  tipi;
  motivazione;
  riservatezzatipo;
  is_mail;
  is_pec;
  accesso;
  attivo;

  constructor(private apiprotoService: ApiprotoService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { 
      
  }





  Trasmetti(): void {

    if (this.form.valid) {
    this.apiprotoService.AddProtoRiservatezza(this.proto_riservatezza=this.form.value).subscribe((dati)=>{
      this.dati = dati['Esito'];
      if(this.dati=="si"){
        if(confirm("Motivazione correttamente registrata")) {
        this.router.navigate(['/viewriservatezza']);
        }
       }
       else{
        alert("Attenzione. Impossibile inserire la motivazione");
       }
    });
  } else {
alert("Attenzione. Non tutti i campi obbligatori hanno un valore valido");
  }
    }

  
    ngOnInit(): void {
        this.form = this.formBuilder.group({
        motivazione: new FormControl('', Validators.required),
        riservatezzatipo: new FormControl('', Validators.required),
            });
    }
}