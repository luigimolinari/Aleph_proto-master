import { Component, OnInit } from '@angular/core';
import { faNetworkWired } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { faFileContract } from '@fortawesome/free-solid-svg-icons';
import { faHandPointer } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faStamp, faCode } from '@fortawesome/free-solid-svg-icons';
import {ApiService} from 'src/app/api.service';
import {LocalStorageService} from 'src/app/local-storage.service';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-flussi',
  templateUrl: './flussi.component.html',
  styleUrls: ['./flussi.component.css']
})
export class FlussiComponent implements OnInit {

  faNetworkWired = faNetworkWired;
  faAddressCard = faAddressCard;
  faUsers = faUsers;
  faBuilding = faBuilding;
  faLayerGroup = faLayerGroup;
  faFileContract = faFileContract;
  faHandPointer = faHandPointer;
  faList = faList;
  faExclamationTriangle = faExclamationTriangle;
  faStamp = faStamp;
  faCode = faCode;
  tipo_op;
  diagnostic;
  diagnosticState;

  constructor(private apiService: ApiService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    const myTipo = JSON.parse(localStorage.getItem('tipo_op'));
    this.tipo_op=myTipo; 

    this.apiService.getDiagnosticFlussi().subscribe((data)=>{
   
      this.diagnostic = data['diagnostica'];

      this.localStorageService.set('diagnostic', this.diagnostic);

      this.diagnosticState = '';

      //this.diagnostic[0] - primo carattere della stringa 'diagnostic' - rappresentativo della presenza/assenza di record nella tb flusso
      //this.diagnostic[1] - secondo carattere della stringa 'diagnostic' - rappresentativo della presenza/assenza di record nella tb documenti_flusso
      if(this.diagnostic[0]=='0' || this.diagnostic[1]=='0'){
        this.diagnosticState = 'disabled';
      }
  
    }, error => console.error(error));

  }

}
