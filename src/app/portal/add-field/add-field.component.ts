import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/local-storage.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';


@Component({
  selector: 'app-add-field',
  templateUrl: './add-field.component.html',
  styleUrls: ['./add-field.component.css']
})
export class AddFieldComponent implements OnInit {
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
  selectable = true;
  removable = true;
  addOnBlur = true;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(public dialogRef: MatDialogRef<AddFieldComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private apiService: ApiService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private localStorageService: LocalStorageService) {
    const id_azienda = JSON.parse(localStorage.getItem('id_azienda'));
    this.id_azienda = id_azienda;
    const tipouser = JSON.parse(localStorage.getItem('tipo_op'));
    this.tipouser = tipouser;
    const id_operatore = JSON.parse(localStorage.getItem('ID'));
    this.id_operatore = id_operatore;
  }

  ngOnInit(): void {
    this.id_form = this.data.id_form;
    this.form = this.formBuilder.group({
      campo1: ['', [Validators.required]],
      tipocampo1: ['', [Validators.required]],
      obblicampo1: ['', [Validators.required]],
      validator1: ['']
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  Trasmetti(): void {

    if (this.form.valid) {
      this.apiService.AddFormField(this.form_field = this.form.value, this.id_form, this.opzioni).subscribe((res_add: any) => {
        alert(res_add.esito_mex);
        if (res_add.esito_codice == "1") {

          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/formview'], { queryParams: { id: this.id_form } });
          });
          this.closeDialog();

        }
      });
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
}