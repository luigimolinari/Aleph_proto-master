import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, FormBuilder, Validators, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-operatore-edit',
  templateUrl: './operatore-edit.component.html',
  styleUrls: ['./operatore-edit.component.css']
})
export class OperatoreEditComponent implements OnInit {
  id;
  user;
  faUser = faUser;
  faHouseUser = faHouseUser;
  faBuilding = faBuilding;
  faEdit = faEdit;
  nome: any;
  cognome;
  tipo;
  cf;
  luogo_nascita;
  prov_nascita;
  data_nascita;
  sesso;
  indirizzo_residenza;
  comune_residenza;
  prov_residenza;
  cns;
  spid;
  azienda;
  struttura;
  ruolo;
  profilo;
  esito;
  msgerror: string;
  tipoalert;
  tipoalertdanger;
  tipoalertuncomplete;
  email;
  telefono;
  utente;
  nomeutente;
  dati;
  form: FormGroup;
  aziende;
  tipooperatori;
  strutture = [];

  //
  idAzienda: string = '';
  idTipo: string = '';
  //


  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {

  }





  Trasmetti(): void {

    if (this.form.valid) {
      this.apiService.getAllUsers('', '').subscribe((dati: any) => {
        if (dati.find(x => x.CF.toUpperCase() === this.cf.toUpperCase() && x.id != this.id)) {
          alert('CF già presente');
        }
        else {
          this.apiService.UpdateUser(this.utente = this.form.value, this.id = this.id).subscribe((dati) => {
            this.dati = dati['Esito'];
            if (this.dati == "si") {
              if (confirm("Modifica correttamente eseguita")) {
                let navigationExtras: NavigationExtras = {
                  queryParams: { 'id_azienda': this.idAzienda }
                };
                this.router.navigate(['/operatori'], navigationExtras);
              }
            }
            else {
              alert("Attenzione. Impossibile eseguire le modifiche");
            }
          });
        }
      });
    } else {
      alert("Attenzione. Non tutti i campi obbligatori hanno un valore valido");
    }
  }


  ngOnInit(): void {
    this.apiService.getAziende().subscribe((dati) => {
      this.aziende = dati;
    });

    this.apiService.getTipoOperatori().subscribe((dati) => {
      this.tipooperatori = dati;
    });


    this.form = this.formBuilder.group({
      nome: new FormControl('', Validators.minLength(2)),
      cognome: new FormControl('', Validators.minLength(2)),
      cf: new FormControl('', Validators.minLength(2)),
      luogo_nascita: new FormControl('', Validators.minLength(2)),
      prov_nascita: new FormControl('', Validators.minLength(2)),
      data_nascita: new FormControl('', Validators.minLength(2)),
      indirizzo_residenza: new FormControl('', Validators.minLength(2)),
      comune_residenza: new FormControl('', Validators.minLength(2)),
      prov_residenza: new FormControl('', Validators.minLength(2)),
      azienda: new FormControl('', Validators.required),
      struttura: new FormControl('', Validators.required),
      ruolo: new FormControl('', Validators.minLength(2)),
      profilo: new FormControl('', Validators.minLength(2)),
      email: new FormControl('', Validators.minLength(2)),
      telefono: new FormControl('', Validators.minLength(2)),
      nomeutente: new FormControl('', Validators.minLength(2)),
      tipo: new FormControl('', Validators.required),
      sesso: new FormControl('', Validators.required),
    });
    this.route.queryParams.subscribe(
      params => {
        this.id = params['id'];
        this.apiService.getSingleUser(this.id).subscribe((data) => {
          this.user = data;
          for (let i: any = 0; i < this.user.length; i++) {
            this.form.patchValue(this.nome = this.user[i].nome);
            this.form.patchValue(this.cognome = this.user[i].cognome);
            this.form.patchValue(this.cf = this.user[i].CF);
            this.form.patchValue(this.luogo_nascita = this.user[i].luogo_nascita);
            this.form.patchValue(this.prov_nascita = this.user[i].prov_nascita);
            this.form.patchValue(this.data_nascita = this.user[i].data_nascita);
            this.form.patchValue(this.indirizzo_residenza = this.user[i].indirizzo_residenza);
            this.form.patchValue(this.comune_residenza = this.user[i].comune_residenza);
            this.form.patchValue(this.prov_residenza = this.user[i].prov_residenza);
            this.form.patchValue(this.azienda = this.user[i].id_azienda);
            if(this.user[i].id_struttura != null)
              this.form.patchValue(this.struttura = this.user[i].id_struttura);
            this.form.patchValue(this.tipo = this.user[i].id_tipo);
            this.form.patchValue(this.profilo = this.user[i].profilo);
            this.form.patchValue(this.ruolo = this.user[i].ruolo);
            this.form.patchValue(this.email = this.user[i].email);
            this.form.patchValue(this.telefono = this.user[i].telefono);
            this.form.patchValue(this.nomeutente = this.user[i].user);
            this.form.patchValue(this.sesso = this.user[i].sesso);
          }

          this.apiService.getStrutturaAzienda(this.user[0].id_azienda).subscribe((data: any) => {
            if (data != null) {
              for (let i: any = 0; i < data.length; i++) {
                this.strutture.push(data[i]);
              }
            }
          }, error => console.error(error));

        });
      }
    )
  }

  ControlAzienda() {
    $('#init_struttura').remove();$('#init_azienda').remove();
    this.struttura = '';
    this.strutture = [];
    this.apiService.getStrutturaAzienda(this.azienda).subscribe((data: any) => {
      if (data != null) {
        for (let i: any = 0; i < data.length; i++) {
          this.strutture.push(data[i]);
        }
      }
    }, error => console.error(error));
  }
}