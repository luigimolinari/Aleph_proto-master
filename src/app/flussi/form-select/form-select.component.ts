import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.css']
})
export class FormSelectComponent {
  operatore;
  data;
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  docCtrl = new FormControl();
  flusso: any;
  update: any;
  valido = "";
  filteredforms: Observable<string[]>;
  forms: string[] = [];
  selectedDocs;
  selectedForms;
  allforms = [];

  @ViewChild('docInput') docInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;



  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {

    this.operatore = JSON.parse(localStorage.getItem('ID'));

    this.route.queryParams.subscribe(
      params => {
        this.flusso = params['flusso'];
        this.update = params['update'] == undefined ? 0 : params['update'];
        this.selectedDocs = params['docs'];
        this.selectedForms = params['forms'];

      });

    if (this.flusso.indexOf('*') != -1) {
      this.flusso = this.flusso.split("*")[1];
    }

    if (this.selectedForms != undefined) {
      this.forms = this.selectedForms;
      this.valido = '';
    } else {
      //UPDATE - DA FARE!
      if (this.update == 1) {

        this.apiService.getFormWorkflow(this.flusso).subscribe((data) => {

          this.data = data;
          if (this.data != null) {
            //inizializzo la lista documenti e abilito il btn per passaggio a fase 3
            for (let i: any = 0; i < this.data.length; i++) {
              this.forms.push(this.data[i].header + "*F" + this.data[i].id)
            }
          }
          this.valido = '';
        }, error => console.error(error));
      }
    }

    //alimentazione dell'autocomplete
    this.apiService.getAllForms(this.operatore, this.flusso).subscribe((data) => {

      this.data = data;
      if (this.data != null) {
        for (let i: any = 0; i < this.data.length; i++) {
          this.allforms.push(this.data[i].header + "*F" + this.data[i].id);
        }
      }
      console.log(this.allforms);
    }, error => console.error(error));


    this.filteredforms = this.docCtrl.valueChanges.pipe(
      startWith(null),
      map((form: string | null) => form ? this._filter(form) : this.allforms.slice())
    );
  }

  remove(doc: string): void {
    const index = this.forms.indexOf(doc);

    if (index >= 0) {
      this.forms.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.forms.push(event.option.viewValue);
    this.docInput.nativeElement.value = '';
    this.docCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.allforms.filter(form => this._normalizeValue(form).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }


  panelOpenState = false;


  SetControl(value) {
    this.valido = value == 0 ? "disabled" : '';
  }

  goToNextStep() {

    if (this.forms.length != 0) {
      let navigationExtras: NavigationExtras = {
        queryParams: { 'forms': this.forms, 'docs': this.selectedDocs, 'flusso': this.flusso }
      };
      this.router.navigate(['/workflowcomplex'], navigationExtras);
    } else {
      let navigationExtras: NavigationExtras = {
        queryParams: { 'docs': this.selectedDocs, 'flusso': this.flusso, 'update': this.update }
      };
      this.router.navigate(['/documentiflusso'], navigationExtras);
    }

  }

}
