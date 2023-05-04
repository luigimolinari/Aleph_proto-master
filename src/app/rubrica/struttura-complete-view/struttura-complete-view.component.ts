import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { LocalStorageService } from 'src/app/local-storage.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-struttura-complete-view',
  templateUrl: './struttura-complete-view.component.html',
  styleUrls: ['./struttura-complete-view.component.css']
})
export class StrutturaCompleteViewComponent implements OnInit {

  aziende = [];
  data;
  sede;
  id_rubrica;
  azienda_nome_selected = '';
  disable_azienda = false;
  form: FormGroup;
  dataipa;
  codiciipa: string[] = [];
  codici_ipa: string[] = [];
  cod_ente;
  ipa;
  id_azienda;
  tipo;
  cod_ipa;
  constructor(private apiService: ApiService, private location: Location, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private localStorageService: LocalStorageService) {

    this.route.queryParams.subscribe(
      params => {
        this.id_rubrica = params['id_rubrica'];
        this.cod_ente = params['IPA'];
        this.tipo = params['tipo'];

        this.form = formBuilder.group({
          denominazione: [''],
          sede: [''],
          pec: [''], 
          email: [''],
          codice_ipa: [''],
          responsabile: [''],
          telefono: [''],
          telefono2: ['']
        });

        this.apiService.getSingleProtoRubricaAziendeStrutture(this.id_rubrica).subscribe((data: any) => {
          this.data = data;
          
          if (this.data != null) {
            for(let t: any=0;t<data.length;t++){
              this.sede=this.data[t].toponimo + " " + this.data[t].sede + " " + this.data[t].civico + " " + this.data[t].CAP + " " + this.data[t].comune + " " + this.data[t].provincia + " " + this.data[t].nazione;
              this.ipa=data[t].cod_AOO;
              this.id_azienda=data[t].id_azienda;
              this.form.controls.denominazione.setValue(this.data[t].nome);
              this.form.controls.sede.setValue(this.sede);
              this.form.controls.responsabile.setValue(this.data[t].responsabile);
              this.form.controls.email.setValue(this.data[t].email);
              this.form.controls.telefono.setValue(this.data[t].telefono);
              this.form.controls.telefono2.setValue(this.data[t].telefono2);
              this.form.controls.pec.setValue(this.data[t].PEC);
              this.form.controls.codice_ipa.setValue(this.data[t].cod_AOO);

          
            }
          }

        });
      });
  }


 

  back() { 
   this.location.back();
  }

  ngOnInit(): void {

  }
}

