import { STEP_STATE } from '@angular/cdk/stepper';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';
import { faEye, faUpload, faThumbtack, faDownload, faPen } from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MexDialogComponent } from '../mex-dialog/mex-dialog.component';



@Component({
  selector: 'app-workflow-new-procedura',
  templateUrl: './workflow-new-procedura.component.html',
  styleUrls: ['./workflow-new-procedura.component.css']
})
export class WorkflowNewProceduraComponent implements OnInit {

  faUpload = faUpload;
  faThumbtack = faThumbtack;
  faEye = faEye;
  faDownload = faDownload;
  faPen = faPen;
  operatore;
  dati;
  last_read;
  last_otherOp;
  id_procedura;
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


  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, public dialog: MatDialog) {

    this.operatore = JSON.parse(localStorage.getItem('ID'));

    this.route.queryParams.subscribe(
      params => {
        this.id_procedura = params['procedura'];
        this.gruppo = params['gruppo'];
 

        this.apiService.getLetturaMess(this.operatore, this.id_procedura).subscribe((dati) => {
          //ultimo messaggio letto dall'operatore collegato
          this.last_read = dati[0].last_read;
          
          //ultimo messaggio scritto da un operatore diverso da quello collegato
          this.last_otherOp = dati[0].last_otherOp;
         
          //recupero tutti i messaggi
          this.apiService.getMessenger(this.id_procedura, this.gruppo).subscribe((messaggi) => {
            if (this.last_otherOp > this.last_read || (this.last_read == null && this.last_otherOp != null)) {
              this.messaggi = messaggi;
              //apertura automatica della dialog di lettura
              console.log(this.messaggi);
              if (this.messaggi != null) {
                this.openDialog(messaggi);
              }
            }
          });
        });


        //get first step
        this.getStep('', '', '', 1);
      });


  }

  getStep(id_workflow, next_step, next_tipo, start): void {
    this.loading=true;
    this.apiService.getStep(this.id_procedura, this.gruppo, this.operatore, start, id_workflow, next_step, next_tipo).subscribe((dati: any) => {
      if (dati != null) {
        if (dati.length != 0){
          this.generate_step(dati[0]);
        }else{
          this.loading=false;
        }
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

    this.steps.push(step);

    if (step.isgateway == 1) {
      //chiamata l'api che controlla sia stato espresso un valore per la condizione
      //un gateway è sempre di tipo form
      this.apiService.getGatewayValue(step.id_form, step.id,this.id_procedura).subscribe((next_step: any) => {
        if (next_step != null) {
          this.getStep('', next_step[0].next_step, next_step[0].next_tipo, 0);
        }
      });
    }
    else {
      if (step.milestone == 1) {
        if (step.id_doc != '') {
          //doc
          if (step.numero > 0) this.getStep(step.id, '', '', 0);
        }
        else {
          //form
          this.apiService.getMilestoneForm(step.id_form, this.id_procedura).subscribe((result: any) => {
            if (result != null) {
              this.getStep(step.id, '', '', 0);
            }
          });
        }
      }
      else {
        this.getStep(step.id, '', '', 0);
      }
    }
    this.loading=false;
  }

  ngOnInit(): void {
    console.log(this.steps);
    this.dati = this.steps;
  }

  compilaForm(idForm,privilegi): void {

    let navigationExtras: NavigationExtras = {
      queryParams: { 'id_form': idForm, 'id_procedura': this.id_procedura, 'id_gruppo':this.gruppo,'mode':privilegi }
    };
    this.router.navigate(['/userportalform'], navigationExtras);
  }
  
  addDoc(idWorkflow): void {

    let navigationExtras: NavigationExtras = {
      queryParams: { 'id_procedura': this.id_procedura, 'id_workflow': idWorkflow }
    };
    this.router.navigate(['/adddocumento'], navigationExtras);
  }

  addDocColl(idWorkflow, idDocFlusso, categoria): void {

    if(categoria==1){
    let navigationExtras: NavigationExtras = {
      queryParams: { 'id_procedura': this.id_procedura, 'id_workflow': idWorkflow, 'id_documento_flusso': idDocFlusso }
    };
    this.router.navigate(['/adddocumento'], navigationExtras);
  }

  if(categoria==2){
    let navigationExtras: NavigationExtras = {
      queryParams: { 'id_procedura': this.id_procedura, 'id_workflow': idWorkflow, 'id_documento_flusso': idDocFlusso, 'first': 'no' }
    };
    this.router.navigate(['/spreadsheetdoc'], navigationExtras);
  }

}

  viewDocs(idWorkflow, privilegi): void {

    let navigationExtras: NavigationExtras = {
      queryParams: { 'id_procedura': this.id_procedura, 'id_workflow': idWorkflow, 'gruppo': this.gruppo, 'p': privilegi }
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

  apriDialog(): void {

    this.apiService.getLetturaMess(this.operatore, this.id_procedura).subscribe((dati) => {

      //ultimo messaggio letto dall'operatore
      this.last_read = dati[0].last_read;
      //ultimo messaggio scritto da un operatore diverso
      this.last_otherOp = dati[0].last_otherOp;
      this.apiService.getMessenger(this.id_procedura, this.gruppo).subscribe((dati) => {
        this.openDialog(dati);
      });
    });

  }

  openEditor(id_documenti_flusso, categoria) {
    if(categoria==1){
    let navigationExtras: NavigationExtras = {
      queryParams: { 'id': id_documenti_flusso, 'r': 1 }
    };
    this.router.navigate(['/editor'], navigationExtras);
  }
  if(categoria==2){
     let navigationExtras: NavigationExtras = {
      queryParams: { 'id': id_documenti_flusso, 'r': 1, 'first': 'no' }
    };
    this.router.navigate(['/spreadsheet'], navigationExtras);
  }
  }



  openDialog(mex) {
    let obj = new Object;
    obj['data'] = mex;
    obj['procedura'] = this.id_procedura;
    obj['operatore'] = this.operatore;
    obj['gruppo'] = this.gruppo;
    obj['last_read'] = this.last_read;
    obj['last_otherOp'] = this.last_otherOp;

    this.dialog.open(MexDialogComponent, {
      data: obj
    });
  }




}
