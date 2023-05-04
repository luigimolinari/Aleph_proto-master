import { Component, OnInit, NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser'
import {DomSanitizer} from "@angular/platform-browser";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {NavigationExtras} from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { GetTokenService } from 'src/app/get-token.service';
import * as CryptoJS from 'crypto-js';  
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-web-builder',
  template: `
       <iframe [src]="launcher" style="border:0; height:100%;  width:100%" ></iframe>

`,
  styleUrls: ['./web-builder.component.css']
})
export class WebBuilderComponent implements OnInit {
  id;
  launcher;
  first;
  nome;
  operatore;
  url;
  token;
  id_enc;

 constructor( private route: ActivatedRoute, private router: Router, private domSanitizer : DomSanitizer,  private apiService: ApiService,  private getToken: GetTokenService) {
   this.token=this.apiService.getToken().subscribe((dati) => {
     this.token=dati['Esito'];


this.id_enc = btoa(CryptoJS.AES.encrypt(this.id, this.token).toString());  

this.carica();
   });
 }
 ngOnInit() {
   
 }

 carica(){
   this.url=environment.url;
   this.launcher = this.domSanitizer.bypassSecurityTrustResourceUrl('http://silex.aop.int/');
 }
}
