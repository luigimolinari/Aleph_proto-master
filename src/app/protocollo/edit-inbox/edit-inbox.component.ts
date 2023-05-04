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
  selector: 'app-edit-inbox',
  templateUrl: './edit-inbox.component.html',
  styleUrls: ['./edit-inbox.component.css']
})
export class EditInboxComponent implements OnInit {
  id;
  faBuilding=faBuilding;
  faEdit=faEdit;
  esito;
  msgerror:string;
  tipoalert;
  tipoalertdanger;
  tipoalertuncomplete;
  dati;
  inbox;
  form: FormGroup;
  tipo;
  tipi;
  descrizione;
  is_mail;
  is_pec;
  accesso;
  attivo;
  mioinbox;
  is_file;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { 
      
  }





  Trasmetti(): void {

    if (this.form.valid) {
    this.apiService.UpdateInbox(this.inbox=this.form.value, this.id).subscribe((dati)=>{
      this.dati = dati['Esito'];
      if(this.dati=="si"){
        if(confirm("Inbox correttamente registrato")) {
        this.router.navigate(['/viewinbox']);
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
        is_pec: new FormControl(''),
        is_mail: new FormControl(''),
        is_file: new FormControl(''),
            });

            this.route.queryParams.subscribe( 
              params => { 
                this.id =  params['id']; 
                this.apiService.getSingleInBox(this.id).subscribe((data)=>{
                    this.mioinbox = data;
                    for(let i:any=0;i<this.mioinbox.length;i++){
                        this.form.patchValue(this.descrizione=this.mioinbox[i].descrizione);
                        if(this.is_mail=='1'){
                        this.form.patchValue(this.is_mail=this.mioinbox[i].is_mail);
                      } 
                      if(this.is_pec=='1'){
                        this.form.patchValue(this.is_pec=this.mioinbox[i].is_pec);
                      }
                      if(this.is_file=='1'){
                        this.form.patchValue(this.is_file=this.mioinbox[i].is_file);
                      }
              }
              });
            } 
          ) 
    }
}