import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { TableColumn } from 'src/app/template/aleph-table/aleph-table.component';
import { ApiprotoService } from '../apiproto.service';
import { I } from '@angular/cdk/keycodes';


@Component({
  selector: 'app-operatori',
  templateUrl: './operatori.component.html',
  styleUrls: ['./operatori.component.css']
})
export class OperatoriComponent {


  data: any;

  customersTableColumns: TableColumn[];

  //la lista delle azioni dipende da idAzienda e idTipo (ovvero dal contesto nel quale arrivo all'elenco operatori)
  listActions = { view: false, edit: true, org: false, delete: false };

  idAzienda: string = '';
  idTipo: string = '';

  refresha() {


    this.apiService.getAllUsers(this.idAzienda, this.idTipo).subscribe((data: any) => {
      this.data = data;
    })
  }


  constructor(private http: HttpClient, private apiService: ApiService, private apiprotoService:ApiprotoService, private router: Router, private route: ActivatedRoute) {

    this.customersTableColumns = [
      { name: 'Nome', dataKey: 'nome', isSortable: true },
      { name: 'Cognome', dataKey: 'cognome', isSortable: true },
      { name: 'CF', dataKey: 'CF', isSortable: true },
      { name: 'Profilo', dataKey: 'profilo', isSortable: true },
      { name: 'Azioni', dataKey: 'azioni', isSortable: false }
    ];

    this.route.queryParams.subscribe(
      params => {
        this.idAzienda = params['id_azienda'] != undefined ? params['id_azienda'] : '';
        this.idTipo = params['id_tipo'] != undefined ? params['id_tipo'] : '';

        if(this.idAzienda==='' && this.idTipo===''){
          this.listActions.view=true;
          this.listActions.delete=true;
        }

        this.apiService.getAllUsers(this.idAzienda, this.idTipo).subscribe((data: any) => {

          this.data = data;

        }, error => console.error(error));
      }
    )
  }

  cancella(utente, cognome) {
    if (confirm("Stai per eliminare " + cognome)) {
      this.apiService.DeleteUser(utente).subscribe((dati) => {
        if (dati['Esito'] === 'si') {
          this.apiprotoService.DeleteProtoAbilitazioniOperatori(utente).subscribe((res:any) => {
            if(res.esito == '1'){
              alert('Operazione eseguita con successo');
            }
            else{
              alert("Errore nella cancellazione delle abilitazioni dell'operatore");
            }
          });
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
    this.router.navigate(['/operatoreview'], navigationExtras);
  }

  editMethod(e) {
    
    let navigationExtras1: NavigationExtras = {
      queryParams: { 'id': e.id }
    };
    let navigationExtras2: NavigationExtras = {
      queryParams: { 'id': e.id, 'id_azienda':this.idAzienda, 'id_tipo':this.idTipo}
    };
    if(this.idAzienda==='' && this.idTipo===''){
      this.router.navigate(['/operatoreedit'], navigationExtras1);
    }else{
      this.router.navigate(['/operatoreedit'], navigationExtras2);
    }
   
  }

  deleteMethod(e) {
    this.cancella(e.id, e.nome)
  }



}
