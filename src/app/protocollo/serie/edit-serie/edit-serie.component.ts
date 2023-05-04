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
  selector: 'app-edit-serie',
  templateUrl: './edit-serie.component.html',
  styleUrls: ['./edit-serie.component.css']
})
export class EditSerieComponent{
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
  entratauscita;
  interno;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { 
      
  }





  Trasmetti(): void {

    if (this.form.valid) {
    this.apiService.UpdateSerie(this.serie=this.form.value, this.id).subscribe((dati)=>{
      this.dati = dati['Esito'];
      if(this.dati=="si"){
        if(confirm("Serie correttamente registrata")) {
        this.router.navigate(['/viewserie']);
        }
       }
       else{
        alert("Attenzione. Impossibile inserire la serie");
       }
    });
  } else {
alert("Attenzione. Non tutti i campi obbligatori hanno un valore valido");
  }
    }

  
    ngOnInit(): void {
        this.form = this.formBuilder.group({
        descrizione: new FormControl('', Validators.required),
        numerazione: new FormControl(''),
        entratauscita: new FormControl(''),
        interno: new FormControl(''),
        annuale: new FormControl(''),
            });

            this.route.queryParams.subscribe( 
              params => { 
                this.id =  params['id']; 
                this.apiService.getSingleSerie(this.id).subscribe((data)=>{
                    this.miaserie = data;
                   
                    for(let i:any=0;i<this.miaserie.length;i++){
                        this.form.patchValue(this.descrizione=this.miaserie[i].descrizione);
                        this.form.patchValue(this.numerazione=this.miaserie[i].numerazione);
                      if(this.miaserie[i].annuale=='1'){
                        this.form.patchValue(this.annuale=this.miaserie[i].annuale);
                      }
                      if(this.miaserie[i].entrata_uscita=='1'){
                        this.form.patchValue(this.entratauscita=this.miaserie[i].entrata_uscita);
                      }
                      if(this.miaserie[i].interno=='1'){
                        this.form.patchValue(this.interno=this.miaserie[i].interno);
                      }
              }
              });
            } 
          ) 
    }
}