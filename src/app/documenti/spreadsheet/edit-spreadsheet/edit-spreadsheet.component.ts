import { Component, OnInit, NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser'
import {DomSanitizer} from "@angular/platform-browser";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {NavigationExtras} from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { GetTokenService } from 'src/app/get-token.service';
import * as CryptoJS from 'crypto-js';  
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-spreadsheet',
  template: `
  <iframe [src]="launcher" style="border:0; height:100%;  width:100%" ></iframe>

`,
  styleUrls: ['./edit-spreadsheet.component.css']
})
export class EditSpreadsheetComponent implements OnInit {
  id;
  launcher;
  first;
  nome;
  cognomeop;
  nomeop;
  nomecognomeop;
  operatore;
  url;
  token;
  encrypt;
  parola;
  sale;
  id_enc;
  procedura;
  workflow;


 constructor( private route: ActivatedRoute, private router: Router, private domSanitizer : DomSanitizer,  private apiService: ApiService,  private getToken: GetTokenService,  private socket: Socket) {
  this.token=this.apiService.getToken().subscribe((dati) => {
    this.token=dati['Esito'];
   



  this.operatore = JSON.parse(localStorage.getItem('ID'));

  this.nomeop = JSON.parse(localStorage.getItem('nome'));
  this.cognomeop = JSON.parse(localStorage.getItem('cognome'));
  this.nomecognomeop = this.nomeop+' '+this.cognomeop;
  this.id_enc = btoa(CryptoJS.AES.encrypt(this.id, this.token).toString());  


     });

}



resolveAfter2Seconds(nomecognomeop) {
  return new Promise(resolve => {
    setTimeout(() => {
      this.nomeop = JSON.parse(localStorage.getItem('nome'));
      this.cognomeop = JSON.parse(localStorage.getItem('cognome'));
      this.nomecognomeop = this.nomeop+' '+this.cognomeop;
      resolve(nomecognomeop);
      
    }, 2000);
  });
}

 ngOnInit() {

  
 this.resolveAfter2Seconds(1).then(value => {
  if(this.socket.connect()){
    this.socket.emit('accedi',this.id,this.nomecognomeop);
    this.carica();  
    this.socket.on('suona', function(operatore){    
    alert(operatore);
    });
    };
});
 


  this.route.queryParams.subscribe( 
    params => { 
      this.id =  params['id']; 
      this.procedura = params['procedura'];

    }
      );

    
     

 }
 carica(){

  this.url=environment.url;
  this.launcher = this.domSanitizer.bypassSecurityTrustResourceUrl(this.url+'spreadsheet/splash.php?id_enc='+this.id_enc+'&operatore='+this.operatore+'&sale='+this.token+'&procedura='+this.procedura+'&editor=editor');
 }


}
