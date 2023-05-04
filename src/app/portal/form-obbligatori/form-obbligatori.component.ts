import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router'; 
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, FormBuilder,  Validators, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { C } from '@angular/cdk/keycodes';
import { LocalStorageService } from 'src/app/local-storage.service';

@Component({
  selector: 'app-form-obbligatori',
  templateUrl: './form-obbligatori.component.html',
  styleUrls: ['./form-obbligatori.component.css']
})
export class FormObbligatoriComponent implements OnInit {
  id;
  azienda;
  aziende;
  user;
  faUser=faUser;
  faHouseUser=faHouseUser;
  faBuilding=faBuilding;
  faEdit=faEdit;
  nome: any;
  forall;
  addfile;
   esito;
  msgerror:string;
  tipoalert;
  tipoalertdanger;
  tipoalertuncomplete;
  dati;
  form: FormGroup;
  tipouser;
  id_azienda;
  id_operatore;
  panelOpenState = false;
  idinserito;
  idform;


  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder , private localStorageService: LocalStorageService) { 
       
    this.route.queryParams.subscribe( 
      params => { 
        this.idform =  params['id']; 
      });
    
  }





 

  Trasmetti(): void {

    this.apiService.UpdatePortalForm(this.form=this.form.value, this.idform).subscribe((dati)=>{
      this.dati = dati['Esito'];
      if(this.dati=="si"){
         if(confirm("Operazione correttamente eseguita")) {
        this.router.navigate(['/formtermina'], { queryParams: {id: this.idform}});
        }
       }
       else{
        alert("Attenzione. Impossibile inserire il flusso");
       }
    });
 
    }


  
    ngOnInit(): void {             

        this.form = this.formBuilder.group({

        forall: new FormControl(),
        addfile: new FormControl(),

       

        });
    }
}
