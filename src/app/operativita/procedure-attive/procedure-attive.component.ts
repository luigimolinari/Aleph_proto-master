import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router'; 
import { faUser } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-procedure-attive',
  templateUrl: './procedure-attive.component.html',
  styleUrls: ['./procedure-attive.component.css']
})
export class ProcedureAttiveComponent implements OnInit {

  panelOpenState = false;
  data;
  procedure;

  faUser=faUser;
  bkgColor={'RUP':'#17a2b8ed'};

  @Input() id_user:any;

  constructor(private apiService: ApiService, private route: ActivatedRoute,) { 
       
  }

  ngOnInit(): void {
    this.apiService.getProcedureOperatore(this.id_user).subscribe((data)=>{
      this.data = data; 
    }, error => console.error(error));
  }



}
