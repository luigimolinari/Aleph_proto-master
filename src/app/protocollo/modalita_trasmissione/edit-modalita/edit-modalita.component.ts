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
  selector: 'app-edit-modalita',
  templateUrl: './edit-modalita.component.html',
  styleUrls: ['./edit-modalita.component.css']
})
export class EditModalitaComponent implements OnInit {
  id;
  faBuilding=faBuilding;
  faEdit=faEdit;
  esito;
  msgerror:string;
  tipoalert;
  tipoalertdanger;
  tipoalertuncomplete;
  dati;
  modalita;
  form: FormGroup;
  tipo;
  tipi;
  descrizione;
  is_mail;
  is_pec;
  accesso;
  attivo;
  miamodalita;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { 
      
  }





  Trasmetti(): void {

    if (this.form.valid) {
    this.apiService.UpdateModalita(this.modalita=this.form.value, this.id).subscribe((dati)=>{
      this.dati = dati['Esito'];
      if(this.dati=="si"){
        if(confirm("Modalita di trasmissione correttamente registrata")) {
        this.router.navigate(['/viewmodalita']);
        }
       }
       else{
        alert("Attenzione. Impossibile inserire");
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

            this.route.queryParams.subscribe( 
              params => { 
                this.id =  params['id']; 
                this.apiService.getSingleModalita(this.id).subscribe((data)=>{
                    this.miamodalita = data;
                    for(let i:any=0;i<this.miamodalita.length;i++){
                        this.form.patchValue(this.descrizione=this.miamodalita[i].descrizione);
                     
              }
              });
            } 
          ) 
    }
}