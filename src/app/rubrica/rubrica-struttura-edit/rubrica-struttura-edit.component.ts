import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ApiextService } from 'src/app/apiext.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { LocalStorageService } from 'src/app/local-storage.service';
import { Location } from '@angular/common';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { faShareSquare } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-rubrica-struttura-edit',
  templateUrl: './rubrica-struttura-edit.component.html',
  styleUrls: ['./rubrica-struttura-edit.component.css']
})
export class RubricaStrutturaEditComponent implements OnInit {
  faShareSquare=faShareSquare;
  comune = new FormControl('');
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  aziende = [];
  data;
  id_rubrica;
  azienda_nome_selected = '';
  disable_azienda = false;
  form: FormGroup;
  dataipa;
  codiciipa: string[] = [];
  codici_ipa: string[] = [];
  cod_ente;
  ipa;
  id_azienda;
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
  strpadre;
  strutture;
  id_struttura_padre;
  datanazioni;
  nazione;
  miocomune;
  ipa_selected;
  dataipascelto;
  risultati;
  desc_amm;
  default_ipa="si";
  desc_ou;
  selezionato;
  dataou;
  datadomdig;
  ente;
  constructor(private apiService: ApiService,private apiextService: ApiextService,private location: Location, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private localStorageService: LocalStorageService) {

    this.route.queryParams.subscribe(
      params => {
        this.id_rubrica = params['id_rubrica'];
        this.cod_ente = params['IPA'];
        this.tipo = params['tipo'];
        if(this.tipo=="ente"){
          this.ente="si";
        }
        this.form = formBuilder.group({
          denominazione: ['', Validators.required],
          sede: ['', Validators.required],
          email: ['', Validators.required],
          telefono: [''],
          responsabile: [''],
          codice_ipa: [''],
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

        this.apiService.GetAllComuniIstat().subscribe((dataistat)=>{
          this.dataistat = dataistat;
                    for(let i:any=0; i<this.dataistat.length; i++){
                                       
                        this.options.push(this.dataistat[i].denominazione);
                    }
                    this.apiService.GetAllNazioni().subscribe((datanazioni)=>{
                      this.datanazioni = datanazioni;
       
                                       }, error => console.error(error))
                                                  this.caricato="si";           
                           }, error => console.error(error))

        this.apiService.getSingleProtoRubricaAziendeStrutture(this.id_rubrica).subscribe((data: any) => {
          this.data = data;
          
          if (this.data != null) {
            for(let t: any=0;t<data.length;t++){
              this.id_struttura_padre=data[t].struttura_padre;
              this.ipa_selected=data[t].cod_AOO;
              this.id_azienda=data[t].id_azienda;
              this.form.controls.denominazione.setValue(this.data[t].nome);
              this.form.controls.sede.setValue(this.data[t].sede);
              this.form.controls.toponimo.setValue(this.data[t].toponimo);
              this.form.controls.cap.setValue(this.data[t].CAP);
              this.form.controls.civico.setValue(this.data[t].civico);
              this.form.controls.provincia.setValue(this.data[t].provincia);
              this.form.controls.responsabile.setValue(this.data[t].responsabile);
              this.form.controls.email.setValue(this.data[t].email);
              this.form.controls.telefono.setValue(this.data[t].telefono);
              this.form.controls.telefono2.setValue(this.data[t].telefono2);
              this.form.controls.PEC.setValue(this.data[t].PEC);
              this.form.controls.nazione.setValue(this.data[t].nazione);
              this.comune.setValue( this.data[t].comune);
              this.form.controls.miocomune.setValue(this.data[t].comune);
              this.apiextService.get_UO_by_COD_OU(this.ipa_selected).subscribe((dataipascelto)=>{
                this.dataipascelto=dataipascelto;
                this.risultati="si";
                for(let i:number=0;i<this.dataipascelto.length;i++){
                this.desc_ou=this.dataipascelto[i].des_ou; 
                this.form.controls.codice_ipa.setValue(this.ipa_selected); 
                  }
                   }, error => console.error(error))  
              this.apiextService.get_UO_by_IPA(this.cod_ente).subscribe((dataipa)=>{
                this.dataipa=dataipa;
               
                   }, error => console.error(error))  
              this.apiService.getAllProtoRubricaAziendeStrutture(this.id_azienda).subscribe((datastr: any) => {
                this.strutture = datastr;
             
                for(let j:any=0;j<datastr.length;j++){
                  if(this.strutture[j].id==this.id_struttura_padre){
                this.form.controls.strpadre.setValue(this.strutture[j].id);
              }
                        }
  
              }, error => console.error(error));
            }
                      
          }
        });
      });
  }


  Trasmetti(): void {
    if (this.form.valid) {
      this.apiService.UpdateProtoRubricaAziendeStrutture(this.id_rubrica, this.id_azienda, this.form.value).subscribe((data: any) => {
        alert(data['Esito']);      
        this.router.navigate(['/rubricaview']);
      }, error => console.error(error));
    } else {
      alert('Campi non correttamente compilati. Tutti i campi sono obbligatori');
    }

  }

  back() { 
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
    this.selezionato=this.form.controls.codice_ipa.value;
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

