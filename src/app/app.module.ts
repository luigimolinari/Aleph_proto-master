import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatStepperModule } from '@angular/material/stepper';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { OperatoriComponent } from './operatori/operatori.component';
import { BackgroundComponent } from './background/background.component';
import { DataTablesModule } from 'angular-datatables';
import { OperatoriNewComponent } from './operatori/operatori-new/operatori-new.component';
import { AmministrazioneComponent } from './amministrazione/amministrazione.component';
import { OperatoreViewComponent } from './operatori/operatore-view/operatore-view.component';
import { OperatoreEditComponent } from './operatori/operatore-edit/operatore-edit.component';
import { AddoperatoreComponent } from './operatori/addoperatore/addoperatore.component';
import { AziendeComponent } from './strutture/aziende/aziende.component';
import { AziendaEditComponent } from './strutture/azienda-edit/azienda-edit.component';
import { AziendaViewComponent } from './strutture/azienda-view/azienda-view.component';
import { TipiComponent } from './strutture/tipi/tipi.component';
import { TipiEditComponent } from './strutture/tipi-edit/tipi-edit.component';
import { AddTipoComponent } from './strutture/add-tipo/add-tipo.component';
import { AddAziendaComponent } from './strutture/add-azienda/add-azienda.component';
import { TipoGruppoComponent } from './strutture/tipo-gruppo/tipo-gruppo.component';
import { AddTipogruppoComponent } from './strutture/add-tipogruppo/add-tipogruppo.component';
import { TipoGruppoEditComponent } from './strutture/tipo-gruppo-edit/tipo-gruppo-edit.component';
import { FlussiComponent } from './flussi/flussi/flussi.component';
import { FlussiViewComponent } from './flussi/flussi-view/flussi-view.component';
import { FlussiAddComponent } from './flussi/flussi-add/flussi-add.component';
import { FlussiEditComponent } from './flussi/flussi-edit/flussi-edit.component';
import { MatSliderModule } from '@angular/material/slider';
import { DocumentiFlussoComponent } from './flussi/documenti-flusso/documenti-flusso.component';
import { DocumentiComponent } from './flussi/documenti/documenti.component';
import { DocumentiAddComponent } from './flussi/documenti-add/documenti-add.component';
import { DocumentiEditComponent } from './flussi/documenti-edit/documenti-edit.component';
import { DiagnosticComponent } from './strutture/diagnostic/diagnostic.component';
import { DocumentiSelectComponent } from './flussi/documenti-select/documenti-select.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FlussiSelectComponent } from './flussi/flussi-select/flussi-select.component';
import { AddDocumentoComponent } from './flussi/add-documento/add-documento.component';
import { WorkflowAddComponent } from './flussi/workflow-add/workflow-add.component';
import { DiagnosticFlussiComponent } from './flussi/diagnostic-flussi/diagnostic-flussi.component';
import { AddProceduraComponent } from './procedure/add-procedura/add-procedura.component';
import { ProcedureComponent } from './procedure/procedure/procedure.component';
import { RupSelectComponent } from './procedure/rup-select/rup-select.component';
import { DescrizioneComponent } from './procedure/descrizione/descrizione.component';
import { ProcedureViewComponent } from './procedure/procedure-view/procedure-view.component';
import { FlussoViewComponent } from './flussi/flusso-view/flusso-view.component';
import { GruppiAddComponent } from './procedure/gruppi-add/gruppi-add.component';
import { GruppiComponent } from './procedure/gruppi/gruppi.component';
import { GruppiEditComponent } from './procedure/gruppi-edit/gruppi-edit.component';
import { SelectProcedureComponent } from './fascicoli/select-procedure/select-procedure.component';
import { StruttureComponent } from './strutture/strutture/strutture.component';
import { AddStrutturaComponent } from './strutture/add-struttura/add-struttura.component';
import { StrutturaEditComponent } from './strutture/struttura-edit/struttura-edit.component';
import { PostTestComponent } from './post-test/post-test.component';
import { StrutturaViewComponent } from './strutture/struttura-view/struttura-view.component';
import { OrgChartModule } from 'angular-org-chart';
import { ProceduraSelectComponent } from './procedure/visibilita/procedura-select/procedura-select.component';
import { DocumentoflussoSelectComponent } from './procedure/visibilita/documentoflusso-select/documentoflusso-select.component';
import { VisibilitaAddComponent } from './procedure/visibilita/visibilita-add/visibilita-add.component';
import { ProcedureAttiveComponent } from './operativita/procedure-attive/procedure-attive.component';
import { WorkflowProceduraComponent } from './operativita/workflow-procedura/workflow-procedura.component';
import { DocumentiViewComponent } from './operativita/documenti-view/documenti-view.component';
import { EditDocumentoComponent } from './operativita/edit-documento/edit-documento.component';
import { ViewDocumentoComponent } from './operativita/view-documento/view-documento.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatBadgeModule } from '@angular/material/badge';
import { OrganigrammaComponent } from './strutture/organigramma/organigramma.component';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { ToastModule } from 'primeng/toast';
import { PanelModule } from 'primeng/panel';
import { FirmaComponent } from './operativita/firma/firma.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { EditValidazioneComponent } from './operativita/edit-validazione/edit-validazione.component';
import { TipoAttiComponent } from './flussi/tipo-atti/tipo-atti.component';
import { TipoAttiAddComponent } from './flussi/tipo-atti/tipo-atti-add/tipo-atti-add.component';
import { SchedulerComponent } from './scheduler/scheduler/scheduler.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { CommonModule } from '@angular/common';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { Italian } from "flatpickr/dist/l10n/it.js";
import { AddScheduleComponent } from './scheduler/add-schedule/add-schedule.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TipoAttiEditComponent } from './flussi/tipo-atti/tipo-atti-edit/tipo-atti-edit.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { EditorComponent } from './documenti/editor/editor.component'
/* import { TestImapComponent } from './test-imap/test-imap.component'; */
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { GruppiOperatoreComponent } from './procedure/gruppi-operatore/gruppi-operatore.component';
import { PannelloComponent } from './protocollo/pannello/pannello.component';
import { MexDialogComponent } from './operativita/mex-dialog/mex-dialog.component';
import { ModelliEditComponent } from './flussi/modelli-edit/modelli-edit.component';
import { FormsComponent } from './portal/forms/forms.component';
import { AddFormComponent } from './portal/add-form/add-form.component';
import { DocumentiCollAddComponent } from './flussi/documenti-coll-add/documenti-coll-add.component';
import { FormSelectComponent } from './portal/form-select/form-select.component';
import { EditModelloComponent } from './operativita/edit-modello/edit-modello.component';
import { FormObbligatoriComponent } from './portal/form-obbligatori/form-obbligatori.component';
import { getItalianPaginatorIntl } from './ita-material-paginator';
import { FormTerminaComponent } from './portal/form-termina/form-termina.component';
import { AlephTableComponent } from './template/aleph-table/aleph-table.component';
import { MatSortModule } from '@angular/material/sort';
import { FormGatewayComponent } from './portal/form-gateway/form-gateway.component';
import { FormAssignGatewayComponent } from './portal/form-assign-gateway/form-assign-gateway.component';
import { WorkflowNewProceduraComponent } from './operativita/workflow-new-procedura/workflow-new-procedura.component';
import { FormAssignGatewaySelectComponent } from './portal/form-assign-gateway-select/form-assign-gateway-select.component';
import { PortalFormComponent } from './portal/users/portal-form/portal-form.component';
import { UserformsComponent } from './portal/users/userforms/userforms.component';
import { FlexModule } from '@angular/flex-layout';
import { PortalDispatcherComponent } from './portal/users/portal-dispatcher/portal-dispatcher.component';
import { UserRequestComponent } from './portal/users/user-request/user-request.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FascicoliViewComponent } from './procedure/fascicoli/fascicoli-view/fascicoli-view.component';
import { FascicoliAddComponent } from './procedure/fascicoli/fascicoli-add/fascicoli-add.component';
import { FascicoliEditComponent } from './procedure/fascicoli/fascicoli-edit/fascicoli-edit.component';
import { FascicoliComponent } from './procedure/fascicoli/fascicoli.component';
import { ArchivioComponent } from './archivio/archivio.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTreeModule } from '@angular/material/tree';
import { GruppiFascicoliComponent } from './procedure/gruppi-fascicoli/gruppi-fascicoli.component';
import { GruppiProceduraComponent } from './procedure/gruppi-procedura/gruppi-procedura.component';
import { UserRequestViewComponent } from './portal/users/user-request-view/user-request-view.component';
import { UserRequestDeletedComponent } from './portal/users/user-request-deleted/user-request-deleted.component';
import { AddSpreadsheetComponent } from './documenti/spreadsheet/add-spreadsheet/add-spreadsheet.component';
import { SpreadsheetComponent } from './documenti/spreadsheet/spreadsheet/spreadsheet.component';
import { ExcelViewerComponent } from './documenti/spreadsheet/excel-viewer/excel-viewer.component';
import { IgxExcelModule } from 'igniteui-angular-excel';
import { IgxSpreadsheetModule } from 'igniteui-angular-spreadsheet';
import { SaveWorkbookComponent } from './documenti/spreadsheet/excel-viewer/save-workbook/save-workbook.component';
import { FormsSelectComponent } from './flussi/forms-select/forms-select.component';
import { ViewGruppiPraticaComponent } from './flussi/view-gruppi-pratica/view-gruppi-pratica.component';
import { SpreadsheetDocComponent } from './documenti/spreadsheet/spreadsheet-doc/spreadsheet-doc.component';
import { GruppoLavoroPraticaComponent } from './flussi/gruppo-lavoro-pratica/gruppo-lavoro-pratica.component';
import { GruppoValidazionePraticaComponent } from './flussi/gruppo-validazione-pratica/gruppo-validazione-pratica.component';
import { WorkflowCAddComponent } from './flussi/workflow-c-add/workflow-c-add.component';
import { ScrivaniaComponent } from './operativita/scrivania/scrivania.component';
import { GestioneScrivaniaComponent } from './operativita/gestione-scrivania/gestione-scrivania.component';
import { ViewFormComponent } from './portal/view-form/view-form.component';
import { NewPraticaComponent } from './operativita/pratica/new-pratica/new-pratica.component';
import { PraticheAvviateComponent } from './operativita/pratica/pratiche-avviate/pratiche-avviate.component';
import { WorkflowPraticaComponent } from './operativita/pratica/workflow-pratica/workflow-pratica.component';
import { PraticheLavoraComponent } from './operativita/pratica/pratiche-lavora/pratiche-lavora.component';
import { PraticheValidaComponent } from './operativita/pratica/pratiche-valida/pratiche-valida.component';
import { AddDocumentoPraticaComponent } from './operativita/pratica/add-documento-pratica/add-documento-pratica.component';
import { EditDocumentoPraticaComponent } from './operativita/pratica/edit-documento-pratica/edit-documento-pratica.component';
import { DocumentiPraticaViewComponent } from './operativita/pratica/documenti-pratica-view/documenti-pratica-view.component';
import { PraticaRequestComponent } from './portal/users/pratica-request/pratica-request.component';
import { SidenavComponent } from './template/sidenav/sidenav.component';
import { VideoConfComponent } from './video-conf/video-conf.component';
import { ScanTestComponent } from './scan-test/scan-test.component';
import { WebcamModule } from 'ngx-webcam';
import { WebcamTestComponent } from './webcam-test/webcam-test.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { EditSpreadsheetComponent } from './documenti/spreadsheet/edit-spreadsheet/edit-spreadsheet.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

