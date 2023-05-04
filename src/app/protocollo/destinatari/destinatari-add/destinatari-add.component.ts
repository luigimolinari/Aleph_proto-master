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
  selector: 'app-destinatari-add',
  templateUrl: './destinatari-add.component.html',
  styleUrls: ['./destinatari-add.component.css']
})
export class DestinatariAddComponent implements OnInit {
  id;
  faBuilding=faBuilding;
  faEdit=faEdit;
  esito;
  msgerror:string;
  tipoalert;
  tipoalertdanger;
  tipoalertuncomplete;
  dati;
  proto_destinatari;
  form: FormGroup;
  descrizione;
  nome;
  azienda;
  constructor(private apiProtoService: ApiprotoService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { 
		this.azienda = JSON.parse(localStorage.getItem('id_azienda'));
  }





  Trasmetti(): void {

    if (this.form.valid) {
    this.apiProtoService.AddProtoDestinatari(this.proto_destinatari=this.form.value, this.azienda).subscribe((dati)=>{
      this.dati = dati['Esito'];
      if(this.dati=="si"){
        if(confirm("Destinatario simbolico correttamente registrato")) {
        this.router.navigate(['/viewdestinatari']);
        }
       }
       else{
        alert("Attenzione. Impossibile inserire il destinatario simbolico");
       }
    });
  } else {
alert("Attenzione. Non tutti i campi obbligatori hanno un valore valido");
  }
    }

  
    ngOnInit(): void {
        this.form = this.formBuilder.group({
        descrizione: new FormControl('', Validators.required),
        nome: new FormControl('', Validators.required),

            });
    }
}