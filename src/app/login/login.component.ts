import { Component, Output, EventEmitter } from '@angular/core';
import { faIdCardAlt } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';
import { LocalStorageService } from '../local-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [Md5]
})

export class LoginComponent {
  users;
  user;
  pass;
  faIdCardAlt = faIdCardAlt;
  LogForm: FormGroup;
  msgerror: string;
  ready: boolean = true;
  loginOk: boolean;

  @Output() loginAction: EventEmitter<any> = new EventEmitter();

  constructor(private apiService: ApiService, private fb: FormBuilder, private localStorageService: LocalStorageService) {
    this.createForm();
  }

  createForm() {
    this.LogForm = this.fb.group({
      user: ['', Validators.required],
      pass: ['', Validators.required]
    });
  }

  recupera() {
    this.ready = false;
    this.user = this.LogForm.controls.user.value;
    let md5_pw = Md5.hashStr((this.LogForm.controls.pass.value));
    this.apiService.getUsers(this.user, md5_pw).subscribe((data: any) => {

      this.users = data['records'][0]; // to do - non deve restituire un array ma un unico risultato

      /* for (i = 0; i < this.users.length; i++) {
        this.user = this.users[i]['User'];
        this.nome = this.users[i]['Nome'];
        this.cognome = this.users[i]['Cognome'];
        this.CF = this.users[i]['CF'];
        this.tipo_op = this.users[i]['Priv'];
        this.accesso = this.users[i]['Accesso'];
        this.autor = this.users[i]['Auth'];
        this.ID = this.users[i]['ID'];
        this.azienda = this.users[i]['Azienda'];
        this.id_azienda = this.users[i]['idAzienda'];
      } */

      if (this.users['Auth'] == "dhtgdyimuyo") {
        this.user = '';
        this.pass = '';
        this.msgerror = 'si';
        this.ready = true;
        this.loginOk = false;
        this.loginAction.emit(this.loginOk);
        this.createForm();
      } else {
        //login andato a buon fine -> genero uno pseudonimo da associare all operatore loggato
        this.apiService.AddPseudo(this.users['ID']).subscribe((res_pseudo: any) => {
          if (res_pseudo.esito == '1') {
            let pseudo = res_pseudo.pseudo;
            this.localStorageService.set('user', this.users['User']);
            this.localStorageService.set('nome', this.users['Nome']);
            this.localStorageService.set('cognome', this.users['Cognome']);
            this.localStorageService.set('pseudonimo', pseudo);
            this.localStorageService.set('tipo_op', this.users['Priv']);
            this.localStorageService.set('accesso', this.users['Accesso']);
            this.localStorageService.set('ID', this.users['ID']);
            this.localStorageService.set('CF', this.users['CF']);
            this.localStorageService.set('azienda', this.users['Azienda']);
            this.localStorageService.set('id_azienda', this.users['idAzienda']);

            this.ready = true;
            this.loginOk = true;
            this.loginAction.emit(this.loginOk);

          } else {
            alert(res_pseudo.esito_mex);
            this.ready = true;
            this.loginOk = false;
            this.loginAction.emit(this.loginOk);
          }
        });
      }
    });
  }


}