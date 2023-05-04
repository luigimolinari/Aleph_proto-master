import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, FormBuilder, Validators, NgModel } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-flussi-edit',
  templateUrl: './flussi-edit.component.html',
  styleUrls: ['./flussi-edit.component.css']
})
export class FlussiEditComponent implements OnInit {
  id;
  faBuilding = faBuilding;
  faEdit = faEdit;
  msgerror: string;
  form: FormGroup;
  flussi;


  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {

  }

  Trasmetti(): void {

    if (this.form.valid) {
      this.apiService.UpdateFlusso(this.form.value, this.id = this.id).subscribe((dati) => {
        if (dati['esito_codice'] == 1) {
          if (confirm("Modifica correttamente eseguita")) {
            this.router.navigate(['/flussiview']);
          }
        }
        else {
          alert("Attenzione. Impossibile eseguire le modifiche");
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
    this.route.queryParams.subscribe(
      params => {
        this.id = params['id'];
        this.apiService.getSingleFlusso(this.id).subscribe((data) => {
          this.flussi = data;
          for (let i: any = 0; i < this.flussi.length; i++) {

            this.form.controls.nome.setValue(this.flussi[i].nome_flusso);
            this.form.controls.proprietario.setValue(this.flussi[i].proprietario);
            this.form.controls.attivo.setValue(this.flussi[i].attivo);
            this.form.controls.tipo.setValue(this.flussi[i].tipo);
            this.form.controls.categoria.setValue(this.flussi[i].categoria);
            this.form.controls.descrizione.setValue(this.flussi[i].descrizione);
          }
        });
      }
    )
  }
}