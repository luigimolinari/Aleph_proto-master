import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-edit-validazione',
  templateUrl: './edit-validazione.component.html',
  styleUrls: ['./edit-validazione.component.css']
})
export class EditValidazioneComponent implements OnInit {

  panelOpenState = true;
  form: FormGroup;
  dati;
  id;
  validazione = 0;
  gruppo_procedura;
  item;

  //tutti gli operatori del gruppo:
  allGroup = [];

  //tutti gli operatori già assegnati alla validazione:
  firmatariOriginali = [];

  //operatori disponibili:
  todo = [];

  //nuovi operatori da assegnare:
  done = [];

  //valore precedente all'operazione di modifica per alla_firma e validazione
  allafirmaOriginale;

  listGroup;
  idSelectedGroup;
  allafirmaChange;
  firmatariChange;
  gruppoChange;
  orderChange;
  id_firma;
  ordine;
  orderedList;
  orderedCheck;
  controlAllGroup;
  controlOrder;
  deletedOp: any;
  addedOp: any;
  signedOp: any;
  activeNumIndex: any;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(
      params => {
        this.id = params['id'];
      });

    this.form = this.formBuilder.group({
      validazione: new FormControl('', Validators.required),
      gruppo_procedura: new FormControl(''),
      findOp : new FormControl('')

    });

