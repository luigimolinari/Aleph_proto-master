import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'
import { ApiService } from 'src/app/api.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ColumnComparisonFilterConditionDescription } from 'igniteui-angular-core';

@Component({
  selector: 'app-workflow-c-add',
  templateUrl: './workflow-c-add.component.html',
  providers: [MessageService],
  styleUrls: ['./workflow-c-add.component.css', './organigramma.component.scss']
})
export class WorkflowCAddComponent implements OnInit {

  steps: TreeNode[];

  step_form: FormGroup;

  docslist = [];
  original_doc = [];
  formslist = [];
  original_form = [];

  panelOpenState = false;

  flusso;
  tipo_flusso;

  valido_submit = false;
  valido_add = false;
  valido_selected = false;
  valido_next = true;

  allslist = [];

  filteredDocs: Observable<string[]>;
  filteredForms: Observable<string[]>;
  filteredNext: Observable<string[]>;

  next_form_array: any;

  workflow = [];

  //form control per step_form
  tipo = new FormControl('');
  documento = new FormControl('');
  selected = new FormControl('');
  form = new FormControl('');
  is_gateway = new FormControl('');
  milestone = new FormControl('');
  mandatory = new FormControl('');
  start = new FormControl('0');
  next_step = new FormControl('');

  enable_gateway;

  foglie = [];

  /*radice del workflow e sue proprieta*/
  root_defined = false;
  root_selection = false;
  root_id;
  root_type;
  root_mandatory;
  root_milestone;
  root_isgateway;

  mancanti_doc;
  mancanti_form;

  graphed = [];

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private route: ActivatedRoute, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(
      params => {
        this.flusso = params['flusso'];

        this.docslist = params['docs'];
        this.original_doc = Object.assign([], params['docs']);

        this.formslist = params['forms'];
        this.original_form = Object.assign([], params['forms']);

        this.allslist = [...this.docslist, ...this.formslist];

        this.mancanti_doc = Object.assign([], this.original_doc);
        this.mancanti_form = Object.assign([], this.original_form);

        /* if (this.flusso.indexOf('*') != -1) {
          this.flusso = this.flusso.split("*")[1];
        } */

        this.apiService.getSingleFlusso(this.flusso).subscribe((data) => {
          this.tipo_flusso = data[0].tipo;
        });

      });

    //step_form
    this.step_form = this.formBuilder.group({
      tipo: this.tipo,
      documento: this.documento,
      form: this.form,
      selected: this.selected,
      is_gateway: this.is_gateway,
      milestone: this.milestone,
      mandatory: this.mandatory,
      start: this.start,
      next_step: this.next_step,
      next_isgateway: this.formBuilder.array([])
    });

