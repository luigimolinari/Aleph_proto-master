import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { TableColumn } from 'src/app/template/aleph-table/aleph-table.component';

@Component({
  selector: 'app-pratica-search',
  templateUrl: './pratica-search.component.html',
  styleUrls: ['./pratica-search.component.css']
})
export class PraticaSearchComponent implements OnInit {

  id_user: any;

  data: any;
  data_original:any;

  customersTableColumns: TableColumn[];

  //@Input() marginLeft:any;

  listActions = { view: true, edit: false, org: false, delete: false, workflow: false };

  nome_pratica_input = '';
  nome_flusso_input = '';
  stato_input = '';

  constructor(private apiService: ApiService, private router: Router) {
  }

  ngOnInit(): void {
    //console.log(this.marginLeft);
    this.customersTableColumns = [
      { name: 'Nome Pratica', dataKey: 'nome_pratica', isSortable: true },
      { name: 'Gruppo', dataKey: 'tipo_gruppo', isSortable: true },
      { name: 'Data', dataKey: 'data_creazione', isSortable: true },
      { name: 'Flusso', dataKey: 'nome_flusso', isSortable: true },
      { name: 'Stato', dataKey: 'goal_label', isSortable: true },
      { name: 'Azioni', dataKey: 'azioni', isSortable: true }
    ];

    this.id_user = JSON.parse(localStorage.getItem('ID'));

    this.apiService.getAllPratiche(this.id_user).subscribe((data: any) => {
      this.data = data;
      this.data_original = data;
    }, error => console.error(error));
  }

  refresha() {

    this.apiService.getAllPratiche(this.id_user).subscribe((data: any) => {
      this.data = data;
      this.data_original = data;
    });
  }


  viewMethod(e) {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'id_pratica': e.id, 'gruppo': e.tipo_gruppo }
    };
    this.router.navigate(['/workflowpratica'], navigationExtras);
  }

  deleteMethod(e) {
    /*non è possibile annullare le pratice*/
  }

  search(){
    this.data = this.data_original;
    if(this.nome_pratica_input!='')
      this.data = this.data.filter(x => x.nome_pratica.toUpperCase().includes(this.nome_pratica_input.toUpperCase()));
    if(this.nome_flusso_input!='')
      this.data = this.data.filter(x => x.nome_flusso.toUpperCase().includes(this.nome_flusso_input.toUpperCase()));
    if(this.nome_pratica_input!='')
      this.data = this.data.filter(x => x.goal_label.toUpperCase().includes(this.stato_input.toUpperCase()));
    
  }

}
