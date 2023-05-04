import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { faNetworkWired, faSortAlphaUp } from '@fortawesome/free-solid-svg-icons';
import { TreeNode } from 'primeng/api';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-flusso-view',
  templateUrl: './flusso-view.component.html',
  providers: [MessageService],
  styleUrls: ['./flusso-view.component.css', './organigramma.component.scss']
})
export class FlussoViewComponent {

  flusso: any;
  nome_flusso: any;
  tipo: any;
  blocked: any;
  faNetworkWired = faNetworkWired;
  steps: TreeNode[];
  selectedNode: TreeNode;
  faSortAlphaUp=faSortAlphaUp;
  legend = false;


  constructor(private http: HttpClient, private apiService: ApiService, private route: ActivatedRoute, private router: Router, private messageService: MessageService) {

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

  onNodeSelect(event) {
    console.log(event);
    this.messageService.add({ severity: 'success', summary: event.node.label, detail: event.node.title });
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

}
