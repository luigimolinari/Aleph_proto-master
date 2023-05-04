import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router'; 
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-scrivania',
  templateUrl: './scrivania.component.html',
  styleUrls: ['./scrivania.component.css']
})
export class ScrivaniaComponent implements OnInit {

  panelOpenState = false;
  data;
  procedure;

  faUser=faUser;
  bkgColor={'RUP':'#17a2b8ed'};

  @Input() id_user:any;
  @Input() marginLeft:any;

  constructor(private apiService: ApiService, private route: ActivatedRoute,) { 
    
  }

  ngOnInit(): void {
    this.apiService.getDesktop(this.id_user).subscribe((data)=>{
      this.data = data; 
    }, error => console.error(error));
  }

}
