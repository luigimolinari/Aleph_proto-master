import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, FormBuilder, Validators, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { C } from '@angular/cdk/keycodes';
import { LocalStorageService } from 'src/app/local-storage.service';


export interface Parola {
  name: string;
}

export interface Parola2 {
  name2: string;
}

export interface Parola3 {
  name3: string;
}
export interface Parola4 {
  name4: string;
}
export interface Parola5 {
  name5: string;
}
export interface Parola6 {
  name6: string;
}
export interface Parola7 {
  name7: string;
}
export interface Parola8 {
  name8: string;
}
export interface Parola9 {
  name9: string;
}
export interface Parola10 {
  name10: string;
}

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.css']
})
export class FormSelectComponent {
  panelOpenState = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  idform;
  selezioni;
  stringa1;
  stringa2;
  stringa3;
  stringa4;
  stringa5;
  stringa6;
  stringa7;
  stringa8;
  stringa9;
  stringa10;
  completo;
  dati;
  isselect = "no";

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private localStorageService: LocalStorageService) {

    this.route.queryParams.subscribe(
      params => {
        this.idform = params['id'];
      });

    this.apiService.getPortalForm(this.idform).subscribe((data) => {

      this.selezioni = data;

      if (this.selezioni != null && this.selezioni != undefined) {

        for (var i = 0; this.selezioni.length; i++) {
          if (this.selezioni[i].tipocampo1 == "Select") {
            this.isselect = "si";
          }
          if (this.selezioni[i].tipocampo2 == "Select") {
            this.isselect = "si";
          }
          if (this.selezioni[i].tipocampo3 == "Select") {
            this.isselect = "si";
          }
          if (this.selezioni[i].tipocampo4 == "Select") {
            this.isselect = "si";
          }
          if (this.selezioni[i].tipocampo5 == "Select") {
            this.isselect = "si";
          }
          if (this.selezioni[i].tipocampo6 == "Select") {
            this.isselect = "si";
          }

          if (this.selezioni[i].tipocampo7 == "Select") {
            this.isselect = "si";
          }
          if (this.selezioni[i].tipocampo8 == "Select") {
            this.isselect = "si";
          }
          if (this.selezioni[i].tipocampo9 == "Select") {
            this.isselect = "si";
          }
          if (this.selezioni[i].tipocampo10 == "Select") {
            this.isselect = "si";
          }

          if (this.isselect == "no") {
            this.router.navigate(['/formobbligatori'], { queryParams: { id: this.idform } });
          }
        }

      }

      }, error => console.error(error));


  }



  readonly separatorKeysCodes: number[] = [ENTER, COMMA];


  //CODICE CHIPS
  parole: Parola[] = [];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      if (this.parole.length < 10) {
        if(this.parole.filter(x => x.name == value.trim()).length==0){
          this.parole.push({ name: value.trim() });
        }else{
          alert("Attenzione. Valore già inserito");
        }
      } else {
        alert("Attenzione. Puoi inserire al massimo 10 valori");
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(parola: Parola): void {
    const index = this.parole.indexOf(parola);

    if (index >= 0) {
      this.parole.splice(index, 1);
    }
  }
  //FINE CODICE CHIPS


  //CODICE CHIPS
  parole2: Parola2[] = [

  ];

  add2(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      if (this.parole2.length < 10) {
        if(this.parole2.filter(x => x.name2 == value.trim()).length==0){
          this.parole2.push({ name2: value.trim() });
        }else{
          alert("Attenzione. Valore già inserito");
        }
      } else {
        alert("Attenzione. Puoi inserire al massimo 10 valori");
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove2(parola2: Parola2): void {
    const index = this.parole2.indexOf(parola2);

    if (index >= 0) {
      this.parole2.splice(index, 1);
    }
  }
  //FINE CODICE CHIPS


  //CODICE CHIPS
  parole3: Parola3[] = [

  ];

  add3(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      if (this.parole3.length < 10) {
        if(this.parole3.filter(x => x.name3 == value.trim()).length==0){
          this.parole3.push({ name3: value.trim() });
        }else{
          alert("Attenzione. Valore già inserito");
        }
      } else {
        alert("Attenzione. Puoi inserire al massimo 10 valori");
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove3(parola3: Parola3): void {
    const index = this.parole3.indexOf(parola3);

    if (index >= 0) {
      this.parole3.splice(index, 1);
    }
  }
  //FINE CODICE CHIPS

  //CODICE CHIPS
  parole4: Parola4[] = [

  ];

  add4(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      if (this.parole4.length < 10) {
        if(this.parole4.filter(x => x.name4 == value.trim()).length==0){
          this.parole4.push({ name4: value.trim() });
        }else{
          alert("Attenzione. Valore già inserito");
        }
      } else {
        alert("Attenzione. Puoi inserire al massimo 10 valori");
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove4(parola4: Parola4): void {
    const index = this.parole4.indexOf(parola4);

    if (index >= 0) {
      this.parole4.splice(index, 1);
    }
  }
  //FINE CODICE CHIPS

  //CODICE CHIPS
  parole5: Parola5[] = [

  ];

  add5(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      if (this.parole5.length < 10) {
        if(this.parole5.filter(x => x.name5 == value.trim()).length==0){
          this.parole5.push({ name5: value.trim() });
        }else{
          alert("Attenzione. Valore già inserito");
        }
      } else {
        alert("Attenzione. Puoi inserire al massimo 10 valori");
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove5(parola5: Parola5): void {
    const index = this.parole5.indexOf(parola5);

    if (index >= 0) {
      this.parole5.splice(index, 1);
    }
  }
  //FINE CODICE CHIPS

  //CODICE CHIPS
  parole6: Parola6[] = [

  ];

  add6(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      if (this.parole6.length < 10) {
        if(this.parole6.filter(x => x.name6 == value.trim()).length==0){
          this.parole6.push({ name6: value.trim() });
        }else{
          alert("Attenzione. Valore già inserito");
        }
      } else {
        alert("Attenzione. Puoi inserire al massimo 10 valori");
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove6(parola6: Parola6): void {
    const index = this.parole6.indexOf(parola6);

    if (index >= 0) {
      this.parole6.splice(index, 1);
    }
  }
  //FINE CODICE CHIPS

  //CODICE CHIPS
  parole7: Parola7[] = [

  ];

  add7(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      if (this.parole7.length < 10) {
        if(this.parole7.filter(x => x.name7 == value.trim()).length==0){
          this.parole7.push({ name7: value.trim() });
        }else{
          alert("Attenzione. Valore già inserito");
        }
      } else {
        alert("Attenzione. Puoi inserire al massimo 10 valori");
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove7(parola7: Parola7): void {
    const index = this.parole7.indexOf(parola7);

    if (index >= 0) {
      this.parole7.splice(index, 1);
    }
  }
  //FINE CODICE CHIPS

  //CODICE CHIPS
  parole8: Parola8[] = [

  ];

  add8(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      if (this.parole8.length < 10) {
        if(this.parole8.filter(x => x.name8 == value.trim()).length==0){
          this.parole8.push({ name8: value.trim() });
        }else{
          alert("Attenzione. Valore già inserito");
        }
      } else {
        alert("Attenzione. Puoi inserire al massimo 10 valori");
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove8(parola8: Parola8): void {
    const index = this.parole8.indexOf(parola8);

    if (index >= 0) {
      this.parole8.splice(index, 1);
    }
  }
  //FINE CODICE CHIPS

  //CODICE CHIPS
  parole9: Parola9[] = [

  ];

  add9(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      if (this.parole9.length < 10) {
        if(this.parole9.filter(x => x.name9 == value.trim()).length==0){
          this.parole9.push({ name9: value.trim() });
        }else{
          alert("Attenzione. Valore già inserito");
        }
      } else {
        alert("Attenzione. Puoi inserire al massimo 10 valori");
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove9(parola9: Parola9): void {
    const index = this.parole9.indexOf(parola9);

    if (index >= 0) {
      this.parole9.splice(index, 1);
    }
  }
  //FINE CODICE CHIPS

  //CODICE CHIPS
  parole10: Parola10[] = [

  ];

  add10(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      if (this.parole10.length < 10) {
        if(this.parole10.filter(x => x.name10 == value.trim()).length==0){
          this.parole10.push({ name10: value.trim() });
        }else{
          alert("Attenzione. Valore già inserito");
        }
      } else {
        alert("Attenzione. Puoi inserire al massimo 10 valori");
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove10(parola10: Parola10): void {
    const index = this.parole10.indexOf(parola10);

    if (index >= 0) {
      this.parole10.splice(index, 1);
    }
  }
  //FINE CODICE CHIPS

  Trasmetti() {
    this.completo = "";
    if (this.parole.length > 0) {
      this.stringa1 = JSON.stringify(this.parole);
      this.completo = this.stringa1;
    } if (this.parole2.length > 0) {
      this.stringa2 = JSON.stringify(this.parole2);
      this.completo = this.completo + "*" + this.stringa2;
    } if (this.parole3.length > 0) {
      this.stringa3 = JSON.stringify(this.parole3);
      this.completo = this.completo + "*" + this.stringa3;
    } if (this.parole4.length > 0) {
      this.stringa4 = JSON.stringify(this.parole4);
      this.completo = this.completo + "*" + this.stringa4;
    } if (this.parole5.length > 0) {
      this.stringa5 = JSON.stringify(this.parole5);
      this.completo = this.completo + "*" + this.stringa5;
    } if (this.parole6.length > 0) {
      this.stringa6 = JSON.stringify(this.parole6);
      this.completo = this.completo + "*" + this.stringa6;
    } if (this.parole7.length > 0) {
      this.stringa7 = JSON.stringify(this.parole7);
      this.completo = this.completo + "*" + this.stringa7;
    } if (this.parole8.length > 0) {
      this.stringa8 = JSON.stringify(this.parole8);
      this.completo = this.completo + "*" + this.stringa8;
    } if (this.parole9.length > 0) {
      this.stringa9 = JSON.stringify(this.parole9);
      this.completo = this.completo + "*" + this.stringa9;
    } if (this.parole10.length > 0) {
      this.stringa10 = JSON.stringify(this.parole10);
      this.completo = this.completo + "*" + this.stringa10;
    }
    this.apiService.AddPortalFormSelect(this.completo, this.idform).subscribe((dati) => {
      this.dati = dati['Esito'];
      if (this.dati == "si") {
        if (confirm("Valori correttamente registrati")) {
          this.router.navigate(['/formobbligatori'], { queryParams: { id: this.idform } });
        }
      }
      else {
        alert("Attenzione. Impossibile inserire i valori");
      }
    });
  }

}
