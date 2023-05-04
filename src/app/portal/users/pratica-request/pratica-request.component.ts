import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';;
import { FormGroup, FormControl, FormBuilder, Validators, NgModel } from '@angular/forms';
import { Router,NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-pratica-request',
  templateUrl: './pratica-request.component.html',
  styleUrls: ['./pratica-request.component.css']
})
export class PraticaRequestComponent implements OnInit {

  id;
  id_form;
  id_flusso;
  id_operatore;
  tipo_operatore;
  campo1;
  campo2;
  campo3;
  campo4;
  campo5;
  campo6;
  campo7;
  campo8;
  campo9;
  campo10;
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
  bkground_url;
  nome_tab;
  nome_pratica;

  id_pratica;
  disabled;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    this.route.queryParams.subscribe(
      params => {
        this.id_form = params['id_form'];
        this.id_flusso = params['id_flusso'];

         this.id_pratica =  params['id_pratica'];
      });
    this.id_operatore = JSON.parse(localStorage.getItem('ID'));
    this.tipo_operatore = JSON.parse(localStorage.getItem('tipo_op'));
  }


  Trasmetti(): void {

    //solo insert - avvio nuova pratica

    if (this.form.valid) {
      if(confirm('Avviare la nuova pratica?')){
        this.apiService.AddPratica(this.id_form,this.id_flusso,this.id_operatore, this.nome_tab, this.form.value).subscribe((dati) => {
          if (dati['esito_codice'] == 1) {
            alert(dati['Esito']);
            this.router.navigate(['/background']);
          }
          else{
            alert("Errore! Impossibile eseguire l'operazione");
          }
        });
      }
    } else {
      alert("Attenzione. Non tutti i campi obbligatori hanno un valore valido");
    }
  }


  ngOnInit(): void {  
    if(this.id_pratica != undefined && this.id_pratica != null && this.id_pratica !=''){
      this.disabled = 'disabled';
      this.apiService.getStartPratica(this.id_pratica).subscribe((dati) => {
        this.costruisci_form(dati[0]['id_form']);
      });
    }  
    else{
       this.costruisci_form(this.id_form);
    }
  }

  costruisci_form(form_to_build){
    this.apiService.getUserPortalForm(form_to_build).subscribe((dati) => {
      this.campi = dati;
      this.sfondo = this.campi[0].immagine;
      this.bkground_url = "url('assets/img_portal/"+this.sfondo+".jpg')";
      this.nome_tab = this.campi[0].nome_tab;
      if (this.campi[0].tipocampo1 == "Select") {
        this.apiService.getFormSelect(form_to_build, 1).subscribe((select1) => {
          this.select1 = select1;
        });
      }

      if (this.campi[0].tipocampo2 == "Select") {
        this.apiService.getFormSelect(form_to_build, 2).subscribe((select2) => {
          this.select2 = select2;
        });
      }

      if (this.campi[0].tipocampo3 == "Select") {
        this.apiService.getFormSelect(form_to_build, 3).subscribe((select3) => {
          this.select3 = select3;
        });
      }

      if (this.campi[0].tipocampo4 == "Select") {
        this.apiService.getFormSelect(form_to_build, 4).subscribe((select4) => {
          this.select4 = select4;
        });
      }

      if (this.campi[0].tipocampo5 == "Select") {
        this.apiService.getFormSelect(form_to_build, 5).subscribe((select5) => {
          this.select5 = select5;
        });
      }

      if (this.campi[0].tipocampo6 == "Select") {
        this.apiService.getFormSelect(form_to_build, 6).subscribe((select6) => {
          this.select6 = select6;
        });
      }

      if (this.campi[0].tipocampo7 == "Select") {
        this.apiService.getFormSelect(form_to_build, 7).subscribe((select7) => {
          this.select7 = select7;
        });
      }

      if (this.campi[0].tipocampo8 == "Select") {
        this.apiService.getFormSelect(form_to_build, 8).subscribe((select8) => {
          this.select8 = select8;
        });
      }

      if (this.campi[0].tipocampo9 == "Select") {
        this.apiService.getFormSelect(form_to_build, 9).subscribe((select9) => {
          this.select9 = select9;
        });
      }

      if (this.campi[0].tipocampo10 == "Select") {
        this.apiService.getFormSelect(form_to_build, 10).subscribe((select10) => {
          this.select10 = select10;
        });
      }

      this.form = this.formBuilder.group({
        nome_pratica: new FormControl(this.nome_pratica,Validators.required),
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

      this.apiService.getSingleFormUserByPratica(form_to_build, this.nome_tab, this.id_pratica, this.id_operatore).subscribe((dati:any) => {

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

    });
  }
  
}