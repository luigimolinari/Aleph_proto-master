import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { TableColumn } from 'src/app/template/aleph-table/aleph-table.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rubrica-view',
  templateUrl: './rubrica-view.component.html',
  styleUrls: ['./rubrica-view.component.css']
})
export class RubricaViewComponent {

  data: any = [];
  data_original: any;
  data_aziende: any;
  data_aziende_original: any;
  tipi: any;
  tipo_selected: any = '';
  nome_input: any = '';
  cognome_input: any = '';
  cf_input: any = '';
  azienda_input: any = '';
  denominazione_input: any = '';
  piva_input: any = '';
  sede_input: any = '';
  customersTableColumns: TableColumn[];
  customersTableColumnsAziende: TableColumn[];
  showAziende = false;
  mostraaziende;
  indietro;

  listActions = { view: true, edit: true, delete: true };
  listActionsAziende = { view: true, edit: true, delete: true, strutture: true, persone: true };

  refresha() {
    this.apiService.getAllProtoRubrica().subscribe((data: any) => {
      this.data = data;
      this.data_original = data;
    })
  };

  refresha_aziende(){
     this.apiService.getAllProtoRubricaAziende(this.tipo_selected).subscribe((data: any) => {
      this.data_aziende = data;
      this.data_aziende_original = data;
    }, error => console.error(error));
  }


  constructor(private http: HttpClient, private route: ActivatedRoute,  private apiService: ApiService, private router: Router) {

    this.route.queryParams.subscribe(
      params => {
        this.indietro = params['back'];
        this.mostraaziende = params['showaziende'];
        if(this.mostraaziende=="si"){
          this.showAziende=true;
        }
      });


    this.customersTableColumns = [
      { name: 'Tipo', dataKey: 'tipo_nome', isSortable: true },
      { name: 'Azienda', dataKey: 'denominazione', isSortable: true },
      { name: 'Nome', dataKey: 'nome', isSortable: true },
      { name: 'Cognome', dataKey: 'cognome', isSortable: true },
      { name: 'CF', dataKey: 'CF', isSortable: true },
      { name: 'Persona Fisica', dataKey: 'persona_fisica', isSortable: true },
      { name: 'Azioni', dataKey: 'azioni', isSortable: false }
    ];
  

    this.customersTableColumnsAziende = [
      { name: 'Denominazione', dataKey: 'denominazione', isSortable: true },
      { name: 'PIVA', dataKey: 'piva', isSortable: true },
      { name: 'Sede', dataKey: 'sede', isSortable: true },
      { name: 'Azioni', dataKey: 'azioni', isSortable: false }
    ];

    this.apiService.getAllProtoRubricaTipo().subscribe((data: any) => {
      this.tipi = data;
    }, error => console.error(error));


    this.apiService.getAllProtoRubrica().subscribe((data: any) => {
      /* this.data = data; */
      this.data_original = data;
    }, error => console.error(error));

  }



  viewMethod(e) {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'id_rubrica': e.id }
    };
    this.router.navigate(['/rubricaitemview'], navigationExtras);
  }

  viewAziendaMethod(e) {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'id_azienda': e.id , 'tipo': e.tipo  }
    };
    this.router.navigate(['/rubricaaziendaitemview'], navigationExtras);
  }


  contactMethod(e) {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'id_rubrica': e.id }
    };
    this.router.navigate(['/contactview'], navigationExtras);
  }

  editMethod(e) {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'id_rubrica': e.id }
    };
    this.router.navigate(['/rubricaedit'], navigationExtras);
  }

  editAziendeMethod(e) {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'id_azienda': e.id, 'tipo': e.tipo }
    };
    this.router.navigate(['/rubricaaziendaedit'], navigationExtras);
  }

  struttureMethod(e) {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'id_azienda': e.id, 'tipo': e.tipo, 'IPA': e.cod_IPA }
    };
    this.router.navigate(['/rubricastrutturaview'], navigationExtras);
  }

  personeMethod(e) {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'id_azienda': e.id, 'tipo': e.tipo }
    };
    this.router.navigate(['/rubricapersoneview'], navigationExtras);
  }

  addressMethod(e) {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'id_rubrica': e.id }
    };
    this.router.navigate(['/addressview'], navigationExtras);
  }

  deleteMethod(e) {
    if (confirm("Stai per eliminare " + e.nome + " " + e.cognome)) {

      this.apiService.DeleteProtoRubrica(e.id).subscribe((dati) => {
        alert(dati['Esito']);
        this.router.navigate(['/resolvescreen']);
      });
    }
  }

  deleteAziendeMethod(e) {
    console.log(this.data.find(x => x.id_azienda == e.id));
    let conta_utenti = this.data.find(x => x.id_azienda == e.id) != undefined ? true : false;
    if (conta_utenti) {
      alert("Non puoi eliminare l'azienda " + e.denominazione + "; esistono persone in rubrica ad essa associate");
    } else {
      this.apiService.DeleteProtoRubricaAziende(e.id).subscribe((dati) => {
        alert(dati['Esito']);    
        this.router.navigate(['/resolvescreen']);
      });
    }
  }

  search() {
    this.data = this.data_original;
    this.data = this.data.filter(x => x.tipo_id == this.tipo_selected);
    if (this.nome_input != '')
      this.data = this.data.filter(x => x.nome.toUpperCase().includes(this.nome_input.toUpperCase()));
    if (this.cognome_input != '')
      this.data = this.data.filter(x => x.cognome.toUpperCase().includes(this.cognome_input.toUpperCase()));
    if (this.cf_input != '')
      this.data = this.data.filter(x => x.CF.toUpperCase().includes(this.cf_input.toUpperCase()));
    if (this.azienda_input != '')
      this.data = this.data.filter(x => x.denominazione.toUpperCase().includes(this.azienda_input.toUpperCase()));

  }

  search_aziende() {
    this.data_aziende = this.data_aziende_original;
    console.log(this.data_aziende)
    if (this.denominazione_input != '')
      this.data_aziende = this.data_aziende.filter(x => x.denominazione.toUpperCase().includes(this.denominazione_input.toUpperCase()));
    if (this.piva_input != '')
      this.data_aziende = this.data_aziende.filter(x => x.piva.toUpperCase().includes(this.piva_input.toUpperCase()));
    if (this.sede_input != '')
      this.data_aziende = this.data_aziende.filter(x => x.sede.toUpperCase().includes(this.sede_input.toUpperCase()));
  }

  scelta_tipo() {
    this.data = this.data_original;
    this.data = this.data.filter(x => x.tipo_id == this.tipo_selected);
    
    this.apiService.getAllProtoRubricaAziende(this.tipo_selected).subscribe((data: any) => {
      this.data_aziende = data;
      this.data_aziende_original = data;
    }, error => console.error(error));
  }

  view_aziende() {
    this.showAziende = true;
  }
  view_contatti() {
    this.showAziende = false;
  }



}

