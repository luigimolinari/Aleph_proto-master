import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router'; 
import { Router } from '@angular/router';



@Component({
  selector: 'app-workflow-add',
  templateUrl: './workflow-add.component.html',
  styleUrls: ['./workflow-add.component.css']
})
export class WorkflowAddComponent {

  panelOpenState = false;
  workflow;
  dati;
  flusso;
  steps;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
    
    this.workflow = [];

    this.route.queryParams.subscribe( 
      
      params => { 
        this.flusso =  params['flusso']; 
        this.steps = params['steps'];
      });

      for(var i:any=0;i<this.steps.length;i++){
        var splitted = this.steps[i].split("*");
        //gli step sono passati nella seguente forma: NOMESTEP*TIPOSTEPidstep
        var nome_step=splitted[0]; 
        var id_step=splitted[1];
        var posizione:number=i+1;
             
        this.workflow.push({'id_step' : id_step, 'nome' : nome_step, 'milestone': false, 'obbligatorio' : false, 'id_flusso': this.flusso, 'posizione': posizione});
        
      }

   }

  trasmetti(): void{
    this.apiService.AddWorkflow(this.workflow).subscribe((dati)=>{
      this.dati = dati['Esito'];
      alert(this.dati);
      this.router.navigate(['/flussi']);
  });
    
  }

  onChange(e,item): void{
       if(e)item.obbligatorio = true;
  }


}

