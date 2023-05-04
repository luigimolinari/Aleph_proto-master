import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { TableColumn } from 'src/app/template/aleph-table/aleph-table.component';


@Component({
	selector: 'app-aziende',
	templateUrl: './aziende.component.html',
	styleUrls: ['./aziende.component.css']
})
export class AziendeComponent {

	operatori: any;

	data: any;

	customersTableColumns: TableColumn[];

	listActions = { view: true, edit: true, org: true, delete: true };

	refresha() {
		this.apiService.getAziende().subscribe((data: any) => {
			this.data = data;
		})
	};

	constructor(private http: HttpClient, private apiService: ApiService, private router: Router) {

		this.customersTableColumns = [
			{ name: 'Nome', dataKey: 'nome', isSortable: true },
			{ name: 'Sede', dataKey: 'sede', isSortable: true },
			{ name: 'PIVA', dataKey: 'piva', isSortable: false },
			{ name: 'Azioni', dataKey: 'azioni', isSortable: false }
		];

		this.apiService.getAziende().subscribe((data: any) => {
			this.data = data;
		}, error => console.error(error));
	}


	cancella(id, nome) {

		if (confirm("Stai per eliminare " + nome)) {

			this.operatori = [];

			this.apiService.getOperatoreAzienda(id).subscribe((dati) => {
				for (let el in dati) {
					this.operatori[el] = dati[el].id;
				}

				if (this.operatori.length == 0) {
					this.apiService.DeleteAzienda(id).subscribe((dati: any) => {
						if (dati['Esito'] === 'si') {
							alert('Operazione eseguita con successo');
							this.refresha();
						} else {
							alert('Qualcosa è andato storto, operazione annullata');
						}
						this.refresha();
					});
				}
				else {
					alert('Non puoi eliminare questa azienda; esistono operatori ad essa associati');
					let navigationExtras: NavigationExtras = {
						queryParams: { 'id_azienda': id }
					};
					this.router.navigate(['/operatori'], navigationExtras);
				}

			});

		}
	}

	viewMethod(e) {
		let navigationExtras: NavigationExtras = {
			queryParams: { 'id': e.id }
		};
		this.router.navigate(['/aziendaview'], navigationExtras);
	}

	editMethod(e) {
		let navigationExtras: NavigationExtras = {
			queryParams: { 'id': e.id }
		};
		this.router.navigate(['/aziendaedit'], navigationExtras);
	}

	orgMethod(e) {
		let navigationExtras: NavigationExtras = {
			queryParams: { 'id': e.id, 'nome': e.nome }
		};
		this.router.navigate(['/organigramma'], navigationExtras);
	}

	deleteMethod(e) {
		this.cancella(e.id, e.nome)
	}
}