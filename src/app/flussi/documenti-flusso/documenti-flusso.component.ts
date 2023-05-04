import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ApiService } from 'src/app/api.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router'; 
import { Router,NavigationExtras } from '@angular/router';
import { I } from '@angular/cdk/keycodes';


@Component({
  selector: 'app-documenti-flusso',
  templateUrl: './documenti-flusso.component.html',
  styleUrls: ['./documenti-flusso.component.css']
})

export class DocumentiFlussoComponent {
  
panelOpenState = false;
flusso;
docs;
forms;
update;
tipo_flusso;

valido="disabled";


AllSelected = []
  
SelectedList = [];

StepsFlusso = [];

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router){

    this.route.queryParams.subscribe( 
      params => { 
        this.flusso =  params['flusso']; 
        this.docs = params['docs'];
        this.forms = params['forms'];
        this.update = params['update'];
        
        this.apiService.getSingleFlusso( this.flusso).subscribe((data) =>{
          this.tipo_flusso = data[0].tipo;
        });

      });
       
      for(var i:any=0;i<this.docs.length;i++){
        this.AllSelected.push(this.docs[i]);
        this.SelectedList.push(this.docs[i]);
      }

      for(var i:any=0;i<this.forms.length;i++){
        this.AllSelected.push(this.forms[i]);
        this.SelectedList.push(this.forms[i]);
      }
            
  }

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }

    if(this.StepsFlusso.length>0) {
      this.valido='';
    }else{
      this.valido='disabled';
    }
  }

  prosegui(): void{
    console.log(this.StepsFlusso[0]);
    let first_step = this.StepsFlusso[0].split("*")[1];
    console.log(first_step);
    if(this.tipo_flusso=='pratica' && first_step[0]!='F'){
      //un flusso di tipo pratica deve avere un workflow  che comincia con un form
      alert('Attenzione! Il primo step del workflow di un flusso di tipo PRATICA deve essere un FORM');
    }else{
      //prosegui
      let navigationExtras: NavigationExtras = {
        queryParams: {'flusso': this.flusso,'steps':this.StepsFlusso}
      };
      this.router.navigate(['/workflowadd'], navigationExtras);
    }
  }
};