//protocollo
import { ProtoAdminComponent } from './protocollo/proto-admin/proto-admin.component';
import { ViewInboxComponent } from './protocollo/view-inbox/view-inbox.component';
import { AddInboxComponent } from './protocollo/add-inbox/add-inbox.component';
import { DeleteInboxComponent } from './protocollo/delete-inbox/delete-inbox.component';
import { EditInboxComponent } from './protocollo/edit-inbox/edit-inbox.component';
import { ViewInboxDeletedComponent } from './protocollo/view-inbox-deleted/view-inbox-deleted.component';
import { AddModalitaComponent } from './protocollo/modalita_trasmissione/add-modalita/add-modalita.component';
import { EditModalitaComponent } from './protocollo/modalita_trasmissione/edit-modalita/edit-modalita.component';
import { ViewModalitaComponent } from './protocollo/modalita_trasmissione/view-modalita/view-modalita.component';
import { ViewModalitaDeletedComponent } from './protocollo/modalita_trasmissione/view-modalita-deleted/view-modalita-deleted.component';
import { IpaViewComponent } from './protocollo/ipa/ipa-view/ipa-view.component';
import { ViewProtoTipoComponent } from './protocollo/proto_tipo/view-proto-tipo/view-proto-tipo.component';
import { ViewProtoTipoDeletedComponent } from './protocollo/proto_tipo/view-proto-tipo-deleted/view-proto-tipo-deleted.component';
import { AddProtoTipoComponent } from './protocollo/proto_tipo/add-proto-tipo/add-proto-tipo.component';
import { EditProtoTipoComponent } from './protocollo/proto_tipo/edit-proto-tipo/edit-proto-tipo.component';
import { ViewSerieComponent } from './protocollo/serie/view-serie/view-serie.component';
import { ViewSerieDeletedComponent } from './protocollo/serie/view-serie-deleted/view-serie-deleted.component';
import { AddSerieComponent } from './protocollo/serie/add-serie/add-serie.component';
import { EditSerieComponent } from './protocollo/serie/edit-serie/edit-serie.component';
import { ViewTipologiaDocumentazioneComponent } from './protocollo/tipologia_documentazione/view-tipologia-documentazione/view-tipologia-documentazione.component';
import { ViewTipologiaDocumentazioneDeletedComponent } from './protocollo/tipologia_documentazione/view-tipologia-documentazione-deleted/view-tipologia-documentazione-deleted.component';
import { AddTipologiaDocumentazioneComponent } from './protocollo/tipologia_documentazione/add-tipologia-documentazione/add-tipologia-documentazione.component';
import { EditTipologiaDocumentazioneComponent } from './protocollo/tipologia_documentazione/edit-tipologia-documentazione/edit-tipologia-documentazione.component';
import { AddTitolarioComponent } from './protocollo/titolario/add-titolario/add-titolario.component';
import { ViewTitolarioComponent } from './protocollo/titolario/view-titolario/view-titolario.component';
import { ViewTitolarioDeletedComponent } from './protocollo/titolario/view-titolario-deleted/view-titolario-deleted.component';
import { EditTitolarioComponent } from './protocollo/titolario/edit-titolario/edit-titolario.component';
import { ViewTipoRubricaComponent } from './protocollo/rubrica/view-tipo-rubrica/view-tipo-rubrica.component';
import { ViewTipoRubricaDeletedComponent } from './protocollo/rubrica/view-tipo-rubrica-deleted/view-tipo-rubrica-deleted.component';
import { AddTipoRubricaComponent } from './protocollo/rubrica/add-tipo-rubrica/add-tipo-rubrica.component';
import { EditTipoRubricaComponent } from './protocollo/rubrica/edit-tipo-rubrica/edit-tipo-rubrica.component';
import { AddProtocolloComponent } from './protocollo/protocollo/add-protocollo/add-protocollo.component';
import { AddressViewComponent } from './rubrica/address/address-view/address-view.component';
import { AddressEditComponent } from './rubrica/address/address-edit/address-edit.component';
import { AddressAddComponent } from './rubrica/address/address-add/address-add.component';
import { ContactAddComponent } from './rubrica/contact/contact-add/contact-add.component';
import { ContactEditComponent } from './rubrica/contact/contact-edit/contact-edit.component';
import { ContactViewComponent } from './rubrica/contact/contact-view/contact-view.component';
import { RubricaAddComponent } from './rubrica/rubrica-add/rubrica-add.component';
import { RubricaViewComponent } from './rubrica/rubrica-view/rubrica-view.component';
import { RubricaAziendaAddComponent } from './rubrica/rubrica-azienda-add/rubrica-azienda-add.component';
import { RubricaDispatcher1Component } from './rubrica/rubrica-dispatcher1/rubrica-dispatcher1.component';
import { RubricaDispatcher2Component } from './rubrica/rubrica-dispatcher2/rubrica-dispatcher2.component';
import { RubricaEditComponent } from './rubrica/rubrica-edit/rubrica-edit.component';
import { RubricaAziendaEditComponent } from './rubrica/rubrica-azienda-edit/rubrica-azienda-edit.component';
import { EtichetteComponent } from './protocollo/etichette/etichette.component';
import { AddRiservatezzaComponent } from './protocollo/riservatezza/add-riservatezza/add-riservatezza.component';
import { EditRiservatezzaComponent } from './protocollo/riservatezza/edit-riservatezza/edit-riservatezza.component';
import { ViewRiservatezzaComponent } from './protocollo/riservatezza/view-riservatezza/view-riservatezza.component';
import { ViewRiservatezzaDeletedComponent } from './protocollo/riservatezza/view-riservatezza-deleted/view-riservatezza-deleted.component';
import { DestinatariAddComponent } from './protocollo/destinatari/destinatari-add/destinatari-add.component';
import { DestinatariEditComponent } from './protocollo/destinatari/destinatari-edit/destinatari-edit.component';
import { ViewDestinatariComponent } from './protocollo/destinatari/view-destinatari/view-destinatari.component';
import { ViewDestinatariDeletedComponent } from './protocollo/destinatari/view-destinatari-deleted/view-destinatari-deleted.component';
import { TemplateMailComponent } from './protocollo/template-mail/template-mail.component';
import { ScanComponent } from './scan/scan.component';
import { ProtoScanComponent } from './protocollo/proto-scan/proto-scan.component';
import { WebBuilderComponent } from './web-builder/web-builder.component';
import { AddContattiComponent } from './protocollo/rubrica/add-contatti/add-contatti.component';
import { RubricaStrutturaAddComponent } from './rubrica/rubrica-struttura-add/rubrica-struttura-add.component';
import { RubricaStrutturaEditComponent } from './rubrica/rubrica-struttura-edit/rubrica-struttura-edit.component';
import { RubricaStrutturaViewComponent } from './rubrica/rubrica-struttura-view/rubrica-struttura-view.component';
import { StrutturaCompleteViewComponent } from './rubrica/struttura-complete-view/struttura-complete-view.component';
import { RubricaItemViewComponent } from './rubrica/rubrica-item-view/rubrica-item-view.component';
import { RubricaAziendaItemViewComponent } from './rubrica/rubrica-azienda-item-view/rubrica-azienda-item-view.component';
import { RubricaPersoneViewComponent } from './rubrica/rubrica-persone-view/rubrica-persone-view.component';
import { ResolveScreenComponent } from './template/resolve-screen/resolve-screen.component';
import { ProtoCloniComponent } from './protocollo/proto-cloni/proto-cloni.component';
import { ProtocolliViewComponent } from './protocollo/protocollo/protocolli-view/protocolli-view.component';
import { ProtocolloViewComponent } from './protocollo/protocollo/protocollo-view/protocollo-view.component';
import { ProtoPecComponent } from './pec/proto-pec/proto-pec.component';
import { WritePecComponent } from './pec/write-pec/write-pec.component';
import { FormAddComponent } from './portal/form-add/form-add.component';
import { FormViewComponent } from './portal/form-view/form-view.component';
import { FormGatewayAssignComponent } from './portal/form-gateway-assign/form-gateway-assign.component';
import { EditFieldComponent } from './portal/edit-field/edit-field.component';
import { AddFieldComponent } from './portal/add-field/add-field.component';
import { TempiFlussoComponent } from './flussi/tempi-flusso/tempi-flusso.component';


