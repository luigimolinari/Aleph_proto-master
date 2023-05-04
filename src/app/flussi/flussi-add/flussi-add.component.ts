import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, FormBuilder, Validators, NgModel } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flussi-add',
  templateUrl: './flussi-add.component.html',
  styleUrls: ['./flussi-add.component.css']
})
export class FlussiAddComponent implements OnInit {

  faBuilding = faBuilding;
  faEdit = faEdit;
  msgerror: string;
  form: FormGroup;


  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {

  }

  Trasmetti(): void {

    if (this.form.valid) {
      this.apiService.AddFlusso(this.form.value).subscribe((dati) => {
        if (dati['esito_codice'] == "1") {
          if (confirm("Flusso correttamente registrato")) {
            this.router.navigate(['/flussiview']);
          }
        }
        else {
          alert("Attenzione. Impossibile inserire il flusso");
        }
      });
    } else {
      alert("Attenzione. Non tutti i campi obbligatori hanno un valore valido");
    }
  }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl('', Validators.required),
      proprietario: new FormControl('', Validators.required),
      attivo: new FormControl('', Validators.required),
      tipo: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      descrizione: new FormControl('', Validators.required)
    });
  }
}