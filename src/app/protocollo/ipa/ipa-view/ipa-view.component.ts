import { Component, OnInit  } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { TableColumn } from 'src/app/template/aleph-table/aleph-table.component';
import { LocalStorageService } from 'src/app/local-storage.service';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, FormBuilder,  Validators, NgModel } from '@angular/forms';

@Component({
  selector: 'app-ipa-view',
  templateUrl: './ipa-view.component.html',
  styleUrls: ['./ipa-view.component.css']
})
export class IpaViewComponent implements OnInit {


  data: any;
  user;
  tipo_op;
  privilegio;
  id_operatore;
  pseudonimo;
  customersTableColumns: TableColumn[];
  ipa;
  form;
  des_amm;
  cod_amm;
  des_aoo;
  cod_aoo;

  //la lista delle azioni dipende da idAzienda e idTipo (ovvero dal contesto nel quale arrivo all'elenco operatori)
  listActions = { view: false, edit: false, org: false, delete: false };


  constructor(private http: HttpClient, private apiService: ApiService, private router: Router, private route: ActivatedRoute, private localStorageService: LocalStorageService, private formBuilder: FormBuilder) {


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
      { name: 'codice amm.', dataKey: 'Cod_amm', isSortable: true },
      { name: 'amministrazione', dataKey: 'Des_amm', isSortable: true },
      { name: 'codice aoo', dataKey: 'Cod_aoo', isSortable: true },
      { name: 'AOO', dataKey: 'Des_aoo', isSortable: true },
      { name: 'Domicilio dig.', dataKey: 'Domicilio_digitale', isSortable: true },
      { name: 'Azioni', dataKey: 'azioni', isSortable: false }
    ];


  }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
    des_amm: new FormControl(''),
    cod_amm: new FormControl(''),
    des_aoo: new FormControl(''),
    cod_aoo: new FormControl(''),
        });
}




  viewMethod(ipa=this.form.value) {

             this.apiService.getIpa(ipa).subscribe((data: any) => {

          this.data = data;

        }, error => console.error(error));

  }


Cerca(ipa=this.form.value){
  this.apiService.getIpa(ipa).subscribe((data: any) => {

    this.data = data;

  }, error => console.error(error));

}



}
