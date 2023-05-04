import { Component, OnInit } from '@angular/core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { faIdCardAlt } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { faLaptopHouse } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/api.service';
import { LocalStorageService } from 'src/app/local-storage.service';

@Component({
  selector: 'app-amministrazione',
  templateUrl: './amministrazione.component.html',
  styleUrls: ['./amministrazione.component.css'],

})

export class AmministrazioneComponent implements OnInit {
  faExclamationTriangle = faExclamationTriangle;
  faIdCardAlt = faIdCardAlt;
  faAddressCard = faAddressCard;
  faUsers = faUsers;
  faBuilding = faBuilding;
  faLayerGroup = faLayerGroup;
  faLaptopHouse = faLaptopHouse;
  diagnostic: any;
  diagnosticStateOp: any;
  diagnosticStateStruttura: any;

  constructor(private apiService: ApiService, private localStorageService: LocalStorageService) {

  }

  ngOnInit(): void {
    this.apiService.getDiagnosticAmministrazione().subscribe((data) => {

      this.diagnostic = data['diagnostica'];

      this.localStorageService.set('diagnostic', this.diagnostic);

      this.diagnosticStateOp = '';

      //this.diagnostic[0] - primo carattere della stringa 'diagnostic' - rappresentativo della presenza/assenza di record nella tb di tipo_operatore
      //this.diagnostic[1] - secondo carattere della stringa 'diagnostic' - rappresentativo della presenza/assenza di record nella tb di azienda

      
      if (this.diagnostic[0] == '0' || this.diagnostic[1] == '0') {
        this.diagnosticStateOp = 'disabled';
      }
      if (this.diagnostic[1] == '0') {
        this.diagnosticStateStruttura = 'disabled';
      }

      

    }, error => console.error(error));
  }

}
