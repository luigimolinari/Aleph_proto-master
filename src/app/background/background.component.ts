import { Component, OnInit, Input, HostListener } from '@angular/core';
import { LocalStorageService } from 'src/app/local-storage.service';
//da togliere
import { Router } from '@angular/router';
import {NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {
  
  id_user:any;
  loggedIn:any;

  innerWidth:any;
  mode:any;
  open:any;
  is_full:any;
  marginLeft:any;
  vedi:any = 'scrivania';

  @HostListener('window:resize', ['$event'])
  
  onResize() {
    this.innerWidth = window.innerWidth;
    this.mode = this.innerWidth > 800 ? 'side' : 'over';
    this.open = this.innerWidth > 800 ? true : false;
    
    if(this.open){
      this.marginLeft = this.is_full ? '200px' : '60px';
    }
    else{
      this.marginLeft = '0px';
    }
   
  }
  
  constructor(private localStorageService: LocalStorageService , private router: Router) {
    //responsive sidenav
    this.innerWidth = window.innerWidth;
    this.mode = this.innerWidth > 800 ? 'side' : 'over';
    this.open = this.innerWidth > 800 ? true : false;
    //in costruzione dell'interfaccia, la sidenav è aperta in versione slim
    this.marginLeft = this.open ? '60px' : '0px';
   }

  ngOnInit(): void {
    
    this.localStorageService.idLogged.subscribe((nextValue) => {
      this.id_user = nextValue;
      this.loggedIn = (this.id_user == '' || this.id_user == undefined || this.id_user == null)  ? false : true;
    });
    this.id_user = JSON.parse(localStorage.getItem('ID'));
    this.loggedIn = (this.id_user == '' || this.id_user == undefined || this.id_user == null)  ? false : true;
  }

  test_event(newItem: string){
    console.log(newItem);
    this.vedi = newItem;
  }

  full_state_event(full_side_nav: boolean){
    this.marginLeft = full_side_nav ? '200px' : '60px';
    this.is_full = full_side_nav;
  }
}
