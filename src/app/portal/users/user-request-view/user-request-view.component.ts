import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router'; 
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, FormBuilder,  Validators, NgModel } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-request-view',
  templateUrl: './user-request-view.component.html',
  styleUrls: ['./user-request-view.component.css']
})
export class UserRequestViewComponent implements OnInit {
  id;
  id_form;
  id_operatore;
  azienda;
  aziende;
  user;
  faUser=faUser;
  faHouseUser=faHouseUser;
  faBuilding=faBuilding;
  faEdit=faEdit;
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
  esito;
  msgerror:string;
  tipoalert;
  tipoalertdanger;
  tipoalertuncomplete;
  dati;
  form: FormGroup;
  campi;
  field;
  select1;
  select2;
  select3;
  select4;
  select5;
  select6;
  select7;
  select8;
  select9;
  select10;
  sfondo;
  nome_tab;
  val_campo1;
  datifield;


  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { 
    this.route.queryParams.subscribe(
      params => {
        this.id_form = params['id'];
        this.nome_tab = params['nome_tab'];
      });
      this.id_operatore = JSON.parse(localStorage.getItem('ID'));

      this.form = this.formBuilder.group({
        campo1: new FormControl(),
        campo2: new FormControl(),
        campo3: new FormControl(),
        campo4: new FormControl(),
        campo5: new FormControl(),
        campo6: new FormControl(),
        campo7: new FormControl(),
        campo8: new FormControl(),
        campo9: new FormControl(),
        campo10: new FormControl(),
      });
  }






  
    ngOnInit(): void {
   

      this.apiService.GetUserPortalFormView(this.id_form, this.id_operatore, this.nome_tab).subscribe((dati)=>{
        this.campi = dati;
        this.sfondo=this.campi[0].immagine;
        this.nome_tab=this.campi[0].nome_tab;
        for(let i:any=0;i<this.campi.length;i++){
         this.field=this.campi[i].field1;
         this.apiService.GetUserPortalFormViewFields(this.id_form, 'val_campo1', this.nome_tab, this.field).subscribe((datifield)=>{
          this.datifield=datifield;
          for(let j:any=0;j<this.datifield.length;j++){
          this.form.patchValue(this.campo1=datifield[j].val_campo1);
          }
});

        if(this.campi[i].field2!=''){
        this.field=this.campi[i].field2;
        this.apiService.GetUserPortalFormViewFields(this.id_form, 'val_campo2', this.nome_tab, this.field).subscribe((datifield)=>{
          this.datifield=datifield;
        for(let j:any=0;j<this.datifield.length;j++){
        this.form.patchValue(this.campo2=datifield[j].val_campo2);
        }
        });
      }

      if(this.campi[i].field3!=''){
        this.field=this.campi[i].field3;
        this.apiService.GetUserPortalFormViewFields(this.id_form, 'val_campo3', this.nome_tab, this.field).subscribe((datifield)=>{
          this.datifield=datifield;
        for(let j:any=0;j<this.datifield.length;j++){
        this.form.patchValue(this.campo3=datifield[j].val_campo3);
        }
        });
      }

      if(this.campi[i].field4!=''){
        this.field=this.campi[i].field4;
        this.apiService.GetUserPortalFormViewFields(this.id_form, 'val_campo4', this.nome_tab, this.field).subscribe((datifield)=>{
          this.datifield=datifield;
        for(let j:any=0;j<this.datifield.length;j++){
        this.form.patchValue(this.campo4=datifield[j].val_campo4);
        }
        });
      }

      if(this.campi[i].field5!=''){
        this.field=this.campi[i].field5;
        this.apiService.GetUserPortalFormViewFields(this.id_form, 'val_campo5', this.nome_tab, this.field).subscribe((datifield)=>{
          this.datifield=datifield;
        for(let j:any=0;j<this.datifield.length;j++){
        this.form.patchValue(this.campo5=datifield[j].val_campo5);
        }
        });
      }

      if(this.campi[i].field6!=''){
        this.field=this.campi[i].field6;
        this.apiService.GetUserPortalFormViewFields(this.id_form, 'val_campo6', this.nome_tab, this.field).subscribe((datifield)=>{
          this.datifield=datifield;
        for(let j:any=0;j<this.datifield.length;j++){
        this.form.patchValue(this.campo6=datifield[j].val_campo6);
        }
        });
      }

      if(this.campi[i].field7!=''){
        this.field=this.campi[i].field7;
        this.apiService.GetUserPortalFormViewFields(this.id_form, 'val_campo7', this.nome_tab, this.field).subscribe((datifield)=>{
          this.datifield=datifield;
        for(let j:any=0;j<this.datifield.length;j++){
        this.form.patchValue(this.campo7=datifield[j].val_campo7);
        }
        });
      }

      if(this.campi[i].field8!=''){
        this.field=this.campi[i].field8;
        this.apiService.GetUserPortalFormViewFields(this.id_form, 'val_campo8', this.nome_tab, this.field).subscribe((datifield)=>{
          this.datifield=datifield;
        for(let j:any=0;j<this.datifield.length;j++){
        this.form.patchValue(this.campo8=datifield[j].val_campo8);
        }
        });
      }

      if(this.campi[i].field9!=''){
        this.field=this.campi[i].field9;
        this.apiService.GetUserPortalFormViewFields(this.id_form, 'val_campo9', this.nome_tab, this.field).subscribe((datifield)=>{
          this.datifield=datifield;
        for(let j:any=0;j<this.datifield.length;j++){
        this.form.patchValue(this.campo9=datifield[j].val_campo9);
        }
        });
      }


      if(this.campi[i].field10!=''){
        this.field=this.campi[i].field10;
        this.apiService.GetUserPortalFormViewFields(this.id_form, 'val_campo10', this.nome_tab, this.field).subscribe((datifield)=>{
          this.datifield=datifield;
        for(let j:any=0;j<this.datifield.length;j++){
        this.form.patchValue(this.campo10=datifield[j].val_campo10);
        }
        });
      }




    }
                });



    }
}
