import { Component, OnInit, NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser'
import {DomSanitizer} from "@angular/platform-browser";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {NavigationExtras} from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { GetTokenService } from 'src/app/get-token.service';
import * as CryptoJS from 'crypto-js';  
import { LocalStorageService } from 'src/app/local-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-video-conf',
  template: `
  <iframe [src]="launcher" style="border:0; height:100%;  width:100%" ></iframe>

`,
  styleUrls: ['./video-conf.component.css']
})
export class VideoConfComponent implements OnInit {
  id;
  launcher;
  first;
  nome;
  cf
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

  this.nome = JSON.parse(localStorage.getItem('nome'));
  this.cf = JSON.parse(localStorage.getItem('CF'));
 }
 ngOnInit() {
   
 }

 carica(){
   this.url=environment.url; 
   this.launcher = this.domSanitizer.bypassSecurityTrustResourceUrl(this.url+'video_conf/chiamante_televisita.php?nome='+this.nome+'&cf='+this.cf);
 }
}