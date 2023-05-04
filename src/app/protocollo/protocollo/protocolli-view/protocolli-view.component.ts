import { Component, OnInit } from '@angular/core';
import { TableColumn } from 'src/app/template/aleph-table/aleph-table.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { DatePipe } from '@angular/common';
import { faEraser } from '@fortawesome/free-solid-svg-icons';
import { ApiprotoService } from 'src/app/apiproto.service';


@Component({
  selector: 'app-protocolli-view',
  templateUrl: './protocolli-view.component.html',
  styleUrls: ['./protocolli-view.component.css'],
  providers: [DatePipe]
})
export class ProtocolliViewComponent {

  faEraser = faEraser;

  data: any = [];
  data_filtered: any = [];
  customersTableColumns: TableColumn[];

  FilterForm: FormGroup;
  searchMode; //se searchMode=true --> decade la condizione ngIf della table

  listActions = { view: true };
  titleActions = { view: 'Vedi Protocollo' };

  constructor(private apiprotoService: ApiprotoService, private fb: FormBuilder, private router: Router, private datepipe: DatePipe, private route: ActivatedRoute) {

    this.customersTableColumns = [
      { name: 'Azioni', dataKey: 'azioni', isSortable: false },
      { name: 'Numero', dataKey: 'numero', isSortable: true },
      { name: 'Dt. protocollo', dataKey: 'data_proto', isSortable: true },
      { name: 'Oggetto', dataKey: 'oggetto', isSortable: true },
      /*  { name: 'Descrizione', dataKey: 'descrizione', isSortable: true }, */

    ];

    this.FilterForm = this.fb.group({
      'numero': new FormControl({ value: null, disabled: false }),
      'da_numero': new FormControl({ value: null, disabled: false }),
      'a_numero': new FormControl({ value: null, disabled: false }),
      'dt_inizio': new FormControl({ value: '', disabled: false }),
      'dt_fine': new FormControl({ value: '', disabled: false }),
      'oggetto': new FormControl({ value: '', disabled: false }),
      'mittente': new FormControl({ value: '', disabled: false }),
      'destinatario': new FormControl({ value: '', disabled: false }),
      'assegnatario': new FormControl({ value: '', disabled: false })
    });

  }

  search() {
    this.apiprotoService.getLimitProtoProtocollo(this.FilterForm.value).subscribe((data: any) => {
      if (data != null) {
        this.data_filtered = data;
        this.data = data;
        this.searchMode = false;
      } else {
        alert('Nessun risultato trovato!');
        this.data_filtered = data;
        this.data = data;
        this.searchMode = false;
      }
    });
  }

  clear() {
    let controls = Object.keys(this.FilterForm.controls);
    for (let i = 0; i < controls.length; i++) {
      this.FilterForm.controls[controls[i]].setValue('');
    }
  }

  viewMethod(e) {
    let id_protocollo = e.id;
    //da aleph_desk - luigi
    this.apiprotoService.CreateToken(id_protocollo).subscribe((dati: any) => {
      if (dati.esito_codice == "1") {
        let codice = dati['Codice'];
        let navigationExtras: NavigationExtras = {
          queryParams: { 'id': codice } // passo alla rotta un token con cui poi potrò recuperare il valore al token assocaito, in questo caso l'id del protocollo
        };
        this.router.navigate(['/protocolloview'], navigationExtras);
      } else {
        alert("Attenzione, si è veriricato un errore");
      }
    });
  }

  ctrl_input() {

    if (this.FilterForm.controls.numero.value != null) {
      this.FilterForm.controls.da_numero.disable();
      this.FilterForm.controls.a_numero.disable();
    } else {
      this.FilterForm.controls.da_numero.enable();
      this.FilterForm.controls.a_numero.enable();
    }
    if (this.FilterForm.controls.da_numero.value != null || this.FilterForm.controls.a_numero.value != null) {
      this.FilterForm.controls.numero.disable();
    } else {
      this.FilterForm.controls.numero.enable();
    }
  }
}

