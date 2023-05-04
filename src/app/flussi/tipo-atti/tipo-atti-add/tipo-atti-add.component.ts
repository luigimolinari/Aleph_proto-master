import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tipo-atti-add',
  templateUrl: './tipo-atti-add.component.html',
  styleUrls: ['./tipo-atti-add.component.css']
})
export class TipoAttiAddComponent implements OnInit {

  //selezione del flusso - autocomplete
  firstFormGroup: FormGroup;
  //selezione della natura
  secondFormGroup: FormGroup;
  //selezione dell'azienda-struttura - autocomplete
  thirdFormGroup: FormGroup;

  data;

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
  struttura = new FormControl();;
  id_struttura;

  aziendaSelected;

  showStrutture;


  id_procedura;
  id_tipogruppo;
  nome;
  dati;

  constructor(private _formBuilder: FormBuilder, private apiService: ApiService, private router: Router) {

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

        if (this.data != null) {
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
      if(this.struttura.value != null){
        this.id_struttura = this.struttura.value.split("*")[1];
      }

      this.apiService.AddTipoAtti(this.id_flusso, this.secondFormGroup.value.natura, this.id_azienda, this.id_struttura,).subscribe((dati) => {
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
