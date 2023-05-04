import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-pratiche-valida',
  templateUrl: './pratiche-valida.component.html',
  styleUrls: ['./pratiche-valida.component.css']
})
export class PraticheValidaComponent implements OnInit {

  id_user;
  data;
  nodata = false;

  @Input() marginLeft:any;

  constructor(private apiService: ApiService) {
    this.id_user = JSON.parse(localStorage.getItem('ID'));
  }

  ngOnInit(): void {

    this.apiService.getPraticheValida(this.id_user).subscribe((dati) => {
      this.data = dati;
      if(this.data == null){
        this.nodata = true;
      }
    });
  }
}