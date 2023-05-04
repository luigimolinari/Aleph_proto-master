import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { C } from '@angular/cdk/keycodes';
import { LocalStorageService } from 'src/app/local-storage.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';



@Component({
  selector: 'app-edit-field',
  templateUrl: './edit-field.component.html',
  styleUrls: ['./edit-field.component.css']
})

export class EditFieldComponent implements OnInit {
  id;
  azienda;
  aziende;
  user;
  faUser = faUser;
  faHouseUser = faHouseUser;
  faBuilding = faBuilding;
  faEdit = faEdit;
  faPlusSquare = faPlusSquare;
  faMinusSquare = faMinusSquare;
  nome: any;
  campo1;
  flusso;
  flussi;
  tipocampo1;
  obblicampo1;
  validator1;
  esito;
  el1;
  pl1 = "si";
  msgerror: string;
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
  form_field;
  id_form;
  opzioni: string[] = [];
  chipInput: string;
  miotipo: string;
  selectable = true;
  removable = true;
  addOnBlur = true;
  isgateway: boolean;
  id_flusso: string;
  steps_valle = [];

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];


  constructor(public dialogRef: MatDialogRef<EditFieldComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private apiService: ApiService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private localStorageService: LocalStorageService) {
    const id_azienda = JSON.parse(localStorage.getItem('id_azienda'));
    this.id_azienda = id_azienda;
    const tipouser = JSON.parse(localStorage.getItem('tipo_op'));
    this.tipouser = tipouser;
    const id_operatore = JSON.parse(localStorage.getItem('ID'));
    this.id_operatore = id_operatore;
  }

  ngOnInit(): void {

    if (this.data.obbligatorio == "1") {
      this.data.obbligatorio = "Si";
    } else {
      this.data.obbligatorio = "No";
    }
    this.id = this.data.id_field;
    this.id_form = this.data.id_form;
    this.opzioni = this.data.opzioni;
    this.miotipo = this.data.tipo_field;

    this.id_flusso = this.data.id_flusso;

    this.isgateway = this.data.isgateway;
    this.steps_valle = this.data.steps_valle;


    this.form = this.formBuilder.group({
      campo1: new FormControl(this.data.nome_campo, [Validators.required, Validators.minLength(2)]),
      tipocampo1: new FormControl(this.data.tipo_field, Validators.required),
      obblicampo1: new FormControl(this.data.obbligatorio, Validators.required),
      validator1: new FormControl(this.data.validator),
    });
  }

  aggiungiOpzione(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Aggiungi l'opzione solo se esiste e non è già presente nelle opzioni
    if ((value || '').trim() && !this.opzioni.includes(value)) {
      this.opzioni.push(value.trim());
    }

    // Resetta il valore dell'input
    if (input) {
      input.value = '';
    }
  }

  rimuoviOpzione(opzione: string): void {
    const index = this.opzioni.indexOf(opzione);

    if (index >= 0) {
      this.opzioni.splice(index, 1);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  Trasmetti(): void {

    if (this.form.valid) {
      if(!this.isgateway){
        this.apiService.UpdateFormField(this.id_form, this.form_field = this.form.value, this.id, this.opzioni).subscribe((dati) => {
          this.dati = dati['Esito'];
          if (this.dati == "si") {
            if (confirm("Campo correttamente modificato")) {
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/formview'], { queryParams: { id: this.id_form } });
              });
              this.closeDialog();
            }
          }
          else {
            alert("Attenzione. Impossibile modificare il campo");
          }
        });
      }else{
        //nel caso di modifica di un campo gateway devo cancellare tutti gli step di workflow definiti a valle dello stesso (=steps_to_delete)
        this.apiService.UpdateFormFieldGateway(this.id_form, this.form_field = this.form.value, this.id, this.opzioni, this.steps_valle, this.data.tipo_field, this.id_flusso).subscribe((res_update:any) => {
          if (res_update.esito_codice == "1") {
            if (confirm("Campo correttamente modificato")) {
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/formview'], { queryParams: { id: this.id_form } });
              });
              this.closeDialog();
            }
          }
          else {
            alert(res_update.esito_mex);
          }
        });
      }
    } else {
      alert("Attenzione. Non tutti i campi obbligatori hanno un valore valido");
    }
  }

  onAlertClick() {
    this.msgerror = '';
    this.tipoalert = '';
    this.tipoalertdanger = '';
    this.tipoalertuncomplete = '';
  }

  cambiotipo() {
    let valoreSelezionato = (<HTMLInputElement>document.getElementById("tipocampo1")).value;
    if (valoreSelezionato == "Select") {
      this.miotipo = "Select";
      this.opzioni = []; // pulisce l'array opzioni
    } else {
      this.miotipo = "";
    }
  }

}