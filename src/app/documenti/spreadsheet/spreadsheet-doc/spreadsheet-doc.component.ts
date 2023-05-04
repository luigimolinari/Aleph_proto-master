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
  selector: 'app-spreadsheet-doc',
  template: `
  <iframe [src]="launcher" style="border:0; height:100%;  width:100%" ></iframe>

`,
  styleUrls: ['./spreadsheet-doc.component.css']
})
export class SpreadsheetDocComponent implements OnInit {
  id;
  launcher;
  first;
  nome;
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
  this.route.queryParams.subscribe( 
    params => { 
      this.id =  params['id_documento_flusso']; 
      this.first = params['first'];
      this.nome = params['nome'];
      this.procedura = params['id_procedura'];
      this.workflow = params['id_workflow'];

    }
      );
  this.id_enc = btoa(CryptoJS.AES.encrypt(this.id, this.token).toString());  

this.carica();
     });


}


 ngOnInit() {
 

      

 }
 carica(){

  this.url=environment.url;
  this.launcher = this.domSanitizer.bypassSecurityTrustResourceUrl(this.url+'spreadsheet/splash.php?id_enc='+this.id_enc+'&first='+this.first+'&operatore='+this.operatore+'&sale='+this.token+'&procedura='+this.procedura+'&workflow='+this.workflow);
 }


}
