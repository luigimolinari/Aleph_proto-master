import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-mex-dialog',
  templateUrl: './mex-dialog.component.html',
  styleUrls: ['./mex-dialog.component.css']
})
export class MexDialogComponent implements OnInit {

  procedura;
  operatore;
  gruppo;
  last_read;
  last_otherOp;
  max_id;
  enable_textarea = false;
  writtenText;
  writtenType;

  constructor(private route: ActivatedRoute, public containingDialog: MatDialogRef<MexDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private apiService: ApiService, private router: Router) {
     
    if(data.data!= null && data.data.length!=0){
      
      this.procedura = data.procedura;
      this.operatore = data.operatore;
      this.gruppo = data.gruppo;
      this.last_read = Number(data.last_read);
      this.last_otherOp = Number(data.last_otherOp);

      //il primo messaggio è quello con ID massimo (il più recente) con cui eventualmente aggiornare la tabella lettura_messenger
      this.max_id = data.data[0].id;
    }else{
      this.operatore = JSON.parse(localStorage.getItem('ID'));

      this.route.queryParams.subscribe(
        params => {
          this.procedura = params['procedura'];
      });
    }
  }

  ngOnInit(): void {

  }

  aggiorna(): void {

    //aggionra tb lettura_messenger -> devo scrivere che ha letto l'utltimo messaggio
    //torna a workflow-procedura

    this.apiService.AddLetturaMess(this.procedura, this.operatore, this.max_id).subscribe((dati) => {

      alert(dati["Esito"]);
      this.containingDialog.close();

    });

  }

  inviaMex(testo,tipologia){
    console.log(testo);
    console.log(this.writtenText);
    console.log(tipologia);
    console.log(this.writtenType);
    let nome = JSON.parse(localStorage.getItem('nome'));
    let cognome = JSON.parse(localStorage.getItem('cognome'));

    let messenger = {'testo':testo.value,'tipologia':tipologia.value};
    this.apiService.AddMessenger(messenger, nome, cognome, this.operatore, this.procedura).subscribe((dati) => {

      alert(dati["Esito"]);
      this.enable_textarea = false;
      this.containingDialog.close();

    });

    
  }

}

