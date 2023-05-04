import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {NavigationExtras} from '@angular/router';
import {faCubes} from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, FormBuilder,  Validators, NgModel } from '@angular/forms';

@Component({
  selector: 'app-form-assign-gateway',
  templateUrl: './form-assign-gateway.component.html',
  styleUrls: ['./form-assign-gateway.component.css']
})
export class FormAssignGatewayComponent implements OnInit {

  form;
  id_form: any;
  data: any;
  faCubes=faCubes;
  id_campo;
  numero_campo;
  nome_campo;
  tipo_campo;
  inform: FormGroup;
  condizione;
  valore;
  formdata;
  dati;

  constructor(private http: HttpClient,private apiService: ApiService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    
    
    this.route.queryParams.subscribe( 
      params => { 
        this.id_form =  params['id_form']; 
        this.id_campo = params['campo'];
        this.tipo_campo = params['tipo'];
            });
    
    this.apiService.getFormField(this.id_form, this.id_campo).subscribe((data)=>{
 
        this.form = data;


        
      switch(this.id_campo) { 
        case '1': { 
          this.nome_campo=this.form[0].campo1;
           break; 
        } 
        case '2': { 
          this.nome_campo=this.form[0].campo2;
           break; 
        } 
        case '3': { 
          this.nome_campo=this.form[0].campo3;
           break; 
        } 

        case '4': { 
          this.nome_campo=this.form[0].campo4;
           break; 
        } 

        case '5': { 
          this.nome_campo=this.form[0].campo5;
           break; 
        } 

        case '6': { 
          this.nome_campo=this.form[0].campo6;
           break; 
        } 

        case '7': { 
          this.nome_campo=this.form[0].campo7;
           break; 
        } 

        case '8': { 
          this.nome_campo=this.form[0].campo8;
           break; 
        } 

        case '9': { 
          this.nome_campo=this.form[0].campo9;
           break; 
        } 


        case '10': { 
          this.nome_campo=this.form[0].campo10;
           break; 
        } 
        default: { 
            this.nome_campo=this.form[0].campo1; 
           break; 
        } 
     } 

    }, error => console.error(error));





    
  }

  ngOnInit(): void {
    this.inform = this.formBuilder.group({
    condizione: new FormControl('', Validators.required),
    valore: new FormControl('', Validators.required),
  
        });
}

  scegli(campo){
    if(confirm("Stai per inserire un gateway sul campo "+campo )) {
      let navigationExtras: NavigationExtras = {
				queryParams: { 'id_form': this.id_form, 'campo': campo}
        
			};
			this.router.navigate(['/formassigngateway'], navigationExtras);
		}
    }

    Trasmetti(): void {

      if (this.inform.valid) {
      this.apiService.AddFormGateway(this.id_form,this.id_campo,this.formdata=this.inform.value).subscribe((dati)=>{
        this.dati = dati['Esito'];
        if(this.dati=="si"){
          if(confirm("Gateway correttamente registrato")) {
          this.router.navigate(['/forms']);
          }
         }
         else{
          alert("Attenzione. Impossibile inserire il gateway");
         }
      });
    } else {
  alert("Attenzione. Non tutti i campi obbligatori hanno un valore valido");
    }
      }


}
