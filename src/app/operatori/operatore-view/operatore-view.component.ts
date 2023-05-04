import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router'; 
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-operatore-view',
  templateUrl: './operatore-view.component.html',
  styleUrls: ['./operatore-view.component.css']
})
export class OperatoreViewComponent implements OnInit {
id;
user;
faUser=faUser;
faHouseUser=faHouseUser;
faBuilding=faBuilding;


  constructor(private apiService: ApiService, private route: ActivatedRoute) { 



  }

  ngOnInit(): void {
    this.route.queryParams.subscribe( 
      params => { 
        this.id =  params['id']; 
        this.apiService.getSingleUser(this.id).subscribe((data)=>{
          this.user = data;
        });
      } 
    ) 
  }

}
