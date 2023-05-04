import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-pratiche-lavora',
  templateUrl: './pratiche-lavora.component.html',
  styleUrls: ['./pratiche-lavora.component.css']
})
export class PraticheLavoraComponent implements OnInit {

  id_user;
  data;
  nodata=false;

  @Input() marginLeft:any;

  constructor(private apiService: ApiService) {
    this.id_user = JSON.parse(localStorage.getItem('ID'));
  }

  ngOnInit(): void {

    this.apiService.getPraticheLavora(this.id_user).subscribe((dati) => {
      this.data = dati;
      if(this.data == null){
        this.nodata = true;
      }
    });
  }


}
