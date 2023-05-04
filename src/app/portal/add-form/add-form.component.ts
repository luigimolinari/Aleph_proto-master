import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router'; 
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, FormBuilder,  Validators, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { C } from '@angular/cdk/keycodes';
import { LocalStorageService } from 'src/app/local-storage.service';


@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {
  id;
  azienda;
  aziende;
  user;
  faUser=faUser;
  faHouseUser=faHouseUser;
  faBuilding=faBuilding;
  faEdit=faEdit;
  faPlusSquare=faPlusSquare;
  faMinusSquare=faMinusSquare;
  nome: any;
  campo1;
  flusso;
  flussi;
  campo2;
  campo3;
  campo4;
  campo5;
  campo6;
  campo7;
  campo8;
  campo9;
  campo10;
  tipocampo1;
  tipocampo2;
  tipocampo3;
  tipocampo4;
  tipocampo5;
  tipocampo6;
  tipocampo7;
  tipocampo8;
  tipocampo9;
  tipocampo10;
  obblicampo1;
  obblicampo2;
  obblicampo3;
  obblicampo4;
  obblicampo5;
  obblicampo6;
  obblicampo7;
  obblicampo8;
  obblicampo9;
  obblicampo10;
  esito;
  el1;
  el2="no";
  el3="no";
  el4="no";
  el5="no";
  el6="no";
  el7="no";
  el8="no";
  el9="no";
  el10;
  pl1="si";
  pl2="si";
  pl3="si";
  pl4="si";
  pl5="si";
  pl6="si";
  pl7="si";
  pl8="si";
  pl9="si";
  pl10="si";
  msgerror:string;
  tipoalert;
  tipoalertdanger;
  tipoalertuncomplete;
  dati;
  form: FormGroup;
  tipouser;
  id_azienda;
  id_operatore;
  panelOpenState = false;
  idinserito;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder , private localStorageService: LocalStorageService) { 
       
    const id_azienda = JSON.parse(localStorage.getItem('id_azienda'));
    this.id_azienda=id_azienda;
    const tipouser = JSON.parse(localStorage.getItem('tipo_op'));
    this.tipouser=tipouser; 
    const id_operatore = JSON.parse(localStorage.getItem('ID'));
    this.id_operatore=id_operatore; 
  }
 

  Trasmetti(): void {
  
   if (this.form.valid) {
    this.apiService.AddPortalForm(this.form=this.form.value, this.id_operatore).subscribe((dati)=>{
      this.dati = dati['Esito'];
      if(this.dati=="si"){
        this.idinserito=dati['MioId'];
        if(confirm("Operazione correttamente eseguita")) {
        this.router.navigate(['/formselect'], { queryParams: {id: this.idinserito}});
        }
       } else if (this.dati=="si1") {
        this.idinserito=dati['MioId'];
        if(confirm("Operazione correttamente eseguita")) {
        this.router.navigate(['/formobbligatori'], { queryParams: {id: this.idinserito}});
        }
       }
       else{
        alert("Attenzione. Impossibile inserire il flusso");
       }
    });
  } else {
alert("Attenzione. Non tutti i campi obbligatori hanno un valore valido");
 }
    }


    accendi(elemento){
    if(elemento=="el2"){
      this.el2="si";
      this.pl1="no";
    }
    if(elemento=="el3"){
      this.el3="si";
      this.pl2="no";
    }
    if(elemento=="el4"){
      this.el4="si";
      this.pl3="no";
    }
    if(elemento=="el5"){
      this.el5="si";
      this.pl4="no";
    }
    if(elemento=="el6"){
      this.el6="si";
      this.pl5="no";
    }
    if(elemento=="el7"){
      this.el7="si";
      this.pl6="no";
    }
    if(elemento=="el8"){
      this.el8="si";
      this.pl7="no";
    }
    if(elemento=="el9"){
      this.el9="si";
      this.pl8="no";
    }
    if(elemento=="el10"){
      this.el10="si";
      this.pl9="no";
    }
    }


    spengi(elemento){
      if(elemento=="el2"){
        this.el2="no";
        this.pl1="si";
        }
        if(elemento=="el3"){
          this.el3="no";
          this.pl2="si";
          }
          if(elemento=="el4"){
            this.el4="no";
            this.pl3="si";
            }
            if(elemento=="el5"){
              this.el5="no";
              this.pl4="si";
              }
              if(elemento=="el6"){
                this.el6="no";
                this.pl5="si";
                }
                if(elemento=="el7"){
                  this.el7="no";
                  this.pl6="si";
                  }
                  if(elemento=="el8"){
                    this.el8="no";
                    this.pl7="si";
                    }
                    if(elemento=="el9"){
                      this.el9="no";
                      this.pl8="si";
                      }
                      if(elemento=="el10"){
                        this.el10="no";
                        this.pl9="si";
                        }                      
      }
  

  
    ngOnInit(): void {


        this.apiService.getAziendaUser(this.id_azienda).subscribe((dati)=>{
          this.aziende = dati;
              });

              this.apiService.getAllFlussi().subscribe((flussi:any)=>{
                this.flussi = flussi.filter(x => x.blocked != 1);
                    });
               

        this.form = this.formBuilder.group({
        nome: new FormControl('', Validators.minLength(2)),
        azienda: new FormControl('', Validators.required),
        flusso: new FormControl('', Validators.required),
        campo1: new FormControl('', Validators.required),
        campo2: new FormControl(),
        campo3: new FormControl(),
        campo4: new FormControl(),
        campo5: new FormControl(),
        campo6: new FormControl(),
        campo7: new FormControl(),
        campo8: new FormControl(),
        campo9: new FormControl(),
        campo10: new FormControl(),
        tipocampo1: new FormControl('', Validators.required),
        tipocampo2: new FormControl(),
        tipocampo3: new FormControl(),
        tipocampo4: new FormControl(),
        tipocampo5: new FormControl(),
        tipocampo6: new FormControl(),
        tipocampo7: new FormControl(),
        tipocampo8: new FormControl(),
        tipocampo9: new FormControl(),
        tipocampo10: new FormControl(),
        obblicampo1: new FormControl('', Validators.required),
        obblicampo2: new FormControl(),
        obblicampo3: new FormControl(),
        obblicampo4: new FormControl(),
        obblicampo5: new FormControl(),
        obblicampo6: new FormControl(),
        obblicampo7: new FormControl(),
        obblicampo8: new FormControl(),
        obblicampo9: new FormControl(),
        obblicampo10: new FormControl(),
        });
    }

}