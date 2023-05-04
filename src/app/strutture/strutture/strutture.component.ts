import { Component, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/local-storage.service';
import { NavigationExtras } from '@angular/router';
import { TableColumn } from 'src/app/template/aleph-table/aleph-table.component';

@Component({
  selector: 'app-strutture',
  templateUrl: './strutture.component.html',
  styleUrls: ['./strutture.component.css']
})
export class StruttureComponent {

  data: any;
  ID;
  CF;

  customersTableColumns: TableColumn[];

  listActions = { view: true, edit: true, org: false, delete: true };

  refresha() {

    const myID = JSON.parse(localStorage.getItem('ID'));
    this.ID = myID;
    const myCF = JSON.parse(localStorage.getItem('CF'));
    this.CF = myCF;

    this.apiService.getAllStrutture(this.ID, this.CF).subscribe((data: any) => {
      this.data = data;

    })
  };


  constructor(private http: HttpClient, private apiService: ApiService, private localStorageService: LocalStorageService, private router: Router) {
    //get request

    this.customersTableColumns = [
			{ name: 'Nome', dataKey: 'nome', isSortable: true },
      { name: 'Azienda', dataKey: 'azienda', isSortable: true },
			{ name: 'Sede', dataKey: 'sede', isSortable: true },
			{ name: 'Responsabile', dataKey: 'id_responsabile', isSortable: true },
			{ name: 'Azioni', dataKey: 'azioni', isSortable: false }
		];

    const myID = JSON.parse(localStorage.getItem('ID'));
    this.ID = myID;
    const myCF = JSON.parse(localStorage.getItem('CF'));
    this.CF = myCF;

    this.apiService.getAllStrutture(this.ID, this.CF).subscribe((data: any) => {
      this.data = data;
    }, error => console.error(error));
  }


  cancella(id, nome) {
    if (confirm("Stai per eliminare " + nome)) {
      this.apiService.DeleteStruttura(id).subscribe((dati) => {
        alert(dati['Esito']);
        this.refresha();

      });
    }
  }

  viewMethod(e) {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'id': e.id }
    };
    this.router.navigate(['/strutturaview'], navigationExtras);
  }

  editMethod(e) {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'id': e.id, 'aoo': e.codice_AOO }
    };
    this.router.navigate(['/strutturaedit'], navigationExtras);
  }

  deleteMethod(e) {
    this.cancella(e.id, e.nome)
  }

}

