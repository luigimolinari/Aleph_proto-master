import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from 'src/app/api.service';



@Component({
  selector: 'app-add-procedura',
  templateUrl: './add-procedura.component.html',
  styleUrls: ['./add-procedura.component.css']
})
export class AddProceduraComponent implements OnInit {

  data;
  control = new FormControl();
  flussi: string[] = [];
  filteredFlussi: Observable<string[]>;
  valido;


  constructor(private apiService: ApiService) {


    this.apiService.getAllFlussi().subscribe((data) => {

      this.data = data;

      for (let i: any = 0; i < this.data.length; i++) {
        //seleziono solo i flussi per cui è stato creato un workflow e che sono di tipo procedura
        if (this.data[i].available == 1 && this.data[i].tipo === 'procedura') {
          this.flussi.push(this.data[i].nome_flusso + "*" + this.data[i].id);
        }
      }
    }, error => console.error(error));

  }

  ngOnInit() {
    this.valido = 'disabled';
    this.filteredFlussi = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.flussi.filter(flussi => this._normalizeValue(flussi).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  panelOpenState = false;

  SetControl(valore) {
    this.valido = valore;
    if (this.valido == 1) {
      this.valido = '';
    } else {
      this.valido = 'disabled';
    }
  }

}