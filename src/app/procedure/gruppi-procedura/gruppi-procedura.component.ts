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
  selector: 'app-gruppi-procedura',
  templateUrl: './gruppi-procedura.component.html',
  styleUrls: ['./gruppi-procedura.component.css']
})
export class GruppiProceduraComponent implements OnInit {

  columnsToDisplay: string[] = ['id', 'nome', 'data', 'rup', 'azienda', 'accesso', 'azione'];
  ID;
  id_azienda;
  tipo_op;
  data;
  dataSource;
  id_gruppo;
  loading = true;
  isDataLoaded = false;

  selectedProcedure = [];
  //removable: per la gestione dell'opzione removable sulle chips -> per nessun operatore è possbile eliminare procedure se queste sono avviate
  //removeControl: per la gestione dell'opzione removable sulle chips -> gli utenti di tipo admin e poweruser possono sempre eliminare procedure dal gruppo
  //               viceversa (gli utenti rup) solo nel caso in cui si tratti di procedure di loro proprietà o per le quali sono RUP
  removable = [];
  removeControl1;
  removeControl2;
  item;
  listaProcedure = [];
  originalProcedure;
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
          this.apiService.getProcedurePerGruppo(this.id_gruppo).subscribe((data) => {

            this.originalProcedure = data;

            console.log(this.originalProcedure);

            this.apiService.getProcedurePrivate(this.ID,this.id_gruppo).subscribe((data) => {             
            this.data = data;
              this.dataSource = new MatTableDataSource(this.data);
              this.removeControl1 = new Object();
              this.removeControl2 = new Object();
              if (this.originalProcedure != null) {
                //le procedure già assegnate al gruppo le seleziono e le aggiungo alle chips
                for (let i = 0; i < this.originalProcedure.length; i++) {
                  const newchip = this.originalProcedure[i].id + '*' + this.originalProcedure[i].nome_procedura;
                  this.selectedProcedure.push(newchip);
                  this.removable[newchip] = this.originalProcedure[i].removable;
                  this.removeControl1[newchip] = this.originalProcedure[i].id_operatore.toString();
                  this.removeControl2[newchip] = this.originalProcedure[i].id_rup.toString();
                  this.originalChips.push(newchip);
                  if (this.dataSource.filteredData != null) {
                    if (this.dataSource.filteredData.find(x => x.id === this.originalProcedure[i]['id']) != undefined) {
                       this.dataSource.filteredData.find(x => x.id === this.originalProcedure[i]['id']).selected = true;
                    }
                  }
                }
              }
              this.loading = false;
              this.isDataLoaded = true;
              this.dataSource.paginator = this.paginator;
              this.paginator._intl.itemsPerPageLabel = 'Risultati per pagina';
              console.log(this.removable);
              console.log(this.dataSource);
            });
          });
        }
      });
  }

  selectProcedura(e, id, nome, id_operatore,id_rup) {
    const newchip = id + '*' + nome;
    this.removeControl1[newchip] = id_operatore.toString();
    this.removeControl2[newchip] = id_rup.toString();
    if (e) {
      this.selectedProcedure.push(newchip);
      if (this.dataSource.filteredData.find(x => x.id === id) != undefined) {
        this.dataSource.filteredData.find(x => x.id === id).selected = true;
      }
    }else{
      this.remove(newchip);
    }
  }

  remove(procedura: string): void {
    const idDeselected: string = procedura.split('*')[0];
    const index = this.selectedProcedure.indexOf(procedura);
    if (index >= 0) {
      this.selectedProcedure.splice(index, 1);
    }
    if (this.dataSource.filteredData.find(x => x.id === idDeselected) != undefined) {
      this.dataSource.filteredData.find(x => x.id === idDeselected).selected = false;
    }
  }

  trasmetti() {

    if (this.originalProcedure == null) {
      //INSERT	
      if (this.selectedProcedure.length == 0) {
        alert('Nessuna procedura selezionata; salvataggio annullato');
        this.router.navigate(['/gruppi']);
      }
      else {
        for (let i = 0; i < this.selectedProcedure.length; i++) {
          this.item = new Object();
          this.item.id_procedura = this.selectedProcedure[i].split('*')[0];
          this.listaProcedure.push(this.item);
        }
        this.apiService.AddGruppiProcedure(this.id_gruppo, this.listaProcedure).subscribe((dati) => {
          alert(dati['Esito']);
          this.router.navigate(['/gruppi']);
        });
      }

    }
    else {
      //UPDATE
      if (JSON.stringify(this.selectedProcedure.sort()) == JSON.stringify(this.originalChips.sort())) {
        alert("Nessuna modifica rispetto alla configurazione precedente");
        this.router.navigate(['/gruppi']);
      }
      else {
        for (let i = 0; i < this.selectedProcedure.length; i++) {
          this.item = new Object();
          this.item.id_procedura = this.selectedProcedure[i].split('*')[0];
         
          this.listaProcedure.push(this.item);
        }
        if ("Stai modificando il gruppo procedeura " + this.id_gruppo) {
          this.apiService.UpdateGruppiProcedure(this.id_gruppo, this.listaProcedure).subscribe((dati) => {
            alert(dati['Esito']);
            this.router.navigate(['/gruppi']);
          });
        }
      }
    }
  }
}

