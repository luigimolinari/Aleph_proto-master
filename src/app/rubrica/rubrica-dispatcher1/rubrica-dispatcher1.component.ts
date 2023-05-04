import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, FormBuilder, Validators, NgModel } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { C } from '@angular/cdk/keycodes';
import { LocalStorageService } from 'src/app/local-storage.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-rubrica-dispatcher1',
  templateUrl: './rubrica-dispatcher1.component.html',
  styleUrls: ['./rubrica-dispatcher1.component.css']
})
export class RubricaDispatcher1Component implements OnInit {

  tipi;
  tipo_selected;
  form: FormGroup;
  Tipocampo="si";

  constructor(private apiService: ApiService,private location: Location, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private localStorageService: LocalStorageService) {
  
    this.form = formBuilder.group({
      isAzienda: ['', Validators.required]
    });

  }

  Tipologia(tipo){
this.Tipocampo=tipo;
  }

  Trasmetti(): void {
    if(this.form.valid){
      let navigationExtras: NavigationExtras = {
        queryParams: {'tipo': this.tipo_selected, 'ente': this.Tipocampo}
      };
      if(this.form.controls.isAzienda.value == '0'){
        this.router.navigate(['/rubricaadd'], navigationExtras);
      }
     else{
        this.router.navigate(['/rubricaaziendaadd'], navigationExtras);
      }
    }else{
      alert('Campi non correttamente compilati. Tutti i campi sono obbligatori');
    }

  }

  back() {
    this.location.back();
  }

  ngOnInit(): void {
    this.apiService.getAllProtoRubricaTipo().subscribe((data: any) => {
      this.tipi = data;
    }, error => console.error(error));

  
  }
}
