import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
@Component({
  selector: 'app-fascicoli-add',
  templateUrl: './fascicoli-add.component.html',
  styleUrls: ['./fascicoli-add.component.css']
})
export class FascicoliAddComponent implements OnInit {

  id_operatore: any;
  id_azienda: any;
  nome: any = '';
  pubblicato: any;
  accesso: any;
  aziende:any;
  id_fascicolo_padre = new FormControl();
  id_procedura = new FormControl();
  splitted_id_fascicolo_padre: any = '';
  splitted_id_procedura: any = '';
  fascicoli: string[] = [];
  filteredFascicoli: Observable<string[]>;
  procedure: string[] = [];
  filteredProcedure: Observable<string[]>;
  validoProc = 1;
  validoPadre = 1;
  control_padre;
  hidden_padre = true;
  control_procedura;
  hidden_procedura = true;

  form: FormGroup;

  getFascicoli(azienda,accesso){
    this.apiService.getAllFascicoli(this.id_operatore,azienda,accesso).subscribe((data: any) => {
      if (data != null && data.length != 0) {
        for (let i: any = 0; i < data.length; i++) {
          this.fascicoli.push(data[i].nome + "*" + data[i].id);
        }
      }
    }, error => console.error(error));
  }

  getProcedure(azienda,accesso){
    this.apiService.getAvailableProcedure(this.id_operatore,azienda,accesso).subscribe((data: any) => {
      if (data != null && data.length != 0) {
        for (let i: any = 0; i < data.length; i++) {
          this.procedure.push(data[i].nome_procedura + "*" + data[i].id);
        }
      }
    }, error => console.error(error));
  }


  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {

    this.id_operatore = JSON.parse(localStorage.getItem('ID'));

  }

  ngOnInit(): void {

    this.apiService.getAvailableAziende(this.id_operatore).subscribe((aziende) => {
      this.aziende = aziende;
    });

    this.form = this.formBuilder.group({
      nome: new FormControl(this.nome, Validators.required),
      pubblicato: new FormControl(this.pubblicato, Validators.required),
      accesso: new FormControl(this.accesso, Validators.required),
      id_operatore: new FormControl(this.id_operatore),
      id_azienda: new FormControl(this.id_azienda,Validators.required),
      id_fascicolo_padre: this.id_fascicolo_padre,
      id_procedura: this.id_procedura
    });

    console.log(this.accesso);
  }

  Trasmetti(): void {

    if (this.form.valid && this.validoProc == 1 && this.validoPadre == 1) {
      if (this.form.controls['id_fascicolo_padre'].value != '' && this.form.controls['id_fascicolo_padre'].value != null) {
        this.splitted_id_fascicolo_padre = this.form.controls['id_fascicolo_padre'].value.split('*')[1];
      }else{
        this.splitted_id_fascicolo_padre = 0; //le radici, senza contenitore, hanno id_fascicolo_padre = 0
      }
      if (this.form.controls['id_procedura'].value != '' && this.form.controls['id_procedura'].value != null) {
        this.splitted_id_procedura = this.form.controls['id_procedura'].value.split('*')[1];
      }

      this.apiService.AddFascicolo(this.form.value, this.splitted_id_fascicolo_padre, this.splitted_id_procedura).subscribe((dati) => {

       

          alert(dati['Esito']);
          
       
        this.router.navigate(['/fascicoli']);

      });
    }
    else {
      alert("Attenzione. Non tutti i campi hanno un valore valido");
    }
  }

  private _filter(value: string, step: any): string[] {
    const filterValue = this._normalizeValue(value);
    if (step == 1) {
      return this.procedure.filter(procedure => this._normalizeValue(procedure).includes(filterValue));
    } else {
      return this.fascicoli.filter(fascicoli => this._normalizeValue(fascicoli).includes(filterValue));
    }

  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  SetControlProc(valore) {
    this.validoProc = valore;
  }

  SetControlPadre(valore) {
    this.validoPadre = valore;
  }

  resetField(e, field): void {
    if (!e) {
      this.form.controls[field].setValue('');
      if(field=='id_procedura') this.validoProc=1;
      if(field=='id_fascicolo_padre') this.validoPadre=1;
    }
  }

  Control(){
    //resetto le scelte
    this.form.controls['id_fascicolo_padre'].setValue('');
    this.form.controls['id_procedura'].setValue('');
    this.procedure = [];
    this.fascicoli = [];
    this.getFascicoli(this.id_azienda,this.accesso);
    this.getProcedure(this.id_azienda,this.accesso);

    this.filteredFascicoli = this.id_fascicolo_padre.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, 2))
    );
    this.filteredProcedure = this.id_procedura.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, 1))
    );
  }

}
