import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgModel } from '@angular/forms';
import { LocalStorageService } from 'src/app/local-storage.service';


@Component({
  selector: 'app-descrizione',
  templateUrl: './descrizione.component.html',
  styleUrls: ['./descrizione.component.css']
})

export class DescrizioneComponent implements OnInit {

  data;
  dati;
  control = new FormControl();
  rup;
  filteredRUP: Observable<string[]>;
  valido;
  flusso;
  form;
  panelOpenState = false;
  nome_procedura;
  accesso;
  azienda;
  ID;
  procedura;
  id_flusso;
  aziende;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private localStorageService: LocalStorageService,) {

    const myID = JSON.parse(localStorage.getItem('ID'));
    this.ID = myID;

    this.route.queryParams.subscribe(
      params => {
        this.flusso = params['flusso'];
        this.rup = params['rup'];

        var splitted = this.flusso.split("*");
        var nome_flusso = splitted[0];
        this.id_flusso = splitted[1];

      });


  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nome_procedura: new FormControl('', Validators.required),
      azienda: new FormControl('', Validators.required),
      accesso: new FormControl('', Validators.required)
    });

    
    this.apiService.getAvailableAziende(this.ID).subscribe((dati) => {
        this.aziende = dati;
    });


  }

  Trasmetti(): void {

    if (this.form.valid) {
      this.apiService.AddProcedura(this.procedura = this.form.value, this.rup = this.rup, this.ID = this.ID, this.id_flusso = this.id_flusso).subscribe((dati) => {
        this.dati = dati['Esito'];
        if (this.dati == "si") {
          if (confirm("Procedura correttamente registrata")) {
            this.router.navigate(['/procedureview']);
          }
        }
        else {
          alert("Attenzione. Impossibile inserire il flusso");
        }
      });
    } else {
      alert("Attenzione. Non tutti i campi obbligatori hanno un valore valido");
    }
  }



}