const config: SocketIoConfig = { url: 'http://172.29.10.206:4445', options: {} };


registerLocaleData(localeIt);


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    OperatoriComponent,
    BackgroundComponent,
    OperatoriNewComponent,
    AmministrazioneComponent,
    OperatoreViewComponent,
    OperatoreEditComponent,
    AddoperatoreComponent,
    AziendeComponent,
    AziendaEditComponent,
    AziendaViewComponent,
    TipiComponent,
    TipiEditComponent,
    AddTipoComponent,
    AddAziendaComponent,
    TipoGruppoComponent,
    AddTipogruppoComponent,
    TipoGruppoEditComponent,
    FlussiComponent,
    FlussiViewComponent,
    FlussiAddComponent,
    FlussiEditComponent,
    DocumentiFlussoComponent,
    DocumentiComponent,
    DocumentiAddComponent,
    DocumentiEditComponent,
    DiagnosticComponent,
    DocumentiSelectComponent,
    FlussiSelectComponent,
    AddDocumentoComponent,
    WorkflowAddComponent,
    DiagnosticFlussiComponent,
    AddProceduraComponent,
    ProcedureComponent,
    RupSelectComponent,
    DescrizioneComponent,
    ProcedureViewComponent,
    FlussoViewComponent,
    GruppiAddComponent,
    GruppiComponent,
    GruppiEditComponent,
    SelectProcedureComponent,
    StruttureComponent,
    AddStrutturaComponent,
    StrutturaEditComponent,
    PostTestComponent,
    StrutturaViewComponent,
    ProceduraSelectComponent,
    DocumentoflussoSelectComponent,
    VisibilitaAddComponent,
    ProcedureAttiveComponent,
    WorkflowProceduraComponent,
    DocumentiViewComponent,
    EditDocumentoComponent,
    ViewDocumentoComponent,
    OrganigrammaComponent,
    FirmaComponent,
    EditValidazioneComponent,
    TipoAttiComponent,
    TipoAttiAddComponent,
    SchedulerComponent,
    AddScheduleComponent,
    TipoAttiEditComponent,
    EditorComponent,
