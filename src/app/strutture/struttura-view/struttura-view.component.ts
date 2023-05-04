import { Component, OnInit,  ElementRef, ViewChild, } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router'; 
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, FormBuilder,  Validators, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/local-storage.service';
import {Observable} from 'rxjs';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-struttura-view',
  templateUrl: './struttura-view.component.html',
  styleUrls: ['./struttura-view.component.css']
})
export class StrutturaViewComponent implements OnInit {
  id;
  azienda;
  aziende;
  struttura;
  user;
  faUser=faUser;
  faHouseUser=faHouseUser;
  faBuilding=faBuilding;
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
  miastruttura;
  control = new FormControl();
  responsabili: string[] = [];
  filteredResponsabili: Observable<string[]>;
  AOO;
  responsabile;
  cf;
  datacf;
  datiresp;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private localStorageService: LocalStorageService) { 
    
    const id_azienda = JSON.parse(localStorage.getItem('id_azienda'));
    this.id_azienda=id_azienda;
    const id_operatore = JSON.parse(localStorage.getItem('ID'));
    this.id_operatore=id_operatore;
    const CF = JSON.parse(localStorage.getItem('CF'));
    this.CF=CF;
  }


  
    ngOnInit(){


      this.route.queryParams.subscribe( 
        params => { 
          this.id =  params['id']; 
          this.apiService.getSingleStruttura(this.id_operatore,this.CF,this.id).subscribe((data)=>{
            this.miastruttura = data;
                        for(let i:any=0;i<this.miastruttura.length;i++){
            this.form.patchValue(this.nome=this.miastruttura[i].nome);
            this.form.patchValue(this.ccosto=this.miastruttura[i].ccosto);
            this.form.patchValue(this.sede=this.miastruttura[i].sede);
            this.form.patchValue(this.AOO=this.miastruttura[i].codice_AOO);
            this.form.patchValue(this.pec=this.miastruttura[i].pec);
            this.form.patchValue(this.email=this.miastruttura[i].email);
            this.form.patchValue(this.telefono=this.miastruttura[i].telefono);
            this.form.patchValue(this.azienda=this.miastruttura[i].azienda);
            this.form.patchValue(this.livello=this.miastruttura[i].livello);

           this.cf=this.miastruttura[i].id_responsabile;
           this.apiService.getOperatorebycf(this.cf).subscribe((datacf)=>{
 
            this.datacf = datacf;
            for(let j:any=0;j<this.datacf.length;j++){
              this.datiresp=this.datacf[i].nome+'*'+this.datacf[i].cognome+'*'+this.datacf[i].CF;
              this.form.patchValue(this.idResponsabiless=this.datiresp);
            }
                }, error => console.error(error));
          }
          });
        } 
      ) 


    this.apiService.getSingleAziendaStruttura(this.id_azienda,this.id_operatore, this.CF).subscribe((data)=>{
 
      this.data = data;
  
          }, error => console.error(error));

      
              

        this.form = this.formBuilder.group({
        nome: new FormControl('', Validators.minLength(2)),
        ccosto: new FormControl('', Validators.minLength(2)),
        azienda: new FormControl('', Validators.required),
        livello: new FormControl('', Validators.required),
        sede: new FormControl(),
        pec: new FormControl(),
        AOO: new FormControl(),
        email: new FormControl(),
        telefono: new FormControl(),
        idResponsabiless: new FormControl(),

            });
    }


  panelOpenState = false;

}
