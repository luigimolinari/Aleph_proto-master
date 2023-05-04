/**
 * WORKFLOW-PRATICA
 * Genera il workflow realtivo ad una pratica, sia per gli operatori di un GRUPPO-LAVORO-PRATICA sia per quelli di un GRUPPO-VALIDAZIONE-PRATICA
 * 
 * Quando clicco sul pulsante di visualizzazione dei documenti dello step, la rotta chiamata è 
 * documentiview
 * relativa a un compoenente che funziona sia per le procedure sia per le pratiche
 * */
import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';
import { faEye, faUpload, faThumbtack, faDownload, faPen } from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-workflow-pratica',
  templateUrl: './workflow-pratica.component.html',
  styleUrls: ['./workflow-pratica.component.css']
})
export class WorkflowPraticaComponent  {

  faUpload = faUpload;
  faThumbtack = faThumbtack;
  faEye = faEye;
  faDownload = faDownload;
  faPen = faPen;
  operatore;
  dati;
  last_read;
  last_otherOp;
  id_pratica;
  gruppo;
  position = 0;
  milestoneEl;
  documenti_flusso;
  models;
  messaggi;
  step: any = [];
  steps: any = [];
  count_step = 0;
  loading;
  nome;
  all_completed;
  all_validated = true;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, public dialog: MatDialog) {

    this.operatore = JSON.parse(localStorage.getItem('ID'));

    this.route.queryParams.subscribe(
      params => {
        this.id_pratica = params['id_pratica'];
        this.gruppo = params['gruppo'];
        //get first step
        this.getStep('', '', '', 1);
      });
  }

  getStep(id_workflow, next_step, next_tipo, start): void {
    this.loading = true;
    this.apiService.getStepPratica(this.id_pratica, this.operatore, start, id_workflow, next_step, next_tipo, this.gruppo).subscribe((dati: any) => {
      if (dati != null) {
        if (dati.length != 0) {
          this.generate_step(dati[0]);
        } else {
          this.loading = false;
          this.show_workflow();
        }
      } else {
        //ho finito di generare il flusso
        this.steps[this.steps.findIndex(x => x.id == id_workflow)].ultimo = 1
        this.show_workflow();

      }
    });
  }

  generate_step(step) {

    this.count_step++;
    step.posizione = this.count_step;
    step.modelli = '';
    step.id_documento_flusso = step.id_doc;

    let doc_flusso = [];
    doc_flusso.push(step.id_documento_flusso);
    this.apiService.getModelli(doc_flusso).subscribe((dati: any) => {
      let models = dati;
      for (let i = 0; i < dati.length; i++) {
        step.modelli = models.filter(x => x.id_documenti_flusso == step.id_documento_flusso);
      }
    });

    if (step.isgateway == 1) {
      //chiamata l'api che controlla sia stato espresso un valore per la condizione
      //un gateway è sempre di tipo form
      this.apiService.getGatewayValuePratica(step.id_form, step.id, this.id_pratica).subscribe((next_step: any) => {
        if (next_step != null) {
          //continuo nella costruzione del workflow
          this.getStep('', next_step[0].next_step, next_step[0].next_tipo, 0);
        }
        else{
          //mi fermo nella costruzione del workflow e lo mostro
          this.show_workflow();
        }
      });
    }
    else {
      if (step.milestone == 1) {
        if (step.id_doc != '') {
          //doc
          if (step.numero > 0) {
            //continuo nella costruzione del workflow
            this.getStep(step.id, '', '', 0);
          }else{
            //mi fermo nella costruzione del workflow e lo mostro
            this.show_workflow();
          }
        }
        else {
          //form
          this.apiService.getFormValuePratica(step.id_form, this.id_pratica).subscribe((result: any) => {
            if (result != null) {
              this.getStep(step.id, '', '', 0);
              step.completato = '1';
            } else {
              //non è stato espresso un valore
              step.completato = '0';
              //mi fermo nella costruzione del workflow e lo mostro
              this.show_workflow();
            }
          });
        }
      }
      else {
        if (step.obbligatorio == 1) {
          this.apiService.getFormValuePratica(step.id_form, this.id_pratica).subscribe((result: any) => {
            if (result != null) {
              step.completato = '1';
            } else {
              //non è stato espresso un valore
              step.completato = '0';
            }
          });
        }
        //continuo nella costruzione del workflow
        this.getStep(step.id, '', '', 0);
      }
    }

    this.steps.push(step);
    this.loading = false;
  }

  show_workflow(): void {
    console.log(this.steps);
    
    //all_validated -> tutti gli step hanno completato il processo di validazione - lo stato dello step è "VALIDO"
    //all_completes -> tutti gli step hanno completato il processo di firma

    if (this.steps.find(x => x.completato == '0') == undefined) {
      this.all_completed = true;
    } else {
      this.all_completed = false;
    } 

    if (
      this.steps.find(x => x.stato == 'lavorazione') != undefined
      ||
      this.steps.find(x => x.stato == 'attesa') != undefined
      ||
      this.steps.find(x => x.stato == 'rigettato') != undefined
    ) {
      this.all_validated = false;
    } else {
      this.all_validated = true;
    } 
    this.dati = this.steps;
  }

  compilaForm(idForm, privilegi): void {

    let navigationExtras: NavigationExtras = {
      queryParams: { 'id_form': idForm, 'id_pratica': this.id_pratica, 'mode': privilegi }
    };
    this.router.navigate(['/userportalform'], navigationExtras);
  }

  addDoc(idWorkflow): void {

    let navigationExtras: NavigationExtras = {
      queryParams: { 'id_pratica': this.id_pratica, 'id_workflow': idWorkflow, 'gruppo':this.gruppo }
    };
    this.router.navigate(['/adddocumentopratica'], navigationExtras);
  }

  addDocColl(idWorkflow, idDocFlusso, categoria): void {

    if (categoria == 1) {
      let navigationExtras: NavigationExtras = {
        queryParams: { 'id_pratica': this.id_pratica, 'id_workflow': idWorkflow, 'id_documento_flusso': idDocFlusso, 'gruppo':this.gruppo }
      };
      this.router.navigate(['/adddocumentopratica'], navigationExtras);
    }

    /* TO DO LUIGI */
    /* if(categoria==2){
      let navigationExtras: NavigationExtras = {
        queryParams: { 'id_pratica': this.id_pratica, 'id_workflow': idWorkflow, 'id_documento_flusso': idDocFlusso, 'first': 'no' }
      };
      this.router.navigate(['/spreadsheetdoc'], navigationExtras);
    } */

  }

  viewDocs(idWorkflow, privilegi): void {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'id_pratica': this.id_pratica, 'id_workflow': idWorkflow, 'gruppo': this.gruppo, 'p': privilegi }
    };
    this.router.navigate(['/documentiview'], navigationExtras);

  }

  downloadFile(path): void {
    this.apiService.downloadDocumento(path).subscribe(data => {
      let blob = new Blob([data], { type: data.type });
      var fileURL = URL.createObjectURL(blob);
      window.open(fileURL);
    });
  }

  openEditor(id_documenti_flusso, categoria) {
    if (categoria == 1) {
      let navigationExtras: NavigationExtras = {
        queryParams: { 'id': id_documenti_flusso, 'r': 1 }
      };
      this.router.navigate(['/editor'], navigationExtras);
    }
    if (categoria == 2) {
      let navigationExtras: NavigationExtras = {
        queryParams: { 'id': id_documenti_flusso, 'r': 1, 'first': 'no' }
      };
      this.router.navigate(['/spreadsheet'], navigationExtras);
    }
  }

  termina(): void {
    if (confirm("Procedere alla chiusura della praticat?")) {
      this.apiService.ClosePratica(this.id_pratica).subscribe((dati) => {
        alert(dati["Esito"]);
        if (dati["esito_codice"] == 1) {
          this.router.navigate(['/background']);
        }
      });
    }
  }
  

  chiedi_validazione(id_workflow, id_flusso) {
    let stato = 'attesa';
    this.update_stato_pratica(id_workflow,id_flusso,stato);
  }

  valida(id_workflow,id_flusso){
    let stato = 'valido';
    this.update_stato_pratica(id_workflow,id_flusso,stato);
  }

  rigetta(id_workflow,id_flusso){
    let stato = 'rigettato';
    this.update_stato_pratica(id_workflow,id_flusso,stato);
  }

  update_stato_pratica(id_workflow,id_flusso,stato): void{
    this.apiService.UpdatePraticaStep(this.id_pratica, id_workflow, id_flusso, this.operatore, stato).subscribe((dati) => {
      alert(dati["Esito"]);
      if (dati["esito_codice"] == 1) {
        this.router.navigate(['/background']);
      }
    });
  }

}
