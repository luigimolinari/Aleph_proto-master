import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class ApiextService {

  //AGID per codici IPA
  Indirizzo_IPA: string="https://mev.ao-pisa.toscana.it/Aleph/";
  Auth_KEY_IPA: string="FA44FD";
  formDataApi;

  constructor(private httpClient: HttpClient) { }

//API su archivio IPA
//recupero Codice IPA via descrizione

  public getIPAbydesc(descr) {
    this.formDataApi = new FormData();
    this.formDataApi.append("AUTH_ID", this.Auth_KEY_IPA);
    this.formDataApi.append("DESCR", descr);
    return this.httpClient.post(this.Indirizzo_IPA + 'IPA.php', this.formDataApi);
  }

  public getDESC_AMM_by_IPA(cod_amm) {
    this.formDataApi = new FormData();
    this.formDataApi.append("AUTH_ID", this.Auth_KEY_IPA);
    this.formDataApi.append("COD_AMM", cod_amm);
    return this.httpClient.post(this.Indirizzo_IPA + 'DESC_AMM_by_IPA.php', this.formDataApi);
  }
  public getDOM_DIG_AMM(cod_amm) {
    this.formDataApi = new FormData();
    this.formDataApi.append("AUTH_ID", this.Auth_KEY_IPA);
    this.formDataApi.append("COD_AMM", cod_amm);
    return this.httpClient.post(this.Indirizzo_IPA + 'DOM_DIG_AOO.php', this.formDataApi);
  }

  public get_AOO_by_IPA(cod_amm) {
    this.formDataApi = new FormData();
    this.formDataApi.append("AUTH_ID", this.Auth_KEY_IPA);
    this.formDataApi.append("COD_AMM", cod_amm);
    return this.httpClient.post(this.Indirizzo_IPA + 'AOO_by_IPA.php', this.formDataApi);
  }


  public get_UO_by_IPA(cod_amm) {
    this.formDataApi = new FormData();
    this.formDataApi.append("AUTH_ID", this.Auth_KEY_IPA);
    this.formDataApi.append("COD_AMM", cod_amm);
    return this.httpClient.post(this.Indirizzo_IPA + 'UO_by_IPA.php', this.formDataApi);
  }
  
  public get_UO_by_COD_OU(cod_ou) {
    this.formDataApi = new FormData();
    this.formDataApi.append("AUTH_ID", this.Auth_KEY_IPA);
    this.formDataApi.append("COD_OU", cod_ou);
    return this.httpClient.post(this.Indirizzo_IPA + 'OU_by_COD_OU.php', this.formDataApi);
  }

  public get_DOM_DIG_UO(cod_ou) {
    this.formDataApi = new FormData();
    this.formDataApi.append("AUTH_ID", this.Auth_KEY_IPA);
    this.formDataApi.append("COD_OU", cod_ou);
    return this.httpClient.post(this.Indirizzo_IPA + 'DOM_DIG_UO.php', this.formDataApi);
  }
}

