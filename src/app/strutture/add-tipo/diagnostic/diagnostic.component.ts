import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from 'src/app/local-storage.service';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faIdCardAlt } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { ApiService} from 'src/app/api.service';


@Component({
  selector: 'app-diagnostic',
  templateUrl: './diagnostic.component.html',
  styleUrls: ['./diagnostic.component.css']
})
export class DiagnosticComponent implements OnInit {
  diagnostic: any;
  showAzienda: any;
  faArrowDown= faArrowDown;
  faIdCardAlt= faIdCardAlt;
  faBuilding= faBuilding;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {

      this.showAzienda = '';
      this.diagnostic = localStorage.getItem('diagnostic');
      //this.diagnostic[1] - primo carattere della stringa 'diagnostic' - rappresentativo della presenza/assenza di record nella tb di tipo_operatore
      if (this.diagnostic[1]=='0') {
        this.showAzienda = 'disabled';
      }
      
  }


}
