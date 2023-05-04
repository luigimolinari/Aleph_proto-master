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
  selector: 'app-azienda-view',
  templateUrl: './azienda-view.component.html',
  styleUrls: ['./azienda-view.component.css']
})
export class AziendaViewComponent implements OnInit {
  id;
  azienda;
  aziende;
  user;
  faUser=faUser;
  faHouseUser=faHouseUser;
  faBuilding=faBuilding;
  faEdit=faEdit;
  nome: any;
  sede;
  piva;
  pec;
  mail;
  telefono;
  esito;
  msgerror:string;
  tipoalert;
  tipoalertdanger;
  tipoalertuncomplete;
  dati;
  form: FormGroup;


  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { 
      
  }





  Trasmetti(): void {

    if (this.form.valid) {
    this.apiService.UpdateAzienda(this.azienda=this.form.value, this.id=this.id).subscribe((dati)=>{
      this.dati = dati['Esito'];
     if(this.dati=="si"){
      if(confirm("Modifica correttamente eseguita")) {
      this.router.navigate(['/aziende']);
      }
     }
     else{
      alert("Attenzione. Impossibile eseguire le modifiche");
     }
    });
  } else {
alert("Attenzione. Non tutti i campi obbligatori hanno un valore valido");
  }
    }

  
    ngOnInit(): void {
        this.form = this.formBuilder.group({
        nome: new FormControl('', Validators.minLength(2)),
        sede: new FormControl('', Validators.minLength(2)),
        piva: new FormControl('', Validators.minLength(2)),
        pec: new FormControl('', Validators.email),
        mail: new FormControl('', Validators.email),
        telefono: new FormControl('',Validators.pattern(/[0-9]+/)),
            });
        this.route.queryParams.subscribe( 
          params => { 
            this.id =  params['id']; 
            this.apiService.getSingleAzienda(this.id).subscribe((data)=>{
              this.aziende = data;
              for(let i:any=0;i<this.aziende.length;i++){
                this.form.patchValue(this.nome=this.aziende[i].nome);
                this.form.patchValue(this.sede=this.aziende[i].sede);
                this.form.patchValue(this.piva=this.aziende[i].piva);
                this.form.patchValue(this.pec=this.aziende[i].pec);
                this.form.patchValue(this.mail=this.aziende[i].mail);
                this.form.patchValue(this.telefono=this.aziende[i].telefono);

          }
          });
        } 
      ) 
    }
}