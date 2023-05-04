import { Component, OnInit, HostListener } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ApiprotoService } from 'src/app/apiproto.service';
import { ActivatedRoute } from '@angular/router';
import { faUser, faFingerprint, faMinusSquare, faTerminal, faAddressCard, faAddressBook, faBook, faBookmark, faUserTag, faEye, faEyeSlash, faLowVision, faShieldAlt, faGlasses, faBookReader } from '@fortawesome/free-solid-svg-icons';
import { faHouseUser, faUserTie, faUserPlus, faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faPlus, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/local-storage.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { findIndex, map, startWith } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import { NavigationExtras } from '@angular/router';


export interface Address {
  name: string;
}


@Component({
  selector: 'app-add-protocollo',
  templateUrl: './add-protocollo.component.html',
  styleUrls: ['./add-protocollo.component.css']
})

export class AddProtocolloComponent implements OnInit {
  id;
  user;
  faUser = faUser;
  faHouseUser = faHouseUser;
  faBuilding = faBuilding;
  faTerminal = faTerminal;
  faAddressCard = faAddressCard;
  faFingerprint = faFingerprint;
  faPlusSquare = faPlusSquare;
  faMinusSquare = faMinusSquare;
  faAddressBook = faAddressBook;
  faUserPlus = faUserPlus;
  faBookmark = faBookmark;
  faGlasses = faGlasses;
  faUserTie = faUserTie;
  faBookReader = faBookReader;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faLowVision = faLowVision;
  faUserTag = faUserTag;
  faBook = faBook;
  faPlus = faPlus;
  faShieldAlt = faShieldAlt;
  faAsterisk = faAsterisk;
  oggetto: any;
  descrizione;
  note;
  tipo = '';
  cf;
  luogo_nascita;
  prov_nascita;
  data_nascita;
  sesso;
  indirizzo_residenza;
  comune_residenza;
  prov_residenza;
  cns;
  spid;
  azienda;
  struttura;
  ruolo;
  profilo;
  esito;
  msgerror: string;
  tipoalert;
  tipoalertdanger;
  tipoalertuncomplete;
  email;
  telefono;
  utente;
  nomeutente;
  dati;
  form: FormGroup;
  aziende;
  tipooperatori;
  strutture = [];
  tipoprotocolli;
  inboxprotoall;
  inbox = '';
  serie = '';
  series;
  flusso = '';
  flussi;
  attivaentrata;
  attivainterno;
  nointerface = 'si';
  tipointerface;
  id_user: any;
  loggedIn: any;
  mittente;
  nomeinput;
  cognomeinput;
  indirizzoinput;
  comuneinput;
  provinciainput;
  statoinput;
  capinput;
  cfinput;
  aziendainput;
  tipo_selected;
  protomittente;
  protorubricatipo;
  rubricatipo = 'generale' // default;
  valido;
  data;
  orario;
  innerWidth: any;
  mode: any;
  open: any;
  is_full: any;
  marginLeft: any;
  margin_class: any;
  vedi: any = '';
  mieaziende;
  data_arrivo;
  titolario;
  validotito;
  titolari;
  assegnatario;
  validoasse;
  validodesti;
  validomitt;
  validocopia;
  validoprotoref;
  assegnatipo;
  destinatipo;
  mittipo;
  copiatipo;
  protoreftipo;
  id_azienda;
  archivio;
  protocollo;
  riservatezza = "normale";
  riservatipo = '';
  ristrettotipo = '';
  protoriservatotipo;
  protoristrettotipo;
  completo = "si";
  riporta = "si";
  dataprotomittente;
  encryptSecretKey = "dsopifhjsd9p87";
  crypt;
  n_allegati;
  desc_allegati;
  appendiallegati = "no";
  numbers_allegati: number[] = [];
  descall;
  labelricerca;
  datadip;
  miavoce;
  n_scrittura: number = 1;
  control = new FormControl();
  voci: string[] = [];
  filteredVoci: Observable<string[]>;
  aggiungirubrica = "no";

  controltito = new FormControl();
  vocitito: string[] = [];
  filteredVocitito: Observable<string[]>;

  controllasse = new FormControl();
  vociasse: string[] = [];
  filteredAssegnatari: Observable<string[]>;

  controldesti = new FormControl();
  vocidesti: string[] = [];
  filteredDestinatari: Observable<string[]>;

  controlmitt = new FormControl();
  vocimitt: string[] = [];
  filteredMittenti: Observable<string[]>;

  controlcopia = new FormControl();
  vocicopia: string[] = [];
  filteredCopie: Observable<string[]>;

  controlprotoref = new FormControl();
  vociprotoref: string[] = [];
  filteredProtoref: Observable<string[]>;

  vociallegati: string[] = [];

  id_clone: any;
  clone: any;

  @HostListener('window:resize', ['$event'])

  flussoptions = ['Ingresso', 'Uscita', 'Interno'];

  onResize() {
    this.innerWidth = window.innerWidth;
    this.mode = this.innerWidth > 800 ? 'side' : 'over';
    this.open = this.innerWidth > 800 ? true : false;

    if (this.open) {
      this.marginLeft = this.is_full ? '200px' : '60px';
      this.margin_class = this.is_full ? 'large_margin' : 'medium_margin';
    }
    else {
      this.marginLeft = '0px';
      this.margin_class = 'small_margin';
    }

  }


  constructor(private apiService: ApiService, private apiprotoService: ApiprotoService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private localStorageService: LocalStorageService) {

    this.innerWidth = window.innerWidth;
    this.mode = this.innerWidth > 800 ? 'side' : 'over';
    this.open = this.innerWidth > 800 ? true : false;
    //in costruzione dell'interfaccia, la sidenav è aperta in versione slim
    this.marginLeft = this.open ? '60px' : '0px';
    this.margin_class = this.open ? 'medium_margin' : 'small_margin';
  }

  /*cloni - inizio*/
  controlCloni = new FormControl();
  enable_upload_clone = false; //abilita il FormControl per la selezione del clone

  cloni: string[] = [];
  filteredCloni: Observable<string[]>;
  private _filterCloni(value: string): string[] {
    const filterValueCloni = this._normalizeValueCloni(value);
    return this.cloni.filter(protocloni => this._normalizeValueCloni(protocloni).includes(filterValueCloni));
  }
  private _normalizeValueCloni(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  selectedClone(e): void {
    let clone_selected = e.option.value;
    this.id_clone = clone_selected.split('*')[0];
    //this.reset_form();
    this.upload_single_clone();
  }

  enUploadClone(): void {
    this.enable_upload_clone = !this.enable_upload_clone;
    if (this.enable_upload_clone) {
      this.filteredCloni = this.controlCloni.valueChanges.pipe(
        startWith(''),
        map(value => this._filterCloni(value))
      );

      this.apiprotoService.getAllProtoCloni().subscribe((res_cloni: any) => {
        console.log(res_cloni);
        for (let i: any = 0; i < res_cloni.length; i++) {
          this.cloni.push(res_cloni[i].id + "*" + res_cloni[i].oggetto + " - " + res_cloni[i].descrizione);
        }
      })
    }
  }

  upload_single_clone() {
    this.apiprotoService.getSingleProtoCloni(this.id_clone).subscribe((clone_res: any) => {
      if (clone_res.esito == '0') {
        alert(clone_res.mex_esito);
      } else {
        this.clone = clone_res.clone;
        this.upload(clone_res.clone);
      }
    });
  }

  reset_form(): void {
    this.flusso = '';
    this.serie = '';
    this.inbox = '';
    this.tipo = '';
    this.oggetto = '';
    this.note = '';
    this.descrizione = '';
    this.riservatipo = '';
    this.archivio = '';
    this.destinatari = [];
    this.mittenti = [];
    this.assegnatari = [];
    this.copiaconoscenza = [];
    this.protoref = [];

    this.form.reset();
  }

  reset_indirizzi(): void {
    this.form.controls.destinatari.setValue('');
    this.form.controls.mittenti.setValue('');
    this.form.controls.assegnatari.setValue('');
    this.form.controls.copiaconoscenza.setValue('');
    this.destinatari = [];
    this.mittenti = [];
    this.assegnatari = [];
    this.copiaconoscenza = [];
  }

  upload(clone): void {
    /* console.log(clone); */
    this.form.controls.serie.setValue(clone.id_serie);
    this.attivaentrata = "si";
    this.attivainterno = "si";
    this.form.controls.flusso.setValue(clone.flusso);
    this.form.controls.inbox.setValue(clone.id_box);
    this.form.controls.tipo.setValue(clone.id_tipo);

    this.CreaInterfaccia();

    this.form.controls.oggetto.setValue(clone.oggetto);
    this.form.controls.note.setValue(clone.note);
    this.form.controls.descrizione.setValue(clone.descrizione);
    let id_riservatezza = clone.riservato;
    let tipologia_riservatezza = clone.tipologia;
    this.cambiariservatezza(tipologia_riservatezza.toLowerCase());
    if (tipologia_riservatezza.toLowerCase() == 'riservato') {
      this.form.controls.riservatipo.setValue(id_riservatezza);
    } else if (tipologia_riservatezza.toLowerCase() == 'ristretto') {
      this.form.controls.ristrettotipo.setValue(id_riservatezza);
    }

    this.form.controls.archivio.setValue(clone.id_titolario);

    //copiaconoscenza
    this.protoref = [];
    if (clone.protoref != null) {
      let protoref_splitted = clone.protoref.split('|');
      protoref_splitted.forEach(element => {
        if (element != '') {
          this.protoref.push({ name: element });
          this.form.controls.protoref.setValue(this.protoref);
        }
      });
    }

    if (clone.flusso == 'Ingresso') {
      //assegnatari
      this.assegnatari = [];
      if (clone.assegnatari != null) {
        let assegnatari_splitted = clone.assegnatari.split('|');
        assegnatari_splitted.forEach(element => {
          if (element != '') {
            this.assegnatari.push({ name: element });
            this.form.controls.assegnatari.setValue(this.assegnatari);
          }

        });
      }

      //copiaconoscenza
      this.copiaconoscenza = [];
      if (clone.cc != null) {
        let copiaconoscenza_splitted = clone.cc.split('|');
        copiaconoscenza_splitted.forEach(element => {
          if (element != '') {
            this.copiaconoscenza.push({ name: element });
            this.form.controls.copiaconoscenza.setValue(this.copiaconoscenza);
          }
        });
      }

      //destinatari
      this.destinatari = [];
      if (clone.destinatari != null) {
        let destinatari_splitted = clone.destinatari.split('|');
        destinatari_splitted.forEach(element => {
          if (element != '') {
            this.destinatari.push({ name: element });
            this.form.controls.destinatari.setValue(this.destinatari);
          }
        });
      }
    }



  }
  /* cloni - fine */
  /* non in uso??
  Trasmetti(): void {
    
    if (this.form.valid) {
      this.apiService.getAllUsers('', '').subscribe((dati: any) => {
        if (dati.find(x => x.CF.toUpperCase() === this.cf.toUpperCase())) {
          alert('CF già presente');
        }
        else {
          this.apiService.AddUser(this.utente = this.form.value).subscribe((dati) => {
            this.dati = dati['Esito'];
            if (this.dati == "si") {
              if (confirm("Operatore correttamente registrato")) {
                this.router.navigate(['/operatori']);
              }
            }
            else {
              alert("Attenzione. Impossibile inserire l'operatore");
            }
          });
        }
      });
    } else {
      alert("Attenzione. Non tutti i campi obbligatori hanno un valore valido");
    }
  }
  */
  ngOnInit(): void {


    this.form = this.formBuilder.group({

      oggetto: new FormControl('', Validators.required),
      descrizione: new FormControl(''),
      tipo: new FormControl('', Validators.required),
      destinatari: new FormControl(''),
      mittenti: new FormControl(''),
      note: new FormControl(''),

      inbox: new FormControl('', Validators.required),
      serie: new FormControl('', Validators.required),
      flusso: new FormControl('', Validators.required),
      data_arrivo: new FormControl('', Validators.required),
      orario: new FormControl('', Validators.required),
      nomeinput: new FormControl(''),
      cognomeinput: new FormControl(''),
      indirizzoinput: new FormControl(''),
      comuneinput: new FormControl(''),
      provinciainput: new FormControl(''),
      statoinput: new FormControl(''),
      capinput: new FormControl(''),
      cfinput: new FormControl(''),
      aziendainput: new FormControl(''),
      tipo_selected: new FormControl(''),
      /* 
      La rubrica si riferisce ai MITTENTI  nel caso di flusso in INGRESSO
                              ai DESTINATARI nel caso di flusso in USCITA
      */
      rubricatipo: new FormControl('generale'),//default
      riservatipo: new FormControl(''),
      ristrettotipo: new FormControl(''),
      assegnatipo: new FormControl(''),
      destinatipo: new FormControl(''),
      mittipo: new FormControl(''),
      copiatipo: new FormControl(''),
      protoreftipo: new FormControl(''),
      assegnatari: new FormControl(''),
      titolario: new FormControl(''),
      archivio: new FormControl(''),
      copiaconoscenza: new FormControl(''),
      protoref: new FormControl(''),
      protomittente: new FormControl(''),
      dataprotomittente: new FormControl(''),
      n_allegati: new FormControl('', Validators.required),
      desc_allegati: new FormControl(''),
      descall: new FormControl(''),
    });

    this.localStorageService.idLogged.subscribe((nextValue) => {
      this.id_user = nextValue;
      this.loggedIn = (this.id_user == '' || this.id_user == undefined || this.id_user == null) ? false : true;
    });
    this.id_user = JSON.parse(localStorage.getItem('ID'));
    this.user = JSON.parse(localStorage.getItem('user'));
    this.id_azienda = JSON.parse(localStorage.getItem('id_azienda'));
    this.loggedIn = (this.id_user == '' || this.id_user == undefined || this.id_user == null) ? false : true;



    this.apiprotoService.getAllProtoSerie().subscribe((dati) => {
      this.series = dati;
    });


    this.apiprotoService.getAllProtoTipo().subscribe((dati) => {
      this.tipoprotocolli = dati;
    });

    this.apiprotoService.getAllProtoInbox().subscribe((dati) => {
      this.inboxprotoall = dati;
    });

    //qui popoliamo la rubrica
    this.apiprotoService.getAllProtoRubricaTipo().subscribe((dati) => {
      this.protorubricatipo = dati;
    });

    //qui popoliamo le select dei motivi di riservatezza

    this.apiprotoService.getAllProtoRiservatezzaTipo("riservato").subscribe((dati) => {
      this.protoriservatotipo = dati;
    });


    this.apiprotoService.getAllProtoRiservatezzaTipo("ristretto").subscribe((dati) => {
      this.protoristrettotipo = dati;
    });

    this.PopolaTitolario();

    this.PopolaAssegnatari();

    this.PopolaVociRubrica();

    this.valido = 'disabled';

    this.route.queryParams.subscribe(
      params => {
        //procedura di update di modello esistente
        this.id_clone = params['id_clone'];
        if (this.id_clone != undefined) {
          this.upload_single_clone();
        }
      });

  }


  CreaInterfaccia() {
    this.nointerface = 'si';
    this.tipointerface = "";
    this.serie = this.form.controls.serie.value;
    this.flusso = this.form.controls.flusso.value;
    this.inbox = this.form.controls.inbox.value;
    this.tipo = this.form.controls.tipo.value;
    this.reset_indirizzi();
    if (this.serie.length > 0 && this.inbox.length > 0 && this.tipo.length > 0 && this.flusso.length > 0) {
      this.nointerface = 'no';
      switch (this.flusso) {
        case 'Ingresso':
          this.tipointerface = "Ingresso";
          break;
        case 'Uscita':
          this.tipointerface = "Uscita";
          break;
        case 'Interno':
          this.tipointerface = "Interno";
          break;
        default:
          this.tipointerface = '';
          console.log("Errore del sistema. Contattare un amministratore fornendo il codice 501");
          break;
      }
    } else {
      this.nointerface = 'si';
    }
  }


  SetControl(valore) {
    this.valido = valore;
    if (this.valido == 1) {
      this.valido = '';
    } else {
      this.valido = 'disabled';
    }
  }

  SetControltito(valore) {
    this.validotito = valore;
    if (this.validotito == 1) {
      this.validotito = '';
    } else {
      this.validotito = 'disabled';
    }
  }


  SetControlasse(valore) {
    this.validoasse = valore;
    if (this.validoasse == 1) {
      this.validoasse = '';
    } else {
      this.validoasse = 'disabled';
    }
  }

  SetControldesti(valore) {
    this.validodesti = valore;
    if (this.validodesti == 1) {
      this.validodesti = '';
    } else {
      this.validodesti = 'disabled';
    }
  }

  SetControlmitt(valore) {
    this.validomitt = valore;
    if (this.validomitt == 1) {
      this.validomitt = '';
    } else {
      this.validomitt = 'disabled';
    }
  }

  SetControlcopia(valore) {
    this.validocopia = valore;
    if (this.validocopia == 1) {
      this.validocopia = '';
    } else {
      this.validocopia = 'disabled';
    }
  }

  SetControlprotoref(valore) {
    this.validoprotoref = valore;
    if (this.validoprotoref == 1) {
      this.validoprotoref = '';
    } else {
      this.validoprotoref = 'disabled';
    }
  }


  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.voci.filter(voci => this._normalizeValue(voci).includes(filterValue));
  }

  private _filtertito(value: string): string[] {
    const filterValuetito = this._normalizeValue(value);
    return this.vocitito.filter(titolari => this._normalizeValue(titolari).includes(filterValuetito));
  }

  private _filterasse(value: string): string[] {
    const filterValueasse = this._normalizeValue(value);
    return this.vociasse.filter(asse => this._normalizeValue(asse).includes(filterValueasse));
  }

  private _filterdesti(value: string): string[] {
    const filterValuedesti = this._normalizeValue(value);
    return this.vocidesti.filter(desti => this._normalizeValue(desti).includes(filterValuedesti));
  }

  private _filtermitt(value: string): string[] {
    const filterValuemitt = this._normalizeValue(value);
    return this.vocimitt.filter(mitt => this._normalizeValue(mitt).includes(filterValuemitt));
  }

  private _filtercopia(value: string): string[] {
    const filterValuecopia = this._normalizeValue(value);
    return this.vocicopia.filter(cc => this._normalizeValue(cc).includes(filterValuecopia));
  }

  private _filterprotoref(value: string): string[] {
    const filterValueprotoref = this._normalizeValue(value);
    return this.vociprotoref.filter(pr => this._normalizeValue(pr).includes(filterValueprotoref));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  /*  private _normalizeValuetito(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
   } */

  /*  private _normalizeValueasse(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
   } */

  /* private _normalizeValuedesti(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  } */

  /* private _normalizeValuemitt(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  } */

  /* private _normalizeValuecopia(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  } */

  ControlAzienda() {
    this.struttura = '';
    this.strutture = [];
    //pesco tutte le strutture dell'azienda selezionata
    this.apiService.getStrutturaAzienda(this.azienda).subscribe((data: any) => {
      if (data != null) {
        for (let i: any = 0; i < data.length; i++) {
          this.strutture.push(data[i]);
        }
      }
    }, error => console.error(error));
  }



  Scegliflusso() {
    //pesco tutti i flussi della serie
    this.serie = this.form.controls.serie.value;
    this.apiService.getSingleSerie(this.serie).subscribe((data: any) => {
      this.attivaentrata = "no";
      this.attivainterno = "no";
      this.flussoptions = [];
      if (data != null) {
        for (let i: any = 0; i < data.length; i++) {
          if (data[i].entrata_uscita === '1') {
            this.attivaentrata = "si";
            this.flussoptions.push('Ingresso');
            this.flussoptions.push('Uscita');
          }
          if (data[i].interno === '1') {
            this.attivainterno = "si";
            this.flussoptions.push('Interno');
          }
        }
      }

    }, error => console.error(error));
  }



  test_event(newItem: string) {
    this.vedi = newItem;
    switch (this.vedi) {
      case 'clona': this.router.navigate(["protocloni"]); break;
    }
  }

  full_state_event(full_side_nav: boolean) {
    this.marginLeft = full_side_nav ? '200px' : '60px';
    this.margin_class = full_side_nav ? 'large_margin' : 'medium_margin';
    this.is_full = full_side_nav;
  }



  //Funzioni di popolazione Rubrica e Gestione dei chips
  PopolaVociRubrica() {
    this.labelricerca = '';

    this.voci = [];
    this.filteredVoci = new Observable();
    this.filteredVoci = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.rubricatipo = this.form.controls.rubricatipo.value;

    if (this.rubricatipo == "interno") {
      this.apiprotoService.getAllOperatoriRubrica().subscribe((data) => {
        this.data = data;
        for (let i: any = 0; i < this.data.length; i++) {
          this.voci.push(this.data[i].nome + "*" + this.data[i].cognome + "*" + this.data[i].nome_azienda + "*i1*" + this.data[i].id);
        }
      }, error => console.error(error));

    }
    else if (this.rubricatipo == "generale") {
      this.apiprotoService.getAllRubricaGenerale().subscribe((data) => {
        this.data = data;
        for (let i: any = 0; i < this.data.length; i++) {
          this.voci.push(this.data[i].nome + "*" + this.data[i].cognome + "*" + this.data[i].indirizzo + "*" + this.data[i].comune + "*" + this.data[i].provincia + "*h1" + this.data[i].id);

        }
      }, error => console.error(error));

    }

    else if (this.rubricatipo == "aziende/enti") {

      this.apiprotoService.getAllRubricaAziende().subscribe((data) => {
        this.data = data;
        for (let i: any = 0; i < this.data.length; i++) {
          this.voci.push(this.data[i].denominazione + "*" + this.data[i].sede + "*" + this.data[i].piva + "*a1*" + this.data[i].id);

        }
      }, error => console.error(error));

    }

    else if (this.rubricatipo == "strutture aziende/enti") {
      this.LabelRicerca("strutture");
      this.apiprotoService.getAllRubricaAziendeStrutture().subscribe((data) => {
        this.data = data;
        for (let i: any = 0; i < this.data.length; i++) {
          this.voci.push(this.data[i].denominazione + "*" + this.data[i].nome + "*" + this.data[i].cod_AOO + "*a2*" + this.data[i].id);

        }
      }, error => console.error(error));

    }

    else if (this.rubricatipo == "dipendenti aziende/enti") {
      this.LabelRicerca("dipendenti");
      this.apiprotoService.getAllProtoRubricaDipendenti().subscribe((datadip) => {
        this.datadip = datadip;
        for (let i: any = 0; i < this.data.length; i++) {
          this.voci.push(this.datadip[i].nome + "*" + this.datadip[i].cognome + "*" + this.datadip[i].denominazione + "*" + this.datadip[i].idaz + "*" + this.datadip[i].struttura + "*" + this.datadip[i].idstrutt + "*a3*" + this.datadip[i].id);

        }
      }, error => console.error(error));

    }

    else if (this.rubricatipo == "") {
      this.apiprotoService.getAllOperatoriRubrica().subscribe((data) => {
        this.data = data;
        for (let i: any = 0; i < this.data.length; i++) {
          this.voci.push(this.data[i].nome + "*" + this.data[i].cognome + "*" + this.data[i].nome_azienda + "*g1*" + this.data[i].id);
        }
      }, error => console.error(error));

    }

    else {
      this.apiprotoService.getAllRubricaTipizzata(this.rubricatipo).subscribe((data) => {
        this.data = data;
        if (this.data != null) {
          for (let i: any = 0; i < this.data.length; i++) {
            this.voci.push(this.data[i].nome + "*" + this.data[i].cognome + "*" + this.data[i].indirizzo + "*" + this.data[i].comune + "*" + this.data[i].provincia + "*t1*" + this.data[i].id);

          }
        }
      }, error => console.error(error));

    }
  }

  popolAziende() {
    this.apiprotoService.getAllRubricaAziende().subscribe((data) => {
      this.mieaziende = data;
    });
  }

  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  assegnatari: Address[] = [];
  mittenti: Address[] = [];
  destinatari: Address[] = [];
  copiaconoscenza: Address[] = [];
  protoref: Address[] = [];

  Aggiungichip(valore) {
    this.mittenti.push({ name: valore });
    this.form.controls.mittenti.setValue(this.mittenti);
  }

  Aggiungichipasse(valore) {
    this.assegnatari.push({ name: valore });
    this.form.controls.assegnatari.setValue(this.assegnatari);
  }

  Aggiungichipassedesti(valore) {
    if (this.riporta == "si") {
      this.assegnatari.push({ name: valore });
      this.form.controls.assegnatari.setValue(this.assegnatari);
    }
  }

  Aggiungichipassemitt(valore) {
    if (this.riporta == "si") {
      this.assegnatari.push({ name: valore });
      this.form.controls.assegnatari.setValue(this.assegnatari);
    }
  }

  Aggiungichipdesti(valore) {
    this.destinatari.push({ name: valore });
    this.form.controls.destinatari.setValue(this.destinatari);
  }

  Aggiungichipmitt(valore) {
    this.mittenti.push({ name: valore });
    this.form.controls.mittenti.setValue(this.mittenti);
  }

  Aggiungichipcopia(valore) {
    this.copiaconoscenza.push({ name: valore });
    this.form.controls.copiaconoscenza.setValue(this.copiaconoscenza);
  }

  Aggiungichipprotoref(valore) {
    this.protoref.push({ name: valore });
    this.form.controls.protoref.setValue(this.protoref);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Aggiungiamo i mittenti
    if (value) {
      this.mittenti.push({ name: value });
      this.form.controls.mittenti.setValue(this.mittenti);
    }

  }

  addasse(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Aggiungiamo gli assegnatari
    if (value) {
      this.assegnatari.push({ name: value });
      this.form.controls.assegnatari.setValue(this.assegnatari);
    }

  }

  addesti(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Aggiungiamo i destinatari
    if (value) {
      this.destinatari.push({ name: value });
      this.form.controls.destinatari.setValue(this.destinatari);
    }

  }

  addmitt(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Aggiungiamo i destinatari
    if (value) {
      this.mittenti.push({ name: value });
      this.form.controls.mittenti.setValue(this.mittenti);
    }

  }


  addcopie(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Aggiungiamo gli assgnatari in copia
    if (value) {
      this.copiaconoscenza.push({ name: value });
      this.form.controls.copiaconoscenza.setValue(this.copiaconoscenza);
    }

  }

  addprotoref(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Aggiungiamo gli assgnatari in copia
    if (value) {
      this.protoref.push({ name: value });
      this.form.controls.protoref.setValue(this.protoref);
    }

  }

  remove(fruit: Address): void {
    const index = this.mittenti.indexOf(fruit);

    if (index >= 0) {
      this.mittenti.splice(index, 1);
      this.form.controls.mittenti.setValue(this.mittenti);
    }
  }


  removeasse(fruit: Address): void {
    const index = this.assegnatari.indexOf(fruit);
    if (index >= 0) {
      this.assegnatari.splice(index, 1);
      this.form.controls.assegnatari.setValue(this.assegnatari);
    }
  }

  removecopia(fruit: Address): void {
    const index = this.copiaconoscenza.indexOf(fruit);
    if (index >= 0) {
      this.copiaconoscenza.splice(index, 1);
      this.form.controls.copiaconoscenza.setValue(this.copiaconoscenza);
    }
  }

  removeprotoref(protocollo): void {
    const index = this.protoref.indexOf(protocollo);
    if (index >= 0) {
      this.protoref.splice(index, 1);
      this.form.controls.protoref.setValue(this.protoref);
    }
  }

  removedesti(fruit: Address): void {
    const index = this.destinatari.indexOf(fruit);
    const indexasse = this.assegnatari.findIndex(x => x.name === fruit.name);
    if (index >= 0) {
      this.destinatari.splice(index, 1);
      this.form.controls.destinatari.setValue(this.destinatari);
    }

    if (indexasse >= 0) {
      if (confirm("Vuoi togliere l'indirizzo anche dagli assegnatari?")) {
        this.assegnatari.splice(indexasse, 1);
        this.form.controls.assegnatari.setValue(this.assegnatari);
      }
    }
  }

  removedmitt(fruit: Address): void {
    const index = this.mittenti.indexOf(fruit);
    const indexasse = this.mittenti.findIndex(x => x.name === fruit.name);
    if (index >= 0) {
      this.mittenti.splice(index, 1);
      this.form.controls.mittenti.setValue(this.mittenti);
    }

    if (indexasse >= 0) {
      if (confirm("Vuoi togliere l'indirizzo anche dagli assegnatari?")) {
        this.assegnatari.splice(indexasse, 1);
        this.form.controls.assegnatari.setValue(this.assegnatari);
      }
    }
  }

  aggiungiVoce() {
    this.aggiungirubrica = "si";
    this.nomeinput = null;
    this.form.controls.nomeinput.setValue(null);
    this.cognomeinput = null;
    this.form.controls.cognomeinput.setValue(null);
    this.indirizzoinput = null;
    this.form.controls.indirizzoinput.setValue(null);
    this.comuneinput = null;
    this.form.controls.comuneinput.setValue(null);
    this.capinput = null;
    this.form.controls.capinput.setValue(null);
    this.statoinput = null;
    this.form.controls.statoinput.setValue(null);
    this.aziendainput = null;
    this.form.controls.aziendainput.setValue(null);
  }

  togliVoce() {
    this.aggiungirubrica = "no";
  }

  control_rubrica() {
    if (
      this.nomeinput != '' && this.nomeinput != null
      &&
      this.cognomeinput != '' && this.cognomeinput != null
      &&
      this.indirizzoinput != '' && this.indirizzoinput != null
      &&
      this.comuneinput != '' && this.comuneinput != null
      &&
      this.provinciainput != '' && this.provinciainput != null
      &&
      this.capinput != '' && this.capinput != null
      &&
      this.statoinput != '' && this.statoinput != null
    ) {
      return true;
    } else {
      return false;
    }
  }

  Aggiungivolante() {
    this.nomeinput = this.form.controls.nomeinput.value;
    this.cognomeinput = this.form.controls.cognomeinput.value;
    this.indirizzoinput = this.form.controls.indirizzoinput.value;
    this.comuneinput = this.form.controls.comuneinput.value;
    this.provinciainput = this.form.controls.provinciainput.value;
    this.capinput = this.form.controls.capinput.value;
    this.statoinput = this.form.controls.statoinput.value;
    this.aziendainput = this.form.controls.aziendainput.value;
    if(this.aziendainput==null){
      this.aziendainput=0;
    }

    if (this.control_rubrica()) {
      this.voci = [];
     // this.voci.push(this.nomeinput + "*" + this.cognomeinput + "*" + this.indirizzoinput + "*" + this.comuneinput + "*" + this.provinciainput + "*" + this.capinput + "*" + this.statoinput+"*"+this.aziendainput+"*v1");
      this.miavoce=this.nomeinput + "*" + this.cognomeinput + "*" + this.indirizzoinput + "*" + this.comuneinput + "*" + this.provinciainput + "*" + this.capinput + "*" + this.statoinput+"*"+this.aziendainput+"*v1";
      if (this.tipointerface == "Ingresso") {
        this.Aggiungichip(this.miavoce);
      } else if (this.tipointerface == "Uscita") {
        this.Aggiungichipdesti(this.miavoce);
      }
      this.aggiungirubrica = "no";
    } else {
      alert('Attenzione, compilare tutti i campi per aggiungere la voce');
    }
  }

  Salvavolante() {
    this.nomeinput = this.form.controls.nomeinput.value;
    this.cognomeinput = this.form.controls.cognomeinput.value;
    this.indirizzoinput = this.form.controls.indirizzoinput.value;
    this.comuneinput = this.form.controls.comuneinput.value;
    this.provinciainput = this.form.controls.provinciainput.value;
    this.capinput = this.form.controls.capinput.value;
    this.statoinput = this.form.controls.statoinput.value;
    this.aziendainput = this.form.controls.aziendainput.value;
    if(this.aziendainput==null){
      this.aziendainput=0;
    }
    
    if (this.control_rubrica() && this.aziendainput != null && this.aziendainput != '') {
      this.apiprotoService.AddVoceVolante(this.nomeinput, this.cognomeinput, this.indirizzoinput, this.comuneinput, this.provinciainput, this.capinput, this.statoinput, this.aziendainput).subscribe((dati) => {
        this.dati = dati['Esito'];
        if (this.dati == "si") {
          alert("Voce correttamente registrata");
          this.voci = [];
         // this.voci.push(this.nomeinput + "*" + this.cognomeinput + "*" + this.indirizzoinput + "*" + this.comuneinput + "*" + this.provinciainput + "*" + this.capinput + "*" + this.statoinput+"*"+this.aziendainput+"*v1");
          this.miavoce=this.nomeinput + "*" + this.cognomeinput + "*" + this.indirizzoinput + "*" + this.comuneinput + "*" + this.provinciainput + "*" + this.capinput + "*" + this.statoinput+"*"+this.aziendainput+"*v1";
          if (this.tipointerface == "Ingresso") {
            this.Aggiungichip(this.miavoce);
          } else if (this.tipointerface == "Uscita") {
            this.Aggiungichipdesti(this.miavoce);
          }
        }
        else {
          alert("Attenzione. Impossibile inserire il flusso");
        }
      });
    } else {
      alert('Attenzione, compilare tutti i campi per aggiungere la voce');
    }
    this.aggiungirubrica = "no";
  }




  PopolaTitolario() {

    this.filteredVocitito = this.controltito.valueChanges.pipe(
      startWith(''),
      map(value => this._filtertito(value))
    );
    this.apiprotoService.getAllTitolario().subscribe((data) => {
      this.data = data;
      for (let i: any = 0; i < this.data.length; i++) {
        this.vocitito.push(this.data[i].cod1 + "." + this.data[i].cod2 + "." + this.data[i].cod3 + "*" + this.data[i].descrizione + '*' + this.data[i].id);

      }
    }, error => console.error(error));
  }




  PopolaAssegnatari() {
    this.vociasse = [];
    this.filteredAssegnatari = new Observable();
    this.filteredAssegnatari = this.controllasse.valueChanges.pipe(
      startWith(''),
      map(value => this._filterasse(value))
    );
    this.assegnatipo = this.form.controls.assegnatipo.value;
    if (this.assegnatipo == 'operatori') {

      this.apiprotoService.getAllUsers().subscribe((data: any) => {
        if (this.tipointerface == 'Interno') {
          this.data = data.filter(x => x.id_azienda == this.id_azienda);
        } else {
          this.data = data;
        }
        for (let i: any = 0; i < this.data.length; i++) {
          this.vociasse.push(this.data[i].nome + '*' + this.data[i].cognome + '*' + this.data[i].CF + '*mail:' + this.data[i].email + "*d1*"+ this.data[i].id );

        }
      }, error => console.error(error));
    }
    if (this.assegnatipo == 'strutture') {

      this.apiprotoService.getAllStrutture(this.id_azienda).subscribe((data) => {
        this.data = data;
        for (let i: any = 0; i < this.data.length; i++) {
          this.vociasse.push(this.data[i].nome + '*mail:' + this.data[i].email  + "*d2*"+ this.data[i].id);

        }
      }, error => console.error(error));
    }

  }



  PopolaCopie() {
    this.vocicopia = [];
    this.filteredCopie = new Observable();
    this.filteredCopie = this.controlcopia.valueChanges.pipe(
      startWith(''),
      map(value => this._filtercopia(value))
    );
    this.copiatipo = this.form.controls.copiatipo.value;
    if (this.copiatipo == 'operatori') {

      this.apiprotoService.getAllUsers().subscribe((data: any) => {
        if (this.tipointerface == 'Interno') {
          this.data = data.filter(x => x.id_azienda == this.id_azienda);
        } else {
          this.data = data;
        }
        for (let i: any = 0; i < this.data.length; i++) {
          this.vocicopia.push(this.data[i].nome + '*' + this.data[i].cognome + '*' + this.data[i].CF + '*' + this.data[i].email +"*cc1*" + this.data[i].id);

        }
      }, error => console.error(error));
    }
    if (this.copiatipo == 'strutture') {

      this.apiprotoService.getAllStrutture(this.id_azienda).subscribe((data) => {
        this.data = data;
        for (let i: any = 0; i < this.data.length; i++) {
          this.vocicopia.push(this.data[i].nome + '*' + this.data[i].email+"*cc2*" + this.data[i].id);

        }
      }, error => console.error(error));
    }

  }

  PopolaProtoref() {
    this.vociprotoref = [];
    this.filteredProtoref = new Observable();
    this.filteredProtoref = this.controlprotoref.valueChanges.pipe(
      startWith(''),
      map(value => this._filterprotoref(value))
    );
    this.protoreftipo = this.form.controls.protoreftipo.value;

    this.apiprotoService.getAllProtoProtocollo().subscribe((data: any) => {
      this.data = data.filter(x => x.flusso == this.protoreftipo);

      for (let i: any = 0; i < this.data.length; i++) {
        this.vociprotoref.push(this.data[i].id + ' * ' + this.data[i].oggetto + ' - ' + this.data[i].descrizione);

      }
    }, error => console.error(error));

  }


  PopolaDestinatari(interno) {

    this.riporta = "si";
    this.vocidesti = [];
    this.filteredDestinatari = new Observable();
    this.filteredDestinatari = this.controldesti.valueChanges.pipe(
      startWith(''),
      map(value => this._filterdesti(value))
    );
    this.destinatipo = this.form.controls.destinatipo.value;
    if (this.destinatipo == 'operatori') {
      this.apiprotoService.getAllUsers().subscribe((data: any) => {
        if (interno) {
          this.data = data.filter(x => x.id_azienda == this.id_azienda);
        } else {
          this.data = data;
        }
        for (let i: any = 0; i < this.data.length; i++) {
          this.vocidesti.push(this.data[i].nome + '*' + this.data[i].cognome + '*' + this.data[i].CF + '*mail:' + this.data[i].email + "*w1*" + this.data[i].id);
        }
      }, error => console.error(error));
    }
    if (this.destinatipo == 'strutture') {
      this.apiprotoService.getAllStrutture(this.id_azienda).subscribe((data: any) => {

        this.data = data; //le strutture sono già selezionate come interne

        for (let i: any = 0; i < this.data.length; i++) {

          this.vocidesti.push(this.data[i].nome + '*mail:' + this.data[i].email + "*w2*"  + this.data[i].id);


        }
      }, error => console.error(error));
    }

    if (this.destinatipo == 'simbolici') {
      this.riporta = "no";
      this.apiprotoService.getAllProtoDestinatari().subscribe((data) => {
        this.data = data;
        for (let i: any = 0; i < this.data.length; i++) {
          this.vocidesti.push(this.data[i].nome + '*' + this.data[i].azienda + "*w3");

        }
      }, error => console.error(error));
    }


  }


  PopolaMittenti(interno) {
    this.riporta = "si";
    this.vocimitt = [];
    this.filteredMittenti = new Observable();
    this.filteredMittenti = this.controlmitt.valueChanges.pipe(
      startWith(''),
      map(value => this._filtermitt(value))
    );
    this.mittipo = this.form.controls.mittipo.value;
    if (this.mittipo == 'operatori') {
      this.apiprotoService.getAllUsers().subscribe((data: any) => {
        if (interno) {
          this.data = data.filter(x => x.id_azienda == this.id_azienda);
        } else {
          this.data = data;
        }
        for (let i: any = 0; i < this.data.length; i++) {
          this.vocimitt.push(this.data[i].nome + '*' + this.data[i].cognome + '*' + this.data[i].CF + '*mail:' + this.data[i].email+"*w1*"+this.data[i].id);

        }
      }, error => console.error(error));
    }
    if (this.mittipo == 'strutture') {
      this.apiprotoService.getAllStrutture(this.id_azienda).subscribe((data: any) => {

        this.data = data; //le strutture sono già selezionate come interne

        for (let i: any = 0; i < this.data.length; i++) {
          this.vocimitt.push(this.data[i].nome + '*mail:' + this.data[i].email+"*w2*"+this.data[i].id);
        }
      }, error => console.error(error));
    }

    if (this.mittipo == 'simbolici') {
      this.riporta = "no";
      this.apiprotoService.getAllProtoDestinatari().subscribe((data) => {
        this.data = data;
        for (let i: any = 0; i < this.data.length; i++) {
          this.vocimitt.push(this.data[i].nome+'*'+this.data[i].azienda+"*w3");
        }
      }, error => console.error(error));
    }


  }

  cambiariservatezza(valore) {
    this.riservatezza = valore;
    if (valore == 'riservato') {
      this.ristrettotipo = '';
      this.form.controls.ristrettotipo.setValue('');
    }
    else if (valore == 'ristretto') {
      this.riservatipo = '';
      this.form.controls.riservatipo.setValue('');
    }
    else {
      this.ristrettotipo = '';
      this.riservatipo = '';
      this.form.controls.ristrettotipo.setValue('');
      this.form.controls.riservatipo.setValue('');
    }
  }



  //FUNZIONE DI AGGIUNTA DESCRIZIONE ALLEGATI
  descriviallegati() {
    this.numbers_allegati = [];
    this.n_allegati = this.form.controls.n_allegati.value;
    if (this.n_allegati > 0) {
      this.appendiallegati = "si";
      for (let i = 0; i < this.n_allegati; i++) {
        this.numbers_allegati.push(i);
      }
    }
    else {
      this.appendiallegati = "no";
    }
  }

  //GESTIONE ARRAY DELLA DESCRIZIONE ALLEGATI
  Salvaallegati() {
    this.vociallegati = [];
    this.n_allegati = this.form.controls.n_allegati.value;
    if (this.n_allegati > 0) {
      for (let j = 0; j < this.n_allegati; j++) {
        let w = j + 1;
        let valoreall = (document.getElementById("descall" + w) as HTMLInputElement).value;
        if (valoreall != '') {
          this.vociallegati.push(valoreall);
        }
      }
    }
  }



  //FUNZIONE DI PROTOCOLLAZIONE
  Protocolla() {
    //controllo condizionale per evitare scritture ricorsive      
    if (this.n_scrittura < 2) {

      this.Salvaallegati();
      if (this.form.valid) {
        this.ristrettotipo = this.form.controls.ristrettotipo.value;
        this.riservatipo = this.form.controls.riservatipo.value;
        this.completo = "si";


        //QUI TUTTI I CONTROLLI FORMALI SUI CAMPI OPZIONALI
        if (this.riservatezza == 'riservato') {
          if (this.riservatipo == '') {
            alert("non hai inserito la motivazione di riservatezza");
            this.completo = "no";
          }
        }

        if (this.riservatezza == 'ristretto') {
          if (this.ristrettotipo == '') {
            alert("non hai inserito la motivazione di protocollo ristretto");
            this.completo = "no";
          }
        }

        //qui controlliamo che mittenti, destintari e assegnatari non siano vuoti

        if (this.mittenti.length == 0) {
          alert("Non hai inserito i mittenti");
          this.completo = "no";
        }

        if (this.destinatari.length == 0) {
          alert("Non hai inserito i destinatari");
          this.completo = "no";
        }

        if (this.assegnatari.length == 0) {
          alert("non hai inserito gli assegnatari");
          this.completo = "no";
        }

        //qui controlliamo che le descrizioni degli allegati non siano vuote in caso di n_allegati>0
        this.n_allegati = this.form.controls.n_allegati.value;
        if (this.n_allegati > 0) {
          if (this.vociallegati.length < this.n_allegati) {
            alert("non hai inserito una descrizione per tutti gli allegati indicati");
            this.completo = "no";
          }
        }

        if (this.completo == "si") {
          //console.log(this.form.value);
          this.apiprotoService.AddProtocollo(this.protocollo = this.form.value, this.vociallegati, this.user, this.id_user, this.id_azienda).subscribe((dati) => {
            this.dati = dati['Esito'];
            this.crypt = dati['Crypt'];
            if (this.dati != "no") {
              //incremento l'indice di passaggi in scrittura
              this.n_scrittura = this.n_scrittura + 1;
              let id_crypt = this.encryptData(this.dati);
              let navigationExtras: NavigationExtras = {
                queryParams: { 'id': id_crypt, 'crypt': this.crypt }
              };
              this.router.navigate(['/etichette'], navigationExtras);
            }
            else {
              alert("Attenzione. Impossibile registrare il protocollo");
            }
          });

        }

      } else {
        alert("Attenzione. Non tutti i campi obbligatori hanno un valore valido");
      }
    }

  }

  encryptData(data) {

    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString();
    } catch (e) {

    }
  }

  LabelRicerca(valore) {
    this.labelricerca = valore;
  }

}