    //autocomplete
    this.filteredDocs = this.documento.valueChanges.pipe(
      startWith(''),
      map((doc: string | null) => doc ? this._filter(doc, this.docslist) : this.docslist.slice())
    );
    this.filteredForms = this.form.valueChanges.pipe(
      startWith(''),
      map((doc: string | null) => doc ? this._filter(doc, this.formslist) : this.formslist.slice())
    );
    this.filteredNext = this.next_step.valueChanges.pipe(
      startWith(''),
      map((doc: string | null) => doc ? this._filter(doc, this.allslist) : this.allslist.slice())
    );

  }

  /*costruttore dei rami di uno step di tipo gateway*/
  nexts(): FormArray {
    return this.step_form.get('next_isgateway') as FormArray;
  }

  createNext(): FormGroup {
    return this.formBuilder.group({
      id_form_gateway: '',
      id_field: '',
      field_name: '',
      condition_trnsl: '',
      condizione: '',
      valore: '',
      next_step_gateway: ''
    });
  }

  private _filter(value: string, list): string[] {
    const filterValue = this._normalizeValue(value);
    return list.filter(doc => this._normalizeValue(doc).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }


  formSelection(event) {

    //svuoto e ricreo l'array dei rami
    if (this.next_form_array != undefined) {
      this.next_form_array.controls = [];
    }
    //e lo ricreo
    this.next_form_array = this.nexts();

    let thisform = event.option.viewValue;
    //1)

    this.apiService.getGatewayStep(thisform).subscribe((data: any) => {
      if (data != null) {

        //per il form esiste un campo gateway
        this.enable_gateway = true; //l'opzione gateway deve essere selezionabile solo se effettivamente disponibile

        if (data[0].condizione == 'equal') {
          //equal -> n opzioni
          for (let index = 0; index < data.length; index++) {
            this.next_form_array.push(this.createNext());
            this.next_form_array.at(index).get('id_form_gateway').setValue(data[index]['id']);
            this.next_form_array.at(index).get('id_field').setValue(data[index]['id_field']);
            this.next_form_array.at(index).get('field_name').setValue(data[index]['field_name']);
            this.next_form_array.at(index).get('condition_trnsl').setValue('=');
            this.next_form_array.at(index).get('condizione').setValue(data[index]['condizione']);
            this.next_form_array.at(index).get('valore').setValue(data[index]['valore']);
          }
        } else {
          //truefalse, lower-higher, equal-notequal - due opzioni
          this.next_form_array.push(this.createNext());
          this.next_form_array.push(this.createNext());
          this.next_form_array.at(0).get('id_form_gateway').setValue(data[0]['id']);
          this.next_form_array.at(1).get('id_form_gateway').setValue(data[0]['id']);
          this.next_form_array.at(0).get('id_field').setValue(data[0]['id_field']);
          this.next_form_array.at(1).get('id_field').setValue(data[0]['id_field']);
          this.next_form_array.at(0).get('field_name').setValue(data[0]['field_name']);
          this.next_form_array.at(1).get('field_name').setValue(data[0]['field_name']);
          if (data[0].condizione == 'truefalse') {
            this.next_form_array.at(0).get('condition_trnsl').setValue('=');
            this.next_form_array.at(1).get('condition_trnsl').setValue('=');
            this.next_form_array.at(0).get('condizione').setValue('true');
            this.next_form_array.at(1).get('condizione').setValue('false');
            this.next_form_array.at(0).get('valore').setValue('SI');
            this.next_form_array.at(1).get('valore').setValue('NO');
          } else if (data[0].condizione == 'higher' || data[0].condizione == 'lower') {
            this.next_form_array.at(0).get('condition_trnsl').setValue('>');
            this.next_form_array.at(1).get('condition_trnsl').setValue('<');
            this.next_form_array.at(0).get('condizione').setValue('higher');
            this.next_form_array.at(1).get('condizione').setValue('lower');
            this.next_form_array.at(0).get('valore').setValue(data[0]['valore']);
            this.next_form_array.at(1).get('valore').setValue(data[0]['valore']);
          } else if (data[0].condizione == 'equal-notequal') {
            this.next_form_array.at(0).get('condition_trnsl').setValue('=');
            this.next_form_array.at(1).get('condition_trnsl').setValue('!=');
            this.next_form_array.at(0).get('condizione').setValue('equal');
            this.next_form_array.at(1).get('condizione').setValue('notequal');
            this.next_form_array.at(0).get('valore').setValue(data[0]['valore']);
            this.next_form_array.at(1).get('valore').setValue(data[0]['valore']);
          }
        }
      } else {
        this.enable_gateway = false;//l'opzione gateway deve essere selezionabile solo se effettivamente disponibile
      }
    }, error => console.error(error));
  }

  onChangeGateway(e): void {
    if (e) {
      this.milestone.setValue(true);
      this.mandatory.setValue(true);
      this.count_next(); //nel caso di step gateway è obbligatorio valorizzare tutti i next prima di poter procedere
    }
    this.add_validation();
  }

  onChangeMilestone(e): void {
    if (e) {
      this.mandatory.setValue(true);
      if (this.next_step.value.length == 0) this.valido_next = false;
    }
    this.add_validation();
  }

  onChangeType() {
    this.resetStepChoice();
    this.resetStepInfo();
    this.valido_add = false;
  }

  removefromlist(el) {
    //rimuovo dalle liste il documento/form selezionato come radice -> non più modificabile
    this.allslist.splice(this.allslist.indexOf(el), 1);

  }

  resetStepChoice() {
    this.valido_add = false;
    this.documento.setValue('');
    this.form.setValue('');
  }

  resetStepInfo() {
    this.is_gateway.setValue(false);
    this.milestone.setValue(false);
    this.mandatory.setValue(false);

    if (this.next_form_array != undefined) {
      for (let i = 0; i < this.next_form_array.length; i++) {
        //svuoto il form-array (removeAt(0))
        this.next_form_array.removeAt(0);
      }
    }
    this.next_step.setValue('');

  }

  check_root() {
    this.root_selection = !this.root_selection;
  }

  SetControlSelected(valore) {
    this.valido_selected = valore;
    this.add_validation();
  }

  SetControlSelectedNext(valore) {
    this.valido_next = valore;
    this.add_validation();
  }

  add_validation() {
    let ok_next = (!this.is_gateway.value && !this.milestone.value) ? this.valido_next || this.next_step.value.length == 0 : this.valido_next;
    this.valido_add = this.valido_selected && ok_next;
  }

  count_next() {
    let count = 0;
    for (let i = 0; i < this.next_form_array.length; i++) {
      if (this.next_form_array.at(i).controls.next_step_gateway.value != '') count++;
    }
    this.valido_next = count == this.next_form_array.length;
    console.log(this.valido_next);
    this.add_validation();
  }

  add_step(): void {

    if (this.tipo.value == 'doc') {
      this.selected.setValue(this.documento.value);
    } else {
      this.selected.setValue(this.form.value);
    }

    if (this.root_selection && !this.root_defined) {
      //se il flusso è di tipo pratica il suo workflow deve comnicare con un form

      if (this.tipo_flusso == 'pratica' && this.tipo.value == 'doc') {
        alert('Attenzione! Per il workflow relativo a un flusso di tipo pratica il primo step deve essere un FORM');
      } else {
        this.start.setValue(1);
        this.root_defined = true;
        this.root_id = this.selected.value;
        this.root_type = this.tipo.value;
        this.root_selection = false;
        this.root_mandatory = this.mandatory.value;
        this.root_milestone = this.milestone.value;
        this.root_isgateway = this.is_gateway.value;
        this.removefromlist(this.selected.value);
      }
    } else {
      this.start.setValue(0);
    }

    if (this.selected.value == this.root_id) {
      //sto modificando le proprietà della radice
      this.root_mandatory = this.mandatory.value;
      this.root_milestone = this.milestone.value;
      this.root_isgateway = this.is_gateway.value;
    }

    //UPDATE - se il nodo era già stato definito, sovrascrivo
    let is_exists = this.workflow.findIndex(x => x.selected == this.selected.value);
    if (is_exists != -1) {
      this.workflow[is_exists] = this.step_form.value;
    } else {
      this.workflow.push(this.step_form.value);
    }

    //reset del form di inserimento
    this.tipo.setValue('');
    this.resetStepChoice();
    this.resetStepInfo();

    //ricostruzione del grafico
    this.aggiorna_grafico();
  }

  aggiorna_grafico(): void {

    this.valido_add = false;
    this.valido_selected = false;
    this.valido_next = true;

    //reset elementi grafici (nodi graficati, elementi foglia), tutti da ricalcolare
    this.graphed = [];
    this.foglie = [];

    //partendo dalla radice e dal primo elemento del workflow, devo iterattivamente ricostruire il grafico cercando i figli

    let build: any;

    if (this.root_id != undefined) {
      this.graphed.push(this.root_id);

      build = [{
        id: this.root_id,
        type: 'person',
        styleClass: 'p-person',
        expanded: true,
        padre: 'radice',
        isgateway: this.root_isgateway,
        milestone: this.root_milestone,
        mandatory: this.root_mandatory,
        tipo: this.root_type,
        children: this.build_figli(this.root_id)
      }];
    }

    this.steps = build;
    this.submit_validation();

  }

  build_figli(padre) {
    let temp_array = [];

    let nodo = this.findnext(padre); //array a due dimensioni, la prima contiene i nomi dei figli e la seconda le opzioni a cui questi corrispondon nel caso di padre di tipo gateway

    /*nodo 1) CASO UNDEFINED -> nodo foglia, non definitio in workflow
           2) viceveresa -> nodo (foglia o non) definito in workflow
    */

    if (nodo != undefined) {

      if (nodo[0].length != 0) {

        for (let i = 0; i < nodo[0].length; i++) {

          if (nodo[0][i] != '') {

            this.graphed.push(nodo[0][i]);

            //costruzione del nodo figlio - il nodo figlio lo costruisco se lo trovo in result - ma ci sono dei nodi figli che sono foglie
            let temp_obj: any = {};

            temp_obj.id = nodo[0][i];
            temp_obj.type = 'person';
            temp_obj.styleClass = 'p-person';
            temp_obj.expanded = true;
            temp_obj.padre = padre;
            temp_obj.children = this.build_figli(nodo[0][i]);
            temp_obj.isgateway = this.find_attr(nodo[0][i], 'is_gateway');
            temp_obj.milestone = this.find_attr(nodo[0][i], 'milestone');
            temp_obj.mandatory = this.find_attr(nodo[0][i], 'mandatory');
            temp_obj.tipo = this.find_attr(nodo[0][i], 'tipo');

            temp_obj.isoption = false;
            if (nodo[1][i] != undefined) {
              if (nodo[1][i].length != 0) {
                temp_obj.isoption = true;
                temp_obj.opzione = nodo[1][i];
              }
            }

            if (temp_obj.children.length == 0 && this.foglie.indexOf(nodo[0][i]) == -1) {
              //nodo foglia
              this.foglie.push(nodo[0][i]);
            }

            temp_array.push(temp_obj);
          }
        }
      }
    } else {
      //non trovo figli -> nodo foglia
      if (this.foglie.indexOf(padre) == -1) {
        this.foglie.push(padre);
      }

    }

    return temp_array;
  }

  find_attr(el, attr) {
    let idx = this.workflow.findIndex(x => x.selected == el);
    if (idx != -1) {
      return this.workflow[idx][attr];
    } else {
      if (attr == 'tipo')
        //per i nodi non ancora definiti in workflow ricavo il tipo in questo modo
        return el.indexOf('*D') != -1 ? 'doc' : 'form';
    }
  }

  findnext(el) {
    let idx = this.workflow.findIndex(x => x.selected == el);
    let figli = [];
    let opzioni = [];
    if (idx != -1) {
      if (this.workflow[idx].is_gateway) {
        for (let i = 0; i < this.workflow[idx].next_isgateway.length; i++) {
          let figlio = this.workflow[idx].next_isgateway[i].next_step_gateway;
          let opzione = this.workflow[idx].next_isgateway[i].field_name + ' ' + this.workflow[idx].next_isgateway[i].condition_trnsl + ' ' + this.workflow[idx].next_isgateway[i].valore;
          figli.push(figlio);
          opzioni.push(opzione);
        }
        return [figli, opzioni];
      } else {
        figli.push(this.workflow[idx].next_step);
        return [figli, opzioni];
      }
    }

  }

  removeNode(nodofiglio, nodopadre) {
    /*funzione disponibile solo per i nodi foglia*/

    let is_defined = this.workflow.findIndex(x => x.selected == nodofiglio);
    // is_defined --> booleano che indica se il nodo è presente in workflow o è presente solo nel grafico come nodo foglia

    //let is_another_node = this.rel.find(x => x.son == nodofiglio && x.dad != nodopadre);
    let is_another_node = this.graphed.filter(x => x == nodofiglio).length > 1;
    // is_another_node --> indica se è presente come foglia associata ad un altro ramo

    if (is_another_node == undefined && is_defined != -1) this.workflow.splice(is_defined, 1);

    this.deleteNext(nodopadre, nodofiglio);

    this.aggiorna_grafico();
  }

  deleteNext(dad, son) {
    let idx = this.workflow.findIndex(x => x.selected == dad);
    if (idx != -1) {
      if (this.workflow[idx].is_gateway) {
        for (let i = 0; i < this.workflow[idx].next_isgateway.length; i++) {
          if (this.workflow[idx].next_isgateway[i].next_step_gateway == son)
            this.workflow[idx].next_isgateway.splice(i, 1);
        }
      } else {
        this.workflow[idx].next_step = '';
      }
    }
  }

  reset_grafico() {

    this.tipo.setValue('');
    this.resetStepChoice();
    this.resetStepInfo;

    //svuolto l'array degli step di workflow
    this.workflow = [];

    //rest radice
    if (this.root_id != undefined) this.allslist.push(this.root_id);

    this.root_defined = false;
    this.root_id = undefined;
    this.root_type = undefined;
    this.root_selection = false;
    this.root_mandatory = false;
    this.root_milestone = false;
    this.root_isgateway = false;

    this.aggiorna_grafico();
  }

  submit_validation() {
    //reset
    this.mancanti_doc = [];
    this.mancanti_form = [];
    this.valido_submit = false;

    //cerco i doc non ancora presenti nel grafico
    this.mancanti_doc = this.original_doc.filter(x => !this.graphed.includes(x));
    //cerco i form non ancora presenti nel grafico
    this.mancanti_form = this.original_form.filter(x => !this.graphed.includes(x));
    if (this.mancanti_doc.length == 0 && this.mancanti_form.length == 0) this.valido_submit = true;

  }

  submit() {

   
    //aggiungo al workflow eventuali foglie non esplicitamente definite come step
    let defined = this.workflow.map(x => x.selected);
    let foglie_to_add = this.foglie.filter(x => !defined.includes(x));

    for (let i = 0; i < foglie_to_add.length; i++) {
      let obj_to_add: any = {};
      obj_to_add.tipo = this.find_attr(foglie_to_add[i], 'tipo');
      if (obj_to_add.tipo == 'form') {
        obj_to_add.form = foglie_to_add[i];
        obj_to_add.documento = '';
      } else {
        obj_to_add.documento = foglie_to_add[i];
        obj_to_add.form = '';
      }
      obj_to_add.selected = foglie_to_add[i];
      obj_to_add.is_gateway = false;
      obj_to_add.milestone = false;
      obj_to_add.mandatory = false;
      obj_to_add.start = 0;
      obj_to_add.next_step = ''
      obj_to_add.next_isgateway = [];

      this.workflow.push(obj_to_add);
    }

    this.apiService.addWorkflowNew(this.workflow, this.flusso).subscribe((data) => {
      alert(data["Esito"]);
      this.router.navigate(['/flussi']);
    }, error => console.error(error));
  }

}