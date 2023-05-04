import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

import { ApiService } from '../../api.service';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit  {

  @Input() mode:any;
  @Input() open:any;
  @Input() id_user:any;

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  @Output() menuItemSelection  = new EventEmitter<string>();
  @Output() fullStateEvent  = new EventEmitter<boolean>();

  full = false;

  constructor() { 
  }

  ngOnInit(): void {
  }

  invia(value){
    console.log('invia - sidenav');
    this.menuItemSelection.emit(value);
    if (window.innerWidth<800) this.sidenav.toggle();
  }

  open_sidenav(){
    console.log('Hai cliccato');
    this.sidenav.toggle()
  }

  reduce_sidenav(){
    this.full=!this.full;
    this.fullStateEvent.emit(this.full);
  }

}
