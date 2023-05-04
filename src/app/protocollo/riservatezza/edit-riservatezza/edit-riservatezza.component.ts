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
  selector: 'app-edit-riservatezza',
  templateUrl: './edit-riservatezza.component.html',
  styleUrls: ['./edit-riservatezza.component.css']
})
export class EditRiservatezzaComponent implements OnInit {
  id;
  faBuilding=faBuilding;
  faEdit=faEdit;
  esito;
  msgerror:string;
  tipoalert;
  tipoalertdanger;
  tipoalertuncomplete;
  dati;
  riservatezza;
  form: FormGroup;
  tipo;
  tipi;
  motivazione;
  tipologia;
  miariservatezza;
  riservatezzatipo;

  constructor(private apiprotoService: ApiprotoService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { 
      
  }





  Trasmetti(): void {

    if (this.form.valid) {
    this.apiprotoService.UpdateRiservatezza(this.riservatezza=this.form.value, this.id).subscribe((dati)=>{
      this.dati = dati['Esito'];
      if(this.dati=="si"){
        if(confirm("Motivazione di riservatezza correttamente registrata")) {
        this.router.navigate(['/viewriservatezza']);
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
        motivazione: new FormControl('', Validators.required),
        riservatezzatipo: new FormControl('', Validators.required),
           });

            this.route.queryParams.subscribe( 
              params => { 
                this.id =  params['id']; 
                this.apiprotoService.getSingleRiservatezza(this.id).subscribe((data)=>{
                    this.miariservatezza = data;
                    for(let i:any=0;i<this.miariservatezza.length;i++){
                        this.form.patchValue(this.motivazione=this.miariservatezza[i].motivazione);
                        this.form.patchValue(this.riservatezzatipo=this.miariservatezza[i].tipologia);       
              }
              });
            } 
          ) 
    }
}