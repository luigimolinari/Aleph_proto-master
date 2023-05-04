import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, HostListener, OnInit } from '@angular/core';
import { faHome, faEnvelope, faFingerprint, faVideo, faCopy, faWindowMaximize } from '@fortawesome/free-solid-svg-icons';
import { faIdCardAlt } from '@fortawesome/free-solid-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { faAtlas } from '@fortawesome/free-solid-svg-icons';
import { faFileSignature } from '@fortawesome/free-solid-svg-icons';
import { faArchive } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from './local-storage.service';
import { faProjectDiagram, faFileCode } from '@fortawesome/free-solid-svg-icons';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';
import { NavigationStart, Router } from '@angular/router';
import { ApiService } from './api.service';
import { map } from 'rxjs-compat/operators/map';
import { filter } from 'rxjs-compat/operators/filter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  faHome = faHome;
  faEnvelope = faEnvelope;
  faFingerprint = faFingerprint;
  faVideo = faVideo;
  faCopy = faCopy;
  faWindowMaximize = faWindowMaximize;
  faIdCardAlt = faIdCardAlt;
  faPowerOff = faPowerOff;
  faAtlas = faAtlas;
  faFileSignature = faFileSignature;
  faProjectDiagram = faProjectDiagram;
  faFileCode = faFileCode;
  faArchive = faArchive;
  title = 'Aleph';
  user: string;
  admin: string;
  pratiche: string;
  utenti: string;
  workflow: string;
  sedute: string;
  menu: string;
  LocalStorageService: string;
  profilo: string;
  name: string;
  loginout: string;
  loginin: string;
  tipo_op: string;

  public logingOk: boolean = localStorage.getItem('loginAleph') == 'in';

  controlPseudo(): void {
    //check corrispondenza ID-pseudonimo 
    let id_operatore = JSON.parse(localStorage.getItem('ID'));
    let cf_operatore = JSON.parse(localStorage.getItem('CF'));
    let user = JSON.parse(localStorage.getItem('user'));
    let nome = JSON.parse(localStorage.getItem('nome'));
    let cognome = JSON.parse(localStorage.getItem('cognome'));
    let tipo_operatore = JSON.parse(localStorage.getItem('tipo_op'));
    let accesso = JSON.parse(localStorage.getItem('accesso'));
    let azienda = JSON.parse(localStorage.getItem('azienda'));
    let id_azienda = JSON.parse(localStorage.getItem('id_azienda'));
    let pseudonimo = JSON.parse(localStorage.getItem('pseudonimo'));
    this.apiService.getPseudo(id_operatore, cf_operatore, user, nome, cognome, tipo_operatore, accesso, azienda, id_azienda, pseudonimo).subscribe((res_pseudo: any) => {
      if (res_pseudo.esito == '0') {
        //NON c'è corrispondenza tra ID e pseudonimo ==> LOGOUT
        alert('Disconnessione in corso');
        this.clear_all();
      }
    });
  }

  clear_all(): void {
    localStorage.clear();
    this.logingOk = false;
    window.location.reload();
    window.scroll(0, 0);
  }

  @HostListener('window:storage', ['$event'])
  onStorageChange(e: StorageEvent) {
    this.clear_all();
  }

  constructor(private router: Router, private apiService: ApiService) {
    localStorage.removeItem('loginAlephDesk');
    this.router.navigate(["background"]);
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationStart),
        map(event => event as NavigationStart)
      )
      .subscribe(
        () => {
          this.controlPseudo();
        }
      );
  }

  loginMethod(esito): void {
    this.logingOk = esito;
    if (this.logingOk) {
      localStorage.setItem('loginAleph', 'in');
      this.router.navigate(['/background']);
      this.name = JSON.parse(localStorage.getItem('nome'));
      this.tipo_op = JSON.parse(localStorage.getItem('tipo_op'));
    }
  }

  ngOnInit(): void {  
    this.name = JSON.parse(localStorage.getItem('nome'));
    this.tipo_op = JSON.parse(localStorage.getItem('tipo_op'));
    if (localStorage.length > 0) {
      this.controlPseudo(); 
    }

  }

  /* CreaMenu() {
    this.loginin = '';
    this.loginout = '';
    this.leggiLogin();
    if (this.name) {
      this.loginin = "IN";
    }
    else {
      this.loginout = "out";
    }

  } */
}