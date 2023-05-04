import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, FormBuilder, Validators, NgModel } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent {

  id;
  faEdit = faEdit;
  dati;
  id_rubrica;
  id_contatto;
  form: FormGroup;
  tipo_contatto;
  descrizione;

  constructor(private apiService: ApiService,private location: Location, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    
    this.form = this.formBuilder.group({
      tipo_contatto: new FormControl('', Validators.required),
      descrizione: new FormControl('', Validators.required)
    });
    
    this.route.queryParams.subscribe(
      params => {
        this.id_rubrica = params['id_rubrica'];
        this.id_contatto = params['id'];
        this.apiService.getSingleProtoRubricaContact(this.id_contatto).subscribe((dati) => {
            if(dati!=null){
              this.form.controls.tipo_contatto.setValue(dati[0].tipo_contatto);
              this.form.controls.descrizione.setValue(dati[0].descrizione);
            }
          });
        });
  }

  Trasmetti(): void {

    if (this.form.valid) {
      this.apiService.UpdateProtoRubricaContact(this.id_contatto, this.id_rubrica, this.form.value).subscribe((dati) => {
        alert(dati['Esito']);
        if (dati['esito_codice'] == 1) {  
            let navigationExtras: NavigationExtras = {
              queryParams: { 'id_rubrica': this.id_rubrica }
            };     
            this.router.navigate(['/contactview'],navigationExtras);        
        }       
      });
    } else {
      alert("Attenzione. Non tutti i campi obbligatori hanno un valore valido");
    }
  }
  back(){
    this.location.back();
  }
}
