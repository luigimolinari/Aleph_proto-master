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
  selector: 'app-destinatari-edit',
  templateUrl: './destinatari-edit.component.html',
  styleUrls: ['./destinatari-edit.component.css']
})
export class DestinatariEditComponent implements OnInit {

  id;
  faBuilding=faBuilding;
  faEdit=faEdit;
  esito;
  msgerror:string;
  tipoalert;
  tipoalertdanger;
  tipoalertuncomplete;
  dati;
  destinatari;
  form: FormGroup;
  tipo;
  tipi;
  descrizione;
  nome;
  miodestinatari;
  azienda;

  constructor(private apiprotoService: ApiprotoService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { 
    this.azienda = JSON.parse(localStorage.getItem('id_azienda'));
  }


  Trasmetti(): void {

    if (this.form.valid) {
    this.apiprotoService.UpdateDestinatari(this.destinatari=this.form.value, this.id, this.azienda).subscribe((dati)=>{
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

            this.route.queryParams.subscribe( 
              params => { 
                this.id =  params['id']; 
                this.apiprotoService.getSingleDestinatari(this.id).subscribe((data)=>{
                    this.miodestinatari = data;
                    for(let i:any=0;i<this.miodestinatari.length;i++){
                        this.form.patchValue(this.descrizione=this.miodestinatari[i].descrizione);
                         this.form.patchValue(this.nome=this.miodestinatari[i].nome);
              }
              });
            } 
          ) 
    }
}