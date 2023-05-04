import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router'; 
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, FormBuilder,  Validators, NgModel } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-documenti-edit',
  templateUrl: './documenti-edit.component.html',
  styleUrls: ['./documenti-edit.component.css']
})
export class DocumentiEditComponent implements OnInit { 
  id;
  azienda;
  aziende;
  user;
  faUser=faUser;
  faHouseUser=faHouseUser;
  faBuilding=faBuilding;
  faEdit=faEdit;
  nome: any;
  tipo;
  esito;
  msgerror:string;
  tipoalert;
  tipoalertdanger;
  tipoalertuncomplete;
  dati;
  form: FormGroup;
  documenti;
  documento;
  operatore;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { 
      
  }





  Trasmetti(): void {

    if (this.form.valid) {
    this.apiService.UpdateDocumentoFlusso(this.documento=this.form.value, this.id=this.id,this.operatore).subscribe((dati)=>{
      this.dati = dati['Esito'];
     if(this.dati=="si"){
      if(confirm("Modifica correttamente eseguita")) {
      this.router.navigate(['/documenti']);
      }
     }
     else{
      alert("Attenzione. Impossibile eseguire le modifiche");
     }
    });
  } else {
alert("Attenzione. Non tutti i campi obbligatori hanno un valore valido");
  }
    }

  
    ngOnInit(): void {
		
		this.operatore = JSON.parse(localStorage.getItem('ID'));
		
        this.form = this.formBuilder.group({
        nome: new FormControl('', Validators.minLength(2)),
        tipo: new FormControl('', Validators.minLength(2))
            });
      this.route.queryParams.subscribe( 
        params => { 
          this.id =  params['id']; 
          this.apiService.getSingleDocumento(this.id).subscribe((data)=>{
            this.documenti = data;
                        for(let i:any=0;i<this.documenti.length;i++){
            this.form.patchValue(this.nome=this.documenti[i].nome_doc);
            this.form.patchValue(this.tipo=this.documenti[i].tipo_doc);  
          }
          });
        } 
      ) 
    }
}