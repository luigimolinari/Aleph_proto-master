import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-new-pratica',
  templateUrl: './new-pratica.component.html',
  styleUrls: ['./new-pratica.component.css']
})
export class NewPraticaComponent implements OnInit {

  id_user;
  id_azienda;
  data;

  @Input() marginLeft:any;

  constructor(private apiService: ApiService) {
    this.id_user = JSON.parse(localStorage.getItem('ID'));
    this.id_azienda = JSON.parse(localStorage.getItem('id_azienda'));
  }

  ngOnInit(): void {

    this.apiService.getFormPerPratica(this.id_user,this.id_azienda).subscribe((dati) => {
      this.data = dati;
    });
  }


}
