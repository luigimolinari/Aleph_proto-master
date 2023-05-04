import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router'; 
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, FormBuilder,  Validators, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/local-storage.service';

@Component({
  selector: 'app-form-termina',
  templateUrl: './form-termina.component.html',
  styleUrls: ['./form-termina.component.css']
})
export class FormTerminaComponent implements OnInit {
  id;
  azienda;
  aziende;
  user;
  faUser=faUser;
  faHouseUser=faHouseUser;
  faBuilding=faBuilding;
  faEdit=faEdit;
  nome: any;
  header;
  legenda;
  immagine;
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
  idform;


  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder , private localStorageService: LocalStorageService) { 
       
    this.route.queryParams.subscribe( 
      params => { 
        this.idform =  params['id']; 
      });
    
  }





 

  Trasmetti(): void {
    if (this.form.valid) {
    this.apiService.AddFormPortal(this.idform,this.form=this.form.value ).subscribe((dati)=>{
      this.dati = dati['Esito'];
      if(this.dati=="si"){
         if(confirm("Form correttamente registrato")) {
        this.router.navigate(['/forms']);
        }
       }
       else{
        alert("Attenzione. Impossibile inserire il flusso");
       }
    });
  } else {
    alert("Attenzione. Non tutti i campi obbligatori hanno un valore valido");
     }
        }



  
    ngOnInit(): void {             

        this.form = this.formBuilder.group({

          header: new FormControl('', Validators.minLength(2)),
          immagine: new FormControl('', Validators.minLength(1)),
          legenda: new FormControl('', Validators.minLength(1)),
       
        });
    }
}
