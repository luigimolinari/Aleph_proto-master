import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { LocalStorageService } from 'src/app/local-storage.service';
import { A } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-rubrica-add',
  templateUrl: './rubrica-add.component.html',
  styleUrls: ['./rubrica-add.component.css']
})
export class RubricaAddComponent implements OnInit {
  
  aziende = [];
  tipo_selected;
  azienda_selected;
  azienda_nome_selected = '';
  disable_azienda = false;
  form: FormGroup;
  azienda;
  strutture;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private localStorageService: LocalStorageService) {
  
    this.route.queryParams.subscribe(
      params => {
        this.tipo_selected    = params['tipo'];
        this.azienda_selected = params['azienda'];

        this.form = formBuilder.group({
          tipo: [this.tipo_selected],
          azienda: ['', Validators.required],
          struttura: [''],
          nome: ['', Validators.required],
          cognome: ['', Validators.required],
          CF: ['', Validators.required]
        });       

        console.log(this.form);
        console.log(this.azienda_selected);

        this.apiService.getAllProtoRubricaAziende(this.tipo_selected).subscribe((data: any) => {
          this.aziende = data;
          if(this.azienda_selected != undefined){
            this.disable_azienda = true;
            this.form.controls.azienda.setValue(this.azienda_selected);
            this.azienda_nome_selected = this.aziende.find(x => x.id == this.azienda_selected).denominazione;
          }
        }, error => console.error(error));
      });
  }


  CambiaAzienda(azienda){
    this.apiService.getAllProtoRubricaAziendeStrutture(azienda).subscribe((data: any) => {
      this.strutture = data;

    }, error => console.error(error));
  }

  Trasmetti(): void { 
    if(this.form.valid){
      this.apiService.AddProtoRubrica(this.form.value).subscribe((data: any) => {
          alert(data['Esito']);
          if(data['esito_codice']==1){
            let new_id = data['new_id'];
            let navigationExtras: NavigationExtras = {
              queryParams: { 'tipo': this.tipo_selected, 'isAzienda':0, 'new_id': new_id }
            };
            this.router.navigate(['/rubricadispatcher2'],navigationExtras);
          }
      }, error => console.error(error));
    }else{
      alert('Campi non correttamente compilati. Tutti i campi sono obbligatori');
    }

  }

  back(){
    if(this.azienda_selected != undefined){
      let navigationExtras: NavigationExtras = {
        queryParams: { 'tipo': this.tipo_selected, 'isAzienda':1, 'new_id': this.azienda_selected }
      };

      this.router.navigate(['/rubricadispatcher2'], navigationExtras);
    }else{
      this.router.navigate(['/rubricadispatcher1']);
    }
    
  }

  ngOnInit(): void {
   
  }


}
