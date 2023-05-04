/**
 * lo stesso componente è usato nel contesto di pratiche e procedure
 * */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';
import { faEye, faDownload, faSignature, faEdit, faTrash, faPen, faCalendarAlt, faLongArrowAltUp, faLongArrowAltDown, faShare } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl } from '@angular/forms';
import { Socket } from 'ngx-socket-io';



@Component({
  selector: 'app-documenti-view',
  templateUrl: './documenti-view.component.html',
  styleUrls: ['./documenti-view.component.css']
})
export class DocumentiViewComponent {

  faEye = faEye;
  faDownload = faDownload;
  faSignature = faSignature;
  faEdit = faEdit;
  faTrash = faTrash;
  faPen = faPen;
  faCalendar = faCalendarAlt;
  faLongArrowAltUp = faLongArrowAltUp;
  faLongArrowAltDown = faLongArrowAltDown;
  faShare = faShare;
  operatore;
  dati;
  firmatari: any = [];
  procedura;
  workflow;
  privilegi;
  gruppo;
  docItem;
  docs: any = [];
  isSelected = false;
  dati_filtered;
  fGroup;
  /* findDoc; */
  doc_selected_from_archivie;
  loading = true;
  sorting = 'asc';
  nome;
  cognome;
  nomecognome;
  user_on_doc;
  documentstatus;
  conditionalAsyncResult;

