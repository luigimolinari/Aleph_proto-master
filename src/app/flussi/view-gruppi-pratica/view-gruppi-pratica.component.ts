import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute,Router, NavigationExtras } from '@angular/router';
import { faSignature} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-view-gruppi-pratica',
  templateUrl: './view-gruppi-pratica.component.html',
  styleUrls: ['./view-gruppi-pratica.component.css']
})
export class ViewGruppiPraticaComponent implements OnInit {


  gruppo_di_lavoro:any;
  gruppo_di_validazione:any;
  id_flusso:any;
  nome_flusso:any;
  id_workflow:any;
  id_pratica:any;
  gruppo:any;
  faSignature=faSignature;

  constructor(private apiService: ApiService, private route: ActivatedRoute,private router: Router) {
    this.route.queryParams.subscribe(
      params => {
        this.id_flusso = params['id_flusso'];
        this.nome_flusso = params['nome_flusso'];
        this.id_workflow = params['id_workflow'];
        this.id_pratica = params['id_pratica'];
        this.gruppo = params['gruppo'];
      });
  }

  ngOnInit(): void {

    this.apiService.getGruppoLavoro(this.id_flusso,this.id_workflow).subscribe((dati) => {
      this.gruppo_di_lavoro = dati;
    });

    this.apiService.getGruppoValidazione(this.id_flusso,this.id_workflow).subscribe((dati) => {
      this.gruppo_di_validazione = dati;
    });
  }

  back():void{
    if(this.id_pratica != undefined){
      let navigationExtras: NavigationExtras = {
        queryParams: { 'id_pratica': this.id_pratica,'gruppo':this.gruppo}
      };
      this.router.navigate(['workflowpratica'], navigationExtras);
    }else{
        let navigationExtras: NavigationExtras = {
          queryParams: { 'flusso': this.id_flusso,'nome_flusso':this.nome_flusso,'tipo':'pratica', 'blocked':1}
        };
        this.router.navigate(['flussoview'], navigationExtras);
      }
    }
    
  
}
