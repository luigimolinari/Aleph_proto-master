import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_KEY = environment.apikey
  url: string = environment.url;
  url_pec: string = environment.url_pec;
  formData;

  constructor(private httpClient: HttpClient) { }
  
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

  public getUsers(us: string, pw: string) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("user", us);
    this.formData.append("pw", pw);

    return this.httpClient.post(this.url + 'GET_user_whr.php', this.formData);
  }

  /* componente non in uso!*/
  public newUser(us: string, tipo: string, nome: string, cognome: string, cf: string, firma: string, data_nascita: string, luogo_nascita: string, prov_nascita: string, indirizzo_residenza: string, comune_residenza: string, prov_residenza: string, cns: string, spid: string, azienda: string, ruolo: string, profilo: string, email: string, telefono: string) {

    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("user", us);
    this.formData.append("tipo", tipo);
    this.formData.append("nome", nome);
    this.formData.append("cognome", cognome);
    this.formData.append("cf", cf);
    this.formData.append("firma", firma);
    this.formData.append("data_nascita", data_nascita);
    this.formData.append("luogo_nascita", luogo_nascita);
    this.formData.append("prov_nascita", prov_nascita);
    this.formData.append("indirizzo_residenza", indirizzo_residenza);
    this.formData.append("comune_residenza", comune_residenza);
    this.formData.append("prov_residenza", prov_residenza);
    this.formData.append("cns", cns);
    this.formData.append("spid", spid);
    this.formData.append("azienda", azienda);
    this.formData.append("ruolo", ruolo);
    this.formData.append("profilo", profilo);
    this.formData.append("email", email);
    this.formData.append("telefono", telefono);

    return this.httpClient.post(this.url + 'NEW_user.php', this.formData);
  }
  /*****/



  public getToken() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'GET_token.php', this.formData);
  }


  public getAllUsers(idAzienda, idTipo) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("idAzienda", idAzienda);
    this.formData.append("idTipo", idTipo);

    return this.httpClient.post(this.url + 'GET_all_users.php', this.formData);
  }

  public getSingleUser(id: any) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'GET_operatore.php', this.formData);
  }

  public DeleteUser(id: any) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'DELETE_user.php', this.formData);
  }

  public UpdateUser(utente, id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("utente", JSON.stringify(utente));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'UPDATE_user.php', this.formData);
  }


  public AddUser(utente) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("utente", JSON.stringify(utente));

    return this.httpClient.post(this.url + 'ADD_user.php', this.formData);
  }

  public getAziende() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));

    return this.httpClient.post(this.url + 'GET_azienda.php', this.formData);

  }

  public getSingleAzienda(id: any) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'GET_single_azienda.php', this.formData);
  }

  public DeleteAzienda(id: any) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'DELETE_azienda.php', this.formData);
  }

  public UpdateAzienda(azienda, id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);
    this.formData.append("azienda", JSON.stringify(azienda));

    return this.httpClient.post(this.url + 'UPDATE_azienda.php', this.formData);
  }

  public AddAzienda(azienda) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("azienda", JSON.stringify(azienda));

    return this.httpClient.post(this.url + 'ADD_azienda.php', this.formData);
  }

  public getTipoOperatori() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));

    return this.httpClient.post(this.url + 'GET_tipooperatori.php', this.formData);
  }

  public getAllTipoOperatori() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'GET_all_tipooperatori.php', this.formData);
  }

  public getOperatoreAzienda(id: any) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'GET_operatore_azienda.php', this.formData);
  }

  public getOperatoreTipo(id: any) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'GET_operatore_tipo.php', this.formData);
  }

  public AddTipo(tipo) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("tipo", JSON.stringify(tipo));

    return this.httpClient.post(this.url + 'ADD_tipo.php', this.formData);
  }

  public DeleteTipo(id: any) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'DELETE_tipo.php', this.formData);
  }

  public getSingleTipo(id: any) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'GET_single_tipo.php', this.formData);
  }

  public UpdateTipo(tipo, id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);
    this.formData.append("tipo", JSON.stringify(tipo));

    return this.httpClient.post(this.url + 'UPDATE_tipo.php', this.formData);
  }

  public UpdateFormField(id_form, form_field, id, opzioni) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_form_field", id);
    this.formData.append("opzioni", opzioni);
    this.formData.append("id_form", id_form);
    this.formData.append("form_field", JSON.stringify(form_field));

    return this.httpClient.post(this.url + 'UPDATE_form_field.php', this.formData);
  }

  public UpdateFormFieldGateway(id_form, form_field, id, opzioni, steps_to_delete, tipo_precedente, id_flusso) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_form_field", id);
    this.formData.append("opzioni", opzioni);
    this.formData.append("id_form", id_form);
    this.formData.append("form_field", JSON.stringify(form_field));
    this.formData.append('steps_to_delete', JSON.stringify(steps_to_delete));
    this.formData.append("tipo_precedente", tipo_precedente);
    this.formData.append("id_flusso", id_flusso);

    return this.httpClient.post(this.url + 'UPDATE_form_field_gateway.php', this.formData);
  }

  public AddFormField(form_field, id_form, opzioni) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_form", id_form);
    this.formData.append("opzioni", opzioni);
    this.formData.append("form_field", JSON.stringify(form_field));

    return this.httpClient.post(this.url + 'ADD_form_field.php', this.formData);
  }

  public getAllTipoGruppo() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));

    return this.httpClient.post(this.url + 'GET_all_tipogruppo.php', this.formData);
  }

  public getSingleTipoGruppo(id: any) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'GET_single_tipogruppo.php', this.formData);
  }

  public AddTipoGruppo(tipogruppo) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("tipogruppo", JSON.stringify(tipogruppo));

    return this.httpClient.post(this.url + 'ADD_tipogruppo.php', this.formData);
  }

  public UpdateTipoGruppo(tipogruppo, id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);
    this.formData.append("tipogruppo", JSON.stringify(tipogruppo));

    return this.httpClient.post(this.url + 'UPDATE_tipogruppo.php', this.formData);
  }

  public DeleteTipoGruppo(id: any) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'DELETE_tipogruppo.php', this.formData);
  }

  public DeleteField(id: any) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'DELETE_field.php', this.formData);
  }

  public DeleteFormFieldGateway(id_field, tipo_field, id_form, id_flusso, steps_to_delete) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_field", id_field);
    this.formData.append("tipo_field", tipo_field);
    this.formData.append("id_form", id_form);
    this.formData.append("id_flusso", id_flusso);
    this.formData.append("steps_to_delete", JSON.stringify(steps_to_delete));

    return this.httpClient.post(this.url + 'DELETE_form_field_gateway.php', this.formData);
  }

  public getDiagnosticAmministrazione() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));

    return this.httpClient.post(this.url + 'GET_diagnostic_amministrazione.php', this.formData);
  }

  public getAllFlussi() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));

    return this.httpClient.post(this.url + 'GET_all_flussi.php', this.formData);
  }

  public getSingleFlusso(id: any) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'GET_single_flusso.php', this.formData);
  }

  public AddFlusso(flusso) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("flusso", JSON.stringify(flusso));

    return this.httpClient.post(this.url + 'ADD_flusso.php', this.formData);
  }

  public UpdateFlusso(flusso, id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);
    this.formData.append("flusso", JSON.stringify(flusso));

    return this.httpClient.post(this.url + 'UPDATE_flusso.php', this.formData);
  }

  public DeleteFlusso(id: any) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'DELETE_flusso.php', this.formData);
  }

  /*da aggiornare??*/
  public Get_Flusso_Control(flusso) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("flusso", JSON.stringify(flusso));

    return this.httpClient.post(this.url + 'UPDATE_flusso.php', this.formData);
  }
  /**/

  public getAllDocumenti(id_operatore) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_operatore", id_operatore);

    return this.httpClient.post(this.url + 'GET_all_documenti.php', this.formData);
  }

  public getSingleDocumento(id: any) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'GET_single_documento.php', this.formData);
  }




  public DeleteDocumentoFlusso(id: any) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'DELETE_documento_flusso.php', this.formData);
  }

  public GetDocumentiFlusso(flusso_doc: any) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("flusso", flusso_doc);

    return this.httpClient.post(this.url + 'GET_documenti_flusso.php', this.formData);
  }

  public AddDoc(documento, file) {
    this.formData = file;
    this.formData.append('documento', JSON.stringify(documento));
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'ADD_documento.php', this.formData);

  }

  public AddWorkflow(workflow) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("workflow", JSON.stringify(workflow));

    return this.httpClient.post(this.url + 'ADD_workflow.php', this.formData);
  }

  public getDiagnosticFlussi() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));

    return this.httpClient.post(this.url + 'GET_diagnostic_flussi.php', this.formData);
  }

  public getWorkflowDocumentoFlusso(id: any) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'GET_workflow_documentoflusso.php', this.formData);
  }

  public getDocumentoFlussoWorkflow(id: any) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'GET_documentoflusso_workflow.php', this.formData);
  }

  public getAllRUP(id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'GET_all_RUP.php', this.formData);
  }

  public AddProcedura(procedura, id_rup, ID, id_flusso) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("procedura", JSON.stringify(procedura));
    this.formData.append("id_flusso", id_flusso);
    this.formData.append("ID", ID);
    this.formData.append("id_rup", id_rup);

    return this.httpClient.post(this.url + 'ADD_procedura.php', this.formData);
  }

  public getAllProcedure(id_operatore) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_operatore", id_operatore);

    return this.httpClient.post(this.url + 'GET_all_procedure.php', this.formData);

  }

  public RestoreProcedura(id_procedura) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_procedura", id_procedura);

    return this.httpClient.post(this.url + 'RESTORE_procedura.php', this.formData);
  }

  public DeleteProcedura(id_procedura) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_procedura", id_procedura);

    return this.httpClient.post(this.url + 'DELETE_procedura.php', this.formData);
  }

  public getWorkflow(id_flusso) {

    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id_flusso);

    return this.httpClient.post(this.url + 'GET_workflow.php', this.formData);
  }


  public getSingleGruppoProcedura(id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'GET_single_gruppoprocedura.php', this.formData);
  }

  public getSingleAziendaPiva(id, piva) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);
    this.formData.append("piva", piva);

    return this.httpClient.post(this.url + 'GET_single_azienda_piva.php', this.formData);
  }

  //visibilita
  public getAllProc() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));

    return this.httpClient.post(this.url + 'GET_all_proc.php', this.formData);
  }


  public getAllStrutture(id_operatore, CF) {

    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_operatore", id_operatore);
    this.formData.append("CF", CF);
    return this.httpClient.post(this.url + 'GET_all_strutture.php', this.formData);
  }

  public getSingleStruttura(id_operatore, CF, struttura) {

    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_operatore", id_operatore);
    this.formData.append("CF", CF);
    this.formData.append("struttura", struttura);
    return this.httpClient.post(this.url + 'GET_single_struttura.php', this.formData);
  }

  public getDocumentiFlussoProcedura(id_procedura) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_procedura", id_procedura);

    return this.httpClient.post(this.url + 'GET_documentiflusso_procedura.php', this.formData);
  }

  public AddVisibilita(visibilita) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("visibilita", JSON.stringify(visibilita));

    return this.httpClient.post(this.url + 'ADD_visibilita.php', this.formData);

  }

  public DeleteGruppoProcedura(id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'DELETE_gruppoprocedura.php', this.formData);
  }

  public getProcedureOperatore(id_operatore) {
    this.formData = new FormData();

    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_operatore", id_operatore);

    return this.httpClient.post(this.url + 'GET_procedure_operatore.php', this.formData);
  }


  public getAllUsersAzienda(idAzienda) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("idAzienda", idAzienda);

    return this.httpClient.post(this.url + 'GET_all_users_azienda.php', this.formData);
  }



  public getSingleAziendaStruttura(id: any, id_operatore: string, cf: string) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);
    this.formData.append("id_operatore", id_operatore);
    this.formData.append("cf", cf);
    return this.httpClient.post(this.url + 'GET_single_azienda_struttura.php', this.formData);
  }

  public UpdateProcedura(procedura, id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);
    this.formData.append("procedura", JSON.stringify(procedura));
    return this.httpClient.post(this.url + 'UPDATE_procedura.php', this.formData);
   }

  public UpdateRUP(rupedit, id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);
    this.formData.append("rupedit", rupedit);
    return this.httpClient.post(this.url + 'UPDATE_RUP_procedura.php', this.formData);
  }


  public AddStruttura(struttura) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("struttura", JSON.stringify(struttura));
    return this.httpClient.post(this.url + 'ADD_struttura.php', this.formData);

  }




  public EditStruttura(struttura, id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);
    this.formData.append("struttura", JSON.stringify(struttura));
    return this.httpClient.post(this.url + 'UPDATE_struttura.php', this.formData);
  }


  public DeleteStruttura(id_struttura) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_struttura", id_struttura);

    return this.httpClient.post(this.url + 'DELETE_struttura.php', this.formData);
  }

  public getStrutturaLivello(id_azienda, livello) {

    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_azienda", id_azienda);
    this.formData.append("livello", livello);
    return this.httpClient.post(this.url + 'GET_all_strutture_livello.php', this.formData);
  }

  public getLivelli(id_azienda) {

    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_azienda", id_azienda);
    return this.httpClient.post(this.url + 'GET_livelli.php', this.formData);
  }


  public getStrutturaPadre(id) {

    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_strutt", id);
    return this.httpClient.post(this.url + 'GET_struttura.php', this.formData);
  }


  public getWorkflowProcedura(id_procedura, id_gruppo, id_operatore) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_procedura", id_procedura);
    this.formData.append("id_operatore", id_operatore);
    this.formData.append("id_gruppo", id_gruppo);

    return this.httpClient.post(this.url + 'GET_workflow_procedura.php', this.formData);
  }

  public getAllDocumento(id_procedura, id_workflow, id_operatore, gruppo) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_procedura", id_procedura);
    this.formData.append("id_workflow", id_workflow);
    this.formData.append("id_operatore", id_operatore);
    this.formData.append("gruppo", gruppo);

    return this.httpClient.post(this.url + 'GET_all_documento.php', this.formData);
  }


  public UpdateDoc(id, upFile, path, documento, file) {
    if (upFile == 1) {
      this.formData = file;
    }
    else {
      this.formData = new FormData();
    }
    this.formData.append('documento', JSON.stringify(documento));
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id', id);
    this.formData.append('upFile', upFile);
    this.formData.append('path', path);
    return this.httpClient.post(this.url + 'UPDATE_doc.php', this.formData);

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



  public getOrganigramma(id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id', id);
    return this.httpClient.post(this.url + 'GET_organigramma.php', this.formData);
  }



  public getFirma(credenziali, cf, docs) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('credenziali', JSON.stringify(credenziali));
    this.formData.append('cf', cf);
    this.formData.append('docs', JSON.stringify(docs));
    return this.httpClient.post('http://172.29.1.24/app_service/GET_firma.php', this.formData);
  }

  public UpdateValidazione(docsFirmati, operatore) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('operatore', operatore);
    this.formData.append('docsFirmati', JSON.stringify(docsFirmati));
    return this.httpClient.post(this.url + 'UPDATE_validazione.php', this.formData);
  }

  public getProceduraGruppoProcedura(procedura) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('procedura', procedura);
    return this.httpClient.post(this.url + 'GET_procedura_gruppoprocedura.php', this.formData);
  }

  public getOperatoreGruppoProcedura(id_gruppo) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_gruppo', id_gruppo);
    return this.httpClient.post(this.url + 'GET_operatore_gruppoprocedura.php', this.formData);
  }

  public getOperatorebycf(cf) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('cf', cf);
    return this.httpClient.post(this.url + 'GET_operatore_by_cf.php', this.formData);
  }


  public AddValidazione(listaOperatori, id_documento, ordine) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_documento', id_documento);
    this.formData.append('listaOperatori', JSON.stringify(listaOperatori));
    this.formData.append('ordine', ordine);
    return this.httpClient.post(this.url + 'ADD_validazione.php', this.formData);
  }


  public getAllDocs(id_documento, id_procedura, id_workflow) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_documento', id_documento);
    this.formData.append('id_workflow', id_workflow);
    this.formData.append('id_procedura', id_procedura);
    return this.httpClient.post(this.url + 'GET_all_docs.php', this.formData);
  }

  public getFascicoliProcedura(id_procedura) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_procedura', id_procedura);
    return this.httpClient.post(this.url + 'GET_all_docs.php', this.formData);
  }

  public DeleteValidazione(id_documento, listaOldOperatori, id_allafirma) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_documento', id_documento);
    this.formData.append('listaOperatori', JSON.stringify(listaOldOperatori));
    this.formData.append('id_allafirma', id_allafirma);
    return this.httpClient.post(this.url + 'DELETE_validazione.php', this.formData);
  }


  public getTipoAtti(id_operatore) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_operatore', id_operatore);
    return this.httpClient.post(this.url + 'GET_all_tipo_atti.php', this.formData);

  }

  public DeleteTipoAtti(id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id', id);
    return this.httpClient.post(this.url + 'DELETE_tipo_atti.php', this.formData);

  }

  public AddTipoAtti(id_flusso, natura, id_azienda, id_struttura) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_flusso', id_flusso);
    this.formData.append('natura', natura);
    this.formData.append('id_azienda', id_azienda);
    this.formData.append('id_struttura', id_struttura);
    return this.httpClient.post(this.url + 'ADD_tipo_atti.php', this.formData);
  }

  public getStrutturaAzienda(id_azienda) {

    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_azienda", id_azienda);
    return this.httpClient.post(this.url + 'GET_all_strutture_azienda.php', this.formData);
  }


  public getSchedule(id_op) {

    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_op", id_op);
    return this.httpClient.post(this.url + 'GET_schedule.php', this.formData);
  }


  public AddSchedule(schedule, id_op) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_op", id_op);
    this.formData.append("schedule", JSON.stringify(schedule));
    return this.httpClient.post(this.url + 'ADD_schedule.php', this.formData);

  }



  public UpdateTipoAtti(id, id_flusso, natura, id_azienda, id_struttura) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id', id);
    this.formData.append('id_flusso', id_flusso);
    this.formData.append('natura', natura);
    this.formData.append('id_azienda', id_azienda);
    this.formData.append('id_struttura', id_struttura);
    return this.httpClient.post(this.url + 'UPDATE_tipo_atti.php', this.formData);
  }

  public getSingleTipoAtti(id) {

    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);
    return this.httpClient.post(this.url + 'GET_single_tipo_atti.php', this.formData);
  }

  public DeleteSchedule(id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id', id);
    return this.httpClient.post(this.url + 'DELETE_schedule.php', this.formData);

  }

  public getMail(id_user) {

    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("ID", id_user);

    return this.httpClient.post(this.url_pec + 'php-pec-master/GET_pec_new.php', this.formData);
  }

  //invio da luigi_molinari@arubapec.it
  /*
  public sendMailAruba(){
   
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("login","luigi_molinari@arubapec.it");
    this.formData.append("password","Rubenthalas1!");
    this.formData.append("toAddress","luigi_molinari@arubapec.it");
    this.formData.append("toName","Luigi Molinari");
    return this.httpClient.post(this.url+'sendmailAruba.php', this.formData);
  }
  */

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


  public AddMessenger(messenger, nome, cognome, id_op, procedura) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("messenger", JSON.stringify(messenger));
    this.formData.append("nome", nome);
    this.formData.append("cognome", cognome);
    this.formData.append("id_op", id_op);
    this.formData.append("procedura", procedura);
    return this.httpClient.post(this.url + 'ADD_message.php', this.formData);

  }

  public DeleteDoc(id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id', id);
    return this.httpClient.post(this.url + 'DELETE_doc.php', this.formData);
  }

  public AddGruppoproceduraOperatori(id_gruppo, listaOperatori) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_gruppo', id_gruppo);
    this.formData.append('listaOperatori', JSON.stringify(listaOperatori));
    return this.httpClient.post(this.url + 'ADD_gruppoprocedura_operatori.php', this.formData);
  }


  public UpdateGruppoproceduraOperatori(id_gruppo, listaOperatori) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_gruppo', id_gruppo);
    this.formData.append('listaOperatori', JSON.stringify(listaOperatori));
    return this.httpClient.post(this.url + 'UPDATE_gruppoprocedura_operatori.php', this.formData);
  }

  public getAllGruppoProceduraOperatori(id_gruppo) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_gruppo', id_gruppo);
    return this.httpClient.post(this.url + 'GET_gruppoprocedura_operatori.php', this.formData);
  }


  public getAllFirmatari(id_procedura, id_workflow, gruppo_procedura) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_procedura', id_procedura);
    this.formData.append('id_workflow', id_workflow);
    this.formData.append('gruppo_procedura', gruppo_procedura);
    return this.httpClient.post(this.url + 'GET_all_firmatari.php', this.formData);
  }



  public getFirmatari(listaOperatori, id_documento, id_allafirma) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('listaOperatori', JSON.stringify(listaOperatori));
    this.formData.append('id_documento', id_documento);
    this.formData.append('id_allafirma', id_allafirma);
    return this.httpClient.post(this.url + 'GET_firmatari.php', this.formData);
  }

  public AddValidazioneOperatori(listaOperatori, id_documento, id_allafirma) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('listaOperatori', JSON.stringify(listaOperatori));
    this.formData.append('id_documento', id_documento);
    this.formData.append('id_alla_firma', id_allafirma);
    return this.httpClient.post(this.url + 'ADD_validazione_operatori.php', this.formData);
  }

  public DeleteValidazioneOperatori(listaOperatori, id_documento, id_allafirma) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('listaOperatori', JSON.stringify(listaOperatori));
    this.formData.append('id_documento', id_documento);
    this.formData.append('id_allafirma', id_allafirma);
    return this.httpClient.post(this.url + 'DELETE_validazione_operatori.php', this.formData);
  }


  public getMessenger(id_procedura, id_gruppo_procedura) {

    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("procedura", id_procedura);
    this.formData.append("gruppo", id_gruppo_procedura);
    return this.httpClient.post(this.url + 'GET_messenger.php', this.formData);
  }

  public getLetturaMess(id_operatore, id_procedura) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_operatore', id_operatore);
    this.formData.append('id_procedura', id_procedura);
    return this.httpClient.post(this.url + 'GET_messenger_operatore.php', this.formData);
  }

  public AddLetturaMess(id_procedura, id_operatore, id_messenger) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_procedura', id_procedura);
    this.formData.append('id_operatore', id_operatore);
    this.formData.append('id_messenger', id_messenger);
    return this.httpClient.post(this.url + 'ADD_lettura_messenger.php', this.formData);
  }

  public getModelli(documenti_flusso) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('documenti_flusso', JSON.stringify(documenti_flusso));
    return this.httpClient.post(this.url + 'GET_modelli.php', this.formData);
  }

  public DeleteModelli(id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id', id);
    return this.httpClient.post(this.url + 'DELETE_modelli.php', this.formData);
  }



  public getTesto(id, is_template) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);
    this.formData.append("is_template", is_template);

    return this.httpClient.post(this.url + 'GET_testo.php', this.formData);
  }

  public getAziendaUser(id_azienda) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_azienda", id_azienda);

    return this.httpClient.post(this.url + 'GET_Azienda_Utente.php', this.formData);
  }



  public AddSpreadsheetStruttura(documentoflusso, operatore) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("documentoflusso", JSON.stringify(documentoflusso));
    this.formData.append("operatore", operatore);

    return this.httpClient.post(this.url + 'ADD_spreadsheet_struttura.php', this.formData);
  }

  public AddPortalForm(form, id_operatore) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("form", JSON.stringify(form));
    this.formData.append("id_operatore", id_operatore);
    return this.httpClient.post(this.url + 'ADD_portal_form.php', this.formData);
  }

  public AddPortalFormSelect(valori, idform) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("valori", valori);
    this.formData.append("idform", idform);
    return this.httpClient.post(this.url + 'ADD_form_select.php', this.formData);
  }


  public UpdateDocColl(id, documento, id_documento_flusso) {
    this.formData = new FormData();
    this.formData.append('documento', JSON.stringify(documento));
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id', id);
    this.formData.append('id_documento_flusso', id_documento_flusso);
    return this.httpClient.post(this.url + 'UPDATE_doc_coll.php', this.formData);

  }

  public getPortalForm(id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);
    return this.httpClient.post(this.url + 'GET_portal_form.php', this.formData);
  }

  //AddDocumento
  public AddDocumentoFlusso(documentoflusso, file, operatore) {
    this.formData = file;
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("documentoflusso", documentoflusso);
    this.formData.append("operatore", operatore);

    return this.httpClient.post(this.url + 'ADD_documento_flusso.php', this.formData);
  }



  //AddDocumentoColl
  public AddDocumentoFlussoColl(content, content_margin, title, documentoflusso, operatore) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("content", content);
    this.formData.append('content_margin', content_margin);
    this.formData.append("title", title);
    this.formData.append("documentoflusso", JSON.stringify(documentoflusso));
    this.formData.append("operatore", operatore);

    return this.httpClient.post(this.url + 'ADD_documento_flusso_collaborazione.php', this.formData);
  }

  //AddModelli
  public AddModello(id_documento_flusso, file, operatore) {
    this.formData = file;
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_documento_flusso", id_documento_flusso);
    this.formData.append("operatore", operatore);

    return this.httpClient.post(this.url + 'ADD_modello.php', this.formData);
  }

  //UpdateTesto
  public UpdateModelloTesto(id, id_documenti_flusso, content, content_margin, title, operatore) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);
    this.formData.append("id_documenti_flusso", id_documenti_flusso);
    this.formData.append("content", content);
    this.formData.append('content_margin', content_margin);
    this.formData.append("title", title);
    this.formData.append("operatore", operatore);

    return this.httpClient.post(this.url + 'UPDATE_modello_testo.php', this.formData);
  }

  //UpdateDocumento
  public UpdateDocumentoFlusso(documentoflusso, id, operatore) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);
    this.formData.append("doc_flusso", JSON.stringify(documentoflusso));
    this.formData.append("operatore", operatore);

    return this.httpClient.post(this.url + 'UPDATE_documento_flusso.php', this.formData);
  }


  public UpdatePortalForm(valori, id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id', id);
    this.formData.append('aggiuntivi', JSON.stringify(valori));
    return this.httpClient.post(this.url + 'UPDATE_portal_form.php', this.formData);
  }

  public AddFormPortal(id_form, form) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_form', id_form);
    this.formData.append('form', JSON.stringify(form));
    return this.httpClient.post(this.url + 'ADD_form_portal.php', this.formData);
  }

  public getPortalForms() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'GET_portal_forms.php', this.formData);
  }

  public getFormField(id_form, id_campo) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_form', id_form);
    this.formData.append('id_campo', id_campo);
    return this.httpClient.post(this.url + 'GET_form_field.php', this.formData);
  }

  public getFormSelect(id_form, id_campo) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_form', id_form);
    this.formData.append('id_campo', id_campo);
    return this.httpClient.post(this.url + 'GET_form_select.php', this.formData);
  }


  public getUserForm(id_form) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_form', id_form);
    return this.httpClient.post(this.url + 'GET_user_form.php', this.formData);
  }


  public getFormUserRequest(id_operatore, nome_tab) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('nome_tab', nome_tab);
    this.formData.append('id_operatore', id_operatore);
    return this.httpClient.post(this.url + 'GET_form_user_request.php', this.formData);
  }


  public getFormUserRequestDeleted(id_operatore, nome_tab) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('nome_tab', nome_tab);
    this.formData.append('id_operatore', id_operatore);
    return this.httpClient.post(this.url + 'GET_form_user_request_DELETE.php', this.formData);
  }


  public getUserPortalForm(id_form) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_form', id_form);
    return this.httpClient.post(this.url + 'GET_user_portal_form.php', this.formData);
  }

  public getFormPortal() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'GET_form_portal.php', this.formData);
  }

  public getFormDispatcher(id_form, id_operatore) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_form', id_form);
    this.formData.append('id_operatore', id_operatore);
    return this.httpClient.post(this.url + 'GET_form_dispatcher.php', this.formData);
  }


  public AddFormGateway(id_form, id_field, form) {

    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_form', id_form);
    this.formData.append('id_field', id_field);
    this.formData.append('form', JSON.stringify(form));
    return this.httpClient.post(this.url + 'ADD_form_gateway.php', this.formData);
  }

  public AddFormGatewaySelect(id_form, id_field) {
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_form', id_form);
    this.formData.append('id_field', id_field);
    return this.httpClient.post(this.url + 'ADD_form_gateway_select.php', this.formData);
  }

  public AddFormGatewayBoolean(id_form, id_field) {
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_form', id_form);
    this.formData.append('id_field', id_field);
    return this.httpClient.post(this.url + 'ADD_form_gateway_boolean.php', this.formData);
  }


  public CreateForm(id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_form', id);
    return this.httpClient.post(this.url + 'CREATE_portal_form.php', this.formData);
  }

  public UnCreateForm(id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_form', id);
    return this.httpClient.post(this.url + 'UNCREATE_portal_form.php', this.formData);
  }


  public DeleteForm_old(id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_form', id);
    return this.httpClient.post(this.url + 'DELETE_form_portal.php', this.formData);
  }


  public DeleteUserForm(id, nome_tab) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id', id);
    this.formData.append('nome_tab', nome_tab);
    return this.httpClient.post(this.url + 'DELETE_user_form.php', this.formData);
  }

  public RestoreUserForm(id, nome_tab) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id', id);
    this.formData.append('nome_tab', nome_tab);
    return this.httpClient.post(this.url + 'RESTORE_user_form.php', this.formData);
  }

  public GetUserPortalFormView(id, id_user, nome_tab) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id', id);
    this.formData.append('id_operatore', id_user);
    this.formData.append('nome_tab', nome_tab);
    return this.httpClient.post(this.url + 'GET_user_portal_form_view.php', this.formData);
  }

  public GetUserPortalFormViewFields(id, id_campo, nome_tab, field) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id', id);
    this.formData.append('id_campo', id_campo);
    this.formData.append('nome_tab', nome_tab);
    this.formData.append('field', field);
    return this.httpClient.post(this.url + 'GET_user_portal_form_view_fields.php', this.formData);
  }

  public addWorkflowNew(steps, id_flusso) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_flusso", id_flusso);
    this.formData.append("steps", JSON.stringify(steps));

    return this.httpClient.post(this.url + 'ADD_workflow_new.php', this.formData);
  }

  public getGatewayStep(form) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("form", form);

    return this.httpClient.post(this.url + 'GET_gateway_step.php', this.formData);
  }




  public getMilestoneDoc(id_doc, id_procedura) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_doc", id_doc);
    this.formData.append("id_procedura", id_procedura);

    return this.httpClient.post(this.url + 'GET_milestone_doc.php', this.formData);
  }

  public getMilestoneForm(id_form, id_procedura) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_form", id_form);
    this.formData.append("id_procedura", id_procedura);

    return this.httpClient.post(this.url + 'GET_milestone_form.php', this.formData);
  }

  public DeleteFascicolo(id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'DELETE_fascicolo.php', this.formData);
  }

  public AddFascicolo(fascicolo, id_fascicolo_padre, id_procedura) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_fascicolo_padre", id_fascicolo_padre);
    this.formData.append("id_procedura", id_procedura);
    this.formData.append("fascicolo", JSON.stringify(fascicolo));

    return this.httpClient.post(this.url + 'ADD_fascicolo.php', this.formData);
  }



  public getSingleFascicolo(id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'GET_single_fascicolo.php', this.formData);

  }

  public UpdateFascicolo(id, fascicolo, id_fascicolo_padre, id_procedura) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);
    this.formData.append("id_fascicolo_padre", id_fascicolo_padre);
    this.formData.append("id_procedura", id_procedura);
    this.formData.append("fascicolo", JSON.stringify(fascicolo));

    return this.httpClient.post(this.url + 'UPDATE_fascicolo.php', this.formData);
  }

  public GetFascicoloLiv0(id_user) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_user", id_user);

    return this.httpClient.post(this.url + 'GET_fascicolo_liv0.php', this.formData);
  }

  public getFascicoloContenuto(id, id_user) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);
    this.formData.append("id_user", id_user);

    return this.httpClient.post(this.url + 'GET_fascicolo_contenuto.php', this.formData);
  }

  public getProceduraFascicolo(id_procedura, id_workflow, id_user) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_procedura", id_procedura);
    this.formData.append("id_workflow", id_workflow);
    this.formData.append("id_user", id_user);

    return this.httpClient.post(this.url + 'GET_procedura_fascicolo.php', this.formData);
  }

  public fascicolo(id_operatore, id_gruppo_fascicolo) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_operatore', id_operatore);
    this.formData.append('id_gruppo_fascicolo', id_gruppo_fascicolo);
    return this.httpClient.post(this.url + 'GET_users_per_gruppofascicolo.php', this.formData);
  }

  public getFascicoloFromDescr(descrizione, id_user) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("descrizione", descrizione);
    this.formData.append("id_user", id_user);

    return this.httpClient.post(this.url + 'GET_fascicolo_from_descr.php', this.formData);
  }

  public getDocumentiProcedura(id_fascicolo, id_user, orderBy) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_fascicolo", id_fascicolo);
    this.formData.append("id_user", id_user);
    this.formData.append("orderBy", orderBy);

    return this.httpClient.post(this.url + 'GET_documenti_procedura.php', this.formData);
  }

  public EreditaGruppi(id, padre, is_proc, id_procedura) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);
    this.formData.append("padre", padre);
    this.formData.append("is_proc", is_proc);
    this.formData.append("id_procedura", id_procedura);

    return this.httpClient.post(this.url + 'eredita_gruppi.php', this.formData);
  }

  public getAllForms(id_operatore, id_flusso) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_operatore", id_operatore);
    this.formData.append("id_flusso", id_flusso);

    return this.httpClient.post(this.url + 'GET_all_forms.php', this.formData);
  }

  public getFormWorkflow(id: any) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'GET_form_workflow.php', this.formData);
  }

  public getVisibilitaGruppiProcedura(id_procedura, id_workflow) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_procedura", id_procedura);
    this.formData.append("id_workflow", id_workflow);

    return this.httpClient.post(this.url + 'GET_visibilita_gruppiprocedura.php', this.formData);
  }

  public getDocumentoFromDescr(descrizione, indice, id_user) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("descrizione", descrizione);
    this.formData.append("indice", indice);
    this.formData.append("id_user", id_user);

    return this.httpClient.post(this.url + 'GET_documento_from_descr.php', this.formData);
  }

  public getGatewayValue(id_form, id_workflow, id_procedura) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_form", id_form);
    this.formData.append("id_workflow", id_workflow);
    this.formData.append("id_procedura", id_procedura);


    return this.httpClient.post(this.url + 'GET_gateway_value.php', this.formData);
  }

  public getStep(id_procedura, gruppo, operatore, start, id_workflow, next_step, next_tipo) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_procedura", id_procedura);
    this.formData.append("gruppo", gruppo);
    this.formData.append("operatore", operatore);
    this.formData.append("start", start);
    this.formData.append("id_workflow", id_workflow);
    this.formData.append("next_step", next_step);
    this.formData.append("next_tipo", next_tipo);

    return this.httpClient.post(this.url + 'GET_step.php', this.formData);
  }

  public getAllFascicoli(id_operatore, azienda, accesso) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_operatore", id_operatore);
    this.formData.append("azienda", azienda);
    this.formData.append("accesso", accesso);
    return this.httpClient.post(this.url + 'GET_all_fascicoli.php', this.formData);
  }


  public getAllGruppi(id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'GET_all_gruppi.php', this.formData);
  }

  public DeleteGruppo(id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'DELETE_gruppo.php', this.formData);
  }

  public getUserPerGruppo(id_operatore, id_gruppo) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_operatore', id_operatore);
    this.formData.append('id_gruppo', id_gruppo);
    return this.httpClient.post(this.url + 'GET_users_per_gruppo.php', this.formData);
  }

  public getFascicoloFromSearch(descrizione, id_user) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("descrizione", descrizione);
    this.formData.append("id_user", id_user);

    return this.httpClient.post(this.url + 'GET_fascicolo_from_search.php', this.formData);
  }

  public getFascioliPerGruppo(id_gruppo) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_gruppo', id_gruppo);
    return this.httpClient.post(this.url + 'GET_fascicoli_per_gruppo.php', this.formData);
  }

  public getFascicoliPrivati(id_operatore) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_operatore', id_operatore);
    return this.httpClient.post(this.url + 'GET_fascicoli_privati.php', this.formData);
  }

  public AddGruppo(id_tipogruppo, nome, id_operatore) {

    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_tipogruppo", id_tipogruppo);
    this.formData.append("nome", nome);
    this.formData.append("id_operatore", id_operatore);

    return this.httpClient.post(this.url + 'ADD_gruppo.php', this.formData);
  }

  public UpdateGruppo(id, id_tipogruppo, nome, id_operatore) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);
    this.formData.append("id_tipo_gruppo", id_tipogruppo);
    this.formData.append("nome", nome);
    this.formData.append("id_operatore", id_operatore);

    return this.httpClient.post(this.url + 'UPDATE_gruppo.php', this.formData);
  }

  public AddGruppiFascicoli(id_gruppo, listaFascicoli) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_gruppo', id_gruppo);
    this.formData.append('listaFascicoli', JSON.stringify(listaFascicoli));
    return this.httpClient.post(this.url + 'ADD_gruppi_fascicoli.php', this.formData);
  }

  public UpdateGruppiFascicoli(id_gruppo, listaFascicoli) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_gruppo', id_gruppo);
    this.formData.append('listaFascicoli', JSON.stringify(listaFascicoli));
    return this.httpClient.post(this.url + 'UPDATE_gruppi_fascicoli.php', this.formData);
  }

  public getProcedurePerGruppo(id_gruppo) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_gruppo', id_gruppo);
    return this.httpClient.post(this.url + 'GET_procedure_per_gruppo.php', this.formData);
  }

  public getProcedurePrivate(id_operatore, id_gruppo) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_operatore', id_operatore);
    this.formData.append('id_gruppo', id_gruppo);

    return this.httpClient.post(this.url + 'GET_procedure_private.php', this.formData);
  }

  public AddGruppiProcedure(id_gruppo, listaProcedure) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_gruppo', id_gruppo);
    this.formData.append('listaProcedure', JSON.stringify(listaProcedure));
    return this.httpClient.post(this.url + 'ADD_gruppi_procedure.php', this.formData);
  }

  public UpdateGruppiProcedure(id_gruppo, listaProcedure) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_gruppo', id_gruppo);
    this.formData.append('listaProcedure', JSON.stringify(listaProcedure));
    return this.httpClient.post(this.url + 'UPDATE_gruppi_procedure.php', this.formData);
  }

  public getAvailableAziende(id_operatore) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_operatore', id_operatore);

    return this.httpClient.post(this.url + 'GET_available_aziende.php', this.formData);
  }

  public getAvailableProcedure(id, azienda, accesso) {

    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);
    this.formData.append("azienda", azienda);
    this.formData.append("accesso", accesso);

    return this.httpClient.post(this.url + 'GET_available_procedure.php', this.formData);
  }


  public UpdateProceduraAccesso(accesso, id) {
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);
    this.formData.append("accesso", JSON.stringify(accesso));

    return this.httpClient.post(this.url + 'UPDATE_procedura_accesso.php', this.formData);
  }

  public UpdateProceduraAzienda(azienda, id) {
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);
    this.formData.append("azienda", JSON.stringify(azienda));

    return this.httpClient.post(this.url + 'UPDATE_procedura_azienda.php', this.formData);
  }

  public getAllGruppiFascicolo(id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'GET_all_gruppi_f.php', this.formData);
  }

  public DeleteGruppoFascicolo(id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'DELETE_gruppo_f.php', this.formData);
  }

  public AddGruppoFascicolo(id_tipogruppo, nome, id_operatore) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_tipogruppo", id_tipogruppo);
    this.formData.append("nome", nome);
    this.formData.append("id_operatore", id_operatore);

    return this.httpClient.post(this.url + 'ADD_gruppo_f.php', this.formData);
  }

  public UpdateGruppoFascicolo(id_gruppo, id_tipogruppo, nome, id_operatore) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id_gruppo);
    this.formData.append("id_tipogruppo", id_tipogruppo);
    this.formData.append("nome", nome);
    this.formData.append("id_operatore", id_operatore);

    return this.httpClient.post(this.url + 'UPDATE_gruppo_f.php', this.formData);
  }

  public getSingleGruppoFascicolo(id: any) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'GET_single_gruppofascicolo.php', this.formData);
  }

  public AddGruppofascicoloOperatori(id_gruppo, listaOperatori) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_gruppo', id_gruppo);
    this.formData.append('listaOperatori', JSON.stringify(listaOperatori));
    return this.httpClient.post(this.url + 'ADD_gruppofascicolo_operatori.php', this.formData);
  }

  public UpdateGruppofascicoloOperatori(id_gruppo, listaOperatori) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_gruppo', id_gruppo);
    this.formData.append('listaOperatori', JSON.stringify(listaOperatori));
    return this.httpClient.post(this.url + 'UPDATE_gruppofascicolo_operatori.php', this.formData);
  }

  public getUserPerGruppofascicolo(id_operatore, id_gruppo_fascicolo) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_operatore', id_operatore);
    this.formData.append('id_gruppo_fascicolo', id_gruppo_fascicolo);
    return this.httpClient.post(this.url + 'GET_users_per_gruppofascicolo.php', this.formData);
  }

  public getAllGruppoFascicoloOperatori(id_gruppo_fascicolo) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_gruppo_fascicolo', id_gruppo_fascicolo);
    return this.httpClient.post(this.url + 'GET_gruppofascicolo_operatori.php', this.formData);
  }

  //
  public exportPdf(documento) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('documento', documento);
    return this.httpClient.post(this.url + 'export_pdf.php', this.formData, { responseType: 'blob' });
  }

  public AddDocColl(documento, id_doc_flusso, doc_file) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_doc_flusso', id_doc_flusso);
    this.formData.append('documento', JSON.stringify(documento));
    this.formData.append('doc_file', doc_file);
    return this.httpClient.post(this.url + 'ADD_documento_coll.php', this.formData);

  }

  public UpdateDocTesto(id, id_operatore, documento, content, content_margin) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id', id);
    this.formData.append('id_operatore', id_operatore);
    this.formData.append('documento', documento);
    this.formData.append('content', content);
    this.formData.append('content_margin', content_margin);

    return this.httpClient.post(this.url + 'UPDATE_doc_testo.php', this.formData);
  }

  //

  public getWorkflowNew(id_flusso) {

    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_flusso", id_flusso);

    return this.httpClient.post(this.url + 'GET_workflow_new.php', this.formData);
  }

  public getWorkflowComplex(id_flusso) {

    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_flusso", id_flusso);

    return this.httpClient.post(this.url + 'GET_workflow_c.php', this.formData);
  }

  public getFormsGateway(forms) {

    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("forms", JSON.stringify(forms));

    return this.httpClient.post(this.url + 'GET_forms_gateway.php', this.formData);
  }



  public getFormGateway(id_form) {

    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_form", id_form);

    return this.httpClient.post(this.url + 'GET_form_gateway.php', this.formData);
  }

  public DeleteFormGateway(id_form) {

    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_form", id_form);

    return this.httpClient.post(this.url + 'DELETE_form_gateway.php', this.formData);
  }

  public getForm(id_form) {

    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_form", id_form);

    return this.httpClient.post(this.url + 'GET_form.php', this.formData);
  }

  public testScanner(file) {
    this.formData = file;
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'test_scanner.php', this.formData);
  }


  public protoScanner(file) {
    this.formData = file;
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'proto_scanner.php', this.formData);
  }

  public getDesktop(id_operatore) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_operatore", id_operatore);

    return this.httpClient.post(this.url + 'GET_procedure_desktop.php', this.formData);
  }

  public getAllUsersStruttura(idStruttura) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("idStruttura", idStruttura);

    return this.httpClient.post(this.url + 'GET_all_users_struttura.php', this.formData);
  }

  public getGruppoLavoro(id_flusso, id_workflow) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_flusso", id_flusso);
    this.formData.append("id_workflow", id_workflow);

    return this.httpClient.post(this.url + 'GET_gruppo_lavoro.php', this.formData);
  }

  public AddGruppoLavoroPratica(id_user, listaOp, id_flusso, id_workflow, firma, controlAtLeastOne, orderCheck) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("id_user", id_user);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('listaOperatori', JSON.stringify(listaOp));
    this.formData.append("id_flusso", id_flusso);
    this.formData.append("id_workflow", id_workflow);
    this.formData.append("to_sign", firma);
    this.formData.append("req_one", controlAtLeastOne);
    this.formData.append("orderCheck", orderCheck);

    return this.httpClient.post(this.url + 'ADD_gruppo_lavoro_pratica.php', this.formData);
  }


  public UpdateGruppoLavoroPratica(id_user, id_gruppo, listaOperatori, id_flusso, id_workflow, firma, controlAtLeastOne, orderCheck) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("id_user", id_user);
    this.formData.append("id_gruppo", id_gruppo);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_flusso", id_flusso);
    this.formData.append("id_workflow", id_workflow);
    this.formData.append('listaOperatori', JSON.stringify(listaOperatori));
    this.formData.append("to_sign", firma);
    this.formData.append("req_one", controlAtLeastOne);
    this.formData.append("orderCheck", orderCheck);

    return this.httpClient.post(this.url + 'UPDATE_gruppo_lavoro_pratica.php', this.formData);
  }

  public getGruppoValidazione(id_flusso, id_workflow) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_flusso", id_flusso);
    this.formData.append("id_workflow", id_workflow);

    return this.httpClient.post(this.url + 'GET_gruppo_validazione.php', this.formData);
  }

  public AddGruppoValidazionePratica(id_user, listaOp, id_flusso, id_workflow, mod, firma, controlAtLeastOne, orderCheck) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("id_user", id_user);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('listaOperatori', JSON.stringify(listaOp));
    this.formData.append("id_flusso", id_flusso);
    this.formData.append("id_workflow", id_workflow);
    this.formData.append("mod", mod);
    this.formData.append("to_sign", firma);
    this.formData.append("req_one", controlAtLeastOne);
    this.formData.append("orderCheck", orderCheck);


    return this.httpClient.post(this.url + 'ADD_gruppo_validazione_pratica.php', this.formData);
  }


  public UpdateGruppoValidazionePratica(id_user, id_gruppo, listaOperatori, id_flusso, id_workflow, mod, firma, controlAtLeastOne, orderCheck) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("id_user", id_user);
    this.formData.append("id_gruppo", id_gruppo);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_flusso", id_flusso);
    this.formData.append("id_workflow", id_workflow);
    this.formData.append('listaOperatori', JSON.stringify(listaOperatori));
    this.formData.append("mod", mod);
    this.formData.append("to_sign", firma);
    this.formData.append("req_one", controlAtLeastOne);
    this.formData.append("orderCheck", orderCheck);

    return this.httpClient.post(this.url + 'UPDATE_gruppo_validazione_pratica.php', this.formData);
  }

  public getFormPerPratica(id_user, id_azienda) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_user", id_user);
    this.formData.append("id_azienda", id_azienda);

    return this.httpClient.post(this.url + 'GET_form_per_pratica.php', this.formData);
  }

  public AddPratica(id_form, id_flusso, id_operatore, nome_tab, form) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_form", id_form);
    this.formData.append("id_flusso", id_flusso);
    this.formData.append("id_operatore", id_operatore);
    this.formData.append("nome_tab", nome_tab);
    this.formData.append('form', JSON.stringify(form));

    return this.httpClient.post(this.url + 'ADD_pratica.php', this.formData);
  }

  public CloseProcedura(id_procedura) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_procedura", id_procedura);

    return this.httpClient.post(this.url + 'CHIUDI_procedura.php', this.formData);
  }

  public getFormValue(id_form, id_procedura) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_form", id_form);
    this.formData.append("id_procedura", id_procedura);

    return this.httpClient.post(this.url + 'GET_form_value.php', this.formData);
  }

  public getPraticheAvviate(id_operatore) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_operatore", id_operatore);

    return this.httpClient.post(this.url + 'GET_pratiche_avviate.php', this.formData);
  }

  public getStartPratica(id_pratica) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_pratica', id_pratica);
    return this.httpClient.post(this.url + 'GET_start_pratica.php', this.formData);
  }

  public getSingleFormUserByPratica(id_form, nome_tab, id_pratica, id_operatore) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_form', id_form);
    this.formData.append('nome_tab', nome_tab);
    this.formData.append('id_pratica', id_pratica);
    this.formData.append('id_operatore', id_operatore);

    return this.httpClient.post(this.url + 'GET_single_form_user_by_pratica.php', this.formData);
  }

  public getFormValuePratica(id_form, id_pratica) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_form", id_form);
    this.formData.append("id_pratica", id_pratica);

    return this.httpClient.post(this.url + 'GET_form_value_pratica.php', this.formData);
  }

  public getGatewayValuePratica(id_form, id_workflow, id_pratica) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_form", id_form);
    this.formData.append("id_workflow", id_workflow);
    this.formData.append("id_pratica", id_pratica);


    return this.httpClient.post(this.url + 'GET_gateway_value_pratica.php', this.formData);
  }

  public getStepPratica(id_pratica, operatore, start, id_workflow, next_step, next_tipo, gruppo) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_pratica", id_pratica);
    this.formData.append("operatore", operatore);
    this.formData.append("start", start);
    this.formData.append("id_workflow", id_workflow);
    this.formData.append("next_step", next_step);
    this.formData.append("next_tipo", next_tipo);
    this.formData.append("gruppo", gruppo);

    return this.httpClient.post(this.url + 'GET_step_pratica.php', this.formData);
  }


  public getPraticheLavora(id_user) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_user", id_user);

    return this.httpClient.post(this.url + 'GET_pratiche_lavora.php', this.formData);
  }

  public getPraticheValida(id_user) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_user", id_user);

    return this.httpClient.post(this.url + 'GET_pratiche_valida.php', this.formData);
  }

  public AddUserForm(tipo_flusso, id_form, id_procedura, id_pratica, id_user, nome_tab, form) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('tipo_flusso', tipo_flusso);
    this.formData.append('id_form', id_form);
    this.formData.append('id_procedura', id_procedura);
    this.formData.append('id_pratica', id_pratica);
    this.formData.append('id_operatore', id_user);
    this.formData.append('nome_tab', nome_tab);
    this.formData.append("form", JSON.stringify(form));

    return this.httpClient.post(this.url + 'ADD_user_form.php', this.formData);
  }

  public getSingleFormUser(tipo_flusso, id_form, nome_tab, id_procedura, id_pratica, id_operatore) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('tipo_flusso', tipo_flusso);
    this.formData.append('id_form', id_form);
    this.formData.append('nome_tab', nome_tab);
    this.formData.append('id_procedura', id_procedura);
    this.formData.append('id_pratica', id_pratica);
    this.formData.append('id_operatore', id_operatore);

    return this.httpClient.post(this.url + 'GET_single_form_user.php', this.formData);
  }

  public UpdateUserForm(tipo_flusso, id_form, id_procedura, id_pratica, id_user, nome_tab, form) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('tipo_flusso', tipo_flusso);
    this.formData.append('id_form', id_form);
    this.formData.append('id_procedura', id_procedura);
    this.formData.append('id_pratica', id_pratica);
    this.formData.append('id_operatore', id_user);
    this.formData.append('nome_tab', nome_tab);
    this.formData.append("form", JSON.stringify(form));

    return this.httpClient.post(this.url + 'UPDATE_user_form.php', this.formData);
  }

  public AddDocCollPratica(documento, id_doc_flusso, doc_file) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_doc_flusso', id_doc_flusso);
    this.formData.append('documento', JSON.stringify(documento));
    this.formData.append('doc_file', doc_file);
    return this.httpClient.post(this.url + 'ADD_documento_coll_pratica.php', this.formData);

  }

  public AddDocPratica(documento, file) {
    this.formData = file;
    this.formData.append('documento', JSON.stringify(documento));
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'ADD_documento_pratica.php', this.formData);

  }

  public getAllDocumentoPratica(id_pratica, id_workflow, id_operatore, gruppo) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_pratica", id_pratica);
    this.formData.append("id_workflow", id_workflow);
    this.formData.append("id_operatore", id_operatore);
    this.formData.append("gruppo", gruppo);

    return this.httpClient.post(this.url + 'GET_all_documento_pratica.php', this.formData);
  }

  public getAllFirmatariPratica(id_pratica, id_workflow, gruppo) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_pratica', id_pratica);
    this.formData.append('id_workflow', id_workflow);
    this.formData.append('gruppo', gruppo);
    return this.httpClient.post(this.url + 'GET_all_firmatari_pratica.php', this.formData);
  }

  public getSingleDocPratica(id_documento) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_documento', id_documento);
    return this.httpClient.post(this.url + 'GET_single_doc_pratica.php', this.formData);
  }

  public UpdateDocPratica(id, upFile, path, documento, file) {
    if (upFile == 1) {
      this.formData = file;
    }
    else {
      this.formData = new FormData();
    }
    this.formData.append('documento', JSON.stringify(documento));
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id', id);
    this.formData.append('upFile', upFile);
    this.formData.append('path', path);
    return this.httpClient.post(this.url + 'UPDATE_doc_pratica.php', this.formData);

  }

  public UpdateDocCollPratica(id, documento, id_documento_flusso) {
    this.formData = new FormData();
    this.formData.append('documento', JSON.stringify(documento));
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id', id);
    this.formData.append('id_documento_flusso', id_documento_flusso);
    return this.httpClient.post(this.url + 'UPDATE_doc_coll_pratica.php', this.formData);

  }

  public UpdatePraticaStep(id_pratica, id_workflow, id_flusso, id_operatore, stato) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_pratica', id_pratica);
    this.formData.append('id_workflow', id_workflow);
    this.formData.append('id_flusso', id_flusso);
    this.formData.append('id_operatore', id_operatore);
    this.formData.append('stato', stato);

    return this.httpClient.post(this.url + 'UPDATE_pratica_step.php', this.formData);

  }

  public ClosePratica(id_pratica) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_pratica", id_pratica);

    return this.httpClient.post(this.url + 'CHIUDI_pratica.php', this.formData);
  }

  public UpdatePraticaFirma(docsFirmati, operatore, pratica, gruppo, flusso, workflow) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('operatore', operatore);
    this.formData.append('docsFirmati', JSON.stringify(docsFirmati));
    this.formData.append('pratica', pratica);
    this.formData.append('gruppo', gruppo);
    this.formData.append('flusso', flusso);
    this.formData.append('workflow', workflow);
    return this.httpClient.post(this.url + 'UPDATE_pratica_firma.php', this.formData);
  }



  //protocollo

  public getPrivileges(user, id, pseudonimo) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("user", user);
    this.formData.append("id", id);
    this.formData.append("pseudonimo", pseudonimo);
    return this.httpClient.post(this.url + 'GET_privileges.php', this.formData);
  }



  public getAllInBox() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'proto_GET_all_inbox.php', this.formData);
  }


  public getSingleInBox(id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);
    return this.httpClient.post(this.url + 'proto_GET_single_inbox.php', this.formData);
  }

  public getAllInBoxDeleted() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'proto_GET_all_inbox_deleted.php', this.formData);
  }

  public DeleteInBox(id) {

    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'proto_DELETE_inbox.php', this.formData);
  }


  public RestoreInBox(id) {

    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'proto_RESTORE_inbox.php', this.formData);
  }

  public AddInbox(inbox) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("inbox", JSON.stringify(inbox));

    return this.httpClient.post(this.url + 'proto_ADD_inbox.php', this.formData);
  }

  public UpdateInbox(inbox, id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("inbox", JSON.stringify(inbox));
    this.formData.append('id', id);
    return this.httpClient.post(this.url + 'proto_UPDATE_inbox.php', this.formData);
  }


  public getAllModalita() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'proto_GET_all_modalita.php', this.formData);
  }

  public DeleteModalita(id) {

    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'proto_DELETE_modalita.php', this.formData);
  }


  public getAllModalitaDeleted() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'proto_GET_all_modalita_deleted.php', this.formData);
  }

  public RestoreModalita(id) {

    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'proto_RESTORE_modalita.php', this.formData);
  }

  public AddModalita(modalita) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("modalita", JSON.stringify(modalita));

    return this.httpClient.post(this.url + 'proto_ADD_modalita.php', this.formData);
  }



  public getSingleModalita(id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);
    return this.httpClient.post(this.url + 'proto_GET_single_modalita.php', this.formData);
  }


  public UpdateModalita(modalita, id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("modalita", JSON.stringify(modalita));
    this.formData.append('id', id);
    return this.httpClient.post(this.url + 'proto_UPDATE_modalita.php', this.formData);
  }




  public getAllProtoTipo() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'proto_GET_all_tipo.php', this.formData);
  }

  public DeleteProtoTipo(id) {

    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'proto_DELETE_tipo.php', this.formData);
  }


  public getAllProtoTipoDeleted() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'proto_GET_all_tipo_deleted.php', this.formData);
  }

  public RestoreProtoTipo(id) {

    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'proto_RESTORE_tipo.php', this.formData);
  }

  public AddProtoTipo(proto_tipo) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("proto_tipo", JSON.stringify(proto_tipo));

    return this.httpClient.post(this.url + 'proto_ADD_tipo.php', this.formData);
  }



  public getSingleProtoTipo(id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);
    return this.httpClient.post(this.url + 'proto_GET_single_tipo.php', this.formData);
  }


  public UpdateProtoTipo(proto_tipo, id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("proto_tipo", JSON.stringify(proto_tipo));
    this.formData.append('id', id);
    return this.httpClient.post(this.url + 'proto_UPDATE_tipo.php', this.formData);
  }


  public getAllTipologiaDocumentazione() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'proto_GET_all_tipologia.php', this.formData);
  }

  public DeleteTipologiaDocumentazione(id) {

    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'proto_DELETE_tipologia.php', this.formData);
  }


  public getAllTipologiaDocumentazioneDeleted() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'proto_GET_all_tipologia_deleted.php', this.formData);
  }

  public RestoreTipologiaDocumentazione(id) {

    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'proto_RESTORE_tipologia.php', this.formData);
  }

  public AddTipologiaDocumentazione(proto_tipologia) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("proto_tipologia", JSON.stringify(proto_tipologia));

    return this.httpClient.post(this.url + 'proto_ADD_tipologia.php', this.formData);
  }



  public getSingleTipologiaDocumentazione(id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);
    return this.httpClient.post(this.url + 'proto_GET_single_tipologia.php', this.formData);
  }


  public UpdateTipologiaDocumentazione(proto_tipologia, id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("proto_tipologia", JSON.stringify(proto_tipologia));
    this.formData.append('id', id);
    return this.httpClient.post(this.url + 'proto_UPDATE_tipologia.php', this.formData);
  }



  public getAllSerie() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'proto_GET_all_serie.php', this.formData);
  }

  public DeleteSerie(id) {

    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'proto_DELETE_serie.php', this.formData);
  }


  public getAllSerieDeleted() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'proto_GET_all_serie_deleted.php', this.formData);
  }

  public RestoreSerie(id) {

    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'proto_RESTORE_serie.php', this.formData);
  }

  public AddSerie(proto_serie) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("proto_serie", JSON.stringify(proto_serie));

    return this.httpClient.post(this.url + 'proto_ADD_serie.php', this.formData);
  }



  public getSingleSerie(id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);
    return this.httpClient.post(this.url + 'proto_GET_single_serie.php', this.formData);
  }


  public UpdateSerie(proto_serie, id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("proto_serie", JSON.stringify(proto_serie));
    this.formData.append('id', id);
    return this.httpClient.post(this.url + 'proto_UPDATE_serie.php', this.formData);
  }


  public getAllTitolario() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'proto_GET_all_titolario.php', this.formData);
  }

  public DeleteTitolario(id) {

    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'proto_DELETE_titolario.php', this.formData);
  }


  public getAllTitolarioDeleted() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'proto_GET_all_titolario_deleted.php', this.formData);
  }

  public RestoreTitolario(id) {

    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'proto_RESTORE_titolario.php', this.formData);
  }

  public AddTitolario(proto_titolario) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("proto_titolario", JSON.stringify(proto_titolario));

    return this.httpClient.post(this.url + 'proto_ADD_titolario.php', this.formData);
  }



  public getSingleTitolario(id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);
    return this.httpClient.post(this.url + 'proto_GET_single_titolario.php', this.formData);
  }


  public UpdateTitolario(proto_titolario, id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("proto_titolario", JSON.stringify(proto_titolario));
    this.formData.append('id', id);
    return this.httpClient.post(this.url + 'proto_UPDATE_titolario.php', this.formData);
  }

  public getIpa(ipa) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("ipa", JSON.stringify(ipa));
    return this.httpClient.post(this.url + 'proto_GET_ipa.php', this.formData);
  }

  public getAllTipoRubrica() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'proto_GET_all_tipo_rubrica.php', this.formData);
  }

  public getAllTipoRubricaDeleted() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'proto_GET_all_tipo_rubrica_deleted.php', this.formData);
  }

  public DeleteTipoRubrica(id) {

    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'proto_DELETE_tipo_rubrica.php', this.formData);
  }

  public AddTipoRubrica(proto_tipo_rubrica) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("proto_tipo_rubrica", JSON.stringify(proto_tipo_rubrica));

    return this.httpClient.post(this.url + 'proto_ADD_tipo_rubrica.php', this.formData);
  }


  public RestoreTipoRubrica(id) {

    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'proto_RESTORE_tipo_rubrica.php', this.formData);
  }

  public getSingleTipoRubrica(id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);
    return this.httpClient.post(this.url + 'proto_GET_single_tipo_rubrica.php', this.formData);
  }

  public UpdateTipoRubrica(proto_tipo_rubrica, id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("proto_tipo_rubrica", JSON.stringify(proto_tipo_rubrica));
    this.formData.append('id', id);
    return this.httpClient.post(this.url + 'proto_UPDATE_tipo_rubrica.php', this.formData);
  }


  public getAllProtoRubrica() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));

    return this.httpClient.post(this.url + 'GET_all_proto_rubrica.php', this.formData);
  }

  public getAllProtoRubricaTipo() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));

    return this.httpClient.post(this.url + 'GET_all_proto_rubrica_tipo.php', this.formData);
  }

  public getAllProtoRubricaContacts(id_rubrica) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_rubrica', id_rubrica);

    return this.httpClient.post(this.url + 'GET_all_proto_rubrica_contacts.php', this.formData);
  }

  public getAllProtoRubricaAddress(id_rubrica) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_rubrica', id_rubrica);

    return this.httpClient.post(this.url + 'GET_all_proto_rubrica_address.php', this.formData);
  }

  public AddProtoRubricaContact(id_rubrica, contatto) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_rubrica', id_rubrica);
    this.formData.append("contatto", JSON.stringify(contatto));

    return this.httpClient.post(this.url + 'ADD_proto_rubrica_contact.php', this.formData);
  }

  public UpdateProtoRubricaContact(id_contatto, id_rubrica, contatto) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_contatto', id_contatto);
    this.formData.append('id_rubrica', id_rubrica);
    this.formData.append("contatto", JSON.stringify(contatto));

    return this.httpClient.post(this.url + 'UPDATE_proto_rubrica_contact.php', this.formData);
  }

  public DeleteProtoRubricaContact(id_contatto) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_contatto', id_contatto);

    return this.httpClient.post(this.url + 'DELETE_proto_rubrica_contact.php', this.formData);
  }

  public getSingleProtoRubricaContact(id_contatto) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_contatto', id_contatto);

    return this.httpClient.post(this.url + 'GET_single_proto_rubrica_contact.php', this.formData);
  }

  public AddProtoRubricaAddress(id_rubrica, indirizzo) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_rubrica', id_rubrica);
    this.formData.append("indirizzo", JSON.stringify(indirizzo));

    return this.httpClient.post(this.url + 'ADD_proto_rubrica_address.php', this.formData);
  }

  public UpdateProtoRubricaAddress(id_indirizzo, id_rubrica, indirizzo) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_indirizzo', id_indirizzo);
    this.formData.append('id_rubrica', id_rubrica);
    this.formData.append("indirizzo", JSON.stringify(indirizzo));

    return this.httpClient.post(this.url + 'UPDATE_proto_rubrica_address.php', this.formData);
  }

  public DeleteProtoRubricaAddress(id_indirizzo) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_indirizzo', id_indirizzo);

    return this.httpClient.post(this.url + 'DELETE_proto_rubrica_address.php', this.formData);
  }

  public getSingleProtoRubricaAddress(id_indirizzo) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_indirizzo', id_indirizzo);

    return this.httpClient.post(this.url + 'GET_single_proto_rubrica_address.php', this.formData);
  }


  public getSingleProtoRubricaAziendeStrutture(id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_rubrica', id);

    return this.httpClient.post(this.url + 'GET_single_proto_rubrica_aziende_strutture.php', this.formData);
  }

  public getSingleProtoRubricaIPAStrutture(IPA) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('IPA', IPA);

    return this.httpClient.post(this.url + 'GET_single_proto_rubrica_IPA_strutture.php', this.formData);
  }

  public getAllProtoRubricaAziende(id_tipo) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_tipo', id_tipo);

    return this.httpClient.post(this.url + 'GET_all_proto_rubrica_aziende.php', this.formData);
  }

  public getAllProtoRubricaAziendeStrutture(id_azienda) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_azienda', id_azienda);

    return this.httpClient.post(this.url + 'GET_all_proto_rubrica_aziende_strutture.php', this.formData);
  }

  public AddProtoRubrica(rubrica) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("rubrica", JSON.stringify(rubrica));

    return this.httpClient.post(this.url + 'ADD_proto_rubrica.php', this.formData);
  }

  public AddProtoRubricaAziende(rubrica_azienda, ente) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('ente', ente);
    this.formData.append("rubrica_azienda", JSON.stringify(rubrica_azienda));

    return this.httpClient.post(this.url + 'ADD_proto_rubrica_aziende.php', this.formData);
  }



  public AddProtoRubricaAziendeStrutture(rubrica_azienda_struttura, id_azienda) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('ente', id_azienda);
    this.formData.append("rubrica_azienda", JSON.stringify(rubrica_azienda_struttura));

    return this.httpClient.post(this.url + 'ADD_proto_rubrica_aziende_strutture.php', this.formData);
  }

  public DeleteProtoRubrica(id_rubrica) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_rubrica", id_rubrica);

    return this.httpClient.post(this.url + 'DELETE_proto_rubrica.php', this.formData);
  }

  public DeleteProtoRubricaAziende(id_azienda) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_azienda", id_azienda);

    return this.httpClient.post(this.url + 'DELETE_proto_rubrica_aziende.php', this.formData);
  }

  public DeleteProtoRubricaStrutture(id) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id", id);

    return this.httpClient.post(this.url + 'DELETE_proto_rubrica_strutture.php', this.formData);
  }

  public getSingleProtoRubrica(id_rubrica) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_rubrica", id_rubrica);

    return this.httpClient.post(this.url + 'GET_single_proto_rubrica.php', this.formData);
  }

  public getAllProtoRubricaPersoneStrutture(id_azienda, id_struttura) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_azienda", id_azienda);
    this.formData.append("id_struttura", id_struttura);
    return this.httpClient.post(this.url + 'GET_all_proto_rubrica_persone_strutture.php', this.formData);
  }

  public getAllProtoRubricaPersoneAzienda(id_azienda) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_azienda", id_azienda);
    return this.httpClient.post(this.url + 'GET_all_proto_rubrica_persone_azienda.php', this.formData);
  }
  public getProtoRubricaIndirizzi(id_rubrica) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_rubrica", id_rubrica);

    return this.httpClient.post(this.url + 'GET_proto_rubrica_indirizzi.php', this.formData);
  }

  public getProtoRubricaContatti(id_rubrica) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_rubrica", id_rubrica);

    return this.httpClient.post(this.url + 'GET_proto_rubrica_contatti.php', this.formData);
  }

  public getSingleProtoRubricaAziende(id_azienda) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_azienda", id_azienda);

    return this.httpClient.post(this.url + 'GET_single_proto_rubrica_aziende.php', this.formData);
  }

  public UpdateProtoRubrica(id_rubrica, rubrica) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_rubrica', id_rubrica);
    this.formData.append("rubrica", JSON.stringify(rubrica));

    return this.httpClient.post(this.url + 'UPDATE_proto_rubrica.php', this.formData);
  }

  public UpdateProtoRubricaAziende(id_azienda, rubrica_azienda) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_azienda', id_azienda);
    this.formData.append("rubrica_azienda", JSON.stringify(rubrica_azienda));

    return this.httpClient.post(this.url + 'UPDATE_proto_rubrica_aziende.php', this.formData);
  }

  public UpdateProtoRubricaAziendeStrutture(id_rubrica, id_azienda, rubrica_struttura) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_struttura', id_rubrica);
    this.formData.append('id_azienda', id_azienda);
    this.formData.append("rubrica_struttura", JSON.stringify(rubrica_struttura));

    return this.httpClient.post(this.url + 'UPDATE_proto_rubrica_aziende_strutture.php', this.formData);
  }

  public DeletePratica(id_pratica) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_pratica', id_pratica);

    return this.httpClient.post(this.url + 'DELETE_pratica.php', this.formData);
  }

  public GetAllCodiceIPA() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));

    return this.httpClient.post(this.url + 'GET_all_codiceIPA.php', this.formData);
  }

  public GetSingleCodiceIPA(id_azienda) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_azienda', id_azienda);

    return this.httpClient.post(this.url + 'GET_single_codiceIPA.php', this.formData);
  }

  public GetSingleCodiceIPAaz(id_azienda) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_azienda', id_azienda);

    return this.httpClient.post(this.url + 'GET_single_codiceIPAaz.php', this.formData);
  }

  public GetSingleCodiceIPAstrutturerubrica(id_azienda) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_azienda', id_azienda);

    return this.httpClient.post(this.url + 'GET_single_codiceIPA_AOO_byIDrubrica.php', this.formData);
  }


  public GetSingleCodiceIPAbyID(id_azienda) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_azienda', id_azienda);

    return this.httpClient.post(this.url + 'GET_single_codiceIPA_byID.php', this.formData);
  }

  public GetSingleCodiceIPAbyIDrubrica(id_azienda) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_azienda', id_azienda);

    return this.httpClient.post(this.url + 'GET_single_codiceIPA_byIDrubrica.php', this.formData);
  }

  public GetSingleCodiceIPAAOObyID(id_azienda) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_azienda', id_azienda);

    return this.httpClient.post(this.url + 'GET_single_codiceIPA_AOO_byID.php', this.formData);
  }

  public GetAllComuniIstat() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'GET_all_comuni_istat.php', this.formData);
  }

  public GetAllNazioni() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'GET_all_nazioni.php', this.formData);
  }

  public GetTargaIstat(denominazione) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('denominazione', denominazione);

    return this.httpClient.post(this.url + 'GET_targa_istat_by_comune.php', this.formData);
  }



  public getPseudo(id_operatore, cf_operatore, user, nome, cognome, tipo_operatore, accesso, azienda, id_azienda, pseudonimo) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_operatore', id_operatore);
    this.formData.append('cf_operatore', cf_operatore);
    this.formData.append('user', user);
    this.formData.append('nome', nome);
    this.formData.append('cognome', cognome);
    this.formData.append('tipo_operatore', tipo_operatore);
    this.formData.append('accesso', accesso);
    this.formData.append('azienda', azienda);
    this.formData.append('id_azienda', id_azienda);
    this.formData.append('pseudonimo', pseudonimo);

    return this.httpClient.post(this.url + 'GET_pseudo.php', this.formData);
  }

  public AddPseudo(id_operatore) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append('id_operatore', id_operatore);

    return this.httpClient.post(this.url + 'ADD_pseudo.php', this.formData);
  }

  public getAllNazioni(){
    this.formData = new FormData();
    this.formData.append('apiKey',this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url+'GET_all_nazioni.php',this.formData);
  }

  /* NUOVA GESTIONE FORM */
  public AddForm(form, id_operatore) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("form", JSON.stringify(form));
    this.formData.append("id_operatore", id_operatore);
    return this.httpClient.post(this.url + 'ADD_form.php', this.formData);
  }

  public getForms() {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    return this.httpClient.post(this.url + 'GET_forms.php', this.formData);
  }

  public UpdateForm(id,attivo) {
    //attiva-disattiva form
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_form', id);
    this.formData.append("attivo", attivo);
    return this.httpClient.post(this.url + 'UPDATE_form.php', this.formData);
  }

  public DeleteForm(id, id_flusso, steps_to_delete) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_form', id);
    this.formData.append('id_flusso', id_flusso);
    this.formData.append('steps_to_delete', JSON.stringify(steps_to_delete));
    
    return this.httpClient.post(this.url + 'DELETE_form.php', this.formData);
  }

  public getSingleForm(id_form) {

    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append("id_form", id_form);

    return this.httpClient.post(this.url + 'GET_single_form.php', this.formData);
  }

  public AddGateway(id_form, id_field, definizione) {

    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_form', id_form);
    this.formData.append('id_field', id_field);
    this.formData.append('definizione', JSON.stringify(definizione));

    return this.httpClient.post(this.url + 'ADD_gateway.php', this.formData);
  }

  public UpdateGateway(id_form, id_field, id_flusso, definizione, steps_to_delete) {

    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_form', id_form);
    this.formData.append('id_field', id_field);
    this.formData.append('id_flusso', id_flusso);
    this.formData.append('definizione', JSON.stringify(definizione));
    this.formData.append('steps_to_delete', JSON.stringify(steps_to_delete));

    return this.httpClient.post(this.url + 'UPDATE_gateway.php', this.formData);
  }

  public getAllNextStep(id_flusso, id_item, tipo_item) {

    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_flusso', id_flusso);
    this.formData.append('id_item', id_item);
    this.formData.append('tipo_item', tipo_item);

    return this.httpClient.post(this.url + 'GET_all_next_step.php', this.formData);
  }

  public deleteWorkflowStep(steps_to_delete) {

    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('steps_to_delete', JSON.stringify(steps_to_delete));

    return this.httpClient.post(this.url + 'DELETE_workflow_step.php', this.formData);
  }

  public UpdateFormAccess(id_flusso, id_workflow, pubblico, delete_gruppo){
    //this.id_flusso, this.id_workflow, this.public, 1
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('id_flusso', id_flusso);
    this.formData.append('id_workflow', id_workflow);
    this.formData.append('pubblico', pubblico);
    this.formData.append('delete_gruppo', delete_gruppo);/* vale 1 in caso di gruppo già esistente per quello step di workflow */

    return this.httpClient.post(this.url + 'UPDATE_form_access.php', this.formData);
  }

  public AddTempiPratica(form, operatore) {
    this.formData = new FormData();
    this.formData.append("apiKey", this.API_KEY);
    this.formData.append("localStorage", JSON.stringify(this.readLocalStorage()));
    this.formData.append('tempi', JSON.stringify(form));
    this.formData.append('operatore', operatore);
    return this.httpClient.post(this.url + 'ADD_tempi_pratica.php', this.formData);
  }
}