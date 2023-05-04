import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, FormBuilder, Validators, NgModel } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css']
})
export class ContactAddComponent implements OnInit {

  id;
  faEdit = faEdit;
  dati;
  id_rubrica;
  form: FormGroup;
  tipo_contatto;
  descrizione;

  constructor(private apiService: ApiService, private location: Location, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    this.route.queryParams.subscribe(
      params => {
        this.id_rubrica = params['id_rubrica'];
      });
  }

  Trasmetti(): void {

    if (this.form.valid) {
      this.apiService.AddProtoRubricaContact(this.id_rubrica, this.form.value).subscribe((dati) => {
        alert(dati['Esito']);
        if (dati['esito_codice'] == 1) {       
          let navigationExtras: NavigationExtras = {
            queryParams: { 'id_rubrica': this.id_rubrica }
          };     
          this.location.back();    
        }       
      });
    } else {
      alert("Attenzione. Non tutti i campi obbligatori hanno un valore valido");
    }
  }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      tipo_contatto: new FormControl('', Validators.required),
      descrizione: new FormControl('', Validators.required)
    });
  }

  back(){
    this.location.back();
  }
}
