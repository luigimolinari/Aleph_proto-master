import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { faFileContract } from '@fortawesome/free-solid-svg-icons';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-visibilita-add',
  templateUrl: './visibilita-add.component.html',
  styleUrls: ['./visibilita-add.component.css']
})
export class VisibilitaAddComponent{

  faFileContract = faFileContract;
  faBriefcase = faBriefcase;
  procedura;
  workflow;
  id_workflow;
  documento_flusso;
  id_procedura;
  id_documento_flusso;
  dataSource;
  displayedColumns: string[] ;
  enableEdit = {};
  selectedProcedura;
  selectedDoc;
  dati;


  panelOpenState = false;

  privilegiOptions = [
    {value: '0', viewValue: 'Nessuno'},
    {value: '1', viewValue: 'Lettura'},
    {value: '2', viewValue: 'Scrittura'},
    {value: '3', viewValue: 'Modifica'}
  ];
  
  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {

    

    this.route.queryParams.subscribe( 
      params => { 
        this.procedura = params['procedura'];
        this.workflow = params['documento'];

        this.selectedProcedura = this.procedura.split('*')[0];
        this.id_procedura =  this.procedura.split('*')[1];
        this.selectedDoc =  this.workflow.split('*')[0];
        this.id_workflow =  this.workflow.split('*')[1];

        this.apiService.getVisibilitaGruppiProcedura(this.id_procedura,this.id_workflow).subscribe((data)=>{
          
          this.dataSource =data;
          if(this.dataSource != null){
            this.displayedColumns =  ['nome_gruppo', 'privilegi'];
          }
          else{
            alert('Non esistono gruppi corrispondenti alla procedura selezionata');
          }
         
        });
    
  });

  }

  privilegiLabel(valore){
    return this.privilegiOptions.find(x => x.value === valore).viewValue;
  }

  controlState(id,valore){
    this.dataSource.find(x => x.id === id).enableEdit=valore;
    //deve essere possibile rimodificare la scelta appena compiuta
    this.dataSource.find(x => x.id === id).enableUpdate=1;
  }
  
  mexAlert(){
	  alert("Attenzione! Questo step del workflow per la procedura selezionata è già avviato! Non è più possibile modificare i diritti di visibilità");
  }

  trasmetti(){
    
    this.apiService.AddVisibilita(this.dataSource).subscribe((dati)=>{   
      this.dati = dati['Esito'];
      alert(this.dati);
      //this.router.navigate(['/procedure']);
    });
    

  }

  
}


