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
  selector: 'app-edit-tipo-rubrica',
  templateUrl: './edit-tipo-rubrica.component.html',
  styleUrls: ['./edit-tipo-rubrica.component.css']
})
export class EditTipoRubricaComponent implements OnInit {
  id;
  faBuilding=faBuilding;
  faEdit=faEdit;
  esito;
  msgerror:string;
  tipoalert;
  tipoalertdanger;
  tipoalertuncomplete;
  dati;
  serie;
  form: FormGroup;
  tipo;
  tipi;
  descrizione;
  numerazione;
  annuale;
  accesso;
  attivo;
  miaserie;
  tipologia;
  note;
  tipo_rubrica;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { 
      
  }





  Trasmetti(): void {

    if (this.form.valid) {
    this.apiService.UpdateTipoRubrica(this.tipo_rubrica=this.form.value, this.id).subscribe((dati)=>{
      this.dati = dati['Esito'];
      if(this.dati=="si"){
        if(confirm("Tipologia correttamente registrata")) {
        this.router.navigate(['/viewtiporubrica']);
        }
       }
       else{
        alert("Attenzione. Impossibile inserire la tipologia");
       }
    });
  } else {
alert("Attenzione. Non tutti i campi obbligatori hanno un valore valido");
  }
    }

  
    ngOnInit(): void {
        this.form = this.formBuilder.group({
        tipologia: new FormControl('', Validators.required),
        note: new FormControl(''),
            });

            this.route.queryParams.subscribe( 
              params => { 
                this.id =  params['id']; 
                this.apiService.getSingleTipoRubrica(this.id).subscribe((data)=>{
                    this.miaserie = data;
                    for(let i:any=0;i<this.miaserie.length;i++){
                        this.form.patchValue(this.tipologia=this.miaserie[i].tipo);
                        this.form.patchValue(this.note=this.miaserie[i].note);
                    
              }
              });
            } 
          ) 
    }
}