/*     TestImapComponent, */
    GruppiOperatoreComponent,
    PannelloComponent,
    MexDialogComponent,
    ModelliEditComponent,
    FormsComponent,
    AddFormComponent,
    DocumentiCollAddComponent,
    FormSelectComponent,
    EditModelloComponent,
    FormObbligatoriComponent,
    FormTerminaComponent,
    AlephTableComponent,
    FormGatewayComponent,
    FormAssignGatewayComponent,
    WorkflowNewProceduraComponent,
    FormAssignGatewaySelectComponent,
    PortalFormComponent,
    UserformsComponent,
    PortalDispatcherComponent,
    UserRequestComponent,
    FascicoliViewComponent,
    FascicoliAddComponent,
    FascicoliEditComponent,
    FascicoliComponent,
    ArchivioComponent,
    GruppiProceduraComponent,
    GruppiFascicoliComponent,
    UserRequestViewComponent,
    UserRequestDeletedComponent,
    AddSpreadsheetComponent,
    SpreadsheetComponent,
    ExcelViewerComponent,
    SaveWorkbookComponent,
    FormsSelectComponent,
    SpreadsheetDocComponent,
    EditSpreadsheetComponent,
    ViewGruppiPraticaComponent,
    GruppoLavoroPraticaComponent,
    GruppoValidazionePraticaComponent,
    WorkflowCAddComponent,
    ScrivaniaComponent,
    GestioneScrivaniaComponent,
    ViewFormComponent,
    NewPraticaComponent,
    PraticaRequestComponent,
    PraticheAvviateComponent,
    WorkflowPraticaComponent,
    PraticheLavoraComponent,
    PraticheValidaComponent,
    AddDocumentoPraticaComponent,
    EditDocumentoPraticaComponent,
    DocumentiPraticaViewComponent,
    ViewGruppiPraticaComponent,
    SidenavComponent,
    VideoConfComponent,
    ScanTestComponent,
    WebcamTestComponent,


    //protocollo
    ProtoAdminComponent,
    ViewInboxComponent,
    AddInboxComponent,
    DeleteInboxComponent,
    EditInboxComponent,
    ViewInboxDeletedComponent,
    AddModalitaComponent,
    EditModalitaComponent,
    ViewModalitaComponent,
    ViewModalitaDeletedComponent,
    IpaViewComponent,
    ViewProtoTipoComponent,
    ViewProtoTipoDeletedComponent,
    AddProtoTipoComponent,
    EditProtoTipoComponent,
    ViewSerieComponent,
    ViewSerieDeletedComponent,
    AddSerieComponent,
    EditSerieComponent,
    ViewTipologiaDocumentazioneComponent,
    ViewTipologiaDocumentazioneDeletedComponent,
    AddTipologiaDocumentazioneComponent,
    EditTipologiaDocumentazioneComponent,
    AddTitolarioComponent,
    ViewTitolarioComponent,
    ViewTitolarioDeletedComponent,
    EditTitolarioComponent,
    ViewTipoRubricaComponent,
    ViewTipoRubricaDeletedComponent,
    AddTipoRubricaComponent,
    EditTipoRubricaComponent,
    AddProtocolloComponent,
    AddressViewComponent,
    AddressEditComponent,
    AddressAddComponent,
    ContactEditComponent,
    ContactViewComponent,
    ContactEditComponent,
    RubricaAddComponent,
    ContactAddComponent,
    RubricaViewComponent,
    RubricaAziendaAddComponent,
    RubricaAziendaEditComponent,
    RubricaEditComponent,
    RubricaDispatcher1Component,
    RubricaDispatcher2Component,
    EtichetteComponent,
    AddRiservatezzaComponent,
    EditRiservatezzaComponent,
    ViewRiservatezzaComponent,
    ViewRiservatezzaDeletedComponent,
    DestinatariAddComponent,
    DestinatariEditComponent,
    ViewDestinatariComponent,
    ViewDestinatariDeletedComponent,
    TemplateMailComponent,
    ScanComponent,
    ProtoScanComponent,
    WebBuilderComponent,
    AddContattiComponent,
    RubricaStrutturaAddComponent,
    RubricaStrutturaEditComponent,
    RubricaStrutturaViewComponent,
    StrutturaCompleteViewComponent,
    RubricaItemViewComponent,
    RubricaAziendaItemViewComponent,
    RubricaPersoneViewComponent,
    ResolveScreenComponent,
    ProtoCloniComponent,
    ProtocolliViewComponent,
    ProtocolloViewComponent,
    ProtoPecComponent,
    WritePecComponent,
    FormAddComponent,
    FormViewComponent,
    FormGatewayAssignComponent,
    EditFieldComponent,
    AddFieldComponent,
    TempiFlussoComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DataTablesModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatStepperModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatNativeDateModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatRippleModule,
    MatCheckboxModule,
    OrgChartModule,
    MatTableModule,
    MatCardModule,
    MatSelectModule,
    MatBadgeModule,
    OrganizationChartModule,
    ToastModule,
    PanelModule,
    MatMenuModule,
    MatButtonModule,
    CommonModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    NgbModule,
    NgbModalModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    CKEditorModule,
    MatPaginatorModule,
    MatSortModule,
    FlexModule,
    MatSidenavModule,
    MatListModule,
    MatTreeModule,
    IgxExcelModule,
    IgxSpreadsheetModule,
    SocketIoModule.forRoot(config),
    WebcamModule,
    ImageCropperModule,
    PdfViewerModule,
    NgxExtendedPdfViewerModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getItalianPaginatorIntl() },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
    //,{provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
