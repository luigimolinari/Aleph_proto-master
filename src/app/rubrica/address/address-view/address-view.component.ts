import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { TableColumn } from 'src/app/template/aleph-table/aleph-table.component';
import { Location } from '@angular/common';
@Component({
  selector: 'app-address-view',
  templateUrl: './address-view.component.html',
  styleUrls: ['./address-view.component.css']
})
export class AddressViewComponent {

  data: any;
  data_original: any;
  stato_input: any;
  provincia_input: any;
  comune_input: any;
  nome;
  cognome;

  customersTableColumns: TableColumn[];

  id_rubrica;

  listActions = { view: false, edit: true, delete: true };

  refresha() {

    this.apiService.getAllProtoRubricaAddress(this.id_rubrica).subscribe((data: any) => {
      this.data = data;
      this.data_original = data;
    })
  };


  constructor(private http: HttpClient, private location: Location, private apiService: ApiService, private router: Router, private route: ActivatedRoute) {

    this.customersTableColumns = [
      { name: 'Stato', dataKey: 'stato', isSortable: true },
      { name: 'Provincia', dataKey: 'provincia', isSortable: true },
      { name: 'Comune', dataKey: 'comune', isSortable: false },
      { name: 'Posizione', dataKey: 'posizione', isSortable: false },
      { name: 'Tel 1', dataKey: 'tel1', isSortable: false },
      { name: 'Tel 2', dataKey: 'tel2', isSortable: false },
      { name: 'Tel 3', dataKey: 'tel3', isSortable: false },
      { name: 'Tel 4', dataKey: 'tel4', isSortable: false },
      { name: 'Tel 5', dataKey: 'tel5', isSortable: false },
      { name: 'Azioni', dataKey: 'azioni', isSortable: false }
    ];

    this.route.queryParams.subscribe(
      params => {
        this.id_rubrica = params['id_rubrica'];
        this.apiService.getAllProtoRubricaAddress(this.id_rubrica).subscribe((data: any) => {
          this.data = data;
          this.data_original = data;
          this.nome = data[0].nome;
          this.cognome = data[0].cognome;
        }, error => console.error(error));
      });


  }

  cancella(id, nome) {
    if (confirm("Vuoi eliminare l'indirizzo")) {

      this.apiService.DeleteProtoRubricaAddress(id).subscribe((dati) => {
        alert(dati['Esito']);
        this.refresha();
      });
    }
  }

  editMethod(e) {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'id': e.id, 'id_rubrica': this.id_rubrica }
    };
    this.router.navigate(['/addressedit'], navigationExtras);
  }

  deleteMethod(e) {
    this.cancella(e.id, e.nome_flusso)
  }

  search() {
    this.data = this.data_original;

    /* if (this.tipo_contatto_input != '')
      this.data = this.data.filter(x => x.tipo_contatto.toUpperCase().includes(this.tipo_contatto_input.toUpperCase()));
    if (this.descrizione_input != '')
      this.data = this.data.filter(x => x.descrizione.toUpperCase().includes(this.descrizione_input.toUpperCase())); */
  }

  back(){
this.location.back();
  }

}

