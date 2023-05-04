import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { TableColumn } from 'src/app/template/aleph-table/aleph-table.component';
import { Location } from '@angular/common';
@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.css']
})
export class ContactViewComponent {

  data: any;
  data_original: any;
  tipo_contatto_input: any;
  descrizione_input: any;

  customersTableColumns: TableColumn[];

  id_rubrica;
  nome;
  cognome;

  listActions = { view: false, edit: true, delete: true };

  refresha() {

    this.apiService.getAllProtoRubricaContacts(this.id_rubrica).subscribe((data: any) => {
      this.data = data;
      this.data_original = data;
    })
  };


  constructor(private http: HttpClient, private location: Location, private apiService: ApiService, private router: Router, private route: ActivatedRoute) {

    this.customersTableColumns = [
      { name: 'Tipo Contatto', dataKey: 'tipo_contatto', isSortable: true },
      { name: 'Descrizione', dataKey: 'descrizione', isSortable: true },
      { name: 'Azioni', dataKey: 'azioni', isSortable: false }
    ];

    this.route.queryParams.subscribe(
      params => {
        this.id_rubrica = params['id_rubrica'];
        this.apiService.getAllProtoRubricaContacts(this.id_rubrica).subscribe((data: any) => {
          this.data = data;
          this.data_original = data;
          this.nome = data[0].nome;
          this.cognome = data[0].cognome;
        }, error => console.error(error));
      });


  }

  cancella(id) {
    if (confirm("Vuoi eliminare il contatto ")) {

      this.apiService.DeleteProtoRubricaContact(id).subscribe((dati) => {
        alert(dati['Esito']);
        this.refresha();
      });
    }
  }

  editMethod(e) {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'id': e.id,'id_rubrica': this.id_rubrica }
    };
    this.router.navigate(['/contactedit'], navigationExtras);
  }

  deleteMethod(e) {
    this.cancella(e.id)
  }

  search() {
    this.data = this.data_original;

    if (this.tipo_contatto_input != '')
      this.data = this.data.filter(x => x.tipo_contatto.toUpperCase().includes(this.tipo_contatto_input.toUpperCase()));
    if (this.descrizione_input != '')
      this.data = this.data.filter(x => x.descrizione.toUpperCase().includes(this.descrizione_input.toUpperCase()));
  }
back(){
  this.location.back();
}

}

