import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, NgModel } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { LocalStorageService } from 'src/app/local-storage.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { faBuilding, faIdCard, faEye, faAddressBook, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';

@Component({
  selector: 'app-rubrica-azienda-item-view',
  templateUrl: './rubrica-azienda-item-view.component.html',
  styleUrls: ['./rubrica-azienda-item-view.component.css']
})
export class RubricaAziendaItemViewComponent implements OnInit {
  faBuilding = faBuilding;
  faIdCard = faIdCard;
  faEye = faEye;
  faPhone = faPhone;
  faAddressBook = faAddressBook;
  aziende;
  id_azienda;
  tipo_selected;
  form: FormGroup;
  ente="no";
  dataipa;
  codiciipa: string[] = [];
  datistr;
  caricato="si";
  control = new FormControl();
  controlipa = new FormControl();
  filteredcodiciipa: Observable<string[]>;
  denominazione;
  tipo;
  piva;
  sede;
  email;
  codice_ipa;
  codiceipasingle: string[] = [];
  datastrutture;
  dataipasingle;
	panelOpenState = false;
  id_struttura;
  datapersonest;
  public allpersonest: string[] = [];  
  datapersoneaz;
  ncontatti;
  nindirizzi;
  contatti;
  indirizzi;
  indietro;
  PEC;
  pec;
  constructor(private apiService: ApiService,private location: Location, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private localStorageService: LocalStorageService) {
    this.indietro=this.router.url;
    this.route.queryParams.subscribe(
      params => {
        this.tipo_selected = params['tipo'];
        this.ente = params['tipo'];
        this.id_azienda = params['id_azienda'];
      });
 
}

  back(){
    this.location.back();
  }

  ngOnInit(): void {

    if(this.ente=="ente"){
      this.ente="si";
                         this.form = this.formBuilder.group({
                          denominazione: ['', Validators.required],
                          piva: ['', Validators.required],
                          sede: ['', Validators.required],
                          email: ['', Validators.required],
                          pec: ['', Validators.required],
                          codice_ipa: ['']
                        });

                        this.apiService.getSingleProtoRubricaAziende(this.id_azienda).subscribe((data)=>{
                          this.aziende = data;
                            for(let i:any=0;i<this.aziende.length;i++){
                              this.pec=this.PEC=this.aziende[i].PEC;
                              this.sede=this.aziende[i].toponimo + " " + this.aziende[i].sede + " " + this.aziende[i].CAP + " " + this.aziende[i].comune + " " + this.aziende[i].provincia + " " + this.aziende[i].nazione;
                              this.form.patchValue(this.denominazione=this.aziende[i].denominazione);
                              this.form.patchValue(this.sede=this.sede);
                              this.form.patchValue(this.piva=this.aziende[i].piva);
                              this.form.patchValue(this.email=this.aziende[i].email);
                              this.form.patchValue(this.codice_ipa=this.aziende[i].cod_IPA); 
                              this.form.patchValue(this.pec=this.pec);              
                    }
                    });
                    /*
                    this.apiService.GetSingleCodiceIPAbyIDrubrica(this.id_azienda).subscribe((dataipasingle)=>{
     
                      this.dataipasingle = dataipasingle;
                                for(let i:any=0; i<this.dataipasingle.length; i++){
                                
                                  this.codiceipasingle.push(this.dataipasingle[i].Des_amm+"*"+this.dataipasingle[i].Cod_amm+"*"+this.dataipasingle[i].id);
                                        
                                }
                                           this.form.patchValue(this.codice_ipa=this.codiceipasingle);      
                                       }, error => console.error(error))

                                       */
                                       this.apiService.getProtoRubricaContatti(this.id_azienda).subscribe((datacontatti: any) => {
                                        if (datacontatti != null) {
                                        this.contatti = datacontatti;
                                        }
                                      }, error => console.error(error));
                            
                                      this.apiService.getProtoRubricaIndirizzi(this.id_azienda).subscribe((dataindirizzi: any) => {
                                        if (dataindirizzi != null) {
                                        this.indirizzi = dataindirizzi;
                                        }
                                      }, error => console.error(error));
                 this.apiService.getAllProtoRubricaPersoneAzienda(this.id_azienda).subscribe((datapersoneaz)=>{  
                 if(datapersoneaz!=null){
                 this.datapersoneaz = datapersoneaz;
                }
          }, error => console.error(error))
    this.apiService.getAllProtoRubricaAziendeStrutture(this.id_azienda).subscribe((datastrutture)=>{  
    this.datastrutture = datastrutture;
    
    for(let j:any=0; j<this.datastrutture.length; j++){
    this.id_struttura = this.datastrutture[j].id;
    this.apiService.getAllProtoRubricaPersoneStrutture(this.id_azienda, this.id_struttura).subscribe((datapersonest)=>{  
     if(datapersonest!=null){
      this.datapersonest = datapersonest;
      for(let z:any=0; z<this.datapersonest.length; z++){
      this.allpersonest.push(datapersonest[z]);
      }
    }
       }, error => console.error(error))
      }    
     }, error => console.error(error))
  } else {

    this.form = this.formBuilder.group({
      denominazione: ['', Validators.required],
      piva: ['', Validators.required],
      sede: ['', Validators.required],
      email: ['', Validators.required],
      PEC: ['', Validators.required],
    });
      this.apiService.getSingleProtoRubricaAziende(this.id_azienda).subscribe((data)=>{
      this.aziende = data;
        for(let i:any=0;i<this.aziende.length;i++){
          this.sede=this.aziende[i].toponimo + " " + this.aziende[i].sede + " " + this.aziende[i].CAP + " " + this.aziende[i].comune + " " + this.aziende[i].provincia + " " + this.aziende[i].nazione;
          this.form.patchValue(this.denominazione=this.aziende[i].denominazione);
          this.form.patchValue(this.sede=this.sede);
          this.form.patchValue(this.piva=this.aziende[i].piva);
          this.form.patchValue(this.email=this.aziende[i].email); 
          this.form.patchValue(this.PEC=this.aziende[i].PEC);      
}
});
  } 
  }

  viewPersona(id) {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'id_rubrica': id, 'indietro': this.indietro }
    };
    this.router.navigate(['/rubricaitemview'], navigationExtras);
  }
}
