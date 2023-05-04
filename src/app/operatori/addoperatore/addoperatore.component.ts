import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, FormBuilder, Validators, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiprotoService } from 'src/app/apiproto.service';

@Component({
  selector: 'app-addoperatore',
  templateUrl: './addoperatore.component.html',
  styleUrls: ['./addoperatore.component.css']
})
export class AddoperatoreComponent implements OnInit {
  id;
  user;
  faUser = faUser;
  faHouseUser = faHouseUser;
  faBuilding = faBuilding;
  faPlus = faPlus;
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


  constructor(private apiService: ApiService, private apiprotoService:ApiprotoService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
  }

  Trasmetti(): void {

    if (this.form.valid) {
      console.log(this.cf);
      this.apiService.getAllUsers('', '').subscribe((dati: any) => {
        if (dati.find(x => x.CF.toUpperCase() === this.cf.toUpperCase())) {
          alert('CF già presente');
        }
        else {
          this.apiService.AddUser(this.utente = this.form.value).subscribe((dati) => {
            if (dati['Esito'] == "si") {
              //PROTOCOLLO

              //inserisco l'operatore in proto_abilitazioni_operatore
              //abilitazioni di default:
              //id serie = 1
              //uscita = 1
              //entrata = 0
              //interno = 1
         
              let id_operatore = dati['id_operatore'];
              this.apiprotoService.AddProtoAbilitazioniOperatori(id_operatore).subscribe((res:any) => {
                if(res.esito =='1'){
                  if (confirm("Operatore correttamente registrato")) {
                    this.router.navigate(['/operatori']);
                  } 
                }else{
                  alert("Errore nella definizione delle abilitazioni dell'operatore");
                }
              });

            }
            else {
              alert("Attenzione. Impossibile inserire l'operatore");
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
      nome: new FormControl('', Validators.required),
      cognome: new FormControl('', Validators.required),
      cf: new FormControl('', Validators.required),
      luogo_nascita: new FormControl('', Validators.required),
      prov_nascita: new FormControl('', Validators.required),
      data_nascita: new FormControl('', Validators.required),
      indirizzo_residenza: new FormControl('', Validators.required),
      comune_residenza: new FormControl('', Validators.required),
      prov_residenza: new FormControl('', Validators.required),
      azienda: new FormControl('', Validators.required),
      struttura: new FormControl(''),
      ruolo: new FormControl('', Validators.required),
      profilo: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      telefono: new FormControl(''),
      nomeutente: new FormControl('', Validators.required),
      tipo: new FormControl('', Validators.required),
      sesso: new FormControl('', Validators.required),
    });

  }

  ControlAzienda() {
    this.struttura='';
    this.strutture=[];
    //pesco tutte le strutture dell'azienda selezionata
    this.apiService.getStrutturaAzienda(this.azienda).subscribe((data: any) => {
      if (data != null) {
        for (let i: any = 0; i < data.length; i++) {
          this.strutture.push(data[i]);
        }
      }
    }, error => console.error(error));
  }


}
