import { Component, OnInit } from '@angular/core';
import { faNetworkWired } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
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
  selector: 'app-procedure',
  templateUrl: './procedure.component.html',
  styleUrls: ['./procedure.component.css']
})
export class ProcedureComponent implements OnInit {

  faNetworkWired = faNetworkWired;
  faAddressCard = faAddressCard;
  faUsers = faUsers;
  faBuilding = faBuilding;
  faLayerGroup = faLayerGroup;
  faFileContract = faFileContract;
  faBriefCase = faBriefcase;
  faList = faList;
  faFolderOpen = faFolderOpen;
  faUsersCog = faUsersCog;
  faEye = faEye;
  faExclamationTriangle = faExclamationTriangle;
  diagnostic;
  diagnosticState;

  constructor(private apiService: ApiService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    
  }

}