import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {NavigationExtras} from '@angular/router';
import { TableColumn } from 'src/app/template/aleph-table/aleph-table.component';

@Component({
  selector: 'app-flussi-view',
  templateUrl: './flussi-view.component.html',
  styleUrls: ['./flussi-view.component.css']
})
export class FlussiViewComponent {


  data:any;
  workflow;
 
  customersTableColumns: TableColumn[];

	listActions = { view: true, edit: true, org: false, delete: true, workflow:true, tempi:true };
  /**
   * Azioni:
   * view -> visualizza workflow associato
   * edit -> sempre possibile
   * workflow -> edit del workflow associato 
   *             (possibile solo se il flusso in oggetto non è ancora stato associato ad alcuna procedura o pratica)
   * delete -> possibile solo se non esistono workflow associati al flusso in oggetto
   */

  refresha(){

  this.apiService.getAllFlussi().subscribe((data:any)=>{
		this.data=data;
    })
  };
      

constructor(private http: HttpClient,private apiService: ApiService, private router: Router){
  
  this.customersTableColumns = [
    { name: 'Nome Flusso', dataKey: 'nome_flusso', isSortable: true },
    { name: 'Attivo', dataKey: 'attivo_label', isSortable: true },
    { name: 'Tipo', dataKey: 'tipo', isSortable: true },
    { name: 'Proprietario', dataKey: 'proprietario', isSortable: true },
    { name: 'Azioni', dataKey: 'azioni', isSortable: false }
  ];


  this.apiService.getAllFlussi().subscribe((data:any)=>{
		this.data=data;
    }, error => console.error(error));
}

cancella(id,nome){
  if(confirm("Stai per eliminare "+nome)) {

    this.apiService.DeleteFlusso(id).subscribe((dati)=>{
      alert(dati['Esito']);
      this.refresha();
    });
  }
}

viewMethod(e) {
  let navigationExtras: NavigationExtras = {
    queryParams: { 'flusso': e.id, 'nome_flusso': e.nome_flusso, 'tipo':e.tipo, 'blocked': e.blocked }
  };
  this.router.navigate(['/flussoview'], navigationExtras);
}

editMethod(e) {
  let navigationExtras: NavigationExtras = {
    queryParams: { 'id': e.id }
  };
  this.router.navigate(['/flussiedit'], navigationExtras);
}

workflowMethod(e) {
  let navigationExtras: NavigationExtras = {
    queryParams: { 'flusso': e.id, 'update': 1 }
  };
  this.router.navigate(['/documentiselect'], navigationExtras);
}

tempiMethod(e) {
  let navigationExtras: NavigationExtras = {
    queryParams: { 'flusso': e.id, 'nome_flusso': e.nome_flusso, 'tipo':e.tipo, 'blocked': e.blocked }
  };
  this.router.navigate(['/tempiflusso'], navigationExtras);
}

deleteMethod(e) {
  this.cancella(e.id, e.nome_flusso)
}



}
