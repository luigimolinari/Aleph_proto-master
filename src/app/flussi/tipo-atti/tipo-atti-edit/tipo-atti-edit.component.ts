import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tipo-atti-edit',
  templateUrl: './tipo-atti-edit.component.html',
  styleUrls: ['./tipo-atti-edit.component.css']
})
export class TipoAttiEditComponent implements OnInit {

  //selezione del flusso - autocomplete
  firstFormGroup: FormGroup;
  //selezione della natura
  secondFormGroup: FormGroup;
  //selezione dell'azienda/struttura - autocomplete/select
  thirdFormGroup: FormGroup;

  data;
  id;
  tipoatti;

  flusso = new FormControl();
  flussi: string[] = [];
  filteredFlussi;
  validoFlusso;
  id_flusso;

  natura = new FormControl();

  azienda = new FormControl();
  aziende: string[] = [];
  filteredAziende;
  validoAzienda;
  id_azienda;

  lista_strutture: string[] = [];
  struttura = new FormControl();
  id_struttura;

  aziendaSelected;
  showStrutture;

  dati;

  constructor(private _formBuilder: FormBuilder, private apiService: ApiService, private router: Router, private route: ActivatedRoute) {

    //pesco tutti i flussi
    this.apiService.getAllFlussi().subscribe((data) => {

      this.data = data;

      for (let i: any = 0; i < this.data.length; i++) {
        this.flussi.push(this.data[i].nome_flusso + "*" + this.data[i].id);
      }

    }, error => console.error(error));

    //pesco tutte le aziende
    this.apiService.getAziende().subscribe((data) => {

      this.data = data;

      for (let i: any = 0; i < this.data.length; i++) {
        this.aziende.push(this.data[i].nome + "*" + this.data[i].id);
      }
    }, error => console.error(error));

  }



  ngOnInit() {

    this.secondFormGroup = this._formBuilder.group({
      natura: ['', Validators.required]
    });

    this.validoFlusso = false;
    this.validoAzienda = false;

    this.filteredFlussi = this.flusso.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, 1))
    );

    this.filteredAziende = this.azienda.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, 2))
    );

    this.route.queryParams.subscribe(
      params => {
        this.id = params['id'];
        console.log(this.id);
        this.apiService.getSingleTipoAtti(this.id).subscribe((data) => {
          this.tipoatti = data;

          if (this.tipoatti.length == 1) {

            this.flusso.setValue(this.tipoatti[0].nome_flusso + "*" + this.tipoatti[0].id_flusso);
            this.azienda.setValue(this.tipoatti[0].azienda_nome + "*" + this.tipoatti[0].id_azienda);
            this.secondFormGroup.controls.natura.setValue(this.tipoatti[0].natura)
 
            if (this.tipoatti[0].id_struttura != 'undefined') {
              this.showStrutture = true;
              this.apiService.getStrutturaAzienda(this.tipoatti[0].id_azienda).subscribe((data) => {

                this.data = data;
                if (this.data != null) {
                  this.showStrutture = true;
                  for (let i: any = 0; i < this.data.length; i++) {
                    this.lista_strutture.push(this.data[i].nome + "*" + this.data[i].id);
                  }
                }

              }, error => console.error(error));
              this.struttura.setValue(this.tipoatti[0].struttura_nome + "*" + this.tipoatti[0].id_struttura);
            }


            if (this.tipoatti[0].id_flusso != undefined)
              this.validoFlusso = true;
            if (this.tipoatti[0].id_azienda != undefined)
              this.validoAzienda = true;

          } else {
            alert('Qualcosa è andato storto nel recupero dei dati');
          }
        });
      });

  }

  private _filter(value: string, step: any): string[] {
    const filterValue = this._normalizeValue(value);
    if (step == 1) {
      return this.flussi.filter(flussi => this._normalizeValue(flussi).includes(filterValue));
    } else {
      return this.aziende.filter(aziende => this._normalizeValue(aziende).includes(filterValue));
    }

  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  panelOpenState = false;

  ControlFlusso(valore) {
    if (valore == 1) {
      this.validoFlusso = true;
    } else {
      this.validoFlusso = false;
    }
    console.log(this.validoFlusso);
  }

  ControlAzienda(valore, aziendaSelected) {
    this.aziendaSelected = aziendaSelected;
    if (valore == 1) {
      this.validoAzienda = true;
      this.aziendaSelected = this.aziendaSelected.split("*")[1];
      //pesco tutte le strutture dell'azienda selezionata
      this.apiService.getStrutturaAzienda(this.aziendaSelected).subscribe((data) => {

        this.data = data;
        if (this.data != null) 
        {
          this.showStrutture = true;
          for (let i: any = 0; i < this.data.length; i++) {
            this.lista_strutture.push(this.data[i].nome + "*" + this.data[i].id);
          }
        }
        
      }, error => console.error(error));
    } else {
      this.lista_strutture = [];
      this.validoAzienda = false;
      this.showStrutture = false;
    }
  }


  trasmetti() {

    if (this.secondFormGroup.valid && this.validoFlusso && this.validoAzienda) {

      this.id_flusso = this.flusso.value.split("*")[1];
      this.id_azienda = this.azienda.value.split("*")[1];
      this.id_struttura = this.struttura.value.split("*")[1];

      this.apiService.UpdateTipoAtti(this.id, this.id_flusso, this.secondFormGroup.value.natura, this.id_azienda, this.id_struttura,).subscribe((dati) => {
        this.dati = dati["esito_codice"];
        if (this.dati == 1) {
          if (confirm("Tipo atti correttamente registrato")) {
            this.router.navigate(['/tipoatti']);
          }
        } else {
          alert("Attenzione. Qualcosa è andato storto. Impossibile completare l'inserimento");
        }
      });
    } else {
      alert('Attenzione. Non tutti i campi obbligatori sono stati correttamente inseriti');
    }

  }
}

