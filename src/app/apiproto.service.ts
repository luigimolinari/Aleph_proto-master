import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiprotoService {
  API_KEY = environment.apikey
  url: string = environment.url;
  url_pec: string = environment.url_pec;
  formData;

  constructor(private httpClient: HttpClient) {
  }

  readLocalStorage() {
    let lStorage: any = new Object();
    lStorage.id_operatore = JSON.parse(localStorage.getItem('ID'));
    lStorage.cf_operatore = JSON.parse(localStorage.getItem('CF'));
    lStorage.user = JSON.parse(localStorage.getItem('user'));
    lStorage.nome = JSON.parse(localStorage.getItem('nome'));
    lStorage.cognome = JSON.parse(localStorage.getItem('cognome'));
    lStorage.tipo_operatore = JSON.parse(localStorage.getItem('tipo_op'));
    lStorage.accesso = JSON.parse(localStorage.getItem('accesso'));
    lStorage.azienda = JSON.parse(localStorage.getItem('azienda'));
    lStorage.id_azienda = JSON.parse(localStorage.getItem('id_azienda'));
    lStorage.pseudonimo = JSON.parse(localStorage.getItem('pseudonimo'));
    return lStorage;
  }

  public getPrivileges(user, id, pseudonimo) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("user", user);
    this.formData.append("id", id);
    this.formData.append("pseudonimo", pseudonimo);
    return this.httpClient.post(this.url + 'GET_privileges.php', this.formData);
  }


  public getCodeTitolario(codici) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("proto_titolario", JSON.stringify(codici));
    return this.httpClient.post(this.url + 'proto_GET_code_titolario.php', this.formData);
  }

  public getAllProtoTipo() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'proto_GET_all_tipo.php', this.formData);
  }

  public getAllProtoInbox() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'proto_GET_all_inbox.php', this.formData);
  }

  public getAllProtoSerie() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'proto_GET_all_serie.php', this.formData);
  }

  public getSingleSerie(id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);
    return this.httpClient.post(this.url + 'proto_GET_single_serie.php', this.formData);
  }

  public getAllProtoRubricaTipo() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'GET_all_proto_rubrica_tipo.php', this.formData);
  }

  public getAllOperatoriRubrica() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'GET_all_users.php', this.formData);
  }

  public getAllRubricaGenerale() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'GET_all_proto_rubrica_generale.php', this.formData);
  }

  public getAllRubricaAziende() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'GET_all_proto_rubrica_aziendeall.php', this.formData);
  }

  public getAllRubricaAziendeStrutture() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'GET_proto_rubrica_aziende_struttureall.php', this.formData);
  }

  public getAllProtoRubricaDipendenti(){
    this.formData = new FormData();
    this.formData.append('apiKey',this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url+'GET_proto_rubrica_aziende_personeall.php',this.formData);
  }

  public getAllRubricaTipizzata(tipo) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('tipo', tipo);
    return this.httpClient.post(this.url + 'GET_all_proto_rubrica_tipizzata.php', this.formData);
  }

  public getAllVociRubricaTipo() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'GET_all_proto_rubrica_tipo.php', this.formData);
  }

  public AddVoceVolante(nome, cognome, indirizzo, comune, provincia, cap, stato, azienda) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('nome', nome);
    this.formData.append('cognome', cognome);
    this.formData.append('indirizzo', indirizzo);
    this.formData.append('comune', comune);
    this.formData.append('provincia', provincia);
    this.formData.append('cap', cap);
    this.formData.append('stato', stato);
    this.formData.append('azienda', azienda);
    return this.httpClient.post(this.url + 'proto_ADD_rubrica_generale.php', this.formData);
  }

  public getAllTitolario() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'proto_GET_all_titolario.php', this.formData);
  }


  public getAllUsers() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'GET_all_users.php', this.formData);
  }


  public getAllStrutture(azienda) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_azienda", azienda);
    return this.httpClient.post(this.url + 'GET_all_strutture_azienda.php', this.formData);
  }


  public AddProtoPec(pec_list, titolario, mittenti, assegnatari, copiaconoscenza, inbox, ristrettotipo, riservatipo, oggetto) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("pec_list", JSON.stringify(pec_list));
    this.formData.append('titolario', titolario);
    this.formData.append('mittenti', JSON.stringify(mittenti));
    this.formData.append('assegnatari', JSON.stringify(assegnatari));
    this.formData.append('copiaconoscenza', JSON.stringify(copiaconoscenza));
    this.formData.append('inbox', inbox);
    this.formData.append('ristrettotipo', ristrettotipo);
    this.formData.append('riservatipo', riservatipo);
    this.formData.append('oggetto', oggetto);
    return this.httpClient.post(this.url + 'ADD_proto_pec.php', this.formData);
  }

  public AddProtoRicevuta(id_pec, allegati, num_protocollo, tipo_ricevuta, id_user){
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_pec",id_pec);
    this.formData.append('num_protocollo', num_protocollo);
    this.formData.append('allegati', JSON.stringify(allegati));
    this.formData.append('tipo_ricevuta', tipo_ricevuta);
    this.formData.append('id_user', id_user);
    return this.httpClient.post(this.url + 'ADD_proto_ricevuta.php', this.formData);
  }

  public getProtoPec(id_user) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_user', id_user);
    return this.httpClient.post(this.url + 'GET_proto_pec.php', this.formData);
  }

  public getMail(id_user) {

    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("ID", id_user);
    
    //return this.httpClient.post('http://172.29.1.24/aleph_proto/app_service/pop-php/pec_asl.php',this.formData);
    //return this.httpClient.post(this.url_pec+'GET_pec_new.php',this.formData);
    return this.httpClient.post(this.url+'/php-pec-master/GET_pec_new.php',this.formData);

  }

  public getInCarico(id_user) {

    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_user", id_user);
    
    //return this.httpClient.post('http://172.29.1.24/aleph_proto/app_service/pop-php/pec_asl.php',this.formData);
    //return this.httpClient.post(this.url_pec+'GET_pec_new.php',this.formData);
    return this.httpClient.post(this.url+'GET_proto_pec_in_carico.php',this.formData);

  }

  public getSingleDoc(id_documento) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_documento', id_documento);
    return this.httpClient.post(this.url + 'GET_single_doc.php', this.formData);
  }

  public downloadDocumento(path) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('path', path);
    return this.httpClient.post(this.url + 'GET_file.php', this.formData, { responseType: 'blob' });
  }

  public sendMailAruba(toAddress, subject, body, file, path) {

    this.formData = file;
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("login", "luigi_molinari@arubapec.it");
    this.formData.append("password", "Rubenthalas1!");
    this.formData.append("toAddress", JSON.stringify(toAddress));
    this.formData.append("toName", "Luigi Molinari");
    this.formData.append("subject", subject);
    this.formData.append("body", body);
    this.formData.append("path", path);
    return this.httpClient.post('http://172.29.1.24/app_service/sendmailAruba.php', this.formData);
  }

  public AddProtoPecSerie(pec_id_list, id_user) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_user', id_user);
    this.formData.append("pec_id_list", JSON.stringify(pec_id_list));


    return this.httpClient.post(this.url + 'ADD_proto_pec_serie.php', this.formData);
  }

  public DeleteProtoPecSerie() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));

    return this.httpClient.post(this.url + 'DELETE_proto_pec_serie.php', this.formData);
  }

  public DeleteProtoPecSerieSingle(pec_id_list,id_user) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_user', id_user);
    this.formData.append("pec_id_list", JSON.stringify(pec_id_list));

    return this.httpClient.post(this.url + 'DELETE_proto_pec_serie_single.php', this.formData);
  }

  public DeleteProtoPecSerieAll(id_user) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_user', id_user);

    return this.httpClient.post(this.url + 'DELETE_proto_pec_serie_all.php', this.formData);
  }

  public AddProtocollo(protocollo, allegati, user, id_user, id_azienda) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('allegati', allegati);
    this.formData.append('user', user);
    this.formData.append('id_user', id_user);
    this.formData.append('id_azienda', id_azienda);
    this.formData.append('protocollo', JSON.stringify(protocollo));

    return this.httpClient.post(this.url + 'proto_ADD_protocollo.php', this.formData);
  }


  public getAllProtoRiservatezza() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'proto_GET_all_riservatezza.php', this.formData);
  }


  public getAllProtoRiservatezzaTipo(tipo) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("tipo", tipo);
    return this.httpClient.post(this.url + 'proto_GET_all_riservatezza_tipo.php', this.formData);
  }



  public getAllProtoRiservatezzaDeleted() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'proto_GET_all_riservatezza_DELETED.php', this.formData);
  }

  public DeleteProtoRiservatezza(id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id', id);

    return this.httpClient.post(this.url + 'proto_DELETE_riservatezza.php', this.formData);
  }


  public RestoreProtoRiservatezza(id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id', id);

    return this.httpClient.post(this.url + 'proto_RESTORE_riservatezza.php', this.formData);
  }

  public AddProtoRiservatezza(riservatezza) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('riservatezza', JSON.stringify(riservatezza));

    return this.httpClient.post(this.url + 'proto_ADD_NEWriservatezza.php', this.formData);
  }

  public getSingleRiservatezza(id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id', id);
    return this.httpClient.post(this.url + 'proto_GET_single_riservatezza.php', this.formData);
  }

  public UpdateRiservatezza(riservatezza, id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("riservatezza", JSON.stringify(riservatezza));
    this.formData.append('id', id);
    return this.httpClient.post(this.url + 'proto_UPDATE_riservatezza.php', this.formData);
  }


  public getAllProtoDestinatari() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'proto_GET_all_destinatari.php', this.formData);
  }


  public getAllProtoDestinatariDeleted() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'proto_GET_all_destinatari_DELETED.php', this.formData);
  }

  public DeleteProtoDestinatari(id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id', id);

    return this.httpClient.post(this.url + 'proto_DELETE_destinatari.php', this.formData);
  }


  public RestoreProtoDestinatari(id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id', id);

    return this.httpClient.post(this.url + 'proto_RESTORE_destinatari.php', this.formData);
  }

  public AddProtoDestinatari(destinatari, azienda) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('destinatari', JSON.stringify(destinatari));
    this.formData.append('azienda', JSON.stringify(azienda));
    return this.httpClient.post(this.url + 'proto_ADD_destinatari.php', this.formData);
  }

  public getSingleDestinatari(id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id', id);
    return this.httpClient.post(this.url + 'proto_GET_single_destinatari.php', this.formData);
  }

  public UpdateDestinatari(destinatari, id, azienda) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("destinatari", JSON.stringify(destinatari));
    this.formData.append("azienda", JSON.stringify(azienda));
    this.formData.append('id', id);
    return this.httpClient.post(this.url + 'proto_UPDATE_destinatari.php', this.formData);
  }

  public getTestoMail() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'proto_GET_mail.php', this.formData);
  }

  public getEtichetta(id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id', id);
    return this.httpClient.post(this.url + 'GET_proto_etichetta.php', this.formData);
  }

  public clonaProto(id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id', id);
    return this.httpClient.post(this.url + 'proto_ADD_clone.php', this.formData);
  }

  public clonaProtoarchivio(id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id', id);
    return this.httpClient.post(this.url + 'proto_ADD_clone_archivio.php', this.formData);
  }

  public protoScanner(file, id) {
    this.formData = file;
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id', id);
    return this.httpClient.post(this.url + 'proto_scanner.php', this.formData);
  }

  public getAllProtoCloni(){
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'proto_GET_all_proto_cloni.php', this.formData);
  }

  public getSingleProtoCloni(id_clone){
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("id_clone", id_clone);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'proto_GET_single_proto_cloni.php', this.formData);
  }

  public getAllProtoProtocollo(){
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'proto_GET_all_proto_protocollo.php', this.formData);
  }

  public AddProtoAbilitazioniOperatori(id_operatore) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_operatore", id_operatore);

    return this.httpClient.post(this.url + 'proto_ADD_proto_abilitazioni_operatori.php', this.formData);
  }

  public DeleteProtoAbilitazioniOperatori(id_operatore) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_operatore", id_operatore);

    return this.httpClient.post(this.url + 'proto_DELETE_proto_abilitazioni_operatori.php', this.formData);
  }

  public getLimitProtoProtocollo(form) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("form", JSON.stringify(form));

    return this.httpClient.post(this.url + 'proto_GET_limit_proto_protocollo.php', this.formData);
  }
  //
  public getProtocollo(valore) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("valore", valore);
    return this.httpClient.post(this.url + 'GET_proto_protocollo.php', this.formData);
  }

  //da aleph_desk
  public CreateToken(valore){
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("valore", valore);

    return this.httpClient.post(this.url+'create_token.php',this.formData);
  }
  //da aleph_desk
  public UseToken(token) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("token", token);
    return this.httpClient.post(this.url + 'use_token.php', this.formData);
  }

  public downloadProtoDocs(token) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('token', token);
    return this.httpClient.post(this.url + 'GET_proto_docs.php', this.formData, { responseType: 'blob' });
  }
  
  public getCorrispondenti(valore) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("corrispondenti", valore);
    return this.httpClient.post(this.url + 'GET_corrispondenti.php', this.formData);
  }

  public getAssegnatari(valore) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("assegnatari", valore);
    return this.httpClient.post(this.url + 'GET_corrispondenti_assegnatari.php', this.formData);
  }

  public getInterni(valore) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("interni", valore);
    return this.httpClient.post(this.url + 'GET_corrispondenti_interni.php', this.formData);
  }

  public getCopiaC(valore) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("copiac", valore);
    return this.httpClient.post(this.url + 'GET_corrispondenti_conoscenza.php', this.formData);
  }

  public getDocs(valore) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("id_proto", valore);
    return this.httpClient.post(this.url + 'GET_corrispondenti_files.php', this.formData);
  }

  public zipDocs(id_proto) {
  
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("id_proto", id_proto);
    //return this.httpClient.post(this.url + 'GET_corrispondenti_zip_files.php', this.formData);
    return this.httpClient.post(this.url + 'GET_corrispondenti_zip_files_giorgia.php', this.formData); //to do  - cambia
  }


}

