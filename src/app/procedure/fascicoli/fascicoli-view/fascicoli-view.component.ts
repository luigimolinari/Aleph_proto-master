import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fascicoli-view',
  templateUrl: './fascicoli-view.component.html',
  styleUrls: ['./fascicoli-view.component.css']
})
export class FascicoliViewComponent implements OnInit {

  id: any;
  form: FormGroup;
  gruppi;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    this.route.queryParams.subscribe(
      params => {
        this.id = params['id'];
      });
  }

  ngOnInit(): void {
    this.apiService.getSingleFascicolo(this.id).subscribe((data: any) => {
      console.log(data);
      this.gruppi = data.gruppi;
      var id_fascicolo_padre = '';
      
      if(data[0].id_fascicolo_padre!=0)
        id_fascicolo_padre = data[0].nome_padre+'*'+data[0].id_fascicolo_padre;
      var id_procedura = '';
      if(data[0].id_procedura!='' && data[0].id_procedura!=null)
        id_procedura = data[0].nome_procedura+'*'+data[0].id_procedura;
      if (data != null && data.length != 0) {
        
        this.form = new FormGroup({
          nome: new FormControl(data[0].nome),
          pubblicato: new FormControl(data[0].pubblicato),
          accesso: new FormControl(data[0].accesso),
          id_operatore: new FormControl(data[0].id_operatore),
          id_azienda: new FormControl(data[0].id_azienda+'*'+data[0].nome_azienda),
          id_fascicolo_padre: new FormControl(id_fascicolo_padre),
          id_procedura: new FormControl(id_procedura)
        });
      }
    }, error => console.error(error));
  }
}
