import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, FormBuilder, Validators, NgModel } from '@angular/forms';
import { Router,NavigationExtras} from '@angular/router';


@Component({
  selector: 'app-portal-form',
  templateUrl: './portal-form.component.html',
  styleUrls: ['./portal-form.component.css']
})
export class PortalFormComponent implements OnInit {
  id;
  id_form;
  id_procedura;
  id_pratica
  id_gruppo;
  mode;
  id_operatore;
  tipo_operatore;
  azienda;
  aziende;
  user;
  faUser = faUser;
  faHouseUser = faHouseUser;
  faBuilding = faBuilding;
  faEdit = faEdit;
  campo1;
  flusso;
  flussi;
  campo2;
  campo3;
  campo4;
  campo5;
  campo6;
  campo7;
  campo8;
  campo9;
  campo10;
  esito;
  msgerror: string;
  tipoalert;
  tipoalertdanger;
  tipoalertuncomplete;
  dati;
  form: FormGroup;
  campi;
  select1;
  select2;
  select3;
  select4;
  select5;
  select6;
  select7;
  select8;
  select9;
  select10;
  sfondo;
  nome_tab;
  update;
  disabled='';
  tipo_flusso;


  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    this.route.queryParams.subscribe(
      params => {
        this.id_form = params['id_form'];

        this.id_procedura = params['id_procedura'];
        this.id_gruppo = params['id_gruppo'];

        this.id_pratica = params['id_pratica'];

        this.mode = Number(params['mode']);
        
        if (this.mode<2) this.disabled = 'disabled';
      });
    this.id_operatore = JSON.parse(localStorage.getItem('ID'));
    this.tipo_operatore = JSON.parse(localStorage.getItem('tipo_op'));
  }





  Trasmetti(): void {

    if (this.form.valid) {

      if (this.update != 1) {
        this.apiService.AddUserForm(this.tipo_flusso, this.id_form, this.id_procedura, this.id_pratica, this.id_operatore, this.nome_tab, this.form.value).subscribe((dati) => {
          this.dati = dati['Esito'];
          if (this.dati == "si") {
            if (confirm("Dati correttamente registrati")) {
              if(this.id_procedura!=undefined){
                let navigationExtras: NavigationExtras = {
                  queryParams: { 'procedura':this.id_procedura, 'gruppo':this.id_gruppo }
                };
                this.router.navigate(['/workflowprocedura'],navigationExtras);
              }
              else if (this.id_pratica!=undefined){
                let navigationExtras: NavigationExtras = {
                  queryParams: {'id_pratica':this.id_pratica}
                };
                this.router.navigate(['/workflowpratica'],navigationExtras);
              }else{
                this.router.navigate(['/userforms']);
              }
            }
          } else {
            alert("Attenzione. Impossibile eseguire le modifiche");
          }
        });
      }else{
        this.apiService.UpdateUserForm(this.tipo_flusso, this.id_form, this.id_procedura, this.id_pratica, this.id_operatore, this.nome_tab, this.form.value).subscribe((dati) => {
          this.dati = dati['Esito'];
          if (this.dati == "si") {
            if (confirm("Dati correttamente registrati")) {
              if(this.id_procedura!=undefined){
                let navigationExtras: NavigationExtras = {
                  queryParams: { 'procedura':this.id_procedura, 'gruppo':this.id_gruppo }
                };
                this.router.navigate(['/workflowprocedura'],navigationExtras);
              }
              else if (this.id_pratica!=undefined){
                let navigationExtras: NavigationExtras = {
                  queryParams: {'id_pratica':this.id_pratica}
                };
                this.router.navigate(['/workflowpratica'],navigationExtras);
              }else{
                this.router.navigate(['/userforms']);
              }
            }
          } else {
            alert("Attenzione. Impossibile eseguire le modifiche");
          }
        });
      }
    } else {
      alert("Attenzione. Non tutti i campi obbligatori hanno un valore valido");

    }
  }


  ngOnInit(): void {

    /* identifico la tipologia di flusso: pratica o procedura */
   
    if(this.id_pratica != undefined){
      this.tipo_flusso = 'pratica';
      this.id_procedura = '';
    }else{
      this.tipo_flusso = 'procedura';
      this.id_pratica = '';
    }


    this.apiService.getUserPortalForm(this.id_form).subscribe((dati) => {
      this.campi = dati;
      this.sfondo = this.campi[0].immagine;
      this.nome_tab = this.campi[0].nome_tab;
      if (this.campi[0].tipocampo1 == "Select") {
        this.apiService.getFormSelect(this.id_form, 1).subscribe((select1) => {
          this.select1 = select1;
        });
      }

      if (this.campi[0].tipocampo2 == "Select") {
        this.apiService.getFormSelect(this.id_form, 2).subscribe((select2) => {
          this.select2 = select2;
        });
      }

      if (this.campi[0].tipocampo3 == "Select") {
        this.apiService.getFormSelect(this.id_form, 3).subscribe((select3) => {
          this.select3 = select3;
        });
      }

      if (this.campi[0].tipocampo4 == "Select") {
        this.apiService.getFormSelect(this.id_form, 4).subscribe((select4) => {
          this.select4 = select4;
        });
      }

      if (this.campi[0].tipocampo5 == "Select") {
        this.apiService.getFormSelect(this.id_form, 5).subscribe((select5) => {
          this.select5 = select5;
        });
      }

      if (this.campi[0].tipocampo6 == "Select") {
        this.apiService.getFormSelect(this.id_form, 6).subscribe((select6) => {
          this.select6 = select6;
        });
      }

      if (this.campi[0].tipocampo7 == "Select") {
        this.apiService.getFormSelect(this.id_form, 7).subscribe((select7) => {
          this.select7 = select7;
        });
      }

      if (this.campi[0].tipocampo8 == "Select") {
        this.apiService.getFormSelect(this.id_form, 8).subscribe((select8) => {
          this.select8 = select8;
        });
      }

      if (this.campi[0].tipocampo9 == "Select") {
        this.apiService.getFormSelect(this.id_form, 9).subscribe((select9) => {
          this.select9 = select9;
        });
      }

      if (this.campi[0].tipocampo10 == "Select") {
        this.apiService.getFormSelect(this.id_form, 10).subscribe((select10) => {
          this.select10 = select10;
        });
      }

      this.apiService.getSingleFormUser(this.tipo_flusso, this.id_form, this.nome_tab, this.id_procedura, this.id_pratica, this.id_operatore).subscribe((dati:any) => {

        if(dati[0].campo1!=null) {
          this.update = 1;         
        }else{
          this.update=0;
        }

        console.log(this.update);

        // può modificare un form soltanto l'amministratore nel caso di procedure pubbliche
        // viceversa fannoriferimento i diritti assegnati al gruppo
        if((this.update==1 && this.mode<3 && this.id_gruppo!='ALL') ||(this.update==1 && this.tipo_operatore!='admin' && this.id_gruppo=='ALL')){
          this.disabled = 'disabled';
        }

        if (dati[0].campo1 != undefined) {
          this.campo1 = dati[0].campo1;
        }
        if (dati[0].campo2 != undefined) {
          this.campo2 = dati[0].campo2;
        }
        if (dati[0].campo3 != undefined) {
          this.campo3 = dati[0].campo3;
        }
        if (dati[0].campo4 != undefined) {
          this.campo4 = dati[0].campo4;
        }
        if (dati[0].campo5 != undefined) {
          this.campo5 = dati[0].campo5;
        }
        if (dati[0].campo6 != undefined) {
          this.campo6 = dati[0].campo6;
        }
        if (dati[0].campo7 != undefined) {
          this.campo7 = dati[0].campo7;
        }
        if (dati[0].campo8 != undefined) {
          this.campo8 = dati[0].campo8;
        }
        if (dati[0].campo9 != undefined) {
          this.campo9 = dati[0].campo9;
        }
        if (dati[0].campo10 != undefined) {
          this.campo10 = dati[0].campo10;
        }

      });

      this.form = this.formBuilder.group({
        campo1: new FormControl(this.campo1, Validators.minLength(1)),
        campo2: new FormControl(this.campo2),
        campo3: new FormControl(this.campo3),
        campo4: new FormControl(this.campo4),
        campo5: new FormControl(this.campo5),
        campo6: new FormControl(this.campo6),
        campo7: new FormControl(this.campo7),
        campo8: new FormControl(this.campo8),
        campo9: new FormControl(this.campo9),
        campo10: new FormControl(this.campo10)
      });

    });




  }
}