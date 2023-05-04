/**
 * in questo caso il template è troppo complesso per essere gestito con aleph-table
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { HttpClient } from '@angular/common/http';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { faUserSlash, faDownload } from '@fortawesome/free-solid-svg-icons';
import { faFileExcel, faFileWord, faFileUpload} from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { NavigationExtras } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSort} from '@angular/material/sort';



@Component({
  selector: 'app-documenti',
  templateUrl: './documenti.component.html',
  styleUrls: ['./documenti.component.css']
})
export class DocumentiComponent implements OnInit {

  router: Router;
  faEye = faEye;
  faUserEdit = faUserEdit;
  faUserSlash = faUserSlash;
  faDownload = faDownload;
  faFileExcel = faFileExcel;
  faFileWord = faFileWord;
  operatore;
  tipo_op;
  data: any;
  dtOptions: any = {};
  dati: any;
  faEdit = faEdit;
  faTrash = faTrash;
  faFileUpload = faFileUpload;
  workflow;
  documenti_flusso;
  models;
  dataSource;
  columnsToDisplay: string[] = ['nome_doc', 'tipo_doc', 'modello', 'azioni'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  refresha() {

    this.apiService.getAllDocumenti(this.operatore).subscribe((data: any) => {
      if (data != null) {
        this.data = data;


        this.documenti_flusso = this.data.map(x => x.id);
        this.apiService.getModelli(this.documenti_flusso).subscribe((dati) => {
          this.models = dati;
          for (let i = 0; i < this.data.length; i++) {
            this.data[i].modelli = this.models.filter(x => x.id_documenti_flusso == this.data[i].id);
          }
          this.dataSource = new MatTableDataSource(this.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.paginator._intl.itemsPerPageLabel = 'Risultati per pagina';

        }, error => console.error(error));
      }
    });
  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  constructor(private http: HttpClient, private apiService: ApiService) {
    //get request

    this.operatore = JSON.parse(localStorage.getItem('ID'));
    this.tipo_op = JSON.parse(localStorage.getItem('tipo_op'));

    this.apiService.getAllDocumenti(this.operatore).subscribe((data) => {

      if (data != null) {
        this.data = data;


        this.documenti_flusso = this.data.map(x => x.id);
        this.apiService.getModelli(this.documenti_flusso).subscribe((dati) => {
          this.models = dati;
          for (let i = 0; i < this.data.length; i++) {
            this.data[i].modelli = this.models.filter(x => x.id_documenti_flusso == this.data[i].id);
          }
          this.dataSource = new MatTableDataSource(this.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.paginator._intl.itemsPerPageLabel = 'Risultati per pagina';

        }, error => console.error(error));
      }
    });


  }

  downloadFile(path): void {
    this.apiService.downloadDocumento(path).subscribe(data => {
      let blob = new Blob([data], { type: data.type });
      var fileURL = URL.createObjectURL(blob);
      window.open(fileURL);
    });
  }

  cancella(id, nome) {
    if (confirm("Stai per eliminare " + nome)) {

      this.workflow = [];

      this.apiService.getWorkflowDocumentoFlusso(id).subscribe((dati) => {
        for (let el in dati) {
          this.workflow[el] = dati[el].id;
        }

        if (this.workflow.length == 0) {
          this.apiService.DeleteDocumentoFlusso(id).subscribe((dati) => {
            if (dati['Esito'] == 'si') { alert('Operazione eseguita con successo'); }
            else { alert('Qualcosa è andato storto!'); }
            this.refresha();
          });
        }
        else {
          alert('Non puoi eliminare questa tipologia documentale; esistono workflow ad essa associati');
          let navigationExtras: NavigationExtras = {
            queryParams: { 'id_documento_flusso': id }
          };
          //COMPLETA this.router.navigate(['/...'], navigationExtras);        
        }


      });
    }
  }

  ngOnInit() {


  }
}
