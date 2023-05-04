import { Component, OnInit,  ElementRef, ViewChild, Input, } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ApiextService } from 'src/app/apiext.service';
import { ActivatedRoute } from '@angular/router'; 
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faEdit, faShareSquare } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, FormBuilder,  Validators, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/local-storage.service';
import {Observable} from 'rxjs';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {map, startWith} from 'rxjs/operators';
import { F } from '@angular/cdk/keycodes';



@Component({
  selector: 'app-add-struttura',
  templateUrl: './add-struttura.component.html',
  styleUrls: ['./add-struttura.component.css']
})
export class AddStrutturaComponent implements OnInit {
  id;
  azienda;
  aziende;
  struttura;
  user;
  faUser=faUser;
  faHouseUser=faHouseUser;
  faBuilding=faBuilding;
  faShareSquare=faShareSquare;
  faEdit=faEdit;
  nome: any;
  sede;
  ccosto;
  esito;
  msgerror:string;
  tipoalert;
  tipoalertdanger;
  tipoalertuncomplete;
  dati;
  form: FormGroup;
  data;
  id_azienda;
  id_operatore;
  CF;
  livello;
  pec;
  email;
  telefono;
  idResponsabiless;
  dataresp;
  control = new FormControl();
  responsabili: string[] = [];
  filteredResponsabili: Observable<string[]>;
  mioLivello="none";
  id_azienda_get;
  livello_get;
  datistr;
  strutturapadre;
  datilivello;
  dataipa;
  codici_ipa;
  cod_ipa;
  codiceipa;  
  dataaoo;
  selezionato;
  dataou;
  miasede;
  toponimo;
  datadomdig;
  Comuni: string[] = [];
  filteredComuni: Observable<string[]>;
  controlcomuni = new FormControl();
  controlnazioni = new FormControl();
  mieicomuni;
  cap;
  provincia;
  Nazioni: string[] = [];
  filteredNazioni: Observable<string[]>;
  mienazioni;
  Nazione;
  comune;
  
  constructor(private elRef:ElementRef, private apiService: ApiService, private apiextService: ApiextService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private localStorageService: LocalStorageService) { 
    
    const id_azienda = JSON.parse(localStorage.getItem('id_azienda'));
    this.id_azienda=id_azienda;
    const id_operatore = JSON.parse(localStorage.getItem('ID'));
    this.id_operatore=id_operatore;
    const CF = JSON.parse(localStorage.getItem('CF'));
    this.CF=CF;


         //qui popoliamo le Nazioni per la select
         this.apiService.getAllNazioni().subscribe((datanazioni) => {
          this.mienazioni= datanazioni;
          for(let i:any=0; i<this.mienazioni.length; i++){
            this.Nazioni.push(this.mienazioni[i].nome_stati);
             }
                 }, error => console.error(error));

                //qui popoliamo i Comuni per la select
                this.apiService.GetAllComuniIstat().subscribe((datacomuni) => {
                  this.mieicomuni= datacomuni;
                  for(let j:any=0; j<this.mieicomuni.length; j++){
                    this.Comuni.push(this.mieicomuni[j].denominazione);
                     }
                         }, error => console.error(error));


  }
  CambiaAzienda(valore:string){

this.PulisciCampi();
this.id_azienda=valore;    
this.dataresp = [];
this.responsabili = [];
this.datistr=[];
this.mioLivello="none";
//this.cambialivello(1,this.id_azienda);
this.getLivelli(this.id_azienda);
this.apiService.getAllUsersAzienda(this.id_azienda).subscribe((dataresp)=>{
  this.dataresp = dataresp;
            for(let i:any=0; i<this.dataresp.length; i++){
              this.responsabili.push(this.dataresp[i].CF+"*"+this.dataresp[i].cognome+"*"+this.dataresp[i].nome);
                       }  
                   }, error => console.error(error))
 this.apiService.GetSingleCodiceIPAaz(this.id_azienda).subscribe((dataipa)=>{
  this.dataipa = dataipa;     
            for(let i:any=0; i<this.dataipa.length; i++){              
                this.codiceipa=this.dataipa[i].codice_IPA;
                this.PopolaAOO(this.codiceipa);
                       }                  
                   }, error => console.error(error))                                                      
  }
  PopolaAOO(ipa){
    this.apiextService.get_UO_by_IPA(ipa).subscribe((dataaoo)=>{
      this.dataaoo = dataaoo;
                                    
                       }, error => console.error(error))
  }


  PopolaOU(){
    this.selezionato=this.form.controls.cod_ipa.value;
    this.apiextService.get_UO_by_COD_OU(this.selezionato).subscribe((dataou)=>{
      this.dataou = dataou;
      for(let z:number=0;z<this.dataou.length;z++){
              this.form.controls.nome.setValue(this.dataou[z].des_ou);  
              this.miasede=this.dataou[z].indirizzo;  
              this.form.controls.sede.setValue(this.miasede);  
              this.form.controls.comune.setValue(this.dataou[z].comune);
              this.form.controls.cap.setValue(this.dataou[z].cap);  
              this.form.controls.provincia.setValue(this.dataou[z].provincia);    
              this.form.controls.Nazione.setValue("italia");       
              this.form.controls.telefono.setValue(this.dataou[z].tel);   
              this.form.controls.email.setValue(this.dataou[z].mail1);    
            }
                       }, error => console.error(error))

   this.apiextService.get_DOM_DIG_UO(this.selezionato).subscribe((datadomdig)=>{
   this.datadomdig = datadomdig;
     for(let y:number=0;y<this.datadomdig.length;y++){
      if(this.datadomdig[y].tipo=="Pec"){
     this.form.controls.pec.setValue(this.datadomdig[y].domicilio_digitale);                      
                        }
                      }
              }, error => console.error(error))            
                       
  }

