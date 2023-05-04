import { Component, OnInit, NgModule, HostListener } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser'
import {DomSanitizer} from "@angular/platform-browser";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {NavigationExtras} from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { GetTokenService } from 'src/app/get-token.service';
import * as CryptoJS from 'crypto-js';  
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import {ApiprotoService} from 'src/app/apiproto.service';
import { LocalStorageService } from 'src/app/local-storage.service';
import { faFileContract } from '@fortawesome/free-solid-svg-icons';
import { faUser, faBarcode, faClone, faFingerprint, faPaste, faMinusSquare, faTerminal, faAddressCard, faAddressBook, faBook, faBookmark, faUserTag, faEye, faEyeSlash, faLowVision, faShieldAlt, faGlasses, faBookReader } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-etichette',
  templateUrl: './etichette.component.html',
  styleUrls: ['./etichette.component.css']
})
export class EtichetteComponent implements OnInit {



  @HostListener('window:resize', ['$event'])


  encryptSecretKey="dsopifhjsd9p87";
  id;
  id_enc;
  dati;
  url1;
  url2;
  url3;
  url4;
  str1;
  str2;
  urlpdf;
  id_user;
  loggedIn;
  faFileContract=faFileContract;
  faFingerprint=faFingerprint;
  faBarcode=faBarcode;
  faPaste=faPaste;
  faClone=faClone;
  faBookmark=faBookmark;
  
  innerWidth:any;
  mode:any;
  open:any;
  is_full:any;
  marginLeft:any;
  vedi:any = 'scrivania';

  
  

  constructor(private apiprotoService: ApiprotoService, private route: ActivatedRoute, private router: Router,private localStorageService: LocalStorageService) {
       //responsive sidenav
       this.innerWidth = window.innerWidth;
       this.mode = this.innerWidth > 800 ? 'side' : 'over';
       this.open = this.innerWidth > 800 ? true : false;
       //in costruzione dell'interfaccia, la sidenav è aperta in versione slim
       this.marginLeft = this.open ? '60px' : '0px';
    this.route.queryParams.subscribe(
      params => {
        this.id_enc=params['id'];
        this.id = params['id'];
      });

    this.id=this.decryptData(this.id);
    this.apiprotoService.getEtichetta(this.id).subscribe((dati)=>{
    this.dati=dati;
    for (const obj of this.dati) {
    this.url3=obj["numero"];
    this.url1=environment.url;
    this.url2="protocolli/";
    this.url4="/etichetta.pdf";
    this.str1 = this.url1.concat(this.url2.toString());
    this.str2=this.str1.concat(this.url3.toString());
    this.urlpdf=this.str2.concat(this.url4.toString());
   
    }
    });
  }

  ngOnInit(): void {
  
    this.localStorageService.idLogged.subscribe((nextValue) => {
      this.id_user = nextValue;
      this.loggedIn = (this.id_user == '' || this.id_user == undefined || this.id_user == null)  ? false : true;
    });
  
 
}


test_event(newItem: string){
  this.vedi = newItem;
}



full_state_event(full_side_nav: boolean){
  this.marginLeft = full_side_nav ? '200px' : '60px';
  this.is_full = full_side_nav;
}


decryptData(data) {

  try {
    const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
    if (bytes.toString()) {
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    return data;
  } catch (e) {

  }
}

addclone(){
  this.apiprotoService.clonaProto(this.id).subscribe((dati)=>{
    this.dati = dati['Esito'];
    if(this.dati=="si"){
      alert("Protocollo correttamente clonato");
           }
     else if(this.dati=="presente"){
      alert("Questo protocollo è già stato clonato");
     }
     else{
      alert("Attenzione. Impossibile clonare il protocollo");
     }
  });
}


addclonearchivio(){
  this.apiprotoService.clonaProtoarchivio(this.id).subscribe((dati)=>{
    this.dati = dati['Esito'];
    if(this.dati=="si"){
      alert("Dati di archivio correttamente clonati");
           }
     else if(this.dati=="presente"){
      alert("Questo protocollo è già stato clonato");
     }
     else{
      alert("Attenzione. Impossibile clonare il protocollo");
     }
  });
}

protoscan(){
  let navigationExtras: NavigationExtras = {
    queryParams: { 'id': this.id_enc }
  };
  this.router.navigate(['/protoscan'], navigationExtras);
 }

}
