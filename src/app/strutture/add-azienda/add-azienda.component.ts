import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ApiextService } from 'src/app/apiext.service';
import { ActivatedRoute } from '@angular/router'; 
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faEdit, faEye, faSearch, faShareSquare } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, FormBuilder,  Validators, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { C } from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-add-azienda',
  templateUrl: './add-azienda.component.html',
  styleUrls: ['./add-azienda.component.css']
})
export class AddAziendaComponent implements OnInit {
  id;
  azienda;
  aziende;
  user;
  faUser=faUser;
  faEye=faEye;
  faShareSquare=faShareSquare;
  faSearch=faSearch;
  faHouseUser=faHouseUser;
  faBuilding=faBuilding;
  faEdit=faEdit;
  nome: any;
  toponimo;
  sede;
  comune;
  cap;
  provincia;
  piva;
  pec;
  mail;
  codice_ipa;
  telefono;
  esito;
  msgerror:string;
  tipoalert;
  tipoalertdanger;
  tipoalertuncomplete;
  dati;
  form: FormGroup;
  dataipa;
  dataipadesc;
  control = new FormControl();
  controlcomuni = new FormControl();
  Nazioni: string[] = [];
  filteredNazioni: Observable<string[]>;
  Comuni: string[] = [];
  filteredComuni: Observable<string[]>;
  datistr;
  caricato="si";
  risultati="no";
  cerca_ipa;
  Descr;
  datadesc;
  selezionato;
  datadig;
  mienazioni;
  Nazione;
  mieicomuni;
  cercacap;

  constructor(private apiService: ApiService, private apiextService: ApiextService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { 
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


/*
    this.apiextService.getIPAbydesc().subscribe((dataipadesc)=>{
    this.dataipadesc=dataipadesc;
    console.log(this.dataipadesc.data[0].cod_amm);
    }, error => console.error(error))

*/
    
    /*
    this.apiService.GetAllCodiceIPA().subscribe((dataipa)=>{
     
      this.dataipa = dataipa;
      
                for(let i:any=0; i<this.dataipa.length; i++){
                 
                  this.codiciipa.push(this.dataipa[i].Des_amm+"*"+this.dataipa[i].Cod_amm+"*"+this.dataipa[i].id);
                           }
                           this.caricato="si";
                       }, error => console.error(error))
                       */

  }
  Trasmetti(): void {

    if (this.form.valid) {
      this.apiService.getSingleAziendaPiva('',this.form.value.piva).subscribe((dati)=>{
        //dati=='si' è stata trovata una piva uguale a quella che stiamo inserendo
        if(dati=='si'){
          alert("Esiste già un'azienda con questa PIVA ");
        }else{
          this.apiService.AddAzienda(this.azienda=this.form.value).subscribe((dati)=>{
            this.dati = dati['Esito'];
            if(this.dati=="si"){
              if(confirm("Azienda correttamente registrata")) {
              this.router.navigate(['/aziende']);
              }
             } else{
              alert("Attenzione. Impossibile eseguire le modifiche");
             }
            });
        }
      });
    } else {
      alert("Attenzione. Non tutti i campi obbligatori hanno un valore valido");
    }
  }
    ngOnInit(){
        this.form = this.formBuilder.group({
        nome: new FormControl('', Validators.minLength(2)),
        toponimo: new FormControl('', Validators.minLength(2)),
        sede: new FormControl('', Validators.minLength(2)),
        comune: new FormControl('', Validators.minLength(2)),
        cap: new FormControl('', Validators.minLength(2)),
        provincia: new FormControl('', Validators.minLength(2)),
        Nazione: new FormControl('', Validators.minLength(2)),
        piva: new FormControl('', [Validators.minLength(2), Validators.maxLength(16)]),
        pec: new FormControl('', Validators.email),
        codice_ipa: new FormControl(''),
        mail: new FormControl('', Validators.email),
        telefono: new FormControl(''),
        cerca_ipa: new FormControl('')
        });

        this.filteredNazioni = this.control.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value))
        );

        this.filteredComuni= this.controlcomuni.valueChanges.pipe(
          startWith(''),
          map(value => this._filtercomuni(value))
        );

        }

    private _filter(value: string): string[] {
      const filterValue = this._normalizeValue(value);
      return this.Nazioni.filter(Nazioni => this._normalizeValue(Nazioni).includes(filterValue));
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


    cercaIPA(){
     this.codice_ipa='';
     this.risultati="no";
     this.Descr=this.form.get('cerca_ipa').value;
     this.apiextService.getIPAbydesc(this.Descr).subscribe((dataipadesc)=>{
     this.dataipadesc=dataipadesc;
     this.risultati="si";
      }, error => console.error(error))  
    }
    cercaDESC(){
     this.selezionato=this.form.controls.codice_ipa.value;
     this.apiextService.getDESC_AMM_by_IPA(this.selezionato).subscribe((datadesc)=>{
     this.datadesc=datadesc;
      for(let i:number=0;i<this.datadesc.length;i++){
      this.form.controls.nome.setValue(this.datadesc[i].des_amm);
      this.form.controls.sede.setValue(this.datadesc[i].indirizzo);
      this.form.controls.cap.setValue(this.datadesc[i].cap);
      this.form.controls.comune.setValue(this.datadesc[i].comune);
      this.form.controls.provincia.setValue(this.datadesc[i].provincia);
      this.form.controls.Nazione.setValue("italia");
      this.form.controls.piva.setValue(this.datadesc[i].cf);
      this.form.controls.mail.setValue(this.datadesc[i].mail1);
      this.apiextService.getDOM_DIG_AMM(this.selezionato).subscribe((datadig)=>{
        this.datadig=datadig;
         for(let j:number=0;j<this.datadig.length;j++){
         this.form.controls.pec.setValue(this.datadig[i].domicilio_digitale);
       }
         }, error => console.error(error))  
    }
      }, error => console.error(error))  
    }


    
}