import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/local-storage.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.css']
})
export class FormAddComponent implements OnInit {

  id;
  azienda;
  aziende;
  flussi;
  user;
  faUser = faUser;
  faHouseUser = faHouseUser;
  faBuilding = faBuilding;
  faEdit = faEdit;
  faPlusSquare = faPlusSquare;
  faMinusSquare = faMinusSquare;
  form: FormGroup;

  id_azienda;
  id_operatore;
  panelOpenState = false;

  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  riferimenti_list = [];

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private localStorageService: LocalStorageService) {

    const id_azienda = JSON.parse(localStorage.getItem('id_azienda'));
    this.id_azienda = id_azienda;
    const id_operatore = JSON.parse(localStorage.getItem('ID'));
    this.id_operatore = id_operatore;
  }

  get_riferimenti(): void {
    this.riferimenti_list = [];
    let flusso_selected = this.form.controls.flusso.value;
    this.apiService.getFormWorkflow(flusso_selected).subscribe((res: any) => {
      if (res!= null){
        for (let i: any = 0; i < res.length; i++) {
          let obj : any = new Object();
          obj.value = res[i].id;
          obj.descr = res[i].header + "*F" + res[i].id;
          this.riferimenti_list.push(obj);
        }
        console.log(this.riferimenti_list);
      }
    });
  }

  Trasmetti(): void {
    console.log(this.form.value);
    if (this.form.valid && this.form.controls.fields['controls'].length >= 1) {
      //controllo validità select: per ogni campo select devono essere definite almeno 2 opzioni
      let type_select = this.form.value.fields.filter(x=>x.tipo == 'Select');
      let error = false;
      type_select.forEach(element => {
        if(element.options.length <= 1){
          error = true;
        }
      });

      if(error){
        alert("Attenzione! Per ogni campo di tipo select devono essere definite almeno due opzioni")
      }

      this.apiService.AddForm(this.form.value, this.id_operatore).subscribe((res: any) => {
        if (res.esito_codice == '1') {

          alert('Operazione eseguita con successo');
          this.back();

        } else {
          alert('Errore, operazione annullata. Impossibile salvare il form.')
        }
      });
    } else {
      alert("Attenzione. Non tutti i campi obbligatori hanno un valore valido.");
    }
  }


  addOption(event: MatChipInputEvent, idx){
    console.log(event);
    let input = event.input;
    let value = event.value;
    if ((value || '').trim()) {
      this.options_field[idx].push(value);
      this.form.controls.fields['controls'][idx].controls.options.value = this.options_field[idx];
    }
    if (input) {
      input.value = '';
    }

  }


  ngOnInit(): void {

    //Recupero l'azienda associata all'utente loggato

    this.apiService.getAziendaUser(this.id_azienda).subscribe((dati) => {
      this.aziende = dati;
    });

    //Recupero i flussi a cui può essere agganciato il form
    this.apiService.getAllFlussi().subscribe((flussi: any) => {
      this.flussi = flussi.filter(x => x.blocked != 1);
    });

    //Costruzione form
    this.createForm();

  }

  createForm(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl('', Validators.minLength(2)),
      azienda: new FormControl('', Validators.required),
      flusso: new FormControl('', Validators.required),
      header: new FormControl('', Validators.required),
      legenda: new FormControl('', Validators.required),
      immagine: new FormControl('', Validators.required),
      fields: this.initItems(),
      id_form_ref: new FormControl(''),
    });
  }

  options_field = [[]];
  initItems() {
    var formArray = this.formBuilder.array([]);
    formArray.push(this.formBuilder.group({
      campo: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      obbligatorio: ['', [Validators.required]],
      validator: [''],
      options: [this.options_field[0]]
    }));
    return formArray;
  }

  addNewItem(): void {
    let idx = this.form.value.fields.length;
    this.options_field.push([]);
    const controls = <FormArray>this.form.controls['fields'];
    let formGroup = this.formBuilder.group({
      campo: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      obbligatorio: ['', [Validators.required]],
      validator: [''],
      options: [this.options_field[idx]]
    });
    controls.push(formGroup);
  }

  removeItem(i: number) {
    const controls = <FormArray>this.form.controls['fields'];
    controls.removeAt(i);
  }

  back(): void {
    this.router.navigate(['/forms']);
  }

}