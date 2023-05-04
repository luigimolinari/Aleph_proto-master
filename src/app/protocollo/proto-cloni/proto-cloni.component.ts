import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiprotoService } from 'src/app/apiproto.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { TableColumn } from 'src/app/template/aleph-table/aleph-table.component';

@Component({
  selector: 'app-proto-cloni',
  templateUrl: './proto-cloni.component.html',
  styleUrls: ['./proto-cloni.component.css']
})
export class ProtoCloniComponent {

  data: any;
  operatori: any;
  vedi: any;
  id_user: any;
  loggedIn: any;
  innerWidth: any;
  mode: any;
  open: any;
  marginLeft: any;
  is_full: any;
  margin_class: any;

  customersTableColumns: TableColumn[];

  listActions = { view: true, edit: false, org: false, delete: false };

  constructor(private http: HttpClient, private apiService: ApiprotoService, private router: Router) {


    this.id_user = JSON.parse(localStorage.getItem('ID'));
    this.loggedIn = (this.id_user == '' || this.id_user == undefined || this.id_user == null)  ? false : true;

    this.innerWidth = window.innerWidth;
    this.mode = this.innerWidth > 800 ? 'side' : 'over';
    this.open = this.innerWidth > 800 ? true : false;
    //in costruzione dell'interfaccia, la sidenav è aperta in versione slim
    this.marginLeft = this.open ? '60' : '0';
    this.margin_class = this.open ? 'medium_margin' : 'small_margin';
    
    this.customersTableColumns = [
      { name: 'Oggetto', dataKey: 'oggetto', isSortable: true },
      { name: 'Descrizione', dataKey: 'descrizione', isSortable: true },
      { name: 'Azioni', dataKey: 'azioni', isSortable: false }
    ];

    this.apiService.getAllProtoCloni().subscribe((data: any) => {

      this.data = data;

    }, error => console.error(error));
  }

  viewMethod(e) {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'id_clone': e.id }
    };
    this.router.navigate(['/addprotocollo'], navigationExtras);
  }


  test_event(newItem: string){
    this.vedi = newItem;
    switch(this.vedi){
      case 'clona': this.router.navigate(["protocloni"]); break;
    }
  }

  full_state_event(full_side_nav: boolean){
    console.log('full');
    this.marginLeft = full_side_nav ? '200' : '60';
    this.margin_class = full_side_nav ? 'large_margin' : 'medium_margin';
    this.is_full = full_side_nav;
  }

}
