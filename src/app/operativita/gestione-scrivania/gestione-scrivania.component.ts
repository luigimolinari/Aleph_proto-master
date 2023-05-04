import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { TableColumn } from 'src/app/template/aleph-table/aleph-table.component';

@Component({
  selector: 'app-gestione-scrivania',
  templateUrl: './gestione-scrivania.component.html',
  styleUrls: ['./gestione-scrivania.component.css']
})
export class GestioneScrivaniaComponent {

  ID;
	data: any;

	customersTableColumns: TableColumn[];

	listActions = { view: false, edit: false, org: false, delete: false, selection: true};

	
	refresha() {
		this.data = [];	
			this.apiService.getProcedureOperatore(this.ID).subscribe((data: any) => {
				this.data = data;
			}, error => console.error(error));
	}

	constructor(private http: HttpClient, private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
    
		this.customersTableColumns = [
			{ name: 'Nome procedura', dataKey: 'nome_procedura', isSortable: true },
			{ name: 'ID Flusso', dataKey: 'id_flusso', isSortable: true },
			{ name: 'Data', dataKey: 'data_creazione', isSortable: true },
			{ name: 'RUP', dataKey: 'id_rup', isSortable: true },
			{ name: 'Azienda', dataKey: 'azienda', isSortable: false },
      { name: 'Stato', dataKey: 'stato', isSortable: false },
      { name: 'Accesso', dataKey: 'accesso', isSortable: false },
      { name: 'Fascicolo', dataKey: 'fascicolo', isSortable: false },
      { name: 'Azioni', dataKey: 'azioni', isSortable: false }
		];

		const myID = JSON.parse(localStorage.getItem('ID'));
		this.ID = myID;

		this.apiService.getProcedureOperatore(this.ID).subscribe((data: any) => {

			this.data = data;

		}, error => console.error(error));

	}
}
