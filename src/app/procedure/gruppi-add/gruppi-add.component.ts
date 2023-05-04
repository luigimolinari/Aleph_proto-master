import { Component, OnInit,  ElementRef, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import { ActivatedRoute } from '@angular/router'; 


@Component({
  selector: 'app-gruppi-add',
  templateUrl: './gruppi-add.component.html',
  styleUrls: ['./gruppi-add.component.css']
})
export class GruppiAddComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  isEditable = false;
  ID;
  data;
  procedure: string[] = [];
  tipi: string[] = [];
  filteredProcedure;
  filteredTipi;
  procedura = new FormControl();
  tipogruppo = new FormControl();
  validoProc;
  validoTipo;
  id_procedura;
  id_tipogruppo;
  nome;
  dati;
  mode; //p: gruppo-procedura / f: gruppo-fascicolo

  constructor(private _formBuilder: FormBuilder, private apiService: ApiService,  private router: Router, private route:ActivatedRoute) {
   
    const myID = JSON.parse(localStorage.getItem('ID'));
    this.ID=myID;

    this.apiService.getAllTipoGruppo().subscribe((data)=>{
 
      this.data = data;

      for(let i:any=0; i<this.data.length; i++){
          this.tipi.push(this.data[i].nome+"*"+this.data[i].id);
      }
    }, error => console.error(error));

  }



  ngOnInit() {

    this.route.queryParams.subscribe( 
      params => {
        this.mode =  params['mode'];
      }
    );
   
    this.thirdFormGroup = this._formBuilder.group({
      nome_gruppo: ['', Validators.required]
    });
    
    this.validoTipo=true;

    this.filteredTipi = this.tipogruppo.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
      
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);   
    return this.tipi.filter(tipi => this._normalizeValue(tipi).includes(filterValue));  
  }

  private _normalizeValue(value: string): string {
      return value.toLowerCase().replace(/\s/g, '');
  }

  panelOpenState = false;


  ControlTipo(valore){
    if(valore==1){
      this.validoTipo=false;
    } else {
      this.validoTipo=true;
    }
  }


  trasmetti(){
    
   
    if(this.thirdFormGroup.valid && this.validoTipo == false){
      
    
      this.id_tipogruppo = this.tipogruppo.value.split("*")[1];
      this.nome = this.thirdFormGroup.value.nome_gruppo;

      if(this.mode=='p'){
         //add gruppo procedura
          this.apiService.AddGruppo(this.id_tipogruppo,this.nome,this.ID).subscribe((dati)=>{
            this.dati = dati ;
            if(this.dati["esito_codice"] ==1){ 
              if(confirm("Gruppo correttamente registrato")) {
                this.router.navigate(['/procedure']);
              }
            } else {
              alert("Attenzione. Qualcosa è andato storto. Impossibile completare l'inserimento");
            }
          });
      }else{
        //add gruppo fascicolo
        this.apiService.AddGruppoFascicolo(this.id_tipogruppo,this.nome,this.ID).subscribe((dati)=>{
          this.dati = dati ;
          if(this.dati["esito_codice"] ==1){ 
            if(confirm("Gruppo correttamente registrato")) {
              this.router.navigate(['/procedure']);
            }
          } else {
            alert("Attenzione. Qualcosa è andato storto. Impossibile completare l'inserimento");
          }
        });
      }

    } else {
      alert('Attenzione. Non tutti i campi obbligatori: Tipo gruppo, Nome gruppo sono stati correttamente inseriti');
    }
    
  }
  }
