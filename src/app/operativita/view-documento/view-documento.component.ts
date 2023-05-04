import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router'; 
import { FormGroup, FormControl, FormBuilder,  Validators, NgModel } from '@angular/forms';
import { Router,NavigationExtras } from '@angular/router';
import {faFolderOpen} from '@fortawesome/free-solid-svg-icons';
import {DatePipe} from '@angular/common';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-view-documento',
  templateUrl: './view-documento.component.html',
  styleUrls: ['./view-documento.component.css']
})
export class ViewDocumentoComponent implements OnInit {


  form: FormGroup;
  faFolderOpen = faFolderOpen;
  id;
  procedura;
  gruppo;
  privilegi;
  /* workflow;  
  operatore;
  descrizione;
  versione;
  note;
  firmato;
  giorno;
  ora;
  documento_padre;
  elimina;
  fascicolo; */
  documento;
  dati:any;
  tab_selected = 0;
  testo;
  categoria;
  validazione=0;
 /*  nome_gruppo; */
  item;
  firmatari:any=[];
  pratica = undefined;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    this.route.queryParams.subscribe(
      params => {
        this.id = params['id'];
        this.gruppo = params['gruppo'];
        this.privilegi = params['p'];
        this.pratica = params['pratica'];
      });
      
   }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
         
          workflow: new FormControl({value: '', disabled: true}, Validators.required),
          operatore: new FormControl({value: '', disabled: true}, Validators.required),
          descrizione: new FormControl({value: '', disabled: true}, Validators.required),
          versione: new FormControl({value: '', disabled: true}, Validators.required),
          note: new FormControl({value: '', disabled: true}),     
          giorno: new FormControl({value: '', disabled: true}, Validators.required),
          ora: new FormControl({value: '', disabled: true}, Validators.required),
          documento_padre: new FormControl({value: '', disabled: true}),
          elimina: new FormControl({value: '', disabled: true}),
          procedura: new FormControl({value: '', disabled: true}, Validators.required),
          pratica: new FormControl({value: '', disabled: true}, Validators.required),
          fascicolo: new FormControl({value: '', disabled: true}, Validators.required),
          nome_gruppo: new FormControl({value: '', disabled: true})
    });

    if(this.pratica!=undefined){
      this.apiService.getSingleDocPratica(this.id).subscribe((data) => {   
        this.dati = data;

        this.form.controls.workflow.setValue(this.dati[0].id_workflow);
        this.form.controls.operatore.setValue(this.dati[0].id_operatore);
        this.form.controls.pratica.setValue(this.dati[0].id_pratica);
        this.form.controls.descrizione.setValue(this.dati[0].descrizione);
        this.form.controls.versione.setValue(this.dati[0].versione);
        this.form.controls.note.setValue(this.dati[0].note!=null && this.dati[0].note!=undefined ? this.dati[0].note : '');
        this.form.controls.giorno.setValue(this.dati[0].giorno!=null && this.dati[0].giorno!=undefined ? this.dati[0].giorno : '');
        this.form.controls.ora.setValue(this.dati[0].ora!=null && this.dati[0].ora!=undefined ? this.dati[0].ora : '');
        this.form.controls.documento_padre.setValue(this.dati[0].id_documento_padre!=null && this.dati[0].id_documento_padre!=undefined ? this.dati[0].id_documento_padre : '');
        this.form.controls.elimina.setValue(this.dati[0].elimina);

        /*
        this.form.patchValue(this.workflow = this.dati[0].id_workflow);
        this.form.patchValue(this.operatore = this.dati[0].id_operatore);
        this.form.patchValue(this.pratica = this.dati[0].id_pratica);
        this.form.patchValue(this.descrizione = this.dati[0].descrizione);
        this.form.patchValue(this.versione = this.dati[0].versione);
        this.form.patchValue(this.note = this.dati[0].note!=null && this.dati[0].note!=undefined ? this.dati[0].note : '');
        this.form.patchValue(this.giorno = this.dati[0].giorno!=null && this.dati[0].giorno!=undefined ? this.dati[0].giorno : '');
        this.form.patchValue(this.ora = this.dati[0].ora!=null && this.dati[0].ora!=undefined ? this.dati[0].ora : '');
        this.form.patchValue(this.documento_padre = this.dati[0].id_documento_padre!=null && this.dati[0].id_documento_padre!=undefined ? this.dati[0].id_documento_padre : '');
        this.form.patchValue(this.elimina = this.dati[0].elimina);   
        */  
        
        this.testo = this.dati[0].testo;
        this.categoria = this.dati[0].categoria;

        if (this.dati[0].firma != null) {
          this.validazione=1;
          for (let i = 0; i < this.dati.length; i++) {
            this.item = new Object();
            this.item.id_operatore = this.dati[i].firmatari;
            this.item.ordine = this.dati[i].ordine;
            this.item.nome = this.dati[i].nome;
            this.item.cognome = this.dati[i].cognome;       
            this.firmatari.push(this.item);
          }
        }
      });

    }else{

      this.apiService.getSingleDoc(this.id).subscribe((data) => {   
    
        this.dati = data;

        this.form.controls.workflow.setValue(this.dati[0].id_workflow);
        this.form.controls.operatore.setValue(this.dati[0].id_operatore);
        this.form.controls.procedura.setValue(this.dati[0].id_procedura);
        this.form.controls.descrizione.setValue(this.dati[0].descrizione);
        this.form.controls.versione.setValue(this.dati[0].versione);
        this.form.controls.note.setValue(this.dati[0].note!=null && this.dati[0].note!=undefined ? this.dati[0].note : '');
        this.form.controls.giorno.setValue(this.dati[0].giorno!=null && this.dati[0].giorno!=undefined ? this.dati[0].giorno : '');
        this.form.controls.ora.setValue(this.dati[0].ora!=null && this.dati[0].ora!=undefined ? this.dati[0].ora : '');
        this.form.controls.documento_padre.setValue(this.dati[0].id_documento_padre!=null && this.dati[0].id_documento_padre!=undefined ? this.dati[0].id_documento_padre : '');
        this.form.controls.elimina.setValue(this.dati[0].elimina);
        this.form.controls.fascicolo.setValue(this.dati[0].id_fascicolo!=null && this.dati[0].id_fascicolo!=undefined ? this.dati[0].id_fascicolo : '');
        this.form.controls.nome_gruppo.setValue(this.dati[0].nome_gruppo!=null && this.dati[0].nome_gruppo!=undefined ? this.dati[0].nome_gruppo : '');
        console.log(this.dati[0].nome_gruppo);
        /* 
        this.form.patchValue(this.workflow = this.dati[0].id_workflow);
        this.form.patchValue(this.operatore = this.dati[0].id_operatore);
        this.form.patchValue(this.procedura = this.dati[0].id_procedura);
        this.form.patchValue(this.descrizione = this.dati[0].descrizione);
        this.form.patchValue(this.versione = this.dati[0].versione);
        this.form.patchValue(this.note = this.dati[0].note!=null && this.dati[0].note!=undefined ? this.dati[0].note : '');
        this.form.patchValue(this.giorno = this.dati[0].giorno!=null && this.dati[0].giorno!=undefined ? this.dati[0].giorno : '');
        this.form.patchValue(this.ora = this.dati[0].ora!=null && this.dati[0].ora!=undefined ? this.dati[0].ora : '');
        this.form.patchValue(this.documento_padre = this.dati[0].id_documento_padre!=null && this.dati[0].id_documento_padre!=undefined ? this.dati[0].id_documento_padre : '');
        this.form.patchValue(this.elimina = this.dati[0].elimina);       
        this.form.patchValue(this.fascicolo = this.dati[0].id_fascicolo!=null && this.dati[0].id_fascicolo!=undefined ? this.dati[0].id_fascicolo : '');
        this.form.patchValue(this.nome_gruppo = this.dati[0].nome_gruppo!=null && this.dati[0].nome_gruppo!=undefined ? this.dati[0].nome_gruppo : '');
         */

        this.testo = this.dati[0].testo;
        this.categoria = this.dati[0].categoria;

        if (this.dati[0].firma != null) {
          this.validazione=1;
          for (let i = 0; i < this.dati.length; i++) {
            this.item = new Object();
            this.item.id_operatore = this.dati[i].firmatari;
            this.item.ordine = this.dati[i].ordine;
            this.item.nome = this.dati[i].nome;
            this.item.cognome = this.dati[i].cognome;       
            this.firmatari.push(this.item);
          }
        }
      });
    }

  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.tab_selected = tabChangeEvent.index;
}

back():void{
  let navigationExtras: NavigationExtras;
  if(this.pratica!=undefined){
    navigationExtras = {
      queryParams: { 'id_pratica': this.pratica,'gruppo':this.gruppo,'id_workflow':this.form.controls.workflow.value,'p':this.privilegi}
    };   
  }
  else{
    navigationExtras = {
      queryParams: { 'id_procedura': this.form.controls.procedura.value,'gruppo':this.gruppo,'id_workflow':this.form.controls.workflow.value,'p':this.privilegi}
    };
  }
  this.router.navigate(['documentiview'], navigationExtras);
}

}
