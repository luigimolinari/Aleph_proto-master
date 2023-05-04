import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { LocalStorageService } from 'src/app/local-storage.service';
import { FormGroup,  FormBuilder,  Validators, NgModel } from '@angular/forms';
import { ChildActivationStart } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



@Component({
  selector: 'app-operatori-new',
  templateUrl: './operatori-new.component.html',
  styleUrls: ['./operatori-new.component.css']
})
export class OperatoriNewComponent implements OnInit {

  OperatoreForm: FormGroup;
  user;
  tipo;
  nome;
  cognome;
  cf;
  firma;
  data_nascita;
  luogo_nascita;
  prov_nascita;
  indirizzo_residenza;
  comune_residenza;
  prov_residenza;
  cns;
  spid;
  azienda;
  ruolo;
  profilo;
  esito;
  msgerror:string;
  tipoalert;
  tipoalertdanger;
  tipoalertuncomplete;
  email;
  telefono;

  constructor(private apiService: ApiService, private localStorageService: LocalStorageService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }



  createForm() {
    this.OperatoreForm = this.fb.group({
       user: [undefined, Validators.required ],
       tipo: [undefined, Validators.required ],
       nome: [undefined, Validators.required ],
       cognome: [undefined, Validators.required ],
       cf: [undefined, Validators.required ],
       firma: [undefined, Validators.required ],
       data_nascita: [undefined, Validators.required ],
       luogo_nascita: [undefined, Validators.required ],
       prov_nascita: [undefined, Validators.required ],
       indirizzo_residenza: [undefined, Validators.required ],
       comune_residenza: [undefined, Validators.required ],
       prov_residenza: [undefined, Validators.required ],
       cns: [undefined, Validators.required ],
       spid: [undefined, Validators.required ],
       azienda: [undefined, Validators.required ],
       ruolo: [undefined, Validators.required ],
       profilo: [undefined, Validators.required ],
       email: [undefined, Validators.required ],
       telefono: [undefined, Validators.required ]
    });
  }


  inserisci(){
    this.user=this.user;
    this.tipo=this.tipo;
    this.nome=this.nome;
    this.cognome=this.cognome;
    this.cf=this.cf;
    this.firma=this.firma;
    this.data_nascita=this.data_nascita;
    this.luogo_nascita=this.luogo_nascita;
    this.prov_nascita=this.prov_nascita;
    this.indirizzo_residenza=this.indirizzo_residenza;
    this.comune_residenza=this.comune_residenza;
    this.prov_residenza=this.prov_residenza;
    this.cns=this.cns;
    this.spid=this.spid;
    this.azienda=this.azienda;
    this.ruolo=this.ruolo;
    this.profilo=this.profilo;
    this.email=this.email;
    this.telefono=this.telefono;

if(this.user==undefined || this.tipo==undefined ||  this.nome==undefined ||   this.cognome==undefined || this.cf==undefined  || this.data_nascita==undefined || this.luogo_nascita==undefined || this.prov_nascita==undefined || this.indirizzo_residenza==undefined || this.comune_residenza==undefined ||  this.prov_residenza==undefined ||  this.azienda==undefined ||  this.ruolo==undefined ||  this.profilo==undefined || this.email==undefined || this.telefono==undefined  )
{
  this.tipoalertuncomplete="uncomplete";
}   
else{
this.apiService.newUser(this.user,this.tipo, this.nome,  this.cognome,this.cf,this.firma,this.data_nascita,this.luogo_nascita,this.prov_nascita,this.indirizzo_residenza,this.comune_residenza, this.prov_residenza, this.cns, this.spid, this.azienda, this.ruolo, this.profilo, this.email, this.telefono).subscribe((data)=>{
  
  this.esito = data['records'];
   let i:any;
   for(i=0;i<this.esito.length;i++){
  this.esito=this.esito[i]['Esito'];
  if(this.esito=="si"){
   this.tipoalert="success";
   this.tipoalertdanger=undefined;
   this.tipoalertuncomplete=undefined;
   this.user=undefined;
   this.tipo=undefined;
   this.nome=undefined;
   this.cognome=undefined;
   this.cf=undefined;
   this.firma=undefined;
   this.data_nascita=undefined;
   this.luogo_nascita=undefined;
   this.prov_nascita=undefined;
   this.indirizzo_residenza=undefined;
   this.comune_residenza=undefined;
   this.prov_residenza=undefined;
   this.cns=undefined;
   this.spid=undefined;
   this.azienda=undefined;
   this.ruolo=undefined;
   this.profilo=undefined;
   this.email=undefined;
   this.telefono=undefined;
   this.createForm();
  } if(this.esito=="no") {
    this.tipoalert=undefined;
    this.tipoalertuncomplete=undefined;
    this.tipoalertdanger="danger";
  }
}
});
      }
  }
}