  PulisciCampi(){

    this.form.controls.nome.setValue('');  
    this.form.controls.toponimo.setValue('');  
    this.form.controls.sede.setValue('');
    this.form.controls.comune.setValue('');
    this.form.controls.cap.setValue('');
    this.form.controls.provincia.setValue('');
    this.form.controls.Nazione.setValue('');
    this.form.controls.email.setValue('');
    this.form.controls.pec.setValue('');
    this.form.controls.telefono.setValue('');
  }
  Trasmetti(): void {
    if (this.form.valid) {
    this.apiService.AddStruttura(this.struttura=this.form.value).subscribe((dati)=>{
      this.dati = dati['Esito'];
     if(this.dati=="si"){
      if(confirm("Struttura correttamente registrata")) {
      this.router.navigate(['/strutture']);
      }
     }
     else{
      alert("Attenzione. Impossibile inserire la struttura");
     }
    });
  } else {
alert("Attenzione. Non tutti i campi obbligatori hanno un valore valido");
  }
    }

  
    ngOnInit(){


      this.filteredResponsabili = this.control.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );

      
	


    this.apiService.getSingleAziendaStruttura(this.id_azienda,this.id_operatore, this.CF).subscribe((data)=>{
 
      this.data = data;
  
          }, error => console.error(error));

      

          this.apiService.getAllUsersAzienda(this.id_azienda).subscribe((dataresp)=>{
 
            this.dataresp = dataresp;
            for(let i:any=0; i<this.dataresp.length; i++){
              this.responsabili.push(this.datistr[i].CF+"*"+this.datistr[i].cognome);
               }
                   }, error => console.error(error));
              

        this.form = this.formBuilder.group({
        nome: new FormControl('', Validators.minLength(2)),
        ccosto: new FormControl(''),
        azienda: new FormControl('', Validators.required),
        livello: new FormControl('', Validators.required),
        toponimo: new FormControl('', Validators.required),
        sede: new FormControl(),
        comune: new FormControl('', Validators.required),
        cap: new FormControl('', Validators.minLength(2)),
        provincia: new FormControl('', Validators.minLength(2)),
        Nazione: new FormControl('', Validators.minLength(2)),
        pec: new FormControl(),
        email: new FormControl(),
        cod_ipa: new FormControl(''),
        telefono: new FormControl(),
        idResponsabiless: new FormControl(),
        strutturapadre: new FormControl(),
            });

            this.filteredComuni= this.controlcomuni.valueChanges.pipe(
              startWith(''),
              map(value => this._filtercomuni(value))
            );

            this.filteredNazioni = this.controlnazioni.valueChanges.pipe(
              startWith(''),
              map(value => this._filternazioni(value))
            );
    }

    
  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.responsabili.filter(responsabili => this._normalizeValue(responsabili).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }


  private _filtercomuni(value: string): string[] {
    const filterValuecomuni = this._normalizeValuecomuni(value);
    return this.Comuni.filter(Comuni => this._normalizeValuecomuni(Comuni).includes(filterValuecomuni));
  }

  private _normalizeValuecomuni(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  private _filternazioni(value: string): string[] {
    const filterValuenazioni = this._normalizeValuenazioni(value);
    return this.Nazioni.filter(Nazioni => this._normalizeValuenazioni(Nazioni).includes(filterValuenazioni));
  }

  private _normalizeValuenazioni(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }


  panelOpenState = false;

getLivelli(id_azienda){

  this.apiService.getLivelli(id_azienda).subscribe((datilivello)=>{
   
    this.datilivello = datilivello;
                }, error => console.error(error));
}


cambialivello(livello,azienda){
  if(this.id_azienda!=''){
switch(livello) { 
  case '1': { 
    this.mioLivello="none";
    this.datistr='';

     break; 
  } 
  case '2': { 
    this.mioLivello="block";
    this.livello_get=livello;
    this.id_azienda_get=azienda;
     this.apiService.getStrutturaLivello(this.id_azienda_get, this.livello_get).subscribe((datistr)=>{
   
      this.datistr = datistr;
                  }, error => console.error(error));
    break; 
  } 
  case '3': { 
    this.mioLivello="block";
 this.livello_get=livello;
 this.id_azienda_get=azienda;
  this.apiService.getStrutturaLivello(this.id_azienda_get, this.livello_get).subscribe((datistr)=>{

   this.datistr = datistr;
               }, error => console.error(error));
    
    break; 
 } 
 case '4': { 
  this.mioLivello="block";
this.livello_get=livello;
this.id_azienda_get=azienda;
this.apiService.getStrutturaLivello(this.id_azienda_get, this.livello_get).subscribe((datistr)=>{

 this.datistr = datistr;
             }, error => console.error(error));
  break; 
} 
case '5': { 
  this.mioLivello="block";
this.livello_get=livello;
this.id_azienda_get=azienda;
this.apiService.getStrutturaLivello(this.id_azienda_get, this.livello_get).subscribe((datistr)=>{

 this.datistr = datistr;
             }, error => console.error(error));
  break; 
} 
  default: { 
    this.mioLivello="none";
    this.datistr=[];
     break; 
  } 
}
  } else {
        this.datistr=[];
        this.mioLivello="none";
  } 
}



}