  pratica;

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute, private socket: Socket) {


    this.operatore = JSON.parse(localStorage.getItem('ID'));
    this.nome = JSON.parse(localStorage.getItem('nome'));
    this.cognome = JSON.parse(localStorage.getItem('cognome'));
    this.nomecognome = this.nome + ' ' + this.cognome;


    this.fGroup = new FormGroup({
      findDoc: new FormControl()
    });

    this.route.queryParams.subscribe(
      params => {
        this.procedura = params['id_procedura'];
        this.pratica = params['id_pratica'];

        this.workflow = params['id_workflow'];
        this.privilegi = params['p'];
        this.gruppo = params['gruppo'];
        this.doc_selected_from_archivie = params['descrizione']; 

        if(this.procedura!=undefined){
          this.init_procedura();
        }
        else{
          this.init_pratica();
        }

      });


    if (this.socket.connect()) {

    };

  }

  init_pratica():void{
    this.apiService.getAllDocumentoPratica(this.pratica, this.workflow, this.operatore,this.gruppo).subscribe((dati: any) => {
      this.dati = dati;
      this.apiService.getAllFirmatariPratica(this.pratica, this.workflow, this.gruppo).subscribe((firmatari: any) => {
        this.firmatari = firmatari;
        if (this.dati != null) {
          for (let i = 0; i < this.dati.length; i++) {
            this.dati[i].firma_isreq = false;
            this.dati[i].firmatariShow = false;
            if (this.firmatari != null) {
              if (this.firmatari.length > 0) {
                if (this.firmatari.findIndex(x => x.id === this.dati[i].id) != -1) {
                  this.dati[i].firmatari = this.firmatari.filter(x => x.id === this.dati[i].id);
                  this.dati[i].firma_isreq = true;
                  this.dati[i].firmatariShow = true;
                }
              }
            }
          }
        }
        this.loading = false;
        this.dati_filtered = this.dati;
        if (this.doc_selected_from_archivie != undefined) {
          this.fGroup.controls['findDoc'].setValue(this.doc_selected_from_archivie);
          this.cerca_doc(this.doc_selected_from_archivie);
        }
      });
    });
  }


  init_procedura(): void{
    //getAllDocumento: recupera tutti i documenti relativi allo step del workflow selezionato
    //getAllFirmatari: recupera tutti i firmatari previsti per ogni documento relativo allo step del workflow selezionato

    this.apiService.getAllDocumento(this.procedura, this.workflow, this.operatore, this.gruppo).subscribe((dati: any) => {
      this.dati = dati;
      this.apiService.getAllFirmatari(this.procedura, this.workflow, this.gruppo).subscribe((firmatari: any) => {
        this.firmatari = firmatari;
        if (this.dati != null) {
          for (let i = 0; i < this.dati.length; i++) {
            this.dati[i].firma_isreq = false;
            this.dati[i].firmatariShow = false;
            if (this.firmatari != null) {
              if (this.firmatari.length > 0) {
                if (this.firmatari.findIndex(x => x.id === this.dati[i].id) != -1) {
                  this.dati[i].firmatari = this.firmatari.filter(x => x.id === this.dati[i].id);
                  this.dati[i].firma_isreq = true;
                  this.dati[i].firmatariShow = true;
                }
              }
            }
          }
        }
        this.loading = false;
        this.dati_filtered = this.dati;
        if (this.doc_selected_from_archivie != undefined) {
          this.fGroup.controls['findDoc'].setValue(this.doc_selected_from_archivie);
          this.cerca_doc(this.doc_selected_from_archivie);
        }
      });

    });
  }

  downloadFile(path): void {
    this.apiService.downloadDocumento(path).subscribe(data => {
      let blob = new Blob([data], { type: data.type });
      var fileURL = URL.createObjectURL(blob);
      window.open(fileURL);
    });
  }

  toSign(id_doc, path_doc, path_doc_firmato, selected): void {
    if (selected) {
      this.docItem = new Object();
      this.docItem.id = id_doc;
      if (path_doc_firmato == '' || path_doc_firmato == null || path_doc_firmato == undefined) {
        this.docItem.path = path_doc.substring(path_doc.indexOf('../') + 3);
        this.docItem.signed = '0';
      }
      else {
        this.docItem.path = path_doc_firmato.substring(path_doc_firmato.indexOf('../') + 3);
        this.docItem.signed = '1';
      }
      this.docs.push(this.docItem);
      console.log(this.docs);
    } else {
      this.docs = this.docs.filter(function (el) { return el.id != id_doc; });
    }
    this.isSelected = this.docs.length > 0 ? true : false;
  }

  firmaAll() {
    this.router.navigate(['firma', { data: JSON.stringify(this.docs) }]);
  }

  annulla(id) {
    if (confirm('Vuoi davvero cancellare questo documento?')) {
      this.apiService.DeleteDoc(id).subscribe(data => {
        alert(data["Esito"]);
        this.refresha();
      });
    }
  }

  invia_pec(id) {
    if (confirm('Vuoi inviare il documento come allegato tramite PEC?')) {
      let navigationExtras: NavigationExtras;
      if(this.procedura!=undefined){
        navigationExtras = {
          queryParams: {from: 'documentiview', 'id': id, 'id_procedura': this.procedura, 'id_workflow': this.workflow, 'gruppo': this.gruppo, 'privilegi': this.privilegi }
        };
      }else{
        navigationExtras = {
          queryParams: {from: 'documentiview', 'id': id, 'id_pratica': this.pratica, 'id_workflow': this.workflow, 'gruppo': this.gruppo, 'privilegi': this.privilegi }
        };
      }
      
      this.router.navigate(['writepec'], navigationExtras);
    }
  }

  refresha() {
      if(this.procedura!=undefined){
        this.init_procedura();
      }else{
        this.init_pratica();
      }  
  }


  firmaSingle(id_doc, path_doc, path_doc_firmato) {
    this.docItem = new Object();
    this.docItem.id = id_doc;
    if (path_doc_firmato == '' || path_doc_firmato == null || path_doc_firmato == undefined) {
      this.docItem.path = path_doc.substring(path_doc.indexOf('../') + 3);
      this.docItem.signed = '0';
    }
    else {
      this.docItem.path = path_doc_firmato.substring(path_doc_firmato.indexOf('../') + 3);
      this.docItem.signed = '1';
    }
    this.router.navigate(['firma', { data: JSON.stringify([this.docItem]) }]);
  }

  hideCard(id_el) {
    this.dati.find(x => x.id == id_el).firmatariShow = !this.dati.find(x => x.id == id_el).firmatariShow;
  }

  cerca_doc(input_doc) {
    if (this.dati != null) {
      this.dati_filtered = this.dati.filter(x => x.descrizione != null ? x.descrizione.toUpperCase().includes(input_doc.toUpperCase()) : '');
    }
  }

  sort_doc() {
    if (this.sorting == 'asc') {
      this.dati_filtered = this.dati_filtered.sort((a, b) => b.giorno_date.localeCompare(a.giorno_date));
      this.sorting = 'desc';
    }
    else {
      this.dati_filtered = this.dati_filtered.sort((a, b) => a.giorno_date.localeCompare(b.giorno_date));
      this.sorting = 'asc';
    }
  }


  apridoc(id, procedura) {
    let myrouter = this.router;
    this.socket.emit('richiedi', id, this.nomecognome);
    this.socket.on('documentstatus', function (documentstatus) {

      //  alert(documentstatus);
      this.documentstatus = documentstatus;
      alert(documentstatus);


      this.lanciadoc(id, procedura);

    });
  }

  //alert(documentstatus);
  lanciadoc(id, procedura) {
    if (this.documentstatus === '0') {
      let navigationExtras: NavigationExtras = {
        queryParams: { 'id': id, 'procedura': procedura }
      };
      this.router.navigate(['editspreadsheet'], navigationExtras);

    } else {
      alert("non puoi accedere");
    }
  }


  getConditionalDataUsingAsync(id, procedura) {
    this.socket.emit('richiedi', id, this.nomecognome);
    return new Promise(resolve => {
      this.socket.on('documentstatus', function (documentstatus) {
        setTimeout(() => {
          resolve(documentstatus);
        }, 2000);
      });
    });
  }


  getValueWithPromise(id, procedura) {
    this.getConditionalDataUsingAsync(id, procedura).then(value => {
      if (value === '0') {
        let navigationExtras: NavigationExtras = {
          queryParams: { 'id': id, 'procedura': procedura }
        };
        this.router.navigate(['editspreadsheet'], navigationExtras);
      } else {
        alert(`Il documento è in modifica da parte di ${value}`);
        this.socket.emit('bussa', id, this.nomecognome);
      }
    });
  }

  getValueWithPromise_doc(id, procedura) {
    this.getConditionalDataUsingAsync(id, procedura).then(value => {
      if (value === '0') {
        let navigationExtras: NavigationExtras = {
          queryParams: { 'id': id }
        };
        this.router.navigate(['editmodello'], navigationExtras);
      } else {
        alert(`Il documento è in modifica da parte di ${value}`);
        this.socket.emit('bussa', id, this.nomecognome);
      }
    });
  }

  back():void{
    if(this.procedura!=undefined){
      let navigationExtras: NavigationExtras = {
        queryParams: { 'procedura': this.procedura,'gruppo':this.gruppo}
      };
      this.router.navigate(['workflowprocedura'], navigationExtras);
    }
    else{
      let navigationExtras: NavigationExtras = {
        queryParams: { 'id_pratica': this.pratica,'gruppo':this.gruppo}
      };
      this.router.navigate(['workflowpratica'], navigationExtras);
    }
  }

  edit_doc(id):void{
    let navigationExtras: NavigationExtras = {
      queryParams: {'id':id,'privilegi':this.privilegi}
    };
    if(this.procedura!=undefined){
      this.router.navigate(['editdocumento'], navigationExtras);
    }
    else{
      this.router.navigate(['editdocumentopratica'], navigationExtras);
    }
  }

}
