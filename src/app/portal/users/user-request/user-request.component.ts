import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { TableColumn } from 'src/app/template/aleph-table/aleph-table.component';
import { id } from 'date-fns/locale';
import { ActivatedRoute } from '@angular/router'; 
import { faEye, faUserEdit,faUserSlash, faEdit, faTrash, faSitemap, faUserPlus, faList, faThumbsUp, faThumbsDown, faCode, faCubes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.component.html',
  styleUrls: ['./user-request.component.css']
})
export class UserRequestComponent {

	operatori: any;

	dati;
	id_form;
	nome_tab;
	data: any;
	id_operatore;
	faTrash= faTrash;
	faEdit=faEdit;

	customersTableColumns: TableColumn[];

	listActions = { view: true, delete: true};

	refresha() {
		this.apiService.getFormUserRequest(this.id_operatore, this.nome_tab).subscribe((data: any) => {
			this.data = data;
		})
	};

	constructor(private http: HttpClient, private apiService: ApiService, private router: Router , private route: ActivatedRoute,) {

		const id_operatore = JSON.parse(localStorage.getItem('ID'));
		this.id_operatore=id_operatore; 


		this.route.queryParams.subscribe(
			params => {
				this.id_form = params['id_form'];
			    this.nome_tab = params['nome_tab'];
			});

		this.customersTableColumns = [
			{ name: 'Nome tabella', dataKey: 'nome_tab', isSortable: true },
			{ name: 'Giorno', dataKey: 'giorno', isSortable: true },
			{ name: 'Utente', dataKey: 'user', isSortable: true },
			{ name: 'Azioni', dataKey: 'azioni', isSortable: false }
		];

		this.apiService.getFormUserRequest(this.id_operatore, this.nome_tab).subscribe((data: any) => {
			this.data = data;
		}, error => console.error(error));
	}






	cancella(id, nome_tab) {

		if (confirm("Stai per eliminare il form. L'operazione non è reversibile. Sei sicuro?")) {



		
					this.apiService.DeleteUserForm(id, nome_tab).subscribe((dati: any) => {
						if (dati['Esito'] === 'si') {
							alert('Operazione eseguita con successo');
							this.refresha();
						} else {
							alert('Qualcosa è andato storto, operazione annullata');
						}
						this.refresha();
					});
				
	

		}
	}

	viewMethod(e) {
		let navigationExtras: NavigationExtras = {
			queryParams: { 'id': e.id, 'nome_tab': e.nome_tab }
		};
		this.router.navigate(['/userrequestview'], navigationExtras);
	}

	

	deleteMethod(e) {
		this.cancella(e.id, e.nome_tab)
	}




	
}