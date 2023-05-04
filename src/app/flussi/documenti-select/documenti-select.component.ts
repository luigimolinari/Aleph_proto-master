import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documenti-select',
  templateUrl: './documenti-select.component.html',
  styleUrls: ['./documenti-select.component.css']
})
export class DocumentiSelectComponent {
  operatore;
  data;
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  docCtrl = new FormControl();
  flusso: any;
  update: any;
  valido = "disabled";
  filtereddocs: Observable<string[]>;
  docs: string[] = [];
  selectedDocs;
  alldocs = [];

  @ViewChild('docInput') docInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;



  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {

    this.operatore = JSON.parse(localStorage.getItem('ID'));

    this.route.queryParams.subscribe(
      params => {
        this.flusso = params['flusso'];
        this.update = params['update'] == undefined ? 0 : params['update'];
        this.selectedDocs = params['docs'];

      });

    if (this.flusso.indexOf('*') != -1) {
      this.flusso = this.flusso.split("*")[1];
    }

    //selectedDocs!=undefined : documenti già selezionati - sono tornata indietro per modificare
    //update==1 : sto modificando il workflow esistente

    if (this.selectedDocs != undefined) {
      this.docs = this.selectedDocs;
      this.valido = '';
    } else {
      if (this.update == 1) {

        this.apiService.getDocumentoFlussoWorkflow(this.flusso).subscribe((data) => {

          this.data = data;
          if (this.data != null) {
            //inizializzo la lista documenti e abilito il btn per passaggio a fase 3
            for (let i: any = 0; i < this.data.length; i++) {
              this.docs.push(this.data[i].nome_doc + "*D" + this.data[i].id)
            }
          }
          this.valido = '';
        }, error => console.error(error));
      }
    }

    //alimentazione dell'autocomplete
    this.apiService.getAllDocumenti(this.operatore).subscribe((data) => {

      this.data = data;

      for (let i: any = 0; i < this.data.length; i++) {
        this.alldocs.push(this.data[i].nome_doc + "*D" + this.data[i].id);
      }
    }, error => console.error(error));


    this.filtereddocs = this.docCtrl.valueChanges.pipe(
      startWith(null),
      map((doc: string | null) => doc ? this._filter(doc) : this.alldocs.slice())
    );


  }


  remove(doc: string): void {
    const index = this.docs.indexOf(doc);

    if (index >= 0) {
      this.docs.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if(this.docs.indexOf(event.option.viewValue)==-1){
      this.docs.push(event.option.viewValue);
      this.docInput.nativeElement.value = '';
      this.docCtrl.setValue(null);
    }
    else{
      alert('Documento già selezionato!');
      this.docCtrl.setValue(null);
    }
  }

  /*private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.alldocs.filter(doc => doc.toLowerCase().indexOf(filterValue) === 0);
  }*/

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.alldocs.filter(doc => this._normalizeValue(doc).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }


  panelOpenState = false;


  SetControl() {
    if (this.docs.length == 0) {
      this.valido = "disabled";
    } else {
      this.valido = '';
    }
  }

}
