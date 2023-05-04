import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { faCubes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-form-gateway-assign',
  templateUrl: './form-gateway-assign.component.html',
  styleUrls: ['./form-gateway-assign.component.css']
})
export class FormGatewayAssignComponent {

  fields;
  id_form: any;
  id_flusso;
  data: any;
  faCubes = faCubes;
  dati;
  gateway;
  update = 0; //se non è ancora stato definito un gateway, dovrò crearlo; altrimenti lavoro in modalità update: modifica gateway esistente
  gateway_id;
  gateway_field;
  gateway_condition;
  id_selected = '';
  nome_selected = '';
  tipo_selected = '';
  condizione = '';
  valore = '';
  valid = false;
  steps_valle = [];

  constructor(private http: HttpClient, private apiService: ApiService, private route: ActivatedRoute, private router: Router) {


    this.route.queryParams.subscribe(
      params => {
        this.id_form = params['id_form'];

        this.init();

      });

  }

  init(): void {
    this.apiService.getSingleForm(this.id_form).subscribe((form: any) => {

      this.id_flusso = form.id_flusso;
      this.fields = form.fields;
      let gateway_info = form.gateway_info;
      if (gateway_info.length != 0) {
        this.update = 1;

        this.gateway_id = gateway_info.map(x => x.id_field)[0];
        this.id_selected = this.gateway_id

        this.gateway_field = gateway_info.map(x => x.nome)[0];

        let condizione = gateway_info.map(x => x.condizione)[0];
        let valore = gateway_info.map(x => x.valore)[0];

        switch (condizione) {
          case 'truefalse':
            this.gateway_condition = 'Vero / Falso';
            break;
          case 'lower':
            this.gateway_condition = 'Maggiore o Minore di ' + valore;
            break;
          case 'higher':
            this.gateway_condition = 'Maggiore o Minore di ' + valore;
            break;
          case 'equal-notequal':
            this.gateway_condition = 'Uguale o Diverso da ' + valore;
            break;
          case 'equal':
            let options = '';
            gateway_info.forEach(element => {
              options = options.length == 0 ? element.valore : options + '; ' + element.valore;
            });
            this.gateway_condition = 'Uguale ai valori definiti per il menu a tendina associato al campo Select: ' + options
            break;
        }

        //nel caso di modifica del campo gateway, devo cancellare gli step del workflow del flusso a valle del form
        this.steps_valle = [];
        this.apiService.getAllNextStep(this.id_flusso, this.id_form, 'F').subscribe((res: any) => {
          res.forEach(element => {
            this.steps_valle.push(element);
          });
        });
      }

    }, error => console.error(error));


  }


  scegli(id, nome, tipo) {

    this.valore = '';
    this.condizione = '';

    console.log(id);
    console.log(nome);
    console.log(tipo);

    this.id_selected = id;
    this.nome_selected = nome;
    this.tipo_selected = tipo;

    //a seconda del tipo di campo cambia la situazione:
    //- campo select: non c'è bisogno di specificare la condizione; ci saranno tante strade di workflow quante sono le opzioni del menu a tendina (e la condizione sarà qual, per ogni opzione)
    //- campo booelano: non c'è bisogno di specificare la condizione; ci saranno due strade e la condizione sarà truefalse
    //- altro: bisogna specificare che tipo di condizione e riferita a quale valore


    /* if(this.update==1){
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
    } */
  }

  submit() {
    let definizione = [];
    this.valid = false;
    if (this.tipo_selected == 'Select') {

      let options = this.fields.filter(x => x.id == this.id_selected)[0].select_option;
      console.log(options);

      options.forEach(option => {
        let obj: any = new Object();
        obj.condizione = 'equal';
        obj.valore = option;
        definizione.push(obj);
      });
      this.valid = true;

    } else if (this.tipo_selected == 'Si-No') {
      let obj: any = new Object();
      obj.condizione = 'truefalse';
      obj.valore = '';
      definizione.push(obj);
      this.valid = true;

    } else {
      if (this.condizione != '' && this.valore != '') {
        this.valid = true;
      } else {
        this.valid = false;
      }
      let obj: any = new Object();
      obj.condizione = this.condizione;
      obj.valore = this.valore;
      definizione.push(obj);
    }
    if (this.valid) {
      if (this.update == 0) {
        this.apiService.AddGateway(this.id_form, this.id_selected, definizione).subscribe((data: any) => {
          alert(data.esito_mex);
        });
      } else {
        //ALERT
        if (confirm('Attenzione! Modificando un campo gateway sarà necessario riconfigurare il workflow costruito a valle dello stesso. Confermi di procedere con la modifica?')) {
          this.apiService.UpdateGateway(this.id_form, this.id_selected, this.id_flusso, definizione, this.steps_valle).subscribe((data: any) => {
            alert(data.esito_mex);
          });
        }

      }
    }


    /*     if (tipo == "select") {
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
        } */
  }

  back(): void {
    this.router.navigate(['/forms']);
  }

}
