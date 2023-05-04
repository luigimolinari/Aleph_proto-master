import { Component, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { TableColumn } from 'src/app/template/aleph-table/aleph-table.component';

@Component({
  selector: 'app-tipo-atti',
  templateUrl: './tipo-atti.component.html',
  styleUrls: ['./tipo-atti.component.css']
})
export class TipoAttiComponent {

  
  data: any;
  id_operatore;

  customersTableColumns: TableColumn[];

	listActions = { view: false, edit: true, org: false, delete: true };

  refresha() {

    this.apiService.getTipoAtti(this.id_operatore).subscribe((data: any) => {
      this.data=data;
    })
  };

  constructor(private http: HttpClient, private apiService: ApiService, private router: Router) {
    this.customersTableColumns = [
			{ name: 'Nome Flusso', dataKey: 'nome_flusso', isSortable: true },
			{ name: 'Natura', dataKey: 'natura', isSortable: true },
			{ name: 'Azienda', dataKey: 'nome_azienda', isSortable: true },
      { name: 'Struttura', dataKey: 'nome_struttura', isSortable: true },
			{ name: 'Azioni', dataKey: 'azioni', isSortable: false }
		];

    this.id_operatore = JSON.parse(localStorage.getItem('ID'));
    console.log(this.id_operatore);

    this.apiService.getTipoAtti(this.id_operatore).subscribe((data: any) => {
      this.data=data;
    }, error => console.error(error));
  }

  cancella(id) {

    if (confirm("Stai per eliminare l'atto selezionato; confermi?")) {

      //+++++++++++++++++++++controllo - non deve esistere numerazione

      this.apiService.DeleteTipoAtti(id).subscribe((dati) => {
        alert(dati['Esito']);
        this.refresha();
      });

    }
  }

  editMethod(e) {
		let navigationExtras: NavigationExtras = {
			queryParams: { 'id': e.id, 'tipo': e.tipo }
		};
		this.router.navigate(['/tipoattiedit'], navigationExtras);
	}


	deleteMethod(e) {
		this.cancella(e.id)
	}

}

