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
  selector: 'app-gruppi-fascicoli',
  templateUrl: './gruppi-fascicoli.component.html',
  styleUrls: ['./gruppi-fascicoli.component.css']
})
export class GruppiFascicoliComponent implements OnInit {

  columnsToDisplay: string[] = ['id', 'nome', 'id_fascicolo_padre', 'azienda', 'pubblicato','accesso', 'azione'];
  ID;
  id_azienda;
  tipo_op;
  data;
  dataSource;
  id_gruppo;
  loading = true;
  isDataLoaded = false;
  removable = true;
  selectedFascicoli = [];
  //removeControl: per la gestione dell'opzione removable sulle chips -> glu utenti di tipo admin e poweruser possono sempre eliminare fascicoli dal gruppo
  //               viceversa (gli utenti rup) solo nel caso in cui si tratti di fascicoli di loro proprietà
  removeControl;
  item;
  listaFascicoli = [];
  originalFascicoli;
  originalChips = [];

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
       
        if (this.id_gruppo != undefined) {
          //recupero i fascicoli eventualmente già assegnati al gruppo
          this.apiService.getFascioliPerGruppo(this.id_gruppo).subscribe((data) => {

            this.originalFascicoli = data;

            console.log(this.originalFascicoli);

            this.apiService.getFascicoliPrivati(this.ID).subscribe((data) => {             
            this.data = data;
              this.dataSource = new MatTableDataSource(this.data);
              this.removeControl = new Object();
              if (this.originalFascicoli != null) {
                //rimuovo dalla tabella gli operatori già appartenenti al gruppo e li aggiungo alle chips
                for (let i = 0; i < this.originalFascicoli.length; i++) {
                  const newchip = this.originalFascicoli[i].id + '*' + this.originalFascicoli[i].nome;
                  this.selectedFascicoli.push(newchip);
                  this.removeControl[newchip] = this.originalFascicoli[i].id_operatore.toString();
                  this.originalChips.push(newchip);
                  if (this.dataSource.filteredData != null) {
                    if (this.dataSource.filteredData.find(x => x.id === this.originalFascicoli[i]['id']) != undefined) {
                       this.dataSource.filteredData.find(x => x.id === this.originalFascicoli[i]['id']).selected = true;
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

  selectFascicolo(e, id, nome, id_operatore) {
    const newchip = id + '*' + nome;
    this.removeControl[newchip] = id_operatore.toString();
    if (e) {
      this.selectedFascicoli.push(newchip);
      if (this.dataSource.filteredData.find(x => x.id === id) != undefined) {
        this.dataSource.filteredData.find(x => x.id === id).selected = true;
      }
    }else{
      this.remove(newchip);
    }
  }

  remove(fascicolo: string): void {
    const idDeselected: string = fascicolo.split('*')[0];
    const index = this.selectedFascicoli.indexOf(fascicolo);
    if (index >= 0) {
      this.selectedFascicoli.splice(index, 1);
    }
    if (this.dataSource.filteredData.find(x => x.id === idDeselected) != undefined) {
      this.dataSource.filteredData.find(x => x.id === idDeselected).selected = false;
    }
  }

  trasmetti() {

    if (this.originalFascicoli == null) {
      //INSERT	
      if (this.selectedFascicoli.length == 0) {
        alert('Nessun fascicolo selezionato; salvataggio annullato');
        this.router.navigate(['/gruppi']);
      }
      else {
        for (let i = 0; i < this.selectedFascicoli.length; i++) {
          this.item = new Object();
          this.item.id_fascicolo = this.selectedFascicoli[i].split('*')[0];
          this.listaFascicoli.push(this.item);
        }
        this.apiService.AddGruppiFascicoli(this.id_gruppo, this.listaFascicoli).subscribe((dati) => {
          alert(dati['Esito']);
          this.router.navigate(['/gruppi']);
        });
      }

    }
    else {
      //UPDATE
      if (JSON.stringify(this.selectedFascicoli.sort()) == JSON.stringify(this.originalChips.sort())) {
        alert("Nessuna  modifica rispetto alla configurazione precedente");
        this.router.navigate(['/gruppi']);
      }
      else {
        for (let i = 0; i < this.selectedFascicoli.length; i++) {
          this.item = new Object();
          this.item.id_fascicolo = this.selectedFascicoli[i].split('*')[0];
         
          this.listaFascicoli.push(this.item);
        }
        if ("Stai modificando il gruppo " + this.id_gruppo) {
          this.apiService.UpdateGruppiFascicoli(this.id_gruppo, this.listaFascicoli).subscribe((dati) => {
            alert(dati['Esito']);
            this.router.navigate(['/gruppi']);
          });
        }
      }
    }
  }
}

