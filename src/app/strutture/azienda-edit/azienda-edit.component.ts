import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router'; 
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faEdit, faEye, faSearch, faShareSquare  } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, FormBuilder,  Validators, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ApiextService } from 'src/app/apiext.service';


@Component({
  selector: 'app-azienda-edit',
  templateUrl: './azienda-edit.component.html',
  styleUrls: ['./azienda-edit.component.css']
})
export class AziendaEditComponent implements OnInit {
  id;
  azienda;
  aziende;
  user;
  faUser=faUser;
  faHouseUser=faHouseUser;
  faBuilding=faBuilding;
  faEdit=faEdit;
  faEye=faEye;
  faShareSquare=faShareSquare;
  faSearch=faSearch;
  nome: any;
  sede;
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
  control = new FormControl();
  codiciipa: string[] = [];
  filteredcodiciipa: Observable<string[]>;
  datistr;
  codiceipasingle: string[] = [];
  dataipasingle;
  caricato="si";
  risultati="no";
  cerca_ipa;
  Descr;
  datadesc;
  selezionato;
  datadig;
  dataipadesc;
  nomeazienda;
  ipa_selected;
  dataipascelto;
  desc_amm;
  default_ipa="si";
  toponimo;
  comune;
  cap;
  provincia;
    controlcomuni = new FormControl();
  Nazioni: string[] = [];
  filteredNazioni: Observable<string[]>;
  Comuni: string[] = [];
  filteredComuni: Observable<string[]>;
  miotoponimo;
  mienazioni;
  Nazione;
  mieicomuni;
  cercacap;
  constructor(private apiService: ApiService, private apiextService: ApiextService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { 
    this.dataipa = [];
    this.codiciipa = [];
    this.datistr=[];

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
    this.apiService.GetAllCodiceIPA().subscribe((dataipa)=>{
     
      this.dataipa = dataipa;
      
                for(let i:any=0; i<this.dataipa.length; i++){
                 
                  this.codiciipa.push(this.dataipa[i].Des_amm+"*"+this.dataipa[i].Cod_amm+"*"+this.dataipa[i].id);
                           }
                              this.caricato="si";
                       }, error => console.error(error))
*/
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
  this.route.queryParams.subscribe( 
    params => { 
      this.id =  params['id']; 
      this.apiService.getSingleAzienda(this.id).subscribe((data)=>{
          this.aziende = data;
          for(let i:any=0;i<this.aziende.length;i++){
              this.miotoponimo=this.aziende[i].toponimo;
              this.form.controls.nome.setValue(this.aziende[i].nome);
              this.nomeazienda=this.aziende[i].nome;
              this.form.controls.toponimo.setValue(this.aziende[i].toponimo);
              this.form.controls.sede.setValue(this.aziende[i].sede);
              this.form.controls.comune.setValue(this.aziende[i].comune);
              this.form.controls.provincia.setValue(this.aziende[i].provincia);
              this.form.controls.cap.setValue(this.aziende[i].CAP);
              this.form.controls.Nazione.setValue(this.aziende[i].stato); 
              this.form.controls.piva.setValue(this.aziende[i].piva);
              this.form.controls.pec.setValue(this.aziende[i].pec);
              this.form.controls.mail.setValue(this.aziende[i].mail);
              this.ipa_selected=this.aziende[i].codice_IPA;    
              this.apiextService.getDESC_AMM_by_IPA(this.ipa_selected).subscribe((dataipascelto)=>{
              this.dataipascelto=dataipascelto;
              for(let i:number=0;i<this.dataipascelto.length;i++){
              this.desc_amm=this.dataipascelto[i].des_amm; 
              this.form.controls.codice_ipa.setValue(this.ipa_selected); 
                }
                 }, error => console.error(error))          
              this.form.controls.telefono.setValue(this.aziende[i].telefono);     
    }
    });
  }         
) 

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

  Trasmetti(): void {

    if (this.form.valid) {
      this.apiService.getSingleAziendaPiva(this.id,this.form.value.piva).subscribe((dati)=>{
        if(dati=='si'){
          alert("Esiste già un'azienda con questa PIVA ");
        }else{
          this.apiService.UpdateAzienda(this.azienda=this.form.value, this.id=this.id).subscribe((dati)=>{
            this.dati = dati['Esito'];
            if(this.dati=="si"){
              if(confirm("Modifica correttamente eseguita")) {
                this.router.navigate(['/aziende']);
              }
            } else {
                alert("Attenzione. Impossibile eseguire le modifiche");
            }
          });
        }});
    } else {
      alert("Attenzione. Non tutti i campi obbligatori hanno un valore valido");
    }
  }
  
    ngOnInit(): void {

  }


  cercaIPA(){
    this.codice_ipa='';
    this.default_ipa="no";
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