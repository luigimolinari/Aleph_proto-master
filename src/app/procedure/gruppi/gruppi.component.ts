import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { TableColumn } from 'src/app/template/aleph-table/aleph-table.component';

@Component({
	selector: 'app-gruppi',
	templateUrl: './gruppi.component.html',
	styleUrls: ['./gruppi.component.css']
})
export class GruppiComponent {

	ID;
	data: any;
	//il componente lavora sia sui gruppi-procedura (type = 'p') sia sui gruppi fascicolo (type = 'f')
	type = 'p';

	customersTableColumns: TableColumn[];

	listActions = { view: false, edit: true, org: false, delete: true, groupsOp: true, groupsProc: true, groupsFasc: false };

	changeType(type) {
		this.type = type;
		this.refresha();
	}

	refresha() {
		this.data = [];
		if (this.type == 'p') {
			this.apiService.getAllGruppi(this.ID).subscribe((data: any) => {
				this.listActions.groupsProc = true;
				this.listActions.groupsFasc = false;
				this.data = data;
			}, error => console.error(error));
		} else {
			this.apiService.getAllGruppiFascicolo(this.ID).subscribe((data: any) => {
				this.listActions.groupsProc = false;
				this.listActions.groupsFasc = true;
				this.data = data;
			}, error => console.error(error));
		}
	}

	constructor(private http: HttpClient, private apiService: ApiService, private route: ActivatedRoute, private router: Router) {

		this.customersTableColumns = [
			{ name: 'ID Gruppo', dataKey: 'id', isSortable: true },
			{ name: 'Nome Gruppo', dataKey: 'nome_gruppo', isSortable: true },
			{ name: 'Statico', dataKey: 'statico', isSortable: true },
			{ name: 'Tipo Gruppo', dataKey: 'tipo_nome', isSortable: true },
			{ name: 'Azioni', dataKey: 'azioni', isSortable: false }
		];

		const myID = JSON.parse(localStorage.getItem('ID'));
		this.ID = myID;

		this.apiService.getAllGruppi(this.ID).subscribe((data: any) => {

			this.data = data;

		}, error => console.error(error));

	}

	editMethod(e) {
		let navigationExtras: NavigationExtras = {
			queryParams: { 'id': e.id, 'mode': this.type }
		};
		this.router.navigate(['/gruppiedit'], navigationExtras);
	}

	groupsOpMethod(e) {

		let navigationExtras: NavigationExtras = {
			queryParams: { 'id_gruppo': e.id, 'mode': this.type }
		};
		this.router.navigate(['/gruppioperatore'], navigationExtras);

	}

	groupsProcMethod(e) {
		let navigationExtras: NavigationExtras = {
			queryParams: { 'id_gruppo': e.id }
		};
		this.router.navigate(['/gruppiprocedura'], navigationExtras);
	}

	groupsFascMethod(e) {
		let navigationExtras: NavigationExtras = {
			queryParams: { 'id_gruppo': e.id }
		};
		this.router.navigate(['/gruppifascicoli'], navigationExtras);
	}

	deleteMethod(e) {
		//è sempre possibile eliminare un gruppo-fascicolo; 
		//il gruppo-procedura può essere elimnato solo se non è associato ad alcuna procedura avviata
		//controlli lato php

		if (confirm("Stai per eliminare " + e.nome_gruppo)) {
			if (this.type == 'p') {
				this.apiService.DeleteGruppo(e.id).subscribe((dati) => {
					alert(dati['Esito']);
					this.refresha();
				});
			} else {
				this.apiService.DeleteGruppoFascicolo(e.id).subscribe((dati) => {
					alert(dati['Esito']);
					this.refresha();
				});
			}
		}
	}
}
