import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder } from '@angular/forms';
import { ApiprotoService } from 'src/app/apiproto.service';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-protocollo-view',
  templateUrl: './protocollo-view.component.html',
  styleUrls: ['./protocollo-view.component.css']
})
export class ProtocolloViewComponent implements OnInit {

  flusso;
  dataproto;
  datacorrispondenti;
  datacorrispondentiassegnatari;
  datacorrispondentiinterni;
  datacorrispondenticopiac;
  datadocs;
  ccpresenti = "no";
  card_proto = "visibile";
  hash_proto;
  token;
  zip = "no";
  urlzip;
  listIcon = ['pdf', 'png', 'ppt', 'txt', 'xml', 'jpg', 'doc', 'docx'];

  constructor(private http: HttpClient, private apiService: ApiService, private apiprotoService: ApiprotoService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer) {

    this.route.queryParams.subscribe(
      params => {
        this.token = params['id'];
      }
    )

    this.apiprotoService.UseToken(this.token).subscribe((data: any) => {
        this.apiprotoService.getProtocollo(data.valore).subscribe((dataproto: any) => {
          this.dataproto = dataproto;

          for (let i = 0; i < this.dataproto.length; i++) {
            this.flusso = this.dataproto[i].flusso;
            //funzione uguale per tutti i flussi di estrazione documenti

            this.apiprotoService.getDocs(this.dataproto[i].id).subscribe((datadocs: any) => {
              this.datadocs = datadocs;
              this.datadocs.forEach(element => {
                if (this.listIcon.indexOf(element.estensione) == -1) {
                  element.estensione_icon = 'file';
                } else {
                  element.estensione_icon = element.estensione;
                }
              });
            });

            //ora tutte le chiamate differenziate per flusso per ricavare mittenti e destinatari

            if (this.flusso == "Ingresso") {
              this.apiprotoService.getCorrispondenti(this.dataproto[i].mittente).subscribe((datacorrispondenti: any) => {
                this.datacorrispondenti = datacorrispondenti;
              });

              this.apiprotoService.getAssegnatari(this.dataproto[i].assegnatari).subscribe((datacorrispondentiassegnatari: any) => {
                this.datacorrispondentiassegnatari = datacorrispondentiassegnatari;
              });

              this.apiprotoService.getInterni(this.dataproto[i].destinatari).subscribe((datacorrispondentiinterni: any) => {
                this.datacorrispondentiinterni = datacorrispondentiinterni;
              });

              this.apiprotoService.getCopiaC(this.dataproto[i].cc).subscribe((datacorrispondenticopiac: any) => {
                this.ccpresenti = "si";
                this.datacorrispondenticopiac = datacorrispondenticopiac;
              });

            }

            if (this.flusso == "Uscita") {
              this.apiprotoService.getCorrispondenti(this.dataproto[i].destinatari).subscribe((datacorrispondenti: any) => {
                this.datacorrispondenti = datacorrispondenti;
              });

              this.apiprotoService.getAssegnatari(this.dataproto[i].assegnatari).subscribe((datacorrispondentiassegnatari: any) => {
                this.datacorrispondentiassegnatari = datacorrispondentiassegnatari;
              });

              this.apiprotoService.getInterni(this.dataproto[i].mittente).subscribe((datacorrispondentiinterni: any) => {
                this.datacorrispondentiinterni = datacorrispondentiinterni;
              });

              this.apiprotoService.getCopiaC(this.dataproto[i].cc).subscribe((datacorrispondenticopiac: any) => {
                this.ccpresenti = "si";
                this.datacorrispondenticopiac = datacorrispondenticopiac;
              });

            }

            if (this.flusso == "Interno") {
              this.apiprotoService.getInterni(this.dataproto[i].destinatari).subscribe((datacorrispondenti: any) => {
                this.datacorrispondenti = datacorrispondenti;
              });

              this.apiprotoService.getInterni(this.dataproto[i].assegnatari).subscribe((datacorrispondentiassegnatari: any) => {
                this.datacorrispondentiassegnatari = datacorrispondentiassegnatari;
              });

              this.apiprotoService.getInterni(this.dataproto[i].mittente).subscribe((datacorrispondentiinterni: any) => {
                this.datacorrispondentiinterni = datacorrispondentiinterni;
              });

              this.apiprotoService.getCopiaC(this.dataproto[i].cc).subscribe((datacorrispondenticopiac: any) => {
                this.ccpresenti = "si";
                this.datacorrispondenticopiac = datacorrispondenticopiac;
              });

            }

          }
        });
      });
    }


  Scarica() {
      this.apiprotoService.zipDocs(this.hash_proto).subscribe((datazip: any) => {
        this.urlzip = datazip;
        this.zip = "si";
      })
    }
  
  ngOnInit() {
    }

  back(){
      this.router.navigate(['protocolliview']);
    }

  downloadFile(token): void {
      /* this.apiService.downloadDocumento(path).subscribe(data => {
        let blob = new Blob([data], { type: data.type });
        var fileURL = URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      }); */
      this.apiprotoService.downloadProtoDocs(token).subscribe(data => {
      let blob = new Blob([data], { type: data.type });
      var fileURL = URL.createObjectURL(blob);
      window.open(fileURL, '_blank');
    }); 
  }


}