    //recupero le info del documento da modificare
    this.apiService.getSingleDoc(this.id).subscribe((data) => {

      this.dati = data;

      if (this.dati[0].firma != null) {
        this.validazione = 1;
        this.id_firma = this.dati[0].firma
      }

      this.allafirmaOriginale = this.validazione;

      //popolazione opzioni gruppo
      this.apiService.getProceduraGruppoProcedura(this.dati[0].id_procedura).subscribe((dati) => {
        this.listGroup = dati;
      });

      //gruppo originale
      if (this.dati[0].gruppo != undefined) {
        this.form.patchValue(this.gruppo_procedura = this.dati[0].gruppo);

        this.idSelectedGroup = this.gruppo_procedura;

        //se anche un solo operatore ha ordine 0 allora non cè ordine nella validazione
        this.orderedList = this.dati[0].ordine == 0 ? false : true;
        //se cè ordine nella validazione seleziono la checkbox "rispetta l'ordine"
        this.controlOrder = this.dati[0].ordine == 0 ? false : true;

        for (let i = 0; i < this.dati.length; i++) {
          this.item = new Object();
          this.item.id_operatore = this.dati[i].firmatari;
          this.item.ordine = this.dati[i].ordine;
          this.item.nome = this.dati[i].nome;
          this.item.cognome = this.dati[i].cognome;
          this.item.id_gruppo = this.dati[i].gruppo;
          this.item.ruolo = this.dati[i].ruolo;
          this.firmatariOriginali.push(this.item);
          //i firmatari orginali sono quelli che inizialmente popolano l'array done
          this.done.push(this.item);
        }

        //lista degli operatori associati a quel gruppo procedura
        this.apiService.getOperatoreGruppoProcedura(this.dati[0].gruppo).subscribe((dati: any) => {

          if (dati != null) {
            for (let i = 0; i < dati.length; i++) {
              this.item = new Object();
              this.item.id_operatore = dati[i].id_operatore;
              this.item.nome = dati[i].nome;
              this.item.cognome = dati[i].cognome;
              this.item.id_gruppo = dati[i].id_gruppo;
              console.log(this.item.id_gruppo);
              this.item.ruolo = dati[i].ruolo;
              this.allGroup.push(this.item);
              //se non compaiono tra i firmatari, li inserisco nella lista todo
              if (this.done.find(x => x.id_operatore === dati[i].id_operatore) == undefined) {
                this.todo.push(this.item);
              }
            }
          }
        });
      }
    });

  }


  Trasmetti(): void {
    this.addedOp = [];
    this.deletedOp = [];

    //allafirmaChange esprime il cambiamento della richiesta di validazione per il documento in oggetto
    //-> ogni cambiamento a riguardo deve comporare la sovrascrittura delle regole di validazione
    this.allafirmaChange = this.validazione == this.allafirmaOriginale ? 0 : 1;

    //gruppoChange esprime il cambiamento del gruppo procedura selezionato
    this.gruppoChange = this.idSelectedGroup == this.dati[0].gruppo ? 0 : 1;

    //orderChange esprime il cambiamento nella richicesta di rispetto dell'ordine. cioè il passaggio da una lista ordinata ad una non ordinata e viceversa
    this.orderChange = this.orderedList != this.controlOrder;

    //firmatariChange esprime la modifica degli operatori firmatari
    //se la lista è ordinata devo controllare sia il contenuto sia ordine -> confronto gli oggetti
    //se la lista non è ordinata posso confrontare solo il contenuto, per capire se sono stati aggiunti o eliminati operatori
    if (this.controlOrder) {
      this.firmatariChange = JSON.stringify(this.done) == JSON.stringify(this.firmatariOriginali) ? 0 : 1;
    }
    else {
      // operatori eliminati dalla lista dei firmatari
      for (let i = 0; i < this.firmatariOriginali.length; i++) {
        if (this.done.find(x => x.id_operatore === this.firmatariOriginali[i].id_operatore) == undefined) {
          this.deletedOp.push(this.firmatariOriginali[i]);
        }
      }

      // operatori aggiunti alla lista dei firmatari
      for (let i = 0; i < this.done.length; i++) {
        if (this.firmatariOriginali.find(x => x.id_operatore === this.done[i].id_operatore) == undefined) {
          this.addedOp.push(this.done[i]);
        }
      }

      if (this.addedOp.length == 0 && this.deletedOp.length == 0) {
        this.firmatariChange = 0;
      } else {
        this.firmatariChange = 1;
      }


    }


    /*
    Se Aggiungo Operatori in una lista non ordinata
    o
    Se Elimino operatori in una lista non ordinata (nè prima della modifca nè dopo), i quali ancora non hanno firmato il documento
    NON è necessario sovrascrivere le regole di validazione, ma solo aggiornarle e così NON SARANNO RICHIESTE LE FIRME DEGLI OPEATORI CHE GIA L'HANNO APPOSTA

    caso 1 - ho modificato allafirma richiedendo la validazione di un documento precedentemente non richiesta 
             (this.allafirmaChange == 1 && this.validazione == 1)
             ----> ADD-VALIDAZIONE

    caso 2 - ho modificato allafirma eliminando la richiesta di validazione di un documento precedentemente dichiarata necessaria 
             (this.allafirmaChange == 1 && this.validazione == 0)
             ----> DELETE-VALIDAZIONE

    caso 3 - nessuna modifica di allafirma (validazione richiesta) ma modifica del gruppo procedura 
             (this.allafirmaChange == 0 && this.validazione == 1 && this.gruppoChange ==1)
             ----> UPDATE-VALIDAZIONE (DELETE + ADD)
    
    caso 4 - nessuna modifica di allafirma (validazione richiesta) nè del gruppo procedura, ma richiesto il rispetto dell'ordine degli operatori nell'apposizione della firma
             (this.allafirmaChange == 0 && this.validazione == 1 && this.gruppoChange ==0 && this.controlOrder == true)
             ----> UPDATE-VALIDAZIONE (DELETE + ADD)
    
    caso 5 - nessuna modifica di allafirma (validazione richiesta) nè del gruppo procedura, e non richiesto il rispetto dell'ordine degli operatori nell'apposizione della firma
             + c è la modifica della richiesta di rispetto Ordine
             (this.allafirmaChange == 0 && this.validazione == 1 && this.gruppoChange ==0 && this.controlOrder == false && this.orderChange == true)
            ----> UPDATE-VALIDAZIONE (DELETE + ADD)

    caso 6 - nessuna modifica di allafirma (validazione richiesta) nè del gruppo procedura, e non richiesto il rispetto dell'ordine degli operatori nell'apposizione della firma
             + non c è la modifica della richiesta di rispetto Ordine
             + non ci sono operatori cancellati
             (this.allafirmaChange == 0 && this.validazione == 1 && this.gruppoChange ==0 && this.controlOrder == false &&  this.orderChange == false  && this.deletedOp == 0)
             ----> ADD-VALIDAZIONE di addedOp
             (IN QUESTO CASO NON SARANNO RICHIESTE LE FIRME DEGLI OPEATORI CHE GIA L'HANNO APPOSTA)
    
    caso 7 - nessuna modifica di allafirma (validazione richiesta) nè del gruppo procedura, e non richiesto il rispetto dell'ordine degli operatori nell'apposizione della firma
             + non c è la modifica della richiesta di rispetto Ordine
             + ci sono operatori cancellati
             (this.allafirmaChange == 0 && this.validazione == 1 && this.gruppoChange ==0 && this.controlOrder == false &&  this.orderChange == false && this.deletedOp != 0)
			 Devo controllare se tra questi ci sono operatori che hanno firmato: 
             se si ----> UPDATE-VALIDAZIONE
			       se no ----> DELETE-VALIDAZIONE  di deletedOp (IN QUESTO CASO NON SARANNO RICHIESTE LE FIRME DEGLI OPEATORI CHE GIA L'HANNO APPOSTA)

    
      
             
    */


    if (this.validazione == 1 && (this.gruppo_procedura == undefined || this.gruppo_procedura == null || this.done.length == 0)) {

      alert('Attenzione! Devono essere specificati gruppo e operatori firmatari');

    }
    else {

      //---------------------------------------------------------------------------------------- CASO 1
      if (this.allafirmaChange == 1 && this.validazione == 1) {

        this.ordine = this.orderedCheck ? 1 : 0;
        this.apiService.AddValidazione(this.done, this.id, this.ordine).subscribe((dati) => {
          alert(dati['Esito']);
          this.router.navigate(['/background']);
        });
      }
      //----------------------------------------------------------------------------------------

      //---------------------------------------------------------------------------------------- CASO 2
      if (this.allafirmaChange == 1 && this.validazione == 0) {

        if (confirm("Stai per eliminare le regole di validazione che erano state definite per questo documento. Confermi?")) {
          this.apiService.DeleteValidazione(this.id, this.firmatariOriginali, this.id_firma).subscribe((dati) => {
            alert(dati['Esito']);
            this.router.navigate(['/background']);
          });
        }

      }
      //----------------------------------------------------------------------------------------

      //---------------------------------------------------------------------------------------- CASO 3 - 4 - 5
      if (this.allafirmaChange == 0 && this.validazione == 1 && (this.gruppoChange == 1 || (this.gruppoChange == 0 && this.controlOrder) || (this.gruppoChange == 0 && !this.controlOrder && this.orderChange))) {

        if (confirm("Stai per sovrascrivere le regole di validazione che erano state definite per questo documento. Confermi?")) {
          this.apiService.DeleteValidazione(this.id, this.firmatariOriginali, this.id_firma).subscribe((dati) => {
            if (dati['esito_codice'] == 1) {
              this.ordine = this.orderedCheck ? 1 : 0;
              this.apiService.AddValidazione(this.done, this.id, this.ordine).subscribe((dati) => {
                alert(dati['Esito']);
                this.router.navigate(['/background']);
              });
            } else {
              alert('Qualcosa è andato storto nella procedura di reset della validazione');
            }
          });
        }

      }
      //----------------------------------------------------------------------------------------

      //---------------------------------------------------------------------------------------- CASO 6
      if (this.allafirmaChange == 0 && this.validazione == 1 && this.gruppoChange == 0 && !this.controlOrder && this.deletedOp.length == 0 && !this.orderChange && this.addedOp.length != 0) {

        this.apiService.AddValidazioneOperatori(this.addedOp, this.id, this.id_firma).subscribe((dati) => {
          alert(dati['Esito']);
          this.router.navigate(['/background']);
        });

      }
      //----------------------------------------------------------------------------------------

      //---------------------------------------------------------------------------------------- CASO 7
      if (this.allafirmaChange == 0 && this.validazione == 1 && this.gruppoChange == 0 && !this.controlOrder && this.deletedOp.length != 0 && !this.orderChange) {
        this.apiService.getFirmatari(this.deletedOp, this.id, this.id_firma).subscribe((dati) => {
          this.signedOp = dati;
          let cnt = 0;
          if(this.signedOp!=null){
            for(let i=0; i<this.signedOp.length;i++){
              if(this.deletedOp.find(x=>x.id_operatore == this.signedOp[i].id_operatore)!=undefined) cnt++;
            }
          }
          if (cnt != 0) {
           
            this.apiService.DeleteValidazione(this.id, this.firmatariOriginali, this.id_firma).subscribe((dati) => {
              if (dati['esito_codice'] == 1) {
                this.ordine = this.orderedCheck ? 1 : 0;
                this.apiService.AddValidazione(this.done, this.id, this.ordine).subscribe((dati) => {
                  alert(dati['Esito']);
                  this.router.navigate(['/background']);
                }); 
              } else {
                alert('Qualcosa è andato storto nella procedura di reset della validazione');
              }
            });
          }
          else {           
            //aggiungo eventuali nuovi operatori          
            if(this.addedOp.length!=0){
               this.apiService.AddValidazioneOperatori(this.addedOp, this.id, this.id_firma).subscribe((dati) => {
                alert(dati['Esito']);
                this.router.navigate(['/background']);
              }); 
            }
           
            //cancello gli operatori da cancellare
            this.apiService.DeleteValidazioneOperatori(this.deletedOp, this.id, this.id_firma).subscribe((dati) => {
              alert(dati['Esito']);
              this.router.navigate(['/background']);
            }); 
          }

        });


      }
      //----------------------------------------------------------------------------------------
    }


  }

  toOrder(e): void {
    if (e) { this.orderedCheck = true; }
    else { this.orderedCheck = false; }
  }

  selectAll(e): void {
    this.todo = [];
    this.done = [];
    if (e) {
      this.done = this.allGroup.slice();
    } else {
      this.todo = this.allGroup.slice();
    }
  }

  enter(item) {
    this.activeNumIndex = item.id_operatore;
  }
  
  /* idx è l'indice dell'operatore selezionato nella lista todo non filtrata 
     event.previousIndex va bene se si usa todo non filtrata
  */
     drop(event: CdkDragDrop<string[]>) {     
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        let idx;
        if (event.container.element.nativeElement.className.indexOf('todo_list')!=-1){
          //from done-list to todo-list
          idx = this.done.findIndex(x => x.id_operatore == this.activeNumIndex);
        }else{
           //from todo-list to done-list
          idx = this.todo.findIndex(x => x.id_operatore == this.activeNumIndex);
        }
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          idx,
          event.currentIndex);
      }
    }

  selected(idSelectedGroup) {
    this.idSelectedGroup = idSelectedGroup;
    this.controlAllGroup = false;
    this.controlOrder = false;
    this.done = [];
    this.todo = [];
    this.allGroup = [];
    this.apiService.getOperatoreGruppoProcedura(this.idSelectedGroup).subscribe((dati: any) => {
      if (dati != null) {
        for (let i = 0; i < dati.length; i++) {
          this.item = new Object();
          this.item.id_operatore = dati[i].id_operatore;
          this.item.nome = dati[i].nome;
          this.item.cognome = dati[i].cognome;
          this.item.id_gruppo = dati[i].id_gruppo;
          this.item.ruolo = dati[i].ruolo;
          this.allGroup.push(this.item);
          this.todo.push(this.item);
        }
      }
    });
  }

  filtra_op(input) {
    if(input.value==''){
      return this.todo;
    }
      else{
        return this.todo.filter(x=>(x.nome+' '+x.cognome).toUpperCase().includes(input.value.toUpperCase())); 
      }
  }

}


