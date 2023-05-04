import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { TableColumn } from 'src/app/template/aleph-table/aleph-table.component';
import { LocalStorageService } from 'src/app/local-storage.service';

@Component({
  selector: 'app-view-titolario',
  templateUrl: './view-titolario.component.html',
  styleUrls: ['./view-titolario.component.css']
})
export class ViewTitolarioComponent {


  data: any;
  user;
  tipo_op;
  privilegio;
  id_operatore;
  pseudonimo;
  customersTableColumns: TableColumn[];

  //la lista delle azioni dipende da idAzienda e idTipo (ovvero dal contesto nel quale arrivo all'elenco operatori)
  listActions = { view: false, edit: false, org: false, delete: false };

  refresha() {


    this.apiService.getAllTitolario().subscribe((data: any)=> {
      this.data = data;
    })
  }


  constructor(private http: HttpClient, private apiService: ApiService, private router: Router, private route: ActivatedRoute, private localStorageService: LocalStorageService,) {


    const myNome = JSON.parse(localStorage.getItem('user'));
    this.user=myNome;
    
    
    const myId = JSON.parse(localStorage.getItem('ID'));
    this.id_operatore=myId;
  
    const myPseudo = JSON.parse(localStorage.getItem('pseudonimo'));
    this.pseudonimo=myPseudo;
  

    this.apiService.getPrivileges(this.user, this.id_operatore, this.pseudonimo).subscribe((privilegio: any) => {

      
    for(var i=0;i<privilegio.length;i++){
      this.privilegio = privilegio[i]['tipo'];
    }
      if(this.privilegio=="admin"  || this.privilegio=='poweruserproto' ){

        this.listActions.edit=true;
        this.listActions.delete=true;

      }
    }, error => console.error(error));



    this.customersTableColumns = [
      { name: 'descrizione', dataKey: 'descrizione', isSortable: true },
      { name: 'conservazione', dataKey: 'conservazione', isSortable: true },
      { name: 'codice', dataKey: 'codifica', isSortable: true },
      { name: 'note', dataKey: 'note', isSortable: true },
      { name: 'Azioni', dataKey: 'azioni', isSortable: false }
    ];

    this.route.queryParams.subscribe(
      params => {
             this.apiService.getAllTitolario().subscribe((data: any) => {

          this.data = data;

        }, error => console.error(error));
      }
    )
  }

  cancella(id, descrizione) {
    if (confirm("Stai per disattivare " + descrizione)) {
      this.apiService.DeleteTitolario(id).subscribe((dati) => {
        if (dati['Esito'] === 'si') {
          alert('Operazione eseguita con successo');
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
    if (confirm("Attenzione. Vuoi proseguire con la modifica?")) {
    let navigationExtras1: NavigationExtras = {
      queryParams: { 'id': e.id }
    };
    this.router.navigate(['/edittitolario'], navigationExtras1);
  }
  }

  deleteMethod(e) {
    this.cancella(e.id, e.descrizione)
  }



}
