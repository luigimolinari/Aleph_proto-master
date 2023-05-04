import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router'; 
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, FormBuilder,  Validators, NgModel } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-portal-dispatcher',
  templateUrl: './portal-dispatcher.component.html',
  styleUrls: ['./portal-dispatcher.component.css']
})
export class PortalDispatcherComponent implements OnInit {

  id_form;
  id_operatore;
  campi;
  nome_tab;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { 
    this.route.queryParams.subscribe(
      params => {
        this.id_form = params['id_form'];
        this.nome_tab = params['nome_tab'];
      });
      this.id_operatore = JSON.parse(localStorage.getItem('ID'));


  }

  ngOnInit(): void {

    this.apiService.getFormDispatcher(this.id_form,this.id_operatore).subscribe((dati)=>{
      this.campi = dati;
      if(this.campi){
        this.router.navigate(['/userrequest'], { queryParams: {id_form: this.id_form, nome_tab: this.nome_tab}});
      } else {
        this.router.navigate(['/userportalform'], { queryParams: {id_form: this.id_form, nome_tab: this.nome_tab}});
      }
        });
  }

}
