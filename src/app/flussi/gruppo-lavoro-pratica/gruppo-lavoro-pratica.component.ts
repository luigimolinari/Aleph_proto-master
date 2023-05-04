import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { TableColumn } from 'src/app/template/aleph-table/aleph-table.component';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatChipInputEvent } from '@angular/material/chips';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-gruppo-lavoro-pratica',
  templateUrl: './gruppo-lavoro-pratica.component.html',
  styleUrls: ['./gruppo-lavoro-pratica.component.css']
})
export class GruppoLavoroPraticaComponent implements OnInit {

  id_user;
  id_gruppo;
  panelOpenState = false;
  azienda = new FormControl();
  aziende: string[] = [];
  filteredAziende;
  validoAzienda = false;

  struttura = new FormControl();
  strutture: string[] = [];
  filteredStrutture;
  validoStruttura = false;
  showStrutture = false;

  operatori: any;
  selectedOperators = [];
  originalChips = [];
  listaOperatori = [];

  customersTableColumns: TableColumn[];

  originalOperatori = null;

  //la lista delle azioni dipende da idAzienda e idTipo (ovvero dal contesto nel quale arrivo all'elenco operatori)
  listActions = { view: false, edit: false, org: false, delete: false };
  columnsToDisplay: string[] = ['nome', 'cognome', 'codfisc', 'profilo', 'azione'];

  id_workflow;
  id_flusso;
  nome_flusso;
  type;

  form: FormGroup;
  /* firma; */
  allGroup = [];
  todo = [];
  done = [];
  done_originale = [];

  listGroup;
  activeNumIndex: any;

  controlAllGroup = false;
  controlOrder = false;
  controlAtLeastOne = false;
  original_atleastone;
  original_order;
  original_firma;

  req_firma = false;

