import { Component, OnInit, Input } from '@angular/core';
import { faIdCardAlt } from '@fortawesome/free-solid-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt, faVideo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  LocalStorageService:string;
  faIdCardAlt = faIdCardAlt;
  faVideo = faVideo;
  faPowerOff = faPowerOff;
  faCalendarAlt = faCalendarAlt;
  @Input() nome: string;

  constructor(){
  }

  CancellaLog(){
    localStorage.clear(); 
  }

}
