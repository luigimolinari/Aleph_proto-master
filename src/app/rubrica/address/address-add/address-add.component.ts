import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, NgModel } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { LocalStorageService } from 'src/app/local-storage.service';
import { Location } from '@angular/common';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
@Component({
  selector: 'app-address-add',
  templateUrl: './address-add.component.html',
  styleUrls: ['./address-add.component.css']
})
export class AddressAddComponent implements OnInit {
  comune = new FormControl('');
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  aziende;
  tipo_selected;
  form: FormGroup;
  responsabile;
  telefono1;
  id_azienda;
  ente;
  cod_ente;
  codice_ipa;
  tipo;
  PEC;
  telefono2;
  telefono3;
  telefono4;
  telefono5;
  toponimo;
  posizione;
  civico;
  cap;
  provincia;
  datastrutt;
  dataistat;
  caricato="no";
  datatarga;
  datanazioni;
  nazione;
  id_rubrica;

  constructor(private apiService: ApiService,private location: Location, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
  
    this.route.queryParams.subscribe(
      params => {
        this.id_rubrica = params['id_rubrica'];
      });

        this.form = formBuilder.group({
          sede: ['', Validators.required],
          telefono1: [''],
          telefono2: [''],
          telefono3: [''],
          telefono4: [''],
          telefono5: [''],
          posizione: [''],
          toponimo: [''],
          civico: [''],
          nazione: ['', Validators.required],
          cap: [''],
          comune: ['', Validators.required],
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
                                     this.form.controls.nazione.setValue("Italia");
                                                this.caricato="si";           
                         }, error => console.error(error))

  }


  Trasmetti(): void {

    if (this.form.valid) {
      this.apiService.AddProtoRubricaAddress(this.id_rubrica, this.form.value).subscribe((dati) => {
        alert(dati['Esito']);
        if (dati['esito_codice'] == 1) {       
          let navigationExtras: NavigationExtras = {
            queryParams: { 'id_rubrica': this.id_rubrica }
          };     
          this.location.back();   
        }       
      });
    } else {
      alert("Attenzione. Non tutti i campi obbligatori hanno un valore valido");
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
    this.apiService.GetTargaIstat(valore).subscribe((datatarga)=>{
      this.datatarga = datatarga;
                for(let j:any=0; j<this.datatarga.length; j++){     
                  this.form.controls.comune.setValue(valore);             
                  this.form.controls.provincia.setValue(this.datatarga[j].sigla_auto);
                }        
                       }, error => console.error(error))
  }
}

