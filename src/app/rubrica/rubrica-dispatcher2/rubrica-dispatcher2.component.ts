import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rubrica-dispatcher2',
  templateUrl: './rubrica-dispatcher2.component.html',
  styleUrls: ['./rubrica-dispatcher2.component.css']
})
export class RubricaDispatcher2Component implements OnInit {

  tipo: any;
  isAzienda: any
  new_id:any;

  constructor(private route:ActivatedRoute) { 
    this.route.queryParams.subscribe(
      params => {
      this.tipo = params['tipo'];
      this.isAzienda = params['isAzienda'];
      this.new_id = params['new_id'];
      }
    );
  }

  ngOnInit(): void {
  }

}
