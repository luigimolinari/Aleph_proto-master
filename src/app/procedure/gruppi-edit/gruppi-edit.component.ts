import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'; 
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-gruppi-edit',
  templateUrl: './gruppi-edit.component.html',
  styleUrls: ['./gruppi-edit.component.css']
})
export class GruppiEditComponent implements OnInit {

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
  validoProc='disabled';
  validoTipo='disabled';
  id_procedura;
  id_tipogruppo;
  nome;
  dati;

  id;
  gruppo;
  mode; //p: gruppo-procedura / f: gruppo-fascicolo
  getMethod;
  updateMethod;


  constructor(private _formBuilder: FormBuilder, private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
   
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
   
      this.thirdFormGroup = this._formBuilder.group({
        nome_gruppo: ['', Validators.required]
      });

      this.route.queryParams.subscribe( 
        params => {
          //passo da query string l'id del gruppo procedura che intendo modificare e il parametro mode, che definisce se stiamo modificando un gruppo procedura o un gruppo fascicolo
          this.id =  params['id']; 
          this.mode =  params['mode']; 

          if(this.mode=='p'){
            this.getMethod = 'getSingleGruppoProcedura';
            this.updateMethod = 'UpdateGruppo';
          }else{
            this.getMethod = 'getSingleGruppoFascicolo';
            this.updateMethod = 'UpdateGruppoFascicolo';
          }

          this.apiService[this.getMethod](this.id).subscribe((data)=>{
            this.gruppo = data;
            console.log(this.gruppo);
            if(this.gruppo.length==1){
          
              this.tipogruppo.setValue(this.gruppo[0].tipo_nome+"*"+this.gruppo[0].id_tipo_gruppo);
              this.thirdFormGroup.controls['nome_gruppo'].setValue(this.gruppo[0].nome_gruppo);
                         
              if(this.gruppo[0].id_tipo_gruppo!=undefined)
                this.validoTipo='';
                           
            }else{
              alert('Qualcosa è andato storto nel recupero dei dati');
            }
          });
      });

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
      this.validoTipo='';
    } else {
      this.validoTipo='disabled';
    }
  }

  trasmetti(){
    
    if(this.thirdFormGroup.valid && this.validoTipo == ''){
      
     
      this.id_tipogruppo = this.tipogruppo.value.split("*")[1];
      this.nome = this.thirdFormGroup.value.nome_gruppo;

      
      this.apiService[this.updateMethod](this.id,this.id_tipogruppo,this.nome,this.ID).subscribe((dati)=>{
          this.dati = dati['Esito'];
          if(this.dati=="si"){
            if(confirm("Gruppo correttamente modificato")) {
              this.router.navigate(['/procedure']);
            }
          } else {
              alert("Attenzione. Qualcosa è andato storto. Impossibile completare la modifica");
          }
      });     

    } else {
      alert('Attenzione. Non tutti i campi obbligatori: Tipo gruppo, Nome gruppo sono stati correttamente inseriti');
    }
    
  }
  }


  