import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from 'src/app/api.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-gruppi-operatore',
  templateUrl: './gruppi-operatore.component.html',
  styleUrls: ['./gruppi-operatore.component.css']
})
export class GruppiOperatoreComponent implements OnInit {

  columnsToDisplay: string[] = ['id', 'cognome', 'nome', 'codfisc', 'azienda', 'azione'];
  ID;
  id_azienda;
  tipo_op;
  data;
  dataSource;
  id_gruppo;
  loading = true;
  isDataLoaded = false;
  removable = true;
  selectedOperators = [];
  //removeControl: per la gestione dell'opzione removable sulle chips -> glu utenti di tipo admin e poweruser possono sempre eliminare operatori dal gruppo
  //               viceversa (gli utenti rup) solo nel caso in cui si tratti di operatori appartenti alla loro stessa azienda
  removeControl;
  item;
  listaOperatori = [];
  originalOperatori;
  originalChips = [];

  //il componente lavora sia per i gruppi-procedura sia per i gruppi fascicolo
  mode;
  oggetto;
  getMethod1;
  getMethod2;
  addMethod;
  updateMethod;


  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    const myID = JSON.parse(localStorage.getItem('ID'));
    this.ID = myID;

    const id_azienda = JSON.parse(localStorage.getItem('id_azienda'));
    this.id_azienda = id_azienda;

    const tipo_op = JSON.parse(localStorage.getItem('tipo_op'));
    this.tipo_op = tipo_op;

    this.loading = true;
    this.route.queryParams.subscribe(
      params => {
        this.id_gruppo = params['id_gruppo'];

        this.mode = params['mode'];
        if(this.mode=='p'){
          //gruppi-procedura
          this.oggetto ='procedura';
          this.getMethod1 = 'getAllGruppoProceduraOperatori';
          this.getMethod2 = 'getUserPerGruppo';
          this.addMethod = 'AddGruppoproceduraOperatori';
          this.updateMethod = 'UpdateGruppoproceduraOperatori';
        }
        if(this.mode=='f'){
          //gruppi-fascicolo
          this.oggetto ='facicolo';
          this.getMethod1 = 'getAllGruppoFascicoloOperatori';
          this.getMethod2 = 'getUserPerGruppofascicolo';
          this.addMethod = 'AddGruppofascicoloOperatori';
          this.updateMethod = 'UpdateGruppofascicoloOperatori';
        }


        if (this.id_gruppo != undefined) {
          //recupero gli operatori eventualmente già assegnati al gruppo
          this.apiService[this.getMethod1](this.id_gruppo).subscribe((data) => {

            this.originalOperatori = data;

            //recupero gli operatori disponibili ad essere assegnati al gruppo
              
            this.apiService[this.getMethod2](this.ID, this.id_gruppo).subscribe((data) => {             
            this.data = data;
              this.dataSource = new MatTableDataSource(this.data);
              this.removeControl = new Object();
              if (this.originalOperatori != null) {
                //rimuovo dalla tabella gli operatori già appartenenti al gruppo e li aggiungo alle chips
                for (let i = 0; i < this.originalOperatori.length; i++) {
                  const newchip = this.originalOperatori[i].id + '*' + this.originalOperatori[i].nome + ' ' + this.originalOperatori[i].cognome + '-' + this.originalOperatori[i].ruolo
                  this.selectedOperators.push(newchip);
                  this.removeControl[newchip] = this.originalOperatori[i].id_azienda.toString();
                  this.originalChips.push(newchip);
                  if (this.dataSource.filteredData != null) {
                    if (this.dataSource.filteredData.find(x => x.id === this.originalOperatori[i]['id']) != undefined) {
                      this.dataSource.filteredData.find(x => x.id === this.originalOperatori[i]['id']).ruolo_nel_gruppo = this.originalOperatori[i]['ruolo'];
                      this.dataSource.filteredData.find(x => x.id === this.originalOperatori[i]['id']).selected = true;
                    }
                  }
                }
              }
              this.loading = false;
              this.isDataLoaded = true;
              this.dataSource.paginator = this.paginator;
              this.paginator._intl.itemsPerPageLabel = 'Risultati per pagina';

            });
          });
        }
      });
  }

  selectOperator(e, id, nome, cognome, id_azienda, input_value) {
    const newchip = id + '*' + nome + ' ' + cognome + '-' + input_value;
    this.removeControl[newchip] = id_azienda.toString();
    if (e) {
      this.selectedOperators.push(newchip);
      if (this.dataSource.filteredData.find(x => x.id === id) != undefined) {
        this.dataSource.filteredData.find(x => x.id === id).ruolo_nel_gruppo = input_value;
        this.dataSource.filteredData.find(x => x.id === id).selected = true;
      }
    }else{
      this.remove(newchip);
    }
  }

  remove(operator: string): void {
    const idDeselected: string = operator.split('*')[0];
    const index = this.selectedOperators.indexOf(operator);
    if (index >= 0) {
      this.selectedOperators.splice(index, 1);
    }
    if (this.dataSource.filteredData.find(x => x.id === idDeselected) != undefined) {
      this.dataSource.filteredData.find(x => x.id === idDeselected).ruolo_nel_gruppo = '';
      this.dataSource.filteredData.find(x => x.id === idDeselected).selected = false;
    }
  }

  trasmetti() {

    if (this.originalOperatori == null) {
      //INSERT	
      if (this.selectedOperators.length == 0) {
        alert('Nessun operatore selezionato; salvataggio annullato');
        this.router.navigate(['/gruppi']);
      }
      else {
        for (let i = 0; i < this.selectedOperators.length; i++) {
          this.item = new Object();
          this.item.id_operatore = this.selectedOperators[i].split('*')[0];
          this.item.ruolo = this.selectedOperators[i].split('-')[1];
          this.listaOperatori.push(this.item);
        }
        this.apiService[this.addMethod](this.id_gruppo, this.listaOperatori).subscribe((dati) => {
          alert(dati['Esito']);
          this.router.navigate(['/gruppi']);
        });
      }

    }
    else {
      //UPDATE
      if (JSON.stringify(this.selectedOperators.sort()) == JSON.stringify(this.originalChips.sort())) {
        alert("Nessuna  modifica rispetto alla configurazione precedente");
        this.router.navigate(['/gruppi']);
      }
      else {
        for (let i = 0; i < this.selectedOperators.length; i++) {
          this.item = new Object();
          this.item.id_operatore = this.selectedOperators[i].split('*')[0];
          this.item.ruolo = this.selectedOperators[i].split('-')[1];
          this.listaOperatori.push(this.item);
        }
        if ("Stai modificando il gruppo "+ this.oggetto+ " " + this.id_gruppo) {
          this.apiService[this.updateMethod](this.id_gruppo, this.listaOperatori).subscribe((dati) => {
            alert(dati['Esito']);
            this.router.navigate(['/gruppi']);
          });
        }
      }
    }
  }
}

