import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { HttpClient } from '@angular/common/http';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { faUserSlash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {NavigationExtras} from '@angular/router';


@Component({
  selector: 'app-tipi',
  templateUrl: './tipi.component.html',
  styleUrls: ['./tipi.component.css']
})
export class TipiComponent implements OnInit {

  faEye = faEye;
  faUserEdit = faUserEdit;
  faUserSlash = faUserSlash;
  data:any;
  dtOptions: any = {};
  dati:any;
  faEdit = faEdit;
  faTrash = faTrash;
  operatori: any;

  refresha(){
    var table = $('#tipi').DataTable();
         table.destroy();
     
  this.apiService.getAllTipoOperatori().subscribe((data)=>{
    this.data=data;
    setTimeout(()=>{                          
      $('#tipi').DataTable( {
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true,
        lengthMenu : [5, 10, 25],
        order:[[1,"desc"]],
    } );
    }, 1);

     })
  };
      

constructor(private http: HttpClient, private apiService: ApiService, private router: Router){
  //get request


  this.apiService.getTipoOperatori().subscribe((data)=>{
 
    this.data = data;

    setTimeout(()=>{                          
      $('#tipi').DataTable( {
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true,
        lengthMenu : [5, 10, 25],
        order:[[1,"desc"]],
    } );
    }, 1);

        }, error => console.error(error));
}

 
cancella(id,tipo){
  if(confirm("Stai per eliminare "+tipo)) {

    this.operatori= [];

    this.apiService.getOperatoreTipo(id).subscribe((dati)=>{
      for(let el in dati){
        this.operatori[el] = dati[el].id;
      }

      if (this.operatori.length == 0){
        this.apiService.DeleteTipo(id).subscribe((dati)=>{
          this.dati = dati['Esito'];
          alert(this.dati);
          this.refresha();
        });
      }
      else{
        alert('Non puoi eliminare questa tipologia di operatore; esistono operatori ad essa associati');     
        let navigationExtras: NavigationExtras = {
          queryParams: { 'id_tipo': id }
        };
        this.router.navigate(['/operatori'], navigationExtras);        
      }
      
      
    });
  }
}

ngOnInit() {


  }
}
