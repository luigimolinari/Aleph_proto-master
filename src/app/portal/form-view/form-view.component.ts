import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddFormComponent } from '../add-form/add-form.component';
import { EditFieldComponent } from '../edit-field/edit-field.component';
import { AddFieldComponent } from '../add-field/add-field.component';

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.css']
})
export class FormViewComponent implements OnInit {

  id;
  id_flusso;
  displayedColumns: string[] = ['field', 'type', 'proprieta', 'modifica', 'elimina'];
  result = []
  dataSource;
  field;
  type;
  mandatory;
  isDataLoaded = false;
  form_header;
  form_modificabile;
  form_immagine;
  form_legenda;
  gateway_field;
  gateway_condition;
  dati;
  steps_valle = [];

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.result = [];
    this.route.queryParams.subscribe(
      params => {
        this.id = params['id'];
        this.apiService.getSingleForm(this.id).subscribe((form: any) => {

          this.id_flusso = form['id_flusso'];

          this.form_header = form['header'];
          this.form_immagine = form['immagine'];
          this.form_legenda = form['legenda'];
          this.form_modificabile = form['modificabile'];

          let fields = form.fields;

          let gateway_info = form.gateway_info;

          if (gateway_info.length != 0) {
            this.gateway_field = gateway_info.map(x => x.id_field)[0];
            if (gateway_info.length == 1) {
              //caso condizioni di tipo  truefalse, lower, higher,equal-notequal.
              let condizione = gateway_info.map(x => x.condizione)[0];
              let valore = gateway_info.map(x => x.valore)[0];
              switch (condizione) {
                case 'truefalse':
                  this.gateway_condition = 'Vero / Falso';
                  break;
                case 'lower':
                  this.gateway_condition = 'Maggiore o Minore di ' + valore;
                  break;
                case 'higher':
                  this.gateway_condition = 'Maggiore o Minore di ' + valore;
                  break;
                case 'equal-notequal':
                  this.gateway_condition = 'Uguale o Diverso da ' + valore;
                  break;
              }
            } else {
              //caso menu tendina
              this.gateway_condition = 'Uguale a';
            }

          }

          //gateway

          /* if (this.data['gateway'] == 1) {
            this.gateway_field = this.data['gateway_info']['gateway_field'];

            switch (this.data['gateway_info']['gateway_condizione']) {
              case 'truefalse':
                this.gateway_condition = 'Vero / Falso';
                break;
              case 'lower':
                this.gateway_condition = 'Maggiore o Minore di ' + this.data['gateway_info']['gateway_valore'];
                break;
                case 'higher':
                  this.gateway_condition = 'Maggiore o Minore di ' + this.data['gateway_info']['gateway_valore'];
                  break;
              case 'equal':
                //caso di campo gateway di tipo select
                // ci saranno n condizioni, ognuna corrispondente al rispettivo valore del menu a tendina
                this.gateway_condition = 'Uguale a' ;
                break;
              case 'equal-noteqaul':
                this.gateway_condition = 'Uguale o Diverso da ' + this.data['gateway_info']['gateway_valore'];
                break;
            } 
          }*/

          fields.forEach(field => {
            let obj: any = new Object();
            obj.id = field.id;
            obj.field = field.nome;
            obj.type = field.tipo;
            obj.mandatory = field.obbligatorio;
            obj.validator = field.validator;
            obj.options = field.select_option;

            this.result.push(obj);
          });

          this.dataSource = new MatTableDataSource(this.result);
          this.isDataLoaded = true;
        }, error => console.error(error));
      });

  }

  back(): void {
    this.router.navigate(['/forms']);
  }


  openAlert(azione, id_field, tipo_field, nome_campo, obbligatorio, validator, opzioni, isgateway) {
    this.steps_valle = [];
    this.apiService.getAllNextStep(this.id_flusso, this.id, 'F').subscribe((res: any) => {
      res.forEach(element => {
        this.steps_valle.push(element);
      });

      if (azione == 'edit') {
        if (confirm('Attenzione! Modificando un campo gateway sarà necessario riconfigurare il workflow costruito a valle dello stesso. Confermi di procedere con la modifica?')) {
          this.openDialog(id_field, tipo_field, nome_campo, obbligatorio, validator, opzioni, isgateway);
        }
      } else {
        if (confirm('Sicuro di voler eliminare il campo? Eliminando un campo gateway sarà necessario riconfigurare il workflow costruito a valle dello stesso. Confermi di procedere con la cancellazione?')) {
          this.deleteFormFieldGateway(id_field, tipo_field);
        }
      }
    });

  }

  openDialog(id_field, tipo_field, nome_campo, obbligatorio, validator, opzioni, isgateway) {
    const dialogRef = this.dialog.open(EditFieldComponent, {
      width: 'auto',
      height: 'auto',
      data: { id_form: this.id, id_field, tipo_field, nome_campo, obbligatorio, validator, opzioni, id_flusso: this.id_flusso, isgateway: isgateway, steps_valle: this.steps_valle }
    });



    dialogRef.afterClosed().subscribe(result => {
      /* eventuali operazioni da fare dopo la chiusura della modale */
    });
  }

  openDialogAdd() {
    const dialogRefAdd = this.dialog.open(AddFieldComponent, {
      width: 'auto',
      height: 'auto',
      data: { id_form: this.id }
    });



    dialogRefAdd.afterClosed().subscribe(result => {
      /* eventuali operazioni da fare dopo la chiusura della modale */
    });
  }

  Delete(id) {
    if (confirm("Sicuro di voler eliminare il campo?")) {
      this.apiService.DeleteField(id).subscribe((dati) => {
        this.dati = dati['Esito'];
        if (this.dati == "si") {
          if (confirm("Campo correttamente eliminato")) {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/formview'], { queryParams: { id: this.id } });
            });
          }
        }
        else {
          alert("Attenzione. Impossibile eliminare il campo");
        }
      });
    }
  }

  deleteFormFieldGateway(id_field, tipo_field) {

    this.apiService.DeleteFormFieldGateway(id_field, tipo_field, this.id, this.id_flusso, this.steps_valle).subscribe((res_delete: any) => {
      alert(res_delete.esito_mex);
      if(res_delete.esito_codice == '1'){
        this.init();
      }
    })
  }

}
