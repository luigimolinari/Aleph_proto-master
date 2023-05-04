import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from 'src/app/local-storage.service';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faNetworkWired } from '@fortawesome/free-solid-svg-icons';
import { faFileContract } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-diagnostic-flussi',
  templateUrl: './diagnostic-flussi.component.html',
  styleUrls: ['./diagnostic-flussi.component.css']
})
export class DiagnosticFlussiComponent implements OnInit {

  diagnostic: any;
  showDoc: any;
  faArrowDown= faArrowDown;
  faNetworkWired= faNetworkWired;
  faFileContract= faFileContract;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {

      this.showDoc = '';
      this.diagnostic = localStorage.getItem('diagnostic');
      //this.diagnostic[1] - primo carattere della stringa 'diagnostic' - rappresentativo della presenza/assenza di record nella tb flussi
      if (this.diagnostic[1]=='0') {
        this.showDoc = 'disabled';
      }
  }

}


