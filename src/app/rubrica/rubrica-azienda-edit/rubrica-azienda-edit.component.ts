import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ApiextService } from 'src/app/apiext.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, NgModel } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { LocalStorageService } from 'src/app/local-storage.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { faEdit, faEye, faSearch, faShareSquare } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-rubrica-azienda-edit',
  templateUrl: './rubrica-azienda-edit.component.html',
  styleUrls: ['./rubrica-azienda-edit.component.css']
})
export class RubricaAziendaEditComponent implements OnInit {
  
  comune = new FormControl('');
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  aziende;
  tipo_selected;
  form: FormGroup;
  ente="no";
  dataipa;
  PEC;
  codiciipa: string[] = [];
  datistr;
  caricato="no";
  control = new FormControl();
  controlipa = new FormControl();
  filteredcodiciipa: Observable<string[]>;
  provincia;
  datastrutt;
  dataistat;
  datatarga;
  datanazioni;
  nazione;
  miocomune;
  cercaipa;
  codice_ipa;
  risultati;
  denominazione;
  piva;
  email;
  Descr;
  dataipadesc;
  selezionato;
  datadesc;
  datadig;
  id_azienda;
  faSearch=faSearch;
  faShareSquare=faShareSquare;
  default_ipa="si";
  dataipascelto;
  desc_amm;
  ipa_selected;
  constructor(private apiService: ApiService,private apiextService: ApiextService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private localStorageService: LocalStorageService) {
  
    this.route.queryParams.subscribe(
      params => {
        this.tipo_selected = params['tipo'];
        this.ente = params['tipo'];
        if(this.ente=="ente"){
          this.ente="si";
        } else {
          this.ente="no";
        }
        this.id_azienda = params['id_azienda'];
        this.form = formBuilder.group({
          tipo: [this.tipo_selected],
          denominazione: ['', Validators.required],
          piva: ['', Validators.required],
          sede: ['', Validators.required],
          email: ['', Validators.required],
          PEC: [''],
          codice_ipa: [''],
          toponimo: [''],
          civico: [''],
          nazione: [''],
          cap: [''],
          comune: [''],
          cerca_ipa:[''],
          provincia: [''],
          miocomune:[''],
        });
      });
      
      this.apiService.getSingleProtoRubricaAziende(this.id_azienda).subscribe((data)=>{
        this.aziende = data;
          for(let i:any=0;i<this.aziende.length;i++){
           
            this.form.controls.denominazione.setValue(this.aziende[i].denominazione);
            this.form.controls.piva.setValue(this.aziende[i].piva);
            this.form.controls.email.setValue(this.aziende[i].email);
            this.ipa_selected=this.aziende[i].cod_IPA;  
            this.apiextService.getDESC_AMM_by_IPA(this.ipa_selected).subscribe((dataipascelto)=>{
              this.dataipascelto=dataipascelto;
              this.risultati="si";
              for(let i:number=0;i<this.dataipascelto.length;i++){
              this.desc_amm=this.dataipascelto[i].des_amm; 
              this.form.controls.codice_ipa.setValue(this.ipa_selected); 
                }
                 }, error => console.error(error))   
            this.form.controls.miocomune.setValue(this.aziende[i].comune);
            this.form.controls.PEC.setValue(this.aziende[i].PEC);
            this.form.controls.toponimo.setValue(this.aziende[i].toponimo);
            this.form.controls.sede.setValue(this.aziende[i].sede);
            this.form.controls.civico.setValue(this.aziende[i].civico);
            this.form.controls.cap.setValue(this.aziende[i].CAP);
            this.comune.setValue( this.aziende[i].comune);
            this.form.controls.provincia.setValue(this.aziende[i].provincia);
            this.form.controls.nazione.setValue(this.aziende[i].nazione);
  }
  });


      this.apiService.GetAllComuniIstat().subscribe((dataistat)=>{
        this.dataistat = dataistat;
                  for(let i:any=0; i<this.dataistat.length; i++){
                                     
                      this.options.push(this.dataistat[i].denominazione);
                  }
                  this.apiService.GetAllNazioni().subscribe((datanazioni)=>{
                    this.datanazioni = datanazioni;
     
                                     }, error => console.error(error))
                                     this.form.controls.nazione.setValue("Italia");
                                     
                                                this.caricato="si";       
                                              
                         }, error => console.error(error))

if(this.ente=="si"){
  /*this.caricato="no";
      this.apiService.GetAllCodiceIPA().subscribe((dataipa)=>{
     
        this.dataipa = dataipa;
        
                  for(let i:any=0; i<this.dataipa.length; i++){
                   
                    this.codiciipa.push(this.dataipa[i].Des_amm+"*"+this.dataipa[i].Cod_amm+"*"+this.dataipa[i].id);
                             }
                             this.caricato="si";
                         }, error => console.error(error))*/

  }
}


Trasmetti(): void { 
  if(this.form.valid){
    this.apiService.UpdateProtoRubricaAziende(this.id_azienda,this.form.value).subscribe((data: any) => {
        alert(data['Esito']);
        if(data['esito_codice']==1){
          let new_id = data['new_id'];
          let navigationExtras: NavigationExtras = {
            queryParams: { 'tipo': this.tipo_selected, 'isAzienda': 1, 'new_id':new_id, 'ente': this.ente }
          };
          this.router.navigate(['/rubricadispatcher2'],navigationExtras);
        }
    }, error => console.error(error));
  }else{
    alert('Campi non correttamente compilati. Tutti i campi sono obbligatori');
  }

}

  back(){
    this.router.navigate(['/rubricadispatcher1']);
  }

  ngOnInit(): void {

 
    this.filteredOptions = this.comune.valueChanges.pipe(
      startWith(''),
      map(value => this._filteristat(value || '')),
    );

  }


  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  private _filteristat(value: string): string[] {
    if(value.length>2){
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }
  }

  metticap(valore){
    this.form.controls.miocomune.setValue(valore);
    this.apiService.GetTargaIstat(valore).subscribe((datatarga)=>{
      this.datatarga = datatarga;
                for(let j:any=0; j<this.datatarga.length; j++){     
                  this.form.controls.comune.setValue(valore);             
                  this.form.controls.provincia.setValue(this.datatarga[j].sigla_auto);
                }        
                       }, error => console.error(error))
                       
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
     this.comune.setValue(this.datadesc[i].comune);
     this.form.controls.denominazione.setValue(this.datadesc[i].des_amm);
     this.form.controls.sede.setValue(this.datadesc[i].indirizzo);
     this.form.controls.cap.setValue(this.datadesc[i].cap);
     this.form.controls.provincia.setValue(this.datadesc[i].provincia);
     this.form.controls.piva.setValue(this.datadesc[i].cf);
     this.form.controls.email.setValue(this.datadesc[i].mail1);  
     this.form.controls.miocomune.setValue(this.comune.value);
     this.apiextService.getDOM_DIG_AMM(this.selezionato).subscribe((datadig)=>{
       this.datadig=datadig;
        for(let j:number=0;j<this.datadig.length;j++){
        this.form.controls.PEC.setValue(this.datadig[i].domicilio_digitale);
      }
        }, error => console.error(error))  
   }
     }, error => console.error(error))  
   }
}
