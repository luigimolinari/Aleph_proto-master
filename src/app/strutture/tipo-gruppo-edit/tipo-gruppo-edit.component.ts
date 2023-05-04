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
  selector: 'app-tipo-gruppo-edit',
  templateUrl: './tipo-gruppo-edit.component.html',
  styleUrls: ['./tipo-gruppo-edit.component.css']
})
export class TipoGruppoEditComponent implements OnInit {
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
  tipogruppo;
  tipigruppo;
  accesso;
  attivo;
  funzioni;
  nome;


  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { 
      
  }





  Trasmetti(): void {

    if (this.form.valid) {
    this.apiService.UpdateTipoGruppo(this.tipogruppo=this.form.value, this.id=this.id).subscribe((dati)=>{
      this.dati = dati['Esito'];
     if(this.dati=="si"){
      if(confirm("Modifica correttamente eseguita")) {
      this.router.navigate(['/tipogruppo']);
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
        nome: new FormControl('', Validators.required),
        attivo: new FormControl('', Validators.required),
        funzioni: new FormControl('', Validators.required),
            });
      this.route.queryParams.subscribe( 
        params => { 
          this.id =  params['id']; 
          this.apiService.getSingleTipoGruppo(this.id).subscribe((data)=>{
            this.tipigruppo = data;
                        for(let i:any=0;i<this.tipigruppo.length;i++){
            this.form.patchValue(this.nome=this.tipigruppo[i].nome);
            this.form.patchValue(this.attivo=this.tipigruppo[i].attivo);
            this.form.patchValue(this.funzioni=this.tipigruppo[i].funzioni);

            
          }
          });
        } 
      ) 
    }
}