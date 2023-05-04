import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from 'src/app/api.service';



@Component({
  selector: 'app-flussi-select',
  templateUrl: './flussi-select.component.html',
  styleUrls: ['./flussi-select.component.css']
})
export class FlussiSelectComponent implements OnInit {

  data;
  control = new FormControl();
  flussi: string[] = [];
  filteredFlussi: Observable<string[]>;
  valido;


  constructor(private apiService: ApiService) {

    this.apiService.getAllFlussi().subscribe((data) => {

      this.data = data;

      for (let i: any = 0; i < this.data.length; i++) {
        // this.data[i].availabe = 0 ==> flusso per il quale non esiste ancora un workflow
        if (this.data[i].available == 0 && this.data[i].attivo == 1) {
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