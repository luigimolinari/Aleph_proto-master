import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocomplete} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-documentoflusso-select',
  templateUrl: './documentoflusso-select.component.html',
  styleUrls: ['./documentoflusso-select.component.css']
})
export class DocumentoflussoSelectComponent {

  data;
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  procedura: any;
  id_procedura: any;
  documento_flusso:any;

  valido="disabled";
  filtereddocs: Observable<string[]>;
  alldocs = [];
  control = new FormControl();

  @ViewChild('docInput') docInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;



  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
    
    this.route.queryParams.subscribe( 
      params => { 
        this.procedura =  params['procedura'];
        this.documento_flusso =  params['documento_flusso'];
    });
    
    this.id_procedura = this.procedura.split("*")[1];

    if(this.documento_flusso!=undefined){
      this.control.setValue(this.documento_flusso);
      this.SetControl(1);
    }

    
    //alimentazione dell'autocomplete
    //devo selezionare tutti i documenti_flusso associati, in workflow, al flusso realizzato dalla procedura passata in querystring
    //NB NON PIU SOLO DOCUMENTI FLUSSI, ANCHE FORM
    this.apiService.getDocumentiFlussoProcedura(this.id_procedura).subscribe((data)=>{
 
      this.data = data;

      for(let i:any=0; i<this.data.length; i++){
          this.alldocs.push(this.data[i].nome+"*"+this.data[i].id_workflow);
      }
    }, error => console.error(error));


    
    this.filtereddocs = this.control.valueChanges.pipe(
        startWith(''),
        map((doc: string | null) => doc ? this._filter(doc) : this.alldocs.slice())
    );
     
    
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.alldocs.filter(doc => this._normalizeValue(doc).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  
  panelOpenState = false;


  SetControl(valore){
    if(valore==0){
      this.valido="disabled";
    } else {
      this.valido='';
    }
  }
  
}
