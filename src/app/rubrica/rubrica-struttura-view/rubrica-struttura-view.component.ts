import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { TableColumn } from 'src/app/template/aleph-table/aleph-table.component';
import { ActivatedRoute } from '@angular/router';
import { faArrowLeft, faLandmark } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-rubrica-struttura-view',
  templateUrl: './rubrica-struttura-view.component.html',
  styleUrls: ['./rubrica-struttura-view.component.css']
})
export class RubricaStrutturaViewComponent  {
	panelOpenState = false;
	operatori: any;
	data: any;
    id_azienda;
    azienda;
    dati;
	customersTableColumns: TableColumn[];
    faArrowLeft = faArrowLeft;
	faLandmark = faLandmark;
    tipo;
    IPA;
	mail_azienda;
	sede_azienda;
	piva_azienda;
	IPA_azienda;
	id;
	
	listActions = { view: true, edit: true, delete: true };

	refresha() {
		this.apiService.getAllProtoRubricaAziendeStrutture(this.id_azienda).subscribe((data: any) => {
			this.data = data;
		})
	};

	constructor(private http: HttpClient, private apiService: ApiService, private route: ActivatedRoute, private router: Router, ) {

    this.route.queryParams.subscribe(
      params => {
        this.id_azienda = params['id_azienda'];
        this.tipo = params['tipo'];
        this.IPA = params['IPA'];
      });

      this.apiService.getSingleProtoRubricaAziende(this.id_azienda).subscribe((dati: any) => {
        this.dati = dati;
        for (let el in dati) {
					this.azienda = dati[el].denominazione;
					this.mail_azienda = dati[el].email;
					this.sede_azienda = dati[el].sede;
					this.piva_azienda = dati[el].piva;
				}
      }, error => console.error(error));
    

		this.customersTableColumns = [
			{ name: 'Nome', dataKey: 'nome', isSortable: true },
			{ name: 'Sede', dataKey: 'sede', isSortable: true },
			{ name: 'email', dataKey: 'email', isSortable: false },
      		{ name: 'Responsabile', dataKey: 'responsabile', isSortable: false },
			{ name: 'Azioni', dataKey: 'azioni', isSortable: false }
		];

    this.apiService.getAllProtoRubricaAziendeStrutture(this.id_azienda).subscribe((data: any) => {
			this.data = data;
		}, error => console.error(error));
	}


	cancella(id, nome) {

		if (confirm("Stai per eliminare " + nome)) {
			
			this.apiService.DeleteProtoRubricaStrutture(id).subscribe((dati) => {
				alert(dati['Esito']);
				this.refresha();
		
			  });

			}
	}

	viewMethod(e) {
		let navigationExtras: NavigationExtras = {
			queryParams: { 'id_rubrica': e.id, 'id_azienda': this.id_azienda, 'tipo': this.tipo, 'IPA': this.IPA }
		};
		this.router.navigate(['/strutturacompleteview'], navigationExtras);
	}

	editMethod(e) {
		let navigationExtras: NavigationExtras = {
			queryParams: { 'id_rubrica': e.id, 'id_azienda': this.id_azienda, 'tipo': this.tipo, 'IPA': this.IPA }
		};
		this.router.navigate(['/rubricastrutturaedit'], navigationExtras);
	}

	orgMethod(e) {
		let navigationExtras: NavigationExtras = {
			queryParams: { 'id_rubrica': e.id, 'id_azienda': this.id_azienda, 'tipo': this.tipo, 'IPA': this.IPA }
		};
		this.router.navigate(['/strutturacompleteview'], navigationExtras);
	}

	deleteMethod(e) {
		this.cancella(e.id, e.nome)
	}
}