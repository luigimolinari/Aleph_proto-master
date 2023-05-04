import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-userforms',
  templateUrl: './userforms.component.html',
  styleUrls: ['./userforms.component.css']
})
export class UserformsComponent implements OnInit {

  campi;
  faEye=faEye;
  

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

    
    this.apiService.getFormPortal().subscribe((dati)=>{
      this.campi = dati;
   
        });
  }

  

}
