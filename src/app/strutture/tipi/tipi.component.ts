import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { TableColumn } from 'src/app/template/aleph-table/aleph-table.component';

@Component({
  selector: 'app-tipi',
  templateUrl: './tipi.component.html',
  styleUrls: ['./tipi.component.css']
})
export class TipiComponent {

  data: any;
  operatori: any;

  customersTableColumns: TableColumn[];

  listActions = { view: false, edit: true, org: false, delete: true };

  refresha() {

    this.apiService.getAllTipoOperatori().subscribe((data: any) => {
      this.data = data;

    })
  };

  constructor(private http: HttpClient, private apiService: ApiService, private router: Router) {

    this.customersTableColumns = [
      { name: 'Tipo', dataKey: 'tipo', isSortable: true },
      { name: 'Accesso', dataKey: 'accesso', isSortable: true },
      { name: 'Attivo', dataKey: 'attivo', isSortable: true },
      { name: 'Azioni', dataKey: 'azioni', isSortable: false }
    ];

    this.apiService.getTipoOperatori().subscribe((data: any) => {

      this.data = data;

    }, error => console.error(error));
  }


  cancella(id, tipo) {
    if (confirm("Stai per eliminare " + tipo)) {

      this.operatori = [];

      this.apiService.getOperatoreTipo(id).subscribe((dati) => {
        for (let el in dati) {
          this.operatori[el] = dati[el].id;
        }

        if (this.operatori.length == 0) {
          this.apiService.DeleteTipo(id).subscribe((dati) => {
            alert(dati['Esito']);
            this.refresha();
          });
        }
        else {
          alert('Non puoi eliminare questa tipologia di operatore; esistono operatori ad essa associati');
          let navigationExtras: NavigationExtras = {
            queryParams: { 'id_tipo': id }
          };
          this.router.navigate(['/operatori'], navigationExtras);
        }


      });
    }
  }

  editMethod(e) {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'id': e.id }
    };
    this.router.navigate(['/tipoedit'], navigationExtras);
  }

  deleteMethod(e) {
    this.cancella(e.id, e.tipo)
  }


}
