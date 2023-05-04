import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { LocalStorageService } from 'src/app/local-storage.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-rubrica-edit',
  templateUrl: './rubrica-edit.component.html',
  styleUrls: ['./rubrica-edit.component.css']
})
export class RubricaEditComponent implements OnInit {

  aziende = [];
  data;
  id_rubrica;
  azienda_nome_selected = '';
  disable_azienda = false;
  form: FormGroup;
  strutture = [];

  constructor(private apiService: ApiService,private location: Location, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private localStorageService: LocalStorageService) {

    this.route.queryParams.subscribe(
      params => {
        this.id_rubrica = params['id_rubrica'];

        this.form = formBuilder.group({
          tipo: ['', Validators.required],
          azienda: ['', Validators.required],
          struttura: [''],
          nome: ['', Validators.required],
          cognome: ['', Validators.required],
          CF: ['', Validators.required]
        });

        this.apiService.getSingleProtoRubrica(this.id_rubrica).subscribe((data: any) => {
          this.data = data[0];
          if (this.data != null) {
            this.apiService.getAllProtoRubricaAziende(this.data.tipo).subscribe((data: any) => {
              this.aziende = data;
              this.form.controls.tipo.setValue(this.data.tipo);
              this.form.controls.azienda.setValue(this.data.id_azienda);
              this.form.controls.nome.setValue(this.data.nome);
              this.form.controls.cognome.setValue(this.data.cognome);
              this.form.controls.CF.setValue(this.data.CF);
              this.form.controls.struttura.setValue(this.data.id_struttura);
            }, error => console.error(error));
          }
          this.apiService.getAllProtoRubricaAziendeStrutture(this.data.id_azienda).subscribe((datastruttura: any) => {
            this.strutture = datastruttura;
      
          }, error => console.error(error));
        });
      });
  }

  CambiaAzienda(azienda){
    this.apiService.getAllProtoRubricaAziendeStrutture(azienda).subscribe((data: any) => {
      this.strutture = data;

    }, error => console.error(error));
  }


  Trasmetti(): void {
    if (this.form.valid) {
      this.apiService.UpdateProtoRubrica(this.id_rubrica,this.form.value).subscribe((data: any) => {
        alert(data['Esito']);      
        this.router.navigate(['/rubricaview']);
      }, error => console.error(error));
    } else {
      alert('Campi non correttamente compilati. Tutti i campi sono obbligatori');
    }

  }

  back() { 
    this.location.back();
  }

  ngOnInit(): void {

  }
}

