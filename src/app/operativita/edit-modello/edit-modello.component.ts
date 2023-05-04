import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';


@Component({
  selector: 'app-edit-modello',
  templateUrl: './edit-modello.component.html',
  styleUrls: ['./edit-modello.component.css']
})
export class EditModelloComponent implements OnInit {


  update = 1; //accesso in update (edit testo)
  id;
  readOnly;
  cognomeop;
  nomeop;
  nomecognomeop;

  constructor(private route: ActivatedRoute, private socket: Socket) {
    this.nomeop = JSON.parse(localStorage.getItem('nome'));
    this.cognomeop = JSON.parse(localStorage.getItem('cognome'));
    this.nomecognomeop = this.nomeop+' '+this.cognomeop;
  }

  resolveAfter2Seconds(nomecognomeop) {
    return new Promise(resolve => {
      setTimeout(() => {
        this.nomeop = JSON.parse(localStorage.getItem('nome'));
        this.cognomeop = JSON.parse(localStorage.getItem('cognome'));
        this.nomecognomeop = this.nomeop+' '+this.cognomeop;
        resolve(nomecognomeop);
        
      }, 2000);
    });
  }

  ngOnInit(): void {

    this.resolveAfter2Seconds(1).then(value => {
      if(this.socket.connect()){
        this.socket.emit('accedi',this.id,this.nomecognomeop);
        this.socket.on('suona', function(operatore){    
        alert(operatore);
        });
        };
    });

	this.route.queryParams.subscribe(
          params => {                      
              //id del documento
              this.id = params['id'];
              //accesso in sola lettura
              this.readOnly = params['r'] == 1 ? true : false;			
          });
  }
}



