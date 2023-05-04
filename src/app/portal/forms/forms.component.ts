import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { TableColumn } from 'src/app/template/aleph-table/aleph-table.component';

@Component({
	selector: 'app-forms',
	templateUrl: './forms.component.html',
	styleUrls: ['./forms.component.css']
})
export class FormsComponent {

	forms: any;
	customersTableColumns: TableColumn[];
	listActions = { view: true, delete: true, createform: true, uncreateform: true, gatewayform: true };
	titleActions = { view: 'Vedi form', delete: 'Cancella form', createform: 'Attiva form', uncreateform: 'Disattiva form', gatewayform: 'Gateway' };
	steps_valle = [];

	init(): void {
		this.apiService.getForms().subscribe((data: any) => {
			this.forms = data;
		})
	}


	constructor(private http: HttpClient, private apiService: ApiService, private router: Router) {

		this.customersTableColumns = [
			{ name: 'Nome', dataKey: 'nome', isSortable: true },
			{ name: 'Flusso', dataKey: 'flusso', isSortable: true },
			{ name: 'Pubblicato', dataKey: 'pubblicato', isSortable: true },
			{ name: 'Azioni', dataKey: 'azioni', isSortable: false }
		];

		this.init();

	}


	update(e,attiva): void {
		let operation = attiva == '1' ? 'attivazione' : 'disattivazione';
		if (confirm("Vuoi procedere con la " + operation + " del form?")) {
			this.apiService.UpdateForm(e.id, attiva).subscribe((res: any) => {
				alert(res.esito);
				this.init();
			});
		}
	}

	cancella(id, nome, id_flusso) {

		if (confirm("Stai per eliminare " + nome+". Se fa parte di un workflow, sarà necessario riconfigurare gli step a valle.")) {
			this.steps_valle = [];;
			this.apiService.getAllNextStep(id_flusso, id, 'F').subscribe((res: any) => {
				res.forEach(element => {
				  this.steps_valle.push(element);
				});
				this.apiService.DeleteForm(id, id_flusso, this.steps_valle).subscribe((res: any) => {
					if (res.esito_codice === '1') {
						alert('Operazione eseguita con successo');
						this.init();
					} else {
						alert(res.esito_mex);
					}
					this.init();
				});
			});
		}
	}

	viewMethod(e) {
		let navigationExtras: NavigationExtras = {
			queryParams: { 'id': e.id }
		};
		this.router.navigate(['/formview'], navigationExtras);
	}


	deleteMethod(e) {
		this.cancella(e.id, e.nome, e.id_flusso)
	}

	
	gatewayformMethod(e) {
		this.gatewayform(e.id);
	}

	gatewayform(id) {
		let navigationExtras: NavigationExtras = {
			queryParams: { 'id_form': id }
		};
		this.router.navigate(['/formgateway'], navigationExtras);
	}

}