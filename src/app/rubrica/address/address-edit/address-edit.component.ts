
import { faEdit } from '@fortawesome/free-solid-svg-icons';
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
  selector: 'app-address-edit',
  templateUrl: './address-edit.component.html',
  styleUrls: ['./address-edit.component.css']
})
export class AddressEditComponent implements OnInit {

  id;
  faEdit = faEdit;
  dati;
  id_rubrica;
  id_indirizzo;
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
  civico;
  cap;
  provincia;
  datastrutt;
  dataistat;
  caricato="no";
  datatarga;
  datanazioni;
  nazione;



  constructor(private apiService: ApiService, private location: Location, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
  
    this.route.queryParams.subscribe(
      params => {
        this.id_rubrica = params['id_rubrica'];
        this.id_indirizzo = params['id'];
        this.form = formBuilder.group({
          sede: ['', Validators.required],
          telefono1: [''],
          telefono2: [''],
          telefono3: [''],
          telefono4: [''],
          telefono5: [''],
          toponimo: [''],
          posizione: [''],
          civico: [''],
          nazione: ['', Validators.required],
          cap: [''],
          comune: ['', Validators.required],
          provincia: ['']
        });
        this.apiService.getSingleProtoRubricaAddress(this.id_indirizzo).subscribe((dati) => {
            if(dati!=null){
              this.form.controls.sede.setValue(dati[0].indirizzo);
              this.comune.setValue( dati[0].comune);
              this.form.controls.provincia.setValue(dati[0].provincia);
              this.form.controls.nazione.setValue(dati[0].stato);
              this.form.controls.posizione.setValue(dati[0].posizione);
              this.form.controls.toponimo.setValue(dati[0].toponimo);
              this.form.controls.cap.setValue(dati[0].CAP);
              this.form.controls.civico.setValue(dati[0].civico);
              this.form.controls.telefono1.setValue(dati[0].tel1);
              this.form.controls.telefono2.setValue(dati[0].tel2);
              this.form.controls.telefono3.setValue(dati[0].tel3);
              this.form.controls.telefono4.setValue(dati[0].tel4);
              this.form.controls.telefono5.setValue(dati[0].tel5);
            }
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