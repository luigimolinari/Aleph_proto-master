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
  selector: 'app-aziende',
  templateUrl: './aziende.component.html',
  styleUrls: ['./aziende.component.css']
})
export class AziendeComponent implements OnInit {

  
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
    var table = $('#aziende').DataTable();
         table.destroy();
     
  this.apiService.getAziende().subscribe((data)=>{
    this.data=data;
    setTimeout(()=>{                          
      $('#aziende').DataTable( {
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true,
        lengthMenu : [5, 10, 25],
        order:[[1,"desc"]],
    } );
    }, 1);

     })
  };
      

constructor(private http: HttpClient,private apiService: ApiService, private router: Router){
  //get request


  this.apiService.getAziende().subscribe((data)=>{
 
    this.data = data;

    setTimeout(()=>{                          
      $('#aziende').DataTable( {
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true,
        lengthMenu : [5, 10, 25],
        order:[[1,"desc"]],
    } );
    }, 1);

        }, error => console.error(error));
}

 
cancella(id,nome){

  
  if(confirm("Stai per eliminare "+nome)) {

    this.operatori= [];

    this.apiService.getOperatoreAzienda(id).subscribe((dati)=>{
      for(let el in dati){
        this.operatori[el] = dati[el].id;
      }

      if (this.operatori.length == 0){
          this.apiService.DeleteAzienda(id).subscribe((dati)=>{
          this.dati = dati['Esito'];
          alert(this.dati);
          this.refresha();
        });
      }
      else{
        alert('Non puoi eliminare questa azienda; esistono operatori ad essa associati');     
        let navigationExtras: NavigationExtras = {
          queryParams: { 'id_azienda': id }
        };
        this.router.navigate(['/operatori'], navigationExtras);        
      }
      
      
    });

  }
}

ngOnInit() {


  }
}