  public = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.operatori.filter = filterValue.trim().toLowerCase();
  }


  refresha_by_azienda(filter_by_azienda) {
    this.apiService.getAllUsers(filter_by_azienda, '').subscribe((data: any) => {
      this.operatori = new MatTableDataSource(data);
      this.operatori.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = 'Risultati per pagina';
      this.refresh_selected_rows();
    });
  }

  refresha_by_struttura(filter_by_struttura) {
    this.apiService.getAllUsersStruttura(filter_by_struttura).subscribe((data: any) => {
      this.operatori = new MatTableDataSource(data);
      this.operatori.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = 'Risultati per pagina';
      this.refresh_selected_rows();
    });
  }

  refresh_selected_rows() {

    for (let i = 0; i < this.selectedOperators.length; i++) {
      let id_selected = this.selectedOperators[i].split('*')[0];
      if (this.operatori.filteredData != null) {
        if (this.operatori.filteredData.find(x => x.id == id_selected) != undefined) {
          this.operatori.filteredData.find(x => x.id == id_selected).privilegi = this.selectedOperators[i].split('-')[1];
          this.operatori.filteredData.find(x => x.id == id_selected).selected = true;
        }
      }
    }
  }


  constructor(private http: HttpClient, private apiService: ApiService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {

    this.id_user = JSON.parse(localStorage.getItem('ID'));
    this.route.queryParams.subscribe(
      params => {

        this.id_workflow = params['id_workflow'];
        this.id_flusso = params['id_flusso'];
        this.nome_flusso = params['nome_flusso'];
        this.type = params['type'];

        //pesco tutte le aziende
        this.apiService.getAziende().subscribe((data: any) => {
          for (let i: any = 0; i < data.length; i++) {
            this.aziende.push(data[i].nome + "*" + data[i].id);
          }
        }, error => console.error(error));

        this.form = this.formBuilder.group({
          firma: new FormControl(''),
          findOp: new FormControl('')
        });

        this.apiService.getAllUsers('', '').subscribe((data: any) => {
          this.operatori = new MatTableDataSource(data);
          this.operatori.paginator = this.paginator;
          this.paginator._intl.itemsPerPageLabel = 'Risultati per pagina';

          //recupero eventuali operatori già asseganti al gruppo di lavoro per lo step selezionato
          this.apiService.getGruppoLavoro(this.id_flusso, this.id_workflow).subscribe((data: any) => {
            this.id_gruppo = data.id_gruppo;
            this.req_firma = data.req_firma == '1';

            this.originalOperatori = data.gruppo;
            if (this.originalOperatori != null) {

              this.form.controls.firma.setValue(data.req_firma);
              this.original_firma = data.req_firma;
              console.log(this.form.controls);

              let original_mode = data.mod;

              this.public = data.pubblico == '1' ? true : false;

              this.original_atleastone = original_mode == 'all' ? false : true;
              this.controlAtLeastOne = this.original_atleastone;

              this.original_order = data.req_ordine == '1';
              this.controlOrder = this.original_order;

              for (let i = 0; i < this.originalOperatori.length; i++) {
                const newchip = this.originalOperatori[i].id_operatore + '*' + this.originalOperatori[i].nome.replaceAll('-', ' ') + ' ' + this.originalOperatori[i].cognome.replaceAll('-', ' ') + '-' + this.originalOperatori[i].privilegi
                this.selectedOperators.push(newchip);
                this.originalChips.push(newchip);
                this.refresh_selected_rows();

                let item: any = new Object();
                item.id_operatore = this.originalOperatori[i].id_operatore;
                item.nome = this.originalOperatori[i].nome;
                item.cognome = this.originalOperatori[i].cognome;
                this.allGroup.push(item);

                if (this.originalOperatori[i].firma == 1) {
                  this.done_originale.push(item);
                  this.done.push(item);
                } else {
                  this.todo.push(item);
                }
              }
            }
          });

        }, error => console.error(error));
      }
    )



  }

  ngOnInit(): void {

    this.filteredAziende = this.azienda.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, 1))
    );

    this.filteredStrutture = this.struttura.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, 2))
    );
  }

  private _filter(value: string, type: any): string[] {
    const filterValue = this._normalizeValue(value);
    if (type == 1) {
      return this.aziende.filter(aziende => this._normalizeValue(aziende).includes(filterValue));
    } else {
      return this.strutture.filter(strutture => this._normalizeValue(strutture).includes(filterValue));
    }
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  ControlAzienda(valore, aziendaSelected) {
    if (valore == 1) {
      this.validoAzienda = true;
      let id_aziendaSelected = aziendaSelected.split("*")[1];
      //pesco tutte le strutture dell'azienda selezionata
      this.apiService.getStrutturaAzienda(id_aziendaSelected).subscribe((data: any) => {

        this.refresha_by_azienda(id_aziendaSelected);

        if (data != null) {

          this.showStrutture = true;
          for (let i: any = 0; i < data.length; i++) {
            this.strutture.push(data[i].nome + "*" + data[i].id);
          }
        }

      }, error => console.error(error));


    } else {
      this.strutture = [];
      this.struttura.setValue('');
      this.validoAzienda = false;
      this.showStrutture = false
    }
  }

  ControlStruttura(valore, strutturaSelected) {
    if (valore == 1) {
      this.validoStruttura = true;
      let id_strutturaSelected = strutturaSelected.split("*")[1];
      this.refresha_by_struttura(id_strutturaSelected);
    } else {
      this.validoStruttura = false;
    }
  }

  selectOperator(e, id, nome, cognome, input_value) {
    const newchip = id + '*' + nome.replaceAll('-', ' ') + ' ' + cognome.replaceAll('-', ' ') + '-' + input_value;
    if (e) {
      this.selectedOperators.push(newchip);
      if (this.operatori.filteredData != null && this.operatori.filteredData != undefined) {
        if (this.operatori.filteredData.find(x => x.id === id) != undefined) {
          this.operatori.filteredData.find(x => x.id === id).privilegi = input_value;
          this.operatori.filteredData.find(x => x.id === id).selected = true;
        }
      }
      let item: any = new Object();
      item.id_operatore = id;
      item.nome = nome;
      item.cognome = cognome;
      this.allGroup.push(item);
      this.todo.push(item);
    } else {
      this.remove(newchip);

    }
  }

  remove(operator: string): void {

    const idDeselected: string = operator.split('*')[0];
    const index = this.selectedOperators.indexOf(operator);

    if (index >= 0) {
      this.selectedOperators.splice(index, 1);
    }

    const index_allGroup = this.allGroup.findIndex(x => x.id_operatore == idDeselected);
    const index_todo = this.todo.findIndex(x => x.id_operatore == idDeselected);
    const index_done = this.done.findIndex(x => x.id_operatore == idDeselected);

    if (index_allGroup >= 0) {
      this.allGroup.splice(index_allGroup, 1);
    }
    if (index_todo >= 0) {
      this.todo.splice(index_todo, 1);
    }
    if (index_done >= 0) {
      this.done.splice(index_done, 1);
    }

    if (this.operatori.filteredData.find(x => x.id === idDeselected) != undefined) {
      this.operatori.filteredData.find(x => x.id === idDeselected).privilegi = '';
      this.operatori.filteredData.find(x => x.id === idDeselected).selected = false;
    }
  }

  trasmetti() {

    /* let pubblico = this.public ? 1 : 0; */

    this.listaOperatori = [];

    for (let i = 0; i < this.selectedOperators.length; i++) {
      let item = new Object();
      item['id_operatore'] = this.selectedOperators[i].split('*')[0];
      item['privilegi'] = this.selectedOperators[i].split('-')[1];

      if (this.form.controls.firma.value == 1) {

        let is_firmatario = this.done.findIndex(x => x.id_operatore == this.selectedOperators[i].split('*')[0]);
        if (is_firmatario >= 0) {
          item['firma'] = 1;
          item['ordine'] = this.controlOrder ? is_firmatario + 1 : 0;
        }

      }

      this.listaOperatori.push(item);
    }

    if (this.originalOperatori == null) {
      //INSERT	

      if (this.public) {
        //lo rendo disponibile a qualsiasi utente
        this.apiService.UpdateFormAccess(this.id_flusso, this.id_workflow, this.public, 0).subscribe((res: any) => {
          alert(res.esito_mex);
          if (res.esito_codice == '1') {
            this.back();
          }
        })
      }
      else if (this.selectedOperators.length == 0) {
        alert('Attenzione! Nessun operatore selezionato');
      }
      else {
        //creo un gruppo di lavoro
        this.apiService.AddGruppoLavoroPratica(this.id_user, this.listaOperatori, this.id_flusso, this.id_workflow, this.form.controls.firma.value, this.controlAtLeastOne, this.controlOrder).subscribe((dati) => {
          alert(dati['Esito']);
          this.back();
        });
      }

    }
    else {
      //UPDATE

      if (this.public) {
        //lo rendo disponibile a qualsiasi utente, invalidando il gruppo di lavoro precedentemente creato
        this.apiService.UpdateFormAccess(this.id_flusso, this.id_workflow, this.public, 1).subscribe((res: any) => {
          alert(res.esito_mex);
          if (res.esito_codice == '1') {
            this.back();
          }
        });
      } else {
        let selected_notchanged = JSON.stringify(this.selectedOperators.sort()) == JSON.stringify(this.originalChips.sort());
        let done_notchanged = JSON.stringify(this.done.sort()) == JSON.stringify(this.done_originale.sort());
        let req_ordine_noctchanged = this.controlOrder == this.original_order;
        let req_atleastone_notchanged = this.controlAtLeastOne == this.original_atleastone;
        let req_firma_notchanged = this.form.controls.firma.value == this.original_firma;

        if (selected_notchanged && done_notchanged && req_ordine_noctchanged && req_atleastone_notchanged && req_firma_notchanged) {
          alert("Nessuna  modifica rispetto alla configurazione precedente");
        }
        else {
          if (confirm('Procedere con la modifica?')) {
            this.apiService.UpdateGruppoLavoroPratica(this.id_user, this.id_gruppo, this.listaOperatori, this.id_flusso, this.id_workflow, this.form.controls.firma.value, this.controlAtLeastOne, this.controlOrder).subscribe((dati) => {
              alert(dati['Esito']);
              this.back();
            });
          }
        }
      }
    }


  }

  trasmetti_() {

    for (let i = 0; i < this.selectedOperators.length; i++) {
      let item = new Object();
      item['id_operatore'] = this.selectedOperators[i].split('*')[0];
      item['privilegi'] = this.selectedOperators[i].split('-')[1];
      this.listaOperatori.push(item);
    }

    if (this.originalOperatori == null) {
      //INSERT	
      if (this.selectedOperators.length == 0) {
        alert('Attenzione! Nessun operatore selezionato');
      }
      else {
        /* this.apiService.AddGruppoLavoroPratica(this.listaOperatori,this.id_flusso,this.id_workflow).subscribe((dati) => {
          alert(dati['Esito']);
          this.back();
        }); */
      }

    }
    else {
      //UPDATE
      if (JSON.stringify(this.selectedOperators.sort()) == JSON.stringify(this.originalChips.sort())) {
        alert("Nessuna  modifica rispetto alla configurazione precedente");
      }
      else {
        if (confirm('Procedere con la modifica?')) {
          /* this.apiService.UpdateGruppoLavoroPratica(this.listaOperatori,this.id_flusso,this.id_workflow).subscribe((dati) => {
            alert(dati['Esito']);
            this.back();
          }); */
        }
      }
    }
  }

  back() {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'flusso': this.id_flusso, 'nome_flusso': this.nome_flusso, 'tipo': 'pratica' }
    };
    this.router.navigate(['/flussoview'], navigationExtras);
  }

  enter(item) {
    this.activeNumIndex = item.id_operatore;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      let idx;
      if (event.container.element.nativeElement.className.indexOf('todo_list') != -1) {
        //from done-list to todo-list
        idx = this.done.findIndex(x => x.id_operatore == this.activeNumIndex);
      } else {
        //from todo-list to done-list
        idx = this.todo.findIndex(x => x.id_operatore == this.activeNumIndex);
      }
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        idx,
        event.currentIndex);
    }
  }

  selectAll(e): void {
    if (e) {
      this.todo = [];
      this.done = [];
      this.done = this.allGroup.slice();
    } else {
      this.todo = [];
      this.done = [];
      this.todo = this.allGroup.slice();
    }
  }

  toOrder(e): void {
    if (e) {
      this.controlOrder = true;
      this.controlAtLeastOne = false;
    }
    else {
      this.controlOrder = false;

    }
  }

  atLeastOne(e): void {
    if (e) {
      this.controlAtLeastOne = true;
      this.controlOrder = false;
    }
    else {
      this.controlAtLeastOne = false;
    }
  }


  filtra_op(input) {
    if (input.value == '') {
      return this.todo;
    }
    else {
      return this.todo.filter(x => (x.nome + ' ' + x.cognome).toUpperCase().includes(input.value.toUpperCase()));
    }
  }



}

