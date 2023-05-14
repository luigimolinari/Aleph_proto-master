import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { faNetworkWired, faSortAlphaUp } from '@fortawesome/free-solid-svg-icons';
import { TreeNode } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tempi-flusso',
  templateUrl: './tempi-flusso.component.html',
  providers: [MessageService],
  styleUrls: ['./tempi-flusso.component.css', './organigramma.component.scss']
})



export class TempiFlussoComponent implements OnInit {

 

  form: FormGroup;
  showModal = false;


  flusso: any;
  nome_flusso: any;
  tipo: any;
  blocked: any;
  faNetworkWired = faNetworkWired;
  steps: TreeNode[];
  selectedNode: TreeNode;
  faSortAlphaUp=faSortAlphaUp;
  legend = false;
  identificativo: any;
  nome_nodo: string;
  label_nodo: string;
  nodoPrecedente: string;
  giorni: number;
  nodopadre: any;
  selectedChild: any;
  selectedChildId: any;
  giorniscelti: any;
  nodo2scelto: any;
  mostrapulsante: any;
  selezionatitutti: any;
  selezionato: number;
  menu: any;
  operatore: any;
  constructor(private fb: FormBuilder, private http: HttpClient, private apiService: ApiService, private route: ActivatedRoute, private router: Router, private messageService: MessageService) {
    this.operatore = localStorage.getItem('ID');

    this.route.queryParams.subscribe(
      params => {
        this.flusso = params['flusso'];
        this.nome_flusso = params['nome_flusso'];
        this.tipo = params['tipo'];
        this.blocked = params['blocked']; // mi dice se il flusso è 'bloccato', cioè se esistono delle pratiche/procedure ad esso associate
                                          //se blocked = 1 non posso modificare i gruppi-lavoro e i gruppi-validazione definiti per il flusso pratica
      });
    
      //per la visualizzazione dei workflow-semplici (= senza form), nella precendete versione, veniva usato getWorkflowNew
      //ma il diagramma si presta alla visualizzazione anche dei workflow semplici
   
      this.apiService.getWorkflowComplex(this.flusso).subscribe((workflow:any) => {
          this.steps=workflow;
    }, error => console.error(error));
  }

  ngOnInit(){
    this.form = this.fb.group({
      id_flusso: ['', Validators.required],
      id_nodo1: ['', Validators.required],
      id_nodo2: ['', Validators.required],
      sliderValue: ['', Validators.required],
      allarme: ['']
    });

    this.form.patchValue({
      id_flusso: this.flusso
      });
  }
  //valori ed etichetta slider
  formatLabel = (value: number): string => {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }
  toggleModal(id, nome_nodo, label_nodo){
    this.menu="no";
    this.mostrapulsante="no";
    this.selezionatitutti="si";
    this.showModal = !this.showModal;
    this.identificativo=id;
    this.form.patchValue({
      id_nodo1: this.identificativo
      });
    this.nome_nodo=nome_nodo;
    this.label_nodo=label_nodo;
    this.resettadati();    
  }


  toggleCardSelection(child: any) {
    child.selected = !child.selected;
  }


  closeModal(){
    this.showModal = false;
    this.selectedChild = null;
    this.showModal=false;
  }

  onNodeSelect(event) {
    this.messageService.add({ severity: 'success', summary: event.node.label, detail: event.node.title });
    this.nodopadre = event.node;
    this.stampaNodiChildren(this.nodopadre);
    }
    
    stampaNodiChildren(nodo) {
    if (nodo.children) {
    nodo.children.forEach(child => {
    this.stampaNodiChildren(child);
    });
    }
    }

  showLegend(){
    this.legend = !this.legend;
  }

  go_to_gruppodilavoro(step_selected,type){
    let navigationExtras: NavigationExtras = {
      queryParams: {'id_flusso': this.flusso,'id_workflow':step_selected, 'nome_flusso':this.nome_flusso, 'type':type}
    };
    
    this.router.navigate(['/gruppolavoropratica'], navigationExtras);
    
  }

  go_to_gruppodivalidazione(node,step_selected, type){
    console.log(node);
    console.log(node.is_root);
    let navigationExtras: NavigationExtras = {
      queryParams: {'id_flusso': this.flusso,'id_workflow':step_selected, 'nome_flusso':this.nome_flusso, 'type': type}
    };
    
    this.router.navigate(['/gruppovalidazionepratica'], navigationExtras);
  }

  /* view_gruppi(step_selected){
    let navigationExtras: NavigationExtras = {
      queryParams: {'id_flusso': this.flusso,'id_workflow':step_selected, 'nome_flusso':this.nome_flusso}
    };
    
    this.router.navigate(['/viewgruppipratica'], navigationExtras);
  } */

  back() {
    this.router.navigate(['/flussiview']);
  }
  verificadati(){
    this.selezionato=this.selectedChildId;
    if(this.selezionato>0){
    this.selezionatitutti="no";
    }
    this.menu="si";
    this.giorniscelti=this.form.get('sliderValue').value;
    this.form.patchValue({
      id_nodo2: this.selectedChildId
      });
    this.nodo2scelto=this.form.get('id_nodo2').value;
    if(this.giorniscelti>0 && this.nodo2scelto>0 && this.selectedChildId>0){
      this.mostrapulsante="si";
    }else{
      this.mostrapulsante="no";
    }
  }

  resettadati(){
    this.giorniscelti='';
    this.nodo2scelto='';
    this.selectedChildId='';
    this.form.patchValue({
      sliderValue: ''
      });
  }
  submit() {
    console.log(this.form.value);
   // if (this.form.valid) {
      this.apiService.AddTempiPratica(this.form.value,this.operatore).subscribe((dati) => {
        if (dati['esito_codice'] == "1") {
          if (confirm("Tempi correttamente registrati")) {
            this.router.navigate(['/flussiview']);
          }
        }
        else {
          if (dati['esito_codice'] == "2") {
          alert("Errore, esiste già un tempo assegnato ai due nodi selezionati");
          }
          else if (dati['esito_codice'] == "3"){
            alert("Errore, il tempo massimo per i nodi selezionati è incoerente con il tempo massimo scelto per altri nodi");
          }
          else{
            alert("Attenzione. Impossibile registrare i tempi")
          }
        }
      });
  /*  } else {
      alert("Attenzione. Non tutti i campi obbligatori hanno un valore valido");
    }*/
  }
  riattivanodi(){
    this.selezionatitutti="si";
    this.menu="no";
  }
}
