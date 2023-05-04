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
  selector: 'app-tipi-edit',
  templateUrl: './tipi-edit.component.html',
  styleUrls: ['./tipi-edit.component.css']
})
export class TipiEditComponent implements OnInit {
  id;
  faBuilding=faBuilding;
  faEdit=faEdit;
  esito;
  msgerror:string;
  tipoalert;
  tipoalertdanger;
  tipoalertuncomplete;
  dati;
  form: FormGroup;
  tipo;
  tipi;
  accesso;
  attivo;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { 
      
  }





  Trasmetti(): void {

    if (this.form.valid) {
    this.apiService.UpdateTipo(this.tipo=this.form.value, this.id=this.id).subscribe((dati)=>{
      this.dati = dati['Esito'];
     if(this.dati=="si"){
      if(confirm("Modifica correttamente eseguita")) {
      this.router.navigate(['/tipi']);
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
        tipo: new FormControl('', Validators.required),
        accesso: new FormControl('', Validators.required),
        attivo: new FormControl('', Validators.required),
            });
      this.route.queryParams.subscribe( 
        params => { 
          this.id =  params['id']; 
          this.apiService.getSingleTipo(this.id).subscribe((data)=>{
            this.tipi = data;
                        for(let i:any=0;i<this.tipi.length;i++){
            this.form.patchValue(this.tipo=this.tipi[i].tipo);
            this.form.patchValue(this.accesso=this.tipi[i].accesso);
            this.form.patchValue(this.attivo=this.tipi[i].attivo);

            
          }
          });
        } 
      ) 
    }
}