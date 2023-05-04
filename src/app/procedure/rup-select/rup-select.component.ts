import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-rup-select',
  templateUrl: './rup-select.component.html',
  styleUrls: ['./rup-select.component.css']
})
export class RupSelectComponent implements OnInit {

  ID;
  data;
  control = new FormControl();
  rup: string[] = [];
  filteredRUP: Observable<string[]>;
  valido;
  flusso;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {

    const myID = JSON.parse(localStorage.getItem('ID'));
    this.ID=myID;
    this.route.queryParams.subscribe( 
      params => { 
        this.flusso =  params['flusso']; 
      });

    this.apiService.getAllRUP(this.ID).subscribe((data)=>{
 
      this.data = data;

      for(let i:any=0; i<this.data.length; i++){
     this.rup.push(this.data[i].CF);
      }
          }, error => console.error(error));

  }

  ngOnInit() {
    this.valido=true;
    this.filteredRUP = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.rup.filter(rup => this._normalizeValue(rup).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  panelOpenState = false;

SetControl(valore){
  if(valore==1){
    this.valido=false;
  } else {
    this.valido=true;
  }
}

}
