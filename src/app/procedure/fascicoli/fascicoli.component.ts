import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { TableColumn } from 'src/app/template/aleph-table/aleph-table.component';

@Component({
  selector: 'app-fascicoli',
  templateUrl: './fascicoli.component.html',
  styleUrls: ['./fascicoli.component.css']
})

export class FascicoliComponent {

  id_azienda: any;
  id_operatore:any;

  data: any;

  customersTableColumns: TableColumn[];

  listActions = { view: true, edit: true, delete: true };

  refresha() {
    this.apiService.getAllFascicoli(this.id_operatore,'','').subscribe((data: any) => {
      this.data = data;
    })
  };

  constructor(private http: HttpClient, private apiService: ApiService, private router: Router) {

    this.id_azienda= JSON.parse(localStorage.getItem('id_azienda'));
    this.id_operatore= JSON.parse(localStorage.getItem('ID'));
    
    this.customersTableColumns = [
      { name: 'ID', dataKey: 'id', isSortable: true },
      { name: 'Nome', dataKey: 'nome', isSortable: true },
      { name: 'Pubblicato', dataKey: 'pubblicato', isSortable: true },
      { name: 'Accesso', dataKey: 'accesso', isSortable: false },
      { name: 'Contenuto in', dataKey: 'padre', isSortable: false },
      { name: 'Azienda', dataKey: 'nome_azienda', isSortable: false },
      { name: 'Azioni', dataKey: 'azioni', isSortable: false }
    ];

    this.apiService.getAllFascicoli(this.id_operatore,'','').subscribe((data: any) => {
      this.data = data;
    }, error => console.error(error));
  }


  cancella(id, nome) {

    if (confirm("Stai per disattivare il fascicolo: '" + nome + "'; tutto il contenuto del fascicolo sarà disattivato. Procedere?")) {

      this.apiService.DeleteFascicolo(id).subscribe((dati: any) => {
        if (dati['esito_codice'] == 1) {
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
      queryParams: { 'id': e.id }
    };
    this.router.navigate(['/fascicoliview'], navigationExtras);
  }

  editMethod(e) {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'id': e.id }
    };
    this.router.navigate(['/fascicoliedit'], navigationExtras);
  }

  deleteMethod(e) {
    this.cancella(e.id, e.nome)
  }
}
