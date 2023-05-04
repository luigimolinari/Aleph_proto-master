import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-procedura-select',
  templateUrl: './procedura-select.component.html',
  styleUrls: ['./procedura-select.component.css']
})
export class ProceduraSelectComponent {

 
  data;
  control = new FormControl();
  procedure: string[] = [];
  filteredProcedure: Observable<string[]>;
  valido;
  ID;
  selectedProcedura;


  constructor(private apiService: ApiService, private route: ActivatedRoute) {

    this.valido='disabled';

    const myID = JSON.parse(localStorage.getItem('ID'));
    this.ID=myID;

    this.route.queryParams.subscribe( 
      params => { 
        this.selectedProcedura =  params['procedura'];
    });

    if(this.selectedProcedura!=undefined){
      this.control.setValue(this.selectedProcedura);
      this.SetControl(1);
    }

    //soltanto per le procedure Private è necessario stabilire regole di visibilità
    this.apiService.getAvailableProcedure(this.ID,'','Privato').subscribe((data)=>{
 
      this.data = data;

      for(let i:any=0; i<this.data.length; i++){
          this.procedure.push(this.data[i].nome_procedura+"*"+this.data[i].id);
      }
    }, error => console.error(error));

    this.filteredProcedure = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    

  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.procedure.filter(procedure => this._normalizeValue(procedure).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  panelOpenState = false;

SetControl(valore){
  this.valido=valore;
  if(this.valido==1){
    this.valido='';
  } else {
    this.valido='disabled';
  }
}

}