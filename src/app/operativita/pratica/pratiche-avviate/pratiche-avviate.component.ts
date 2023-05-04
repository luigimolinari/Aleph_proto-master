import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { TableColumn } from 'src/app/template/aleph-table/aleph-table.component';

@Component({
  selector: 'app-pratiche-avviate',
  templateUrl: './pratiche-avviate.component.html',
  styleUrls: ['./pratiche-avviate.component.css']
})
export class PraticheAvviateComponent implements OnInit{

  id_user:any;

  data:any;
 
  customersTableColumns: TableColumn[];

  @Input() marginLeft:any;

	listActions = { view: true, edit: false, org: false, delete: true, workflow:false };
  /**
   * Azioni:
   * view -> visualizza workflow assocaito (TODO: visualizzazione dei workflow complessi)
   * edit -> sempre possibile
   * workflow -> edit del workflow associato (possibile solo se il flusso in oggetto non è ancora stato associato ad acluna procedura)
   * delete -> possibile solo se non esistono workflow associati al flusso in oggetto
   */

  constructor(private apiService: ApiService, private router:Router){
  }

  ngOnInit():void{
    console.log(this.marginLeft);
    this.customersTableColumns = [
      { name: 'Nome Pratica', dataKey: 'nome_pratica', isSortable: true },
      { name: 'Data', dataKey: 'data_creazione', isSortable: true },
      { name: 'Flusso', dataKey: 'nome_flusso', isSortable: true },
      { name: 'Stato', dataKey: 'goal', isSortable: true },
      { name: 'Azioni', dataKey: 'azioni', isSortable: true }
    ];
  
    this.id_user = JSON.parse(localStorage.getItem('ID'));
  
    this.apiService.getPraticheAvviate(this.id_user).subscribe((data:any)=>{
      this.data=data;
      }, error => console.error(error));
  }
  
  refresha(){

  this.apiService.getPraticheAvviate(this.id_user).subscribe((data:any)=>{
		this.data=data;
    })
  }


viewMethod(e) {
  let navigationExtras: NavigationExtras = {
    queryParams: {'id_pratica': e.id, 'mode':1}
  };
  this.router.navigate(['/praticarequest'], navigationExtras);
}

deleteMethod(e) {
 alert('TODO annulla richiesta ?');
}

}
