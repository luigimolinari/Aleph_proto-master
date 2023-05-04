import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { faCubes } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-form-gateway',
  templateUrl: './form-gateway.component.html',
  styleUrls: ['./form-gateway.component.css']
})
export class FormGatewayComponent {

  form;
  id_form: any;
  data: any;
  faCubes = faCubes;
  dati;
  gateway;
  update = 0;

  constructor(private http: HttpClient, private apiService: ApiService, private route: ActivatedRoute, private router: Router) {


    this.route.queryParams.subscribe(
      params => {
        this.id_form = params['id_form'];

        
        this.apiService.getFormGateway(this.id_form).subscribe((data:any) => {

          if(data!=null){
            if(data.length!=0){
              if(data['esito_codice']!=0){
                this.gateway = data['gateway'];
                this.update = 1;
              }
            }
          }
    
        }, error => console.error(error));


        this.apiService.getPortalForm(this.id_form).subscribe((data) => {

          this.form = data;
    
        }, error => console.error(error));

      });

  }

  scegli(campo, tipo) {
    if(this.update==1){
      if(confirm('Un gateway è già stato assegnato al form selezionato ('+this.form[0]['campo'+this.gateway]+'); procedere con le modifiche')){
        //reset della configurazione precedente
        this.apiService.DeleteFormGateway(this.id_form).subscribe((dati) => {
          if (dati['esito_codice'] ==  1) {          
              this.submit(campo, tipo);         
          }
          else {
            alert("Attenzione. Errore nella modifica del gateway");
          }
        });
      }
    }else{
      //nuova configurazione form
      this.submit(campo, tipo);   
    }
  }

  submit(campo, tipo) {
    if (tipo == "select") {
      this.apiService.AddFormGatewaySelect(this.id_form, campo).subscribe((dati) => {
        this.dati = dati['Esito'];
        if (this.dati == "si") {
          if (confirm("Gateway correttamente registrato")) {
            this.router.navigate(['/forms']);
          }
        }
        else {
          alert("Attenzione. Impossibile inserire il gateway");
        }
      });
    }

    else if (tipo == "truefalse") {
      this.apiService.AddFormGatewayBoolean(this.id_form, campo).subscribe((dati) => {
        this.dati = dati['Esito'];
        if (this.dati == "si") {
          if (confirm("Gateway correttamente registrato")) {
            this.router.navigate(['/forms']);
          }
        }

        else {
          alert("Attenzione. Impossibile inserire il gateway");
        }
      });
    }

    else if (tipo == "Data") {
      let tipologia = "Data";
      if (confirm("Stai per inserire un gateway sul campo " + campo)) {
        let navigationExtras: NavigationExtras = {
          queryParams: { 'id_form': this.id_form, 'campo': campo, 'tipo': tipologia }
        };
        this.router.navigate(['/formassigngateway'], navigationExtras);
      }
    }

    else {
      let tipologia = "input testo";
      if (confirm("Stai per inserire un gateway sul campo " + campo)) {
        let navigationExtras: NavigationExtras = {
          queryParams: { 'id_form': this.id_form, 'campo': campo, 'tipo': tipologia }
        };
        this.router.navigate(['/formassigngateway'], navigationExtras);
      }
    }
  }

}
