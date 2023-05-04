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
  selector: 'app-add-tipo',
  templateUrl: './add-tipo.component.html',
  styleUrls: ['./add-tipo.component.css']
})
export class AddTipoComponent implements OnInit {
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
    this.apiService.AddTipo(this.tipo=this.form.value).subscribe((dati)=>{
      this.dati = dati['Esito'];
      if(this.dati=="si"){
        if(confirm("Tipo operatori correttamente registrato")) {
        this.router.navigate(['/tipi']);
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
        tipo: new FormControl('', Validators.required),
        accesso: new FormControl('', Validators.required),
        attivo: new FormControl('', Validators.required),
            });
    }
}