import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { LocalStorageService } from 'src/app/local-storage.service';
import { faHouseUser, faUserTie, faAddressBook, faPhone, faMap, faEdit, faTrash, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
@Component({
  selector: 'app-rubrica-item-view',
  templateUrl: './rubrica-item-view.component.html',
  styleUrls: ['./rubrica-item-view.component.css']
})
export class RubricaItemViewComponent implements OnInit {

  aziende = [];
  data;
  id_rubrica;
  azienda_nome_selected = '';
  disable_azienda = false;
  form: FormGroup;
  indirizzi = [];
  contatti = [];
  nomestruttura;
  azienda;
  faUserTie=faUserTie;
  faAddressBook=faAddressBook;
  faEdit=faEdit;
  faTrash=faTrash;
  faEnvelope=faEnvelope;
  id_contatto;
  formind: FormGroup;
  formcont: FormGroup;
  tipo_contatto;
  descrizione="mia descrizione";
  faHouseUser=faHouseUser;
  faPhone=faPhone;
  faMap=faMap;
  ncontatti;
  nindirizzi;
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
      });
        this.apiService.getSingleProtoRubrica(this.id_rubrica).subscribe((data: any) => {
          this.data = data[0];
          if (this.data != null) {
            this.apiService.getAllProtoRubricaAziende(this.data.tipo).subscribe((data: any) => {
              this.aziende = data;
              this.form.controls.tipo.setValue(this.data.tipo);
              this.form.controls.nome.setValue(this.data.nome);
              this.form.controls.azienda.setValue(this.data.denominazione);
              this.form.controls.cognome.setValue(this.data.cognome);
              this.form.controls.CF.setValue(this.data.CF);
              this.form.controls.struttura.setValue(this.data.nomestruttura);
            }, error => console.error(error));
          }
          this.apiService.getProtoRubricaContatti(this.id_rubrica).subscribe((datacontatti: any) => {
            if (datacontatti != null) {
            this.ncontatti="si";
            this.contatti = datacontatti;
            }
          }, error => console.error(error));

          this.apiService.getProtoRubricaIndirizzi(this.id_rubrica).subscribe((dataindirizzi: any) => {
            if (dataindirizzi != null) {
            this.nindirizzi="si";
            this.indirizzi = dataindirizzi;
            }
          }, error => console.error(error));
          
        });
  }


 
  back() { 
    this.location.back();
  }

  ngOnInit(): void {

  }
  aggiungiIndirizzo(id){
    let navigationExtras: NavigationExtras = {
      queryParams: { 'id_rubrica': id }
    };
    this.router.navigate(['/addressadd'], navigationExtras);
  }

  EditAction(id){
    let navigationExtras: NavigationExtras = {
      queryParams: { 'id': id }
    };
    this.router.navigate(['/addressedit'], navigationExtras);
  }

  DeleteAction(id) {
    
		if (confirm("Stai per eliminare l'indirizzo")) {
      this.apiService.DeleteProtoRubricaAddress(id).subscribe((dati) => {
        alert(dati['Esito']);    
        this.router.navigate(['/resolvescreen']);
      });
    }
  }
  aggiungiContatto(id){
    let navigationExtras: NavigationExtras = {
      queryParams: { 'id_rubrica': id }
    };
    this.router.navigate(['/contactadd'], navigationExtras);
  }
  EditContactAction(id){
    let navigationExtras: NavigationExtras = {
      queryParams: { 'id': id }
    };
    this.router.navigate(['/contactedit'], navigationExtras);
  }
  DeleteContactAction(id) {
		if (confirm("Stai per eliminare il contatto")) {
      this.apiService.DeleteProtoRubricaContact(id).subscribe((dati) => {
        alert(dati['Esito']);    
        this.router.navigate(['/resolvescreen']);
      });
    }
  }
  }
  

