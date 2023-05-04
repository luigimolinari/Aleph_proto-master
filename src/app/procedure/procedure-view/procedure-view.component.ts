/**
 * in questo caso il template è troppo complesso per essere gestito con aleph-table
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { HttpClient } from '@angular/common/http';
import { faAngleDoubleRight, faEye } from '@fortawesome/free-solid-svg-icons';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { faUserSlash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faTrashRestore } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { faBackspace } from '@fortawesome/free-solid-svg-icons';
import { NavigationExtras } from '@angular/router';
import { LocalStorageService } from 'src/app/local-storage.service';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { FormGroup, FormBuilder, Validators, NgModel } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';


@Component({
  selector: 'app-procedure-view',
  templateUrl: './procedure-view.component.html',
  styleUrls: ['./procedure-view.component.css']
})
export class ProcedureViewComponent implements OnInit {

  router: Router;
  faEye = faEye;
  faUserEdit = faUserEdit;
  faUserSlash = faUserSlash;
  faList = faList;
  faSave = faSave;
  data: any;
  dtOptions: any = {};
  dati: any;
  faEdit = faEdit;
  faTrash = faTrash;
  faTrashRestore = faTrashRestore;
  faBackspace = faBackspace;
  workflow;
  id_operatore;
  ID;
  cambiaccesso = 0;
  cambianome = 0;
  cambiarup = 0;
  cambiazienda = 0;
  form;
  form_accesso;
  form_azienda;
  rupform;
  procedura;
  accesso;
  azienda;
  aziende;
  mioid;
  rup: string[] = [];
  filteredRUP: Observable<string[]>;
  nome_rup = new FormControl();
  datarup;
  rupedit;
  valido;
  dataSource;
  columnsToDisplay: string[] = ['nome_procedura', 'id_flusso', 'data_creazione', 'id_rup', 'operatore', 'azienda', 'accesso','stato', 'fascicolo','azioni'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  options: string[] = [];
  filteredOptions: Observable<string[]>;
  
  pageEvent: PageEvent;
  
  refresha() {

    this.apiService.getAllProcedure(this.ID).subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.paginator._intl.itemsPerPageLabel = 'Risultati per pagina';
      $('.mat-paginator-range-label').text($('.mat-paginator-range-label').text().replace('of', 'di'));

    })
  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private apiService: ApiService, private localStorageService: LocalStorageService) {
    //get request



    const myID = JSON.parse(localStorage.getItem('ID'));
    this.ID = myID;

    this.apiService.getAllProcedure(this.ID).subscribe((data: any) => {

      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.paginator._intl.itemsPerPageLabel = 'Risultati per pagina';
	  

    }, error => console.error(error));

    this.apiService.getAllRUP(this.ID).subscribe((datarup) => {

      this.datarup = datarup;

      for (let i: any = 0; i < this.datarup.length; i++) {
        this.options.push(this.datarup[i].CF);
      }
    }, error => console.error(error));

  }

  cancella(id, nome) {
    if (confirm("Stai per eliminare " + nome)) {
      this.apiService.DeleteProcedura(id).subscribe((dati) => {
        this.dati = dati['Esito'];
        this.refresha();

      });
    }
  }

  restore(id, nome) {
    if (confirm("Stai per ripristinare " + nome)) {
      this.apiService.RestoreProcedura(id).subscribe((dati) => {
        this.dati = dati['Esito'];
        this.refresha();

      });
    }
  }


  editanome(id) {
    this.cambianome = id;
    this.cambiarup = 0;
    this.cambiaccesso = 0;
    this.cambiazienda = 0;
  }

  editarup(id) {
    this.cambiarup = id;
    this.cambianome = 0;
    this.cambiaccesso = 0;
    this.cambiazienda = 0;
  }

  editaccesso(id) {
    this.cambiaccesso = id;
    this.cambianome = 0;
    this.cambiarup = 0;
    this.cambiazienda = 0;
  }

  editazienda(id) {
    this.cambiazienda = id;
    this.cambiaccesso = 0;
    this.cambianome = 0;
    this.cambiarup = 0;
    
  }

  modificanome(id) {
    this.mioid = id;
    this.apiService.UpdateProcedura(this.procedura = this.form.value, this.mioid = this.mioid).subscribe((dati) => {
      this.dati = dati['Esito'];
      if (this.dati == "si") {
        if (confirm("Modifica correttamente eseguita")) {
          this.cambianome = 0;
          this.cambiarup = 0;
          this.cambiaccesso = 0;
          this.cambiazienda = 0;
          this.refresha();
        }
      }
      else {
        alert("Attenzione. Impossibile eseguire le modifiche");
      }
    });
  }

  modificarup(id, nomerup) {
    this.mioid = id;
    this.apiService.UpdateRUP(this.rupedit = nomerup, this.mioid = this.mioid).subscribe((dati) => {
      this.dati = dati['Esito'];
      if (this.dati == "si") {
        if (confirm("Modifica correttamente eseguita")) {
          this.cambianome = 0;
          this.cambiarup = 0;
          this.cambiaccesso = 0;
          this.cambiazienda = 0;
          this.refresha();
        }
      }
      else {
        alert("Attenzione. Impossibile eseguire le modifiche");
      }
    });
  }

  modificaccesso(id) {
    this.mioid = id;
    this.apiService.UpdateProceduraAccesso(this.accesso = this.form_accesso.value, this.mioid = this.mioid).subscribe((dati) => {
     
      if (dati['esito_codice'] == 1) {
        if (confirm("Modifica correttamente eseguita")) {
          this.cambianome = 0;
          this.cambiarup = 0;
          this.cambiaccesso = 0;
          this.refresha();
        }
      }
      else {
        alert(dati['Esito']);
          this.cambianome = 0;
          this.cambiarup = 0;
          this.cambiaccesso = 0;
          this.refresha();
      }
    });
  }

  modificazienda(id) {
    this.mioid = id;
    this.apiService.UpdateProceduraAzienda(this.azienda = this.form_azienda.value, this.mioid = this.mioid).subscribe((dati) => {
     
      if (dati['esito_codice'] == 1) {
        if (confirm("Modifica correttamente eseguita")) {
          this.cambianome = 0;
          this.cambiarup = 0;
          this.cambiaccesso = 0;
          this.cambiazienda = 0;
          this.refresha();
        }
      }
      else {
        alert(dati['Esito']);
          this.cambianome = 0;
          this.cambiarup = 0;
          this.cambiaccesso = 0;
          this.cambiazienda = 0;
          this.refresha();
      }
    });
  }

  annulla() {
    this.cambianome = 0;
    this.cambiarup = 0;
    this.cambiaccesso = 0;
    this.cambiazienda = 0;
    this.refresha();

  }

  ngOnInit() {

    this.apiService.getAvailableAziende(this.ID).subscribe((dati) => {
      this.aziende = dati;
    });

    this.form = this.formBuilder.group({
      nome_procedura: new FormControl(''),
    });

    this.form_accesso = this.formBuilder.group({
      accesso: new FormControl(''),
    });

    this.form_azienda = this.formBuilder.group({
      azienda: new FormControl(''),
    });

    this.filteredOptions = this.nome_rup.valueChanges.pipe(
      startWith(''), map(value => this._filter(value)));

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  SetControl(valore) {
    this.valido = valore;
    if (this.valido == 1) {
      this.valido = '';
    } else {
      this.valido = 'disabled';
    }
  }

}