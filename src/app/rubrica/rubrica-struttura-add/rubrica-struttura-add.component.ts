import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ApiextService } from 'src/app/apiext.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, NgModel } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { LocalStorageService } from 'src/app/local-storage.service';
import { Location } from '@angular/common';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { faShareSquare } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-rubrica-struttura-add',
  templateUrl: './rubrica-struttura-add.component.html',
  styleUrls: ['./rubrica-struttura-add.component.css']
})
export class RubricaStrutturaAddComponent implements OnInit {
  faShareSquare=faShareSquare;
  comune = new FormControl('');
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  aziende;
  tipo_selected;
  form: FormGroup;
  dataipa;
  responsabile;
  telefono;
  cod_ipa: string[] = [];
  id_azienda;
  ente;
  cod_ente;
  codice_ipa;
  tipo;
  PEC;
  telefono2;
  toponimo;
  civico;
  cap;
  provincia;
  datastrutt;
  dataistat;
  caricato="no";
  datatarga;
  datanazioni;
  nazione;
  selezionato;
  dataou;
  datadomdig;
  miasede;
  codiceipa;
  miocomune;
  dataaoo;
  constructor(private apiService: ApiService, private apiextService: ApiextService, private location: Location, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private localStorageService: LocalStorageService) {
  
    this.route.queryParams.subscribe(
      params => {
        this.tipo_selected = params['tipo'];
        this.cod_ente = params['IPA'];
        this.id_azienda = params['id_azienda'];
        this.tipo = params['tipo'];
        

        if(this.tipo_selected=="ente"){
          alert("ente");
          this.ente="si";
        }

        this.form = formBuilder.group({
          denominazione: ['', Validators.required],
          sede: ['', Validators.required],
          email: ['', Validators.required],
          telefono: [''],
          responsabile: [''],
          cod_ipa: [''],
          PEC: [''],
          telefono2: [''],
          strpadre: [''],
          toponimo: [''],
          civico: [''],
          nazione: [''],
          cap: [''],
          comune: [''],
          miocomune:[''],
          provincia: ['']
        });
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

                         this.apiextService.get_UO_by_IPA(this.cod_ente).subscribe((dataaoo)=>{
                          this.dataaoo = dataaoo;
                                                        
                                           }, error => console.error(error))

/*
      this.apiService.GetSingleCodiceIPAstrutturerubrica(this.cod_ente).subscribe((dataipa)=>{
        this.dataipa = dataipa;
                          
                  for(let i:any=0; i<this.dataipa.length; i++){
                                     
                      this.cod_ipa.push(this.dataipa[i].Des_aoo+"*"+this.dataipa[i].Cod_aoo+"*"+this.dataipa[i].id);
                             }
                                                
                         }, error => console.error(error))

this.apiService.GetSingleCodiceIPAaz(this.id_azienda).subscribe((dataipa)=>{
  this.dataipa = dataipa;     
            for(let i:any=0; i<this.dataipa.length; i++){              
                this.codiceipa=this.dataipa[i].codice_IPA;
                this.PopolaAOO(this.codiceipa);
                       }                  
                   }, error => console.error(error)) 

                         this.apiService.getAllProtoRubricaAziendeStrutture(this.id_azienda).subscribe((datastrutt)=>{
                          this.datastrutt = datastrutt;
                                            
                                                                                              
                                           }, error => console.error(error))
                                           */
  }

  PopolaAOO(ipa){
    this.apiextService.get_UO_by_IPA(ipa).subscribe((dataaoo)=>{
      this.dataaoo = dataaoo;
                                    
                       }, error => console.error(error))
  }


  Trasmetti(): void { 
    if(this.form.valid){
      this.apiService.AddProtoRubricaAziendeStrutture(this.form.value, this.id_azienda).subscribe((data: any) => {
          alert(data['Esito']);
          if(data['esito_codice']==1){
            let new_id = data['new_id'];
            let navigationExtras: NavigationExtras = {
              queryParams: { 'tipo': this.tipo_selected, 'isAzienda': 1, 'new_id':new_id }
            };
            this.router.navigate(['/rubricadispatcher2'],navigationExtras);
          }
      }, error => console.error(error));
    }else{
      alert('Campi non correttamente compilati. Tutti i campi sono obbligatori');
    }

  }

  back(){
    this.location.back();
  }

  ngOnInit(): void {

    this.filteredOptions = this.comune.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
   
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
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

  PulisciCampi(){
    this.form.controls.denominazione.setValue('');  
    this.form.controls.sede.setValue('');
    this.form.controls.cap.setValue('');
    this.comune.setValue('');
    this.form.controls.provincia.setValue('');
   // this.form.controls.sede.setValue(this.miasede);  
    this.form.controls.telefono.setValue('');   
    this.form.controls.email.setValue(''); 
    this.form.controls.miocomune.setValue('');
    this.form.controls.responsabile.setValue('');   
    this.form.controls.PEC.setValue('');
  }


  PopolaOU(){
    this.selezionato=this.form.controls.cod_ipa.value;
    this.apiextService.get_UO_by_COD_OU(this.selezionato).subscribe((dataou)=>{
      this.dataou = dataou;
      for(let z:number=0;z<this.dataou.length;z++){
              this.form.controls.denominazione.setValue(this.dataou[z].des_ou);  
              this.form.controls.sede.setValue(this.dataou[z].indirizzo);
              this.form.controls.cap.setValue(this.dataou[z].cap);
              this.comune.setValue(this.dataou[z].comune);
              this.form.controls.provincia.setValue(this.dataou[z].provincia);
             // this.form.controls.sede.setValue(this.miasede);  
              this.form.controls.telefono.setValue(this.dataou[z].tel);   
              this.form.controls.email.setValue(this.dataou[z].mail1); 
              this.form.controls.miocomune.setValue(this.comune.value);
              this.form.controls.responsabile.setValue(this.dataou[z].nome_resp+' '+this.dataou[z].cogn_resp);       
            }
                       }, error => console.error(error))

   this.apiextService.get_DOM_DIG_UO(this.selezionato).subscribe((datadomdig)=>{
   this.datadomdig = datadomdig;
     for(let y:number=0;y<this.datadomdig.length;y++){
      if(this.datadomdig[y].tipo=="Pec"){
     this.form.controls.PEC.setValue(this.datadomdig[y].domicilio_digitale);                      
                        }
                      }
              }, error => console.error(error))            
                       
  }
}
