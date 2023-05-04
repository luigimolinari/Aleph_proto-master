import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from 'src/app/api.service';
import { ApiprotoService } from 'src/app/apiproto.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER, O } from '@angular/cdk/keycodes';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { faBookmark, faUserTag, faEye, faEyeSlash, faLowVision, faGlasses } from '@fortawesome/free-solid-svg-icons';
import { PageEvent } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';

export interface TableColumn {
  name: string;
  dataKey: string;
  position?: 'right' | 'left';
  isSortable?: boolean;
}

export interface Address {
  name: string;
}

@Component({
  selector: 'app-proto-pec',
  templateUrl: './proto-pec.component.html',
  styleUrls: ['./proto-pec.component.css'],
  providers: [DatePipe],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class ProtoPecComponent {


  faBookmark = faBookmark;
  faUserTag = faUserTag;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faLowVision = faLowVision;
  faGlasses = faGlasses;
  tableColumns: TableColumn[];
  columnsToDisplay: string[];
  data;
  dataSource;
  id_user;
  id_azienda;
  loading = true;
  expandedElement: null;
  showInfo = false;
  isDataLoaded = false;
  fileExtension;
  listIcon = ['pdf', 'png', 'ppt', 'txt', 'xml', 'jpg', 'doc', 'docx'];
  extIcon = [];

  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  to_address = [];
  pec_list = [];
  in_carico = [];
  to_protocollo = [];
  protocollate = [];
  pec_selected = 0;
  //titolario
  controltito = new FormControl();
  vocitito: string[] = [];
  filteredVocitito: Observable<string[]>;
  //mittenti
  mittenti: Address[] = [];
  controlmitt = new FormControl();
  vocimitt: string[] = [];
  filteredMittenti: Observable<string[]>;
  //assegnatari
  controllasse = new FormControl();
  vociasse: string[] = [];
  filteredAssegnatari: Observable<string[]>;
  //assegnatari
  assegnatari = [];
  assegnatari_id = [];
  assegnatipo;
  //copia conoscenza
  copiatipo;
  controlcopia = new FormControl();
  copiaconoscenza = [];
  vocicopia: string[] = [];
  filteredCopie: Observable<string[]>;
  //riservatezza
  riservatezza = "normale";
  riservatipo = '';
  ristrettotipo = '';
  protoriservatotipo;
  protoristrettotipo;

  myProtocolloForm: FormGroup;

  pageEvent: PageEvent;

  today = new Date();
  year = this.today.getFullYear();

  enable_associa = false;

  inboxprotoall;

  @ViewChild(MatPaginator, { static: false }) matPaginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) matSort: MatSort;

  @Output() sort: EventEmitter<Sort> = new EventEmitter();

  @ViewChild('toAddressInput') toAddressInput: ElementRef<HTMLInputElement>;


  constructor(private datepipe: DatePipe, private apiService: ApiService, private apiprotoService: ApiprotoService, public fb: FormBuilder, private route: ActivatedRoute, private router: Router) {

    this.id_user = JSON.parse(localStorage.getItem('ID'));
    this.id_azienda = JSON.parse(localStorage.getItem('id_azienda'));
    
    //POPOLO AUTOCOMPLETE
    this.PopolaAssegnatari();
    this.PopolaTitolario();
    this.PopolaCopie();

    //POPOLO OPTIONS DELLE SELECT
    this.apiprotoService.getAllProtoInbox().subscribe((dati) => {
      this.inboxprotoall = dati;
    });
    this.apiprotoService.getAllProtoRiservatezzaTipo("riservato").subscribe((dati) => {
      this.protoriservatotipo = dati;
    });

    this.apiprotoService.getAllProtoRiservatezzaTipo("ristretto").subscribe((dati) => {
      this.protoristrettotipo = dati;
    });

    //COSTRUZIONE FORM PROTOCOLLO
    this.myProtocolloForm = new FormGroup({
      inbox: new FormControl('', Validators.required),
      mittenti: new FormControl(''),
      oggetto: new FormControl(''),
      riservatipo: new FormControl(''),
      ristrettotipo: new FormControl(''),
      assegnatari: new FormControl(),
      assegnatipo: new FormControl(),
      copiatipo: new FormControl()
    });

    //COSTRUZIONE MAT-TABLE
    this.tableColumns = [
      { name: 'azione_seleziona', dataKey: 'azione_seleziona', isSortable: false },
      { name: 'data', dataKey: 'data', isSortable: true },
      { name: 'sender', dataKey: 'sender', isSortable: true },
      { name: 'oggetto', dataKey: 'oggetto', isSortable: true },
      { name: 'azione_protocollo', dataKey: 'azione_protocollo', isSortable: false }
    ];
    this.columnsToDisplay = ['azione_seleziona', 'data', 'sender', 'oggetto', 'azione_protocollo'];

    //INIZIALIZZO L'INTERFACCIA
    this.init();
  }

  reset_form(){
    this.mittenti = [];
    this.assegnatari = [];
    this.copiaconoscenza = [];
    this.controltito.setValue('');
    this.controllasse.setValue('');
    this.controlcopia.setValue('');


    this.myProtocolloForm.controls.inbox.setValue('');
    this.myProtocolloForm.controls.oggetto.setValue('');
    this.myProtocolloForm.controls.riservatipo.setValue('');
    this.myProtocolloForm.controls.ristrettotipo.setValue('');
    this.myProtocolloForm.controls.assegnatari.setValue('');
    this.myProtocolloForm.controls.assegnatipo.setValue('');
    this.myProtocolloForm.controls.copiatipo.setValue('');
  }

  init() {
    this.loading = true;

    this.reset_form();

    //reset PEC
    this.to_protocollo = [];
    this.pec_list = [];

    //cerco le pec gia protocollate o quelle in carico ad altri
    //to do: potrei fare questa ricerca direttamente nelle getmail... e rischia di essere  molto lento quando il numero di pec sarà alto
    this.apiprotoService.getProtoPec(this.id_user).subscribe((data: any) => {
      if (data != null) {
        this.protocollate = data.map(x => x.id_pec);
      } else {
        this.protocollate = [];
      }

      this.apiprotoService.getInCarico(this.id_user).subscribe((data: any) => {
        this.in_carico = data.map(x => x.id_pec);
        this.apiprotoService.getMail(this.id_user).subscribe((data) => {

          this.data = data['mexs'];

          for (let i = 0; i < this.data.length; i++) {

            if (this.in_carico.indexOf(this.data[i].message_id) != -1) {
              this.data[i].in_carico = true;
            } else {
              this.data[i].in_carico = false;
            }

            if (this.protocollate.indexOf(this.data[i].message_id) != -1) {
              this.data[i].en_check = false;
            } else {
              this.data[i].en_check = true;
              if (this.data[i].allegati != null) {
                for (let j = 0; j < this.data[i].allegati.length; j++) {
                  this.fileExtension = this.data[i].allegati[j].nome.split('.')[1];
                  if (this.listIcon.indexOf(this.fileExtension) == -1) {
                    this.fileExtension = 'file';
                  }
                  this.data[i].allegati[j]['pathIcon'] = "../assets/img/file_icons/" + this.fileExtension + ".png";
                }
              }
            }
          }

          this.data = this.data.sort((a, b) => <any>new Date(b.data) - <any>new Date(a.data));
          this.dataSource = new MatTableDataSource(this.data.filter(x => x.en_check == true));
          this.dataSource.paginator = this.matPaginator;
          this.dataSource.sort = this.matSort;
          this.loading = false;
          this.isDataLoaded = true;
        });
      });
    });

  }


  expand(e): void {
    this.expandedElement = this.expandedElement === e ? null : e;
    this.showInfo = false;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  checkbox_selection_event(e, event): void {
    this.expandedElement = this.expandedElement === e ? null : e;
    this.showInfo = false;

    //devo aggiungere la pec alla lista delle selezionate
    if (event) {
      let obj: any = new Object();
      obj.id = e.message_id;
      let e_data = new Date(e.data);
      let e_data_str = this.datepipe.transform(e_data, 'yyyy-MM-dd');
      obj.data = e_data_str;
      obj.ora = e_data.toLocaleTimeString()
      obj.oggetto = e.oggetto;
      obj.descrizione = e.testo;
      obj.allegati = e.allegati;
      obj.id_user = this.id_user;
      obj.senderaddress = e.senderaddress;
      obj.toaddress = e.toaddress;

      this.pec_list.push(obj);
    } else {
      this.pec_list.splice(this.pec_list.findIndex(x => x.id == e.message_id), 1);
    }

    if (this.pec_list.length == 1) {
      if (this.in_carico.indexOf(this.pec_list.map(x => x.id)[0]) != -1) {
        this.enable_associa = true;
      } else {
        this.enable_associa = false;
      }
    } else {
      this.enable_associa = false;
    }
  }


  checkbox_event(e, event): void {
    this.expandedElement = this.expandedElement === e ? null : e;
    this.showInfo = false;

    if (event) {
      let obj: any = new Object();
      obj.id = e.message_id;
      let e_data = new Date(e.data);
      let e_data_str = this.datepipe.transform(e_data, 'yyyy-MM-dd');

      obj.data = e_data_str;
      obj.ora = e_data.toLocaleTimeString()
      obj.oggetto = e.oggetto;
      obj.descrizione = e.testo;
      obj.allegati = e.allegati;
      obj.id_user = this.id_user;
      obj.senderaddress = e.senderaddress;
      obj.toaddress = '|' + e.toaddress + '*p1';

      this.to_protocollo.push(obj);
      this.pec_selected = this.to_protocollo.length;
    } else {
      this.to_protocollo.splice(this.to_protocollo.findIndex(x => x.id == e.message_id), 1);
      this.pec_selected = this.to_protocollo.length;
    }

    if (this.pec_selected == 1) {
      this.mittenti = [];
      /* this.mittenti.push({ name: this.to_protocollo[0].senderaddress+'*p1' }); //p1 codice per mittenti e destinatari pec  */
      this.mittenti.push({ name: this.to_protocollo[0].senderaddress });
      this.myProtocolloForm.controls.oggetto.setValue(this.to_protocollo[0].oggetto);
    }
  }

  cambiariservatezza(valore) {
    this.riservatezza = valore;
    if (valore == 'riservato') {
      this.ristrettotipo = '';
      this.myProtocolloForm.controls.ristrettotipo.setValue('');
    }
    else if (valore == 'ristretto') {
      this.riservatipo = '';
      this.myProtocolloForm.controls.riservatipo.setValue('');
    }
    else {
      this.ristrettotipo = '';
      this.riservatipo = '';
      this.myProtocolloForm.controls.ristrettotipo.setValue('');
      this.myProtocolloForm.controls.riservatipo.setValue('');
    }
  }

  protocolla() {
    this.ristrettotipo = this.myProtocolloForm.controls.ristrettotipo.value;
    this.riservatipo = this.myProtocolloForm.controls.riservatipo.value;
    let oggetto = this.myProtocolloForm.controls.oggetto.value;
    let inbox = this.myProtocolloForm.controls.inbox.value;

    let cntrl;
    let cntrl_riservatezza = true;
    //QUI TUTTI I CONTROLLI FORMALI SUI CAMPI OPZIONALI
    if (this.riservatezza == 'riservato') {
      if (this.riservatipo == '') {
        alert("non hai inserito la motivazione di riservatezza");
        cntrl_riservatezza = false;
      }
    }

    if (this.riservatezza == 'ristretto') {
      if (this.ristrettotipo == '') {
        alert("non hai inserito la motivazione di protocollo ristretto");
        cntrl_riservatezza = false;
      }
    }

    if (this.myProtocolloForm.valid && this.mittenti.length != 0 && this.controltito.value != null && this.controltito.value != '' && this.controltito.value != undefined && this.assegnatari.length != 0 && cntrl_riservatezza) {
      cntrl = true;
    } else {
      cntrl = false;
      alert('Form non valido!');
    }

    if (cntrl) {
      let mittenti_codificati = [];
      this.mittenti.forEach(element => {
        mittenti_codificati.push({ name: element.name + '*p1' });
      });

      for (let i = 0; i < this.assegnatari.length; i++) {
        this.assegnatari_id.push(this.assegnatari[i].name.split("*")[1]);
      }


      this.apiprotoService.AddProtoPec(this.to_protocollo, this.controltito.value, mittenti_codificati, this.assegnatari, this.copiaconoscenza, inbox, this.ristrettotipo, this.riservatipo, oggetto).subscribe((data) => {
        if (data != null) {
          alert(data['Esito']);
          if (data['esito_codice'] != '0') {
            this.refresh();
          }
        }
      });
    }
  }


  refresh() {
    this.init();
  }

  showInfoControl(): void {
    this.showInfo = !this.showInfo;
  }

  downloadFile(path): void {
    this.apiprotoService.downloadDocumento(path).subscribe(data => {
      let blob = new Blob([data], { type: data.type });
      var fileURL = URL.createObjectURL(blob);
      window.open(fileURL);
    });
  }

  /////////////////////////////////// POPOLA (DA CODICE LUIGI)

  PopolaTitolario() {
    this.filteredVocitito = this.controltito.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, this.vocitito))
    );
    this.apiprotoService.getAllTitolario().subscribe((data) => {
      this.data = data;
      for (let i: any = 0; i < this.data.length; i++) {
        this.vocitito.push(this.data[i].cod1 + "." + this.data[i].cod2 + "." + this.data[i].cod3 + " - " + this.data[i].descrizione + '*' + this.data[i].id);

      }
    }, error => console.error(error));
  }

  PopolaAssegnatari() {
    this.vociasse = [];
    this.filteredAssegnatari = new Observable();
    this.filteredAssegnatari = this.controllasse.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, this.vociasse))
    );
    if (this.assegnatipo == 'operatori') {

      this.apiprotoService.getAllUsers().subscribe((data) => {
        this.data = data;
        for (let i: any = 0; i < this.data.length; i++) {
          this.vociasse.push(this.data[i].nome + '*' + this.data[i].cognome + '*' + this.data[i].CF + '*mail:' + this.data[i].email + "*d1*" + this.data[i].id);

        }
      }, error => console.error(error));
    }
    if (this.assegnatipo == 'strutture') {

      this.apiprotoService.getAllStrutture(this.id_azienda).subscribe((data) => {
        this.data = data;
        for (let i: any = 0; i < this.data.length; i++) {
          this.vociasse.push(this.data[i].nome + '*mail:' + this.data[i].email + "*d2*" + this.data[i].id);
        }
      }, error => console.error(error));
    }

  }

  PopolaCopie() {
    this.vocicopia = [];
    this.filteredCopie = new Observable();
    this.filteredCopie = this.controlcopia.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, this.vocicopia))
    );

    if (this.copiatipo == 'operatori') {

      this.apiprotoService.getAllUsers().subscribe((data: any) => {

        this.data = data;

        for (let i: any = 0; i < this.data.length; i++) {
          this.vocicopia.push(this.data[i].nome + '*' + this.data[i].cognome + '*' + this.data[i].CF + '*' + this.data[i].email + "*cc1*" + this.data[i].id);

        }
      }, error => console.error(error));
    }
    if (this.copiatipo == 'strutture') {

      this.apiprotoService.getAllStrutture(this.id_azienda).subscribe((data) => {
        this.data = data;
        for (let i: any = 0; i < this.data.length; i++) {
          this.vocicopia.push(this.data[i].nome + '*' + this.data[i].email + "*cc2*" + this.data[i].id);

        }
      }, error => console.error(error));
    }

  }


  /////////////////////////////////// FUNZIONI BUTTON

  write_pec() {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'from': 'protopec' }
      };
    this.router.navigate(['writepec'], navigationExtras);
  }

  prendi_in_carico() {
    let pec_id_list = this.pec_list.map(x => x.id);
    if (confirm('Confermi di prendere in carico la protocollazione delle pec selezionate?')) {
      this.apiprotoService.AddProtoPecSerie(pec_id_list, this.id_user).subscribe((data: any) => {
        alert(data['Esito']);
        this.init();
      }, error => console.error(error));
    }
  }

  rilascia_carico_all() {
    if (confirm('Confermi di rilasciare tutto il carico che hai preso in precedenza?')) {
      this.apiprotoService.DeleteProtoPecSerieAll(this.id_user).subscribe((data: any) => {
        alert(data['Esito']);
        this.init();
      }, error => console.error(error));
    }
  }

  rilascia_carico_single() {
    let pec_id_list = this.pec_list.map(x => x.id);
    if (confirm('Confermi di rilasciare le mail selezionate?')) {
      this.apiprotoService.DeleteProtoPecSerieSingle(pec_id_list, this.id_user).subscribe((data: any) => {
        alert(data['Esito']);
        this.init();
      }, error => console.error(error));
    }
  }

  reset_carico() {
    if (confirm('Vuoi annullare tutte le prese in carico degli operatori?')) {
      this.apiprotoService.DeleteProtoPecSerie().subscribe((data: any) => {
        alert(data['Esito']);
        this.init();
      }, error => console.error(error));
    }
  }

  associa_request() {

    // Per i messaggi del tipo:
    // CONSEGNA: AOUP XXXXX/2022 trasmissione protocollo
    // ACCETTAZIONE: AOUP XXXXX/2022 trasmissione protocollo
    // è necessario rintracciare XXXXX e salvare la pec (con i suoi allegati) come docs del protocollo XXXXX

    let pec_selected_oggetto = this.pec_list.map(x => x.oggetto)[0];
    pec_selected_oggetto = pec_selected_oggetto.replace(/\s/g, '');

    let exp_accettazione = new RegExp("^ACCETTAZIONE:AOUP(?:[0-9]){1,10}[/]" + this.year + "trasmissioneprotocollo$");
    let exp_consegna = new RegExp("^CONSEGNA:AOUP(?:[0-9]){1,10}[/]" + this.year + "trasmissioneprotocollo$");

    let start = new RegExp("(?:[0-9])");
    let start_idx = pec_selected_oggetto.search(start);

    let end = new RegExp("[/]");
    let end_idx = pec_selected_oggetto.search(end);

    if (pec_selected_oggetto.search(exp_accettazione) != -1) {
      let num_protocollo = pec_selected_oggetto.substring(start_idx, end_idx);
      if (confirm('Vuoi associare la ricevuta di accettazione e i suoi allegati al protocollo ' + num_protocollo + ' ?')) {
        //associa al protocollo come ricevuta
        this.associa(num_protocollo, 'A');
      }

    } else if (pec_selected_oggetto.search(exp_consegna) != -1) {
      let num_protocollo = pec_selected_oggetto.substring(start_idx, end_idx);
      if (confirm('Vuoi associare la ricevuta di consegna e i suoi allegati al protocollo ' + num_protocollo + ' ?')) {
        //associa al protocollo come ricevuta
        this.associa(num_protocollo, 'C');
      }

    } else {
      alert('Messaggio non associabile ad alcun protocollo');
    }
  }

  associa(num_protocollo, tipo_ricevuta) {
    //devo associare la pec selezionata al protocollo con numero = num_protocollo
    let pec_id_selected = this.pec_list.map(x => x.id)[0];
    let allegati = this.pec_list.map(x => x.allegati)[0];
    this.apiprotoService.AddProtoRicevuta(pec_id_selected, allegati, num_protocollo, tipo_ricevuta, this.id_user).subscribe((data: any) => {
      alert(data['Esito']);
      this.init();
    }, error => console.error(error));
  }


  /////////////////////////////////// AUTOCOMPLETE

  private _filter(value: string, array: string[]): string[] {
    const filterValuetito = this._normalizeValue(value);
    return array.filter(titolari => this._normalizeValue(titolari).includes(filterValuetito));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  /////////////////////////////////// RESET FIELD

  reset_field(control) {
    control.setValue('');
  }

  /////////////////////////////////// GESTIONE CHIPS
  remove_chip(item, from): void {
    const index = from.indexOf(item);
    if (index >= 0) {
      from.splice(index, 1);
    }
  }

  add_chip(valore, to, control) {
    valore = valore.trim();
    if (valore != '') {
      to.push({ name: valore });
    }
    this.reset_field(control);
  }

  /////////////////////////////////// ORDINAMENTO PER DATA

  sortTable(sortParameters: Sort) {
    // defining name of data property, to sort by, instead of column name
    sortParameters.active = this.tableColumns.find(column => column.name === sortParameters.active).dataKey;
    //this.sort.emit(sortParameters);

    const data = this.data.slice();
    if (!sortParameters.active || sortParameters.direction === '') {
      this.data = data;
      return;
    }

    if (sortParameters.direction === 'asc') {
      this.data = data.sort((a, b) => <any>new Date(a.data) - <any>new Date(b.data));
    } else {
      this.data = data.sort((a, b) => <any>new Date(b.data) - <any>new Date(a.data));
    }

    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.matPaginator;
    this.dataSource.sort = this.matSort;

  }

}
