import { Component} from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { TableColumn } from 'src/app/template/aleph-table/aleph-table.component';


@Component({
  selector: 'app-tipo-gruppo',
  templateUrl: './tipo-gruppo.component.html',
  styleUrls: ['./tipo-gruppo.component.css']
})
export class TipoGruppoComponent {

  data: any;

	customersTableColumns: TableColumn[];

	listActions = { view: false, edit: true, org: false, delete: true };

  refresha() {

    this.apiService.getAllTipoGruppo().subscribe((data: any) => {
      this.data=data;

    })
  };


  constructor(private http: HttpClient, private apiService: ApiService, private router: Router) {
    this.customersTableColumns = [
			{ name: 'Nome', dataKey: 'nome', isSortable: true },
			{ name: 'Attivo', dataKey: 'attivo', isSortable: true },
      { name: 'Statico', dataKey: 'statico', isSortable: true },
			{ name: 'Funzioni', dataKey: 'funzioni', isSortable: true },
			{ name: 'Azioni', dataKey: 'azioni', isSortable: false }
		];


    this.apiService.getAllTipoGruppo().subscribe((data: any) => {
      this.data=data;
    }, error => console.error(error));
  }


  cancella(id, tipo) {
    if (confirm("Stai per eliminare " + tipo)) {
      this.apiService.DeleteTipoGruppo
        (id).subscribe((dati) => {
          if (dati['Esito'] === 'si') {
            alert('Operazione eseguita con successo');
          } else {
            alert('Qualcosa è andato storto, operazione annullata');
          }
          this.refresha();

        });
    }
  }

  editMethod(e) {
		let navigationExtras: NavigationExtras = {
			queryParams: { 'id': e.id, 'tipo': e.tipo }
		};
		this.router.navigate(['/tipogruppoedit'], navigationExtras);
	}


	deleteMethod(e) {
		this.cancella(e.id, e.tipo)
	}

}
