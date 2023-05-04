import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, NgModel } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-firma',
  templateUrl: './firma.component.html',
  styleUrls: ['./firma.component.css']
})
export class FirmaComponent implements OnInit {

  form: FormGroup;
  operatore;
  cf;
  passw;
  otp;
  data;
  docs;
  rootPath : string = '../';
  response;
  failedSign;
  loading;
  pratica;
  gruppo;
  flusso;
  workflow;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    //operatore loggato
    this.operatore = JSON.parse(localStorage.getItem('ID'));
    this.cf = JSON.parse(localStorage.getItem('CF'));

    this.route.params.subscribe(
      params => {
        this.docs = JSON.parse(params['data']); 
        //caso pratica:
        this.pratica  = params['pratica'];    
        this.gruppo   = params['gruppo'];    
        this.flusso   = params['flusso'];    
        this.workflow = params['workflow'];      
      }
    );
    
    for (let i:any= 0;i<this.docs.length;i++){
      this.docs[i].path = this.rootPath+this.docs[i].path;
    }

    this.form = this.formBuilder.group({
      passw: new FormControl('', Validators.required),
      otp: new FormControl('', Validators.required)
    });

  }

  Trasmetti(): void {
   
    if (this.form.valid) {
        this.loading = true;
        //chiamata all'API di firma
        //passo cf, passw, otp e docs
        //se va a buon fine -> chiamata all'API che modifica le tabelle VALIDAZIONE E ALLA FIRMA

      this.apiService.getFirma(this.form.value, this.cf, this.docs).subscribe((dati) => {

        this.response = dati;

        /* TEST - esempio
        this.response = {
          "errore_processo": 0,
          "msg_errore": "",
          "stato_firme": [
            {
              "id_doc": "122",
              "firmato": 1,
              "path_firmato": "..\/firma_remota_aruba\/file_firmati\/2021\/124_titolare_rem_1617263584.p7m",
              "dataora_firma": "2021-04-01 09:53:04"
            },
            {
              "id_doc": "128",
              "firmato": 0,
              "path_firmato": "",
              "dataora_firma": ""
            }, {
              "id_doc": "3",
              "firmato": 0,
              "path_firmato": "",
              "dataora_firma": ""
            }
          ]
        }
        */
        
        
        if (this.response.errore_processo == 0) {

          if(this.pratica == undefined){
            this.update_validazione_procedura();
          }else{
            this.update_firma_pratica();
          }

        }else{        
          alert("Qualcosa è andato storto; l'operazione di firma è fallita.");
          console.log(dati);
          this.router.navigate(['background']);
        }

      });

    } else {
      alert("Attenzione. Non tutti i campi obbligatori hanno un valore valido");
    }

  }

  update_firma_pratica(): void{
    this.apiService.UpdatePraticaFirma(this.response.stato_firme,this.operatore,this.pratica,this.gruppo, this.flusso, this.workflow).subscribe((dati) => {
      alert(dati['Esito']);
    });
  }
  
  update_validazione_procedura(): void{
    this.apiService.UpdateValidazione(this.response.stato_firme, this.operatore).subscribe((dati) => {
      this.loading = false; 
      /**
       * dati['esito_codice'] -> 1: correttamente eseguita la registrazione delle firme nel DB
       * 
       * */
      if (dati['esito_codice']==1) {             
        this.failedSign =  this.response.stato_firme.filter(x => x.firmato === 0);
        if(this.failedSign.length >0 ){                             
          alert('La firma dei seguenti documenti non è andata a buon fine: '+this.failedSign.map(x => x.id_doc));
        }else{
       
          alert(dati['Esito']+'');
        }             
        this.router.navigate(['background']);             
      }
       /**
       * dati['esito_codice'] -> 0: errore nella registrazione delle firme nel DB
       * 
       * */
      else {           
        alert("Qualcosa è andato storto; l'operazione di firma è fallita.");
        console.log(dati);
        this.router.navigate(['background']);
      }
    }
    );
  }

}


