import {Component,OnInit,ViewEncapsulation} from '@angular/core';
import {TreeNode} from 'primeng/api';
import {MessageService} from 'primeng/api';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'; 
import { LocalStorageService } from 'src/app/local-storage.service';
import {Observable} from 'rxjs';
import { A } from '@angular/cdk/keycodes';


@Component({
  selector: 'app-organigramma',
  templateUrl: './organigramma.component.html',
  providers: [MessageService],
  styleUrls: ['./organigramma.component.scss']
})
export class OrganigrammaComponent  {
    nome;

    data1: TreeNode[];


    selectedNode: TreeNode;

    id;

    azienda;

   nodo: TreeNode;

    constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private messageService: MessageService) {

        this.route.queryParams.subscribe( 
            params => { 
              this.id =  params['id']; 
              this.nome =  params['nome']; 
            });

           


    }

    ngOnInit() {
        

                var parentNode: TreeNode = {
                label: this.nome,
                type: 'person',
                styleClass: 'p-person',
                expanded: true,
                data: {
                name: 'DIREZIONE', 'avatar': 'walter.jpg',
              },
              children: []
                      };

                      


              this.apiService.getOrganigramma(this.id).subscribe((data)=>{
              this.azienda = data;
              this.data1=[];
              this.data1.push(parentNode);


                        for(let i:any=0;i<this.azienda.length;i++){
                         
                          
                         
                            if(this.azienda[i].livello==1){
              
                              var childNode: TreeNode = {
                                label: this.azienda[i].nomestr,
                                type: 'person',
                                styleClass: 'p-person',
                                expanded: true,
                                data: {name: this.azienda[i].nome + " "+this.azienda[i].cognome, 'avatar': 'saul.jpg'},
                                children:[]
                                      };
                         parentNode.children.push(childNode);
                         var mioid=this.azienda[i].idstr;
                        
                        }
                       
                         for(let j:any=0;j<this.azienda.length;j++){
                          if(this.azienda[j].livello==2 && this.azienda[j].id_superiore==mioid){

                            var childNode2: TreeNode = {
                           label: this.azienda[j].nomestr,
                            styleClass: 'department-cfo',
                            expanded: true,
                            children:[]
                                    };
                                    childNode.children.push(childNode2);
                         var mioid2=this.azienda[j].idstr;
                         
                          }
                        

                         for(let z:any=0;z<this.azienda.length;z++){
                              if(this.azienda[z].livello==3 && this.azienda[z].id_superiore==mioid2){
                              var childNode3: TreeNode = {label:  this.azienda[z].nomestr,
                            styleClass: 'department-cto',
                            expanded: true,
                            children:[]
                                    };
                                    childNode2.children.push(childNode3);
                          var mioid3=this.azienda[z].idstr;
                        
                          }
                        
                            
                         for(let m:any=0;m<this.azienda.length;m++){
                          if(this.azienda[m].livello==4 && this.azienda[m].id_superiore==mioid3){
                            var childNode4: TreeNode = {label:  this.azienda[m].nomestr,
                            styleClass: 'department-coo',
                            expanded: true,
                            children:[]
                                    };
                                    childNode3.children.push(childNode4);
                         var mioid4=this.azienda[m].idstr;
                       
                          }
                        
                            
                         for(let b:any=0;b<this.azienda.length;b++){
                          if(this.azienda[b].livello==5 && this.azienda[b].id_superiore==mioid4){
                            var childNode5: TreeNode = {label:  this.azienda[b].nomestr,
                            styleClass: 'department-coo',
                            expanded: true,
                            children:[]
                                    };
                                    childNode4.children.push(childNode5);
                            var mioid5=this.azienda[b].idstr;
                           
                          }
                         }
                         mioid4='';
                        }
                        mioid3='';
                        }
                        mioid2='';
                        }
                        mioid='';
                        }

                   
                        

   
                        /*
                      var childNode: TreeNode = {label: 'Tax',
                      styleClass: 'department-cfo'
                              };


                

                                      var childNode3: TreeNode = {label: 'Piccolo',
                                      styleClass: 'department-cto'
                                              };


       parentNode.children.push(childNode2);
       childNode2.children.push(childNode3);
       */
    });
    
          }

    onNodeSelect(event) {
        this.messageService.add({severity: 'success', summary: 'Contatta: ', detail: event.node.label});

    }
}
