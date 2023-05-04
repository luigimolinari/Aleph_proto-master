import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ApiprotoService } from 'src/app/apiproto.service';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-write-pec',
  templateUrl: './write-pec.component.html',
  styleUrls: ['./write-pec.component.css']
})
export class WritePecComponent implements OnInit {

  route_to_back;

  to_address = [];
  object;
  body;
  fileCollection = [];
  total_size;
  file_data;
  path_allegato;
  myForm: FormGroup;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  addOnBlur = true;
  faFolderOpen = faFolderOpen;
  file;
  fileUploaded = true;

  navigationExtras: NavigationExtras;


  @ViewChild('toAddressInput') toAddressInput: ElementRef<HTMLInputElement>;


  constructor(private route: ActivatedRoute, private router: Router, private apiprotoService: ApiprotoService, public fb: FormBuilder, private apiService: ApiService) { 
    this.route.queryParams.subscribe(
      params => {
        this.route_to_back = params['from'];
        let id_allegato = params['id'];
        if (id_allegato != undefined){
          let id_procedura = params['id_procedura'];
          let id_pratica = params['id_pratica'];
          let id_workflow = params['id_workflow'];
          let gruppo = params['gruppo'];
          let privilegi = params['privilegi'];

          if (id_procedura != undefined) {
            this.navigationExtras = {
              queryParams: { 'id_procedura': id_procedura, 'id_workflow': id_workflow, 'gruppo': gruppo, 'p': privilegi }
            };
          } else {
            this.navigationExtras = {
              queryParams: { 'id_pratica': id_pratica, 'id_workflow': id_workflow, 'gruppo': gruppo, 'p': privilegi }
            };
          }

          this.apiService.getSingleDoc(id_allegato).subscribe((data) => {

            this.path_allegato = data[0]['percorso'];
            const singleFile: any = [];
            singleFile.keyName = data[0]['descrizione'];
            this.fileCollection.push(singleFile);
          });
        
        }
      });

      this.myForm = this.fb.group({
        object: [''],
        body: ['']
      })
  }

  ngOnInit(): void {
  }

  send_mail(): void {

    let error_mex = "Attenzione! Impossibile procedere all'invio: ";

    let control_body = this.body == '' ? false : true;
    let control_obj;
    let control_address = this.to_address.length == 0 ? false : true;
    let control_size = this.total_size > 25 * 1024 * 1024 ? false : true;

    if (!control_body) error_mex = error_mex + "- Il corpo del messaggio è vuoto";
    if (!control_address) error_mex = error_mex + "- Nessun destinatario è stato specificato";
    if (!control_size) error_mex = error_mex + "- La dimensione degli allegati supera il limite di 25 MB";

    if (this.object == '') {
      control_obj = confirm('Inviare il messaggio senza oggetto?');
    } else {
      control_obj = true;
    }

    if (control_body && control_address && control_size && control_obj) {
      //INVIO
      this.file_data = new FormData();
      for (let i = 0; i < this.fileCollection.length; i++) {
        if (this.fileCollection[i].file != undefined) {
          this.file_data.append('file[]', this.fileCollection[i].file);
        }
      }

      /* invio commentato per test careggi */
      this.apiprotoService.sendMailAruba(this.to_address, this.object, this.body, this.file_data, this.path_allegato).subscribe(
        (response) => {
          alert(response);     
          this.go_back();   
        },
        (error) => {
          alert('Errore. ' + error.error.error.message + ' ' + error.error.text);
        }
      );
    } else {
      alert(error_mex);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      if (this.validateEmail(value)) {
        this.to_address.push(value);
      } else {
        alert('Pattern email non valido');
      }
    }
    this.toAddressInput.nativeElement.value = '';
  }

  remove(address): void {
    const index = this.to_address.indexOf(address);

    if (index >= 0) {
      this.to_address.splice(index, 1);
    }
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }


  close_sender(): void {
    if (confirm('Vuoi uscire? Il messaggio non verrà salvato')) {
      this.to_address = [];
      this.object = '';
      this.body = '';
      this.fileCollection = [];
      this.go_back();
      
    }
  }

  go_back(): void {
    this.router.navigate([this.route_to_back], this.navigationExtras);
  }

  //ALLEGATI -------------------------------------------------------------------

  onFileSelect(event): void {
    this.file = undefined;
    this.fileUploaded = event.target.files.length > 0;
    if (this.fileUploaded) {
      for (let i = 0; i < event.target.files.length; i++) {
        if (this.fileCollection.length < 10) {
          this.file = event.target.files[i];
          const singleFile: any = [];
          singleFile.keyName = this.file.name;
          singleFile.file = this.file;
          if (this.file.size > 2 * 1024 * 1024) {
            alert('Il file ' + this.file.name + ' è troppo grande per essere allegato; supera il limite di 2 MB');
          } else {
            this.fileCollection.push(singleFile);
            this.total_size = this.total_size + this.file.size;
          }
        } else {
          alert("Attenzione! Raggiunto il limite di 10 allegati");
        }
      }
    }
  }

  deleteElFromList(i): void {
    this.fileCollection.splice(i, 1);
  }


}
