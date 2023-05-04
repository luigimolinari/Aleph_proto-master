import { Component, OnInit } from '@angular/core';
import { faNetworkWired } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faBuilding, faCog, faUserCircle, faUser, faAddressBook, faBook, faFingerprint} from '@fortawesome/free-solid-svg-icons';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { faFileContract } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { faUsersCog } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import {ApiService} from 'src/app/api.service';
import {LocalStorageService} from 'src/app/local-storage.service';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-proto-admin',
  templateUrl: './proto-admin.component.html',
  styleUrls: ['./proto-admin.component.css']
})
export class ProtoAdminComponent implements OnInit {

  faNetworkWired = faNetworkWired;
  faAddressCard = faAddressCard;
  faUsers = faUsers;
  faBuilding = faBuilding;
  faLayerGroup = faLayerGroup;
  faFingerprint = faFingerprint;
  faCog = faCog;
  faFileContract = faFileContract;
  faBriefCase = faBriefcase;
  faList = faList;
  faFolderOpen = faFolderOpen;
  faUsersCog = faUsersCog;
  faUserCircle = faUserCircle;
  faAddressBook = faAddressBook;
  faBook = faBook;
  faUser = faUser;
  faEye = faEye;
  faExclamationTriangle = faExclamationTriangle;
  diagnostic;
  diagnosticState;
  user;
  id_operatore;
  pseudonimo;
  privilegio;

  constructor(private apiService: ApiService, private localStorageService: LocalStorageService) { 

    const myNome = JSON.parse(localStorage.getItem('user'));
    this.user=myNome;
    
    
    const myId = JSON.parse(localStorage.getItem('ID'));
    this.id_operatore=myId;
  
    const myPseudo = JSON.parse(localStorage.getItem('pseudonimo'));
    this.pseudonimo=myPseudo;
    

    this.apiService.getPrivileges(this.user, this.id_operatore, this.pseudonimo).subscribe((privilegio: any) => {

      
      for(var i=0;i<privilegio.length;i++){
        this.privilegio = privilegio[i]['tipo'];
      }
      }, error => console.error(error));

  }

  ngOnInit(): void {
    
  }

}