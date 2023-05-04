import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { ApiprotoService } from 'src/app/apiproto.service';
import { WindowService } from "./../../window.service";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import jsPDF from 'jspdf';
import { LocalStorageService } from 'src/app/local-storage.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import * as CryptoJS from 'crypto-js';  



@Component({
  selector: 'app-proto-scan',
  templateUrl: './proto-scan.component.html',
  styleUrls: ['./proto-scan.component.css']
})
export class ProtoScanComponent implements OnInit, AfterViewInit {

  @HostListener('window:resize', ['$event'])

  wsImpl;
  ws;
  storedFiles = [];
  toServerFiles = [];
  scandetail_show = false;
  file_data;
  srcData: SafeResourceUrl;
  id_user;
  loggedIn;
  id_enc;
  id;

  encryptSecretKey="dsopifhjsd9p87";
  innerWidth:any;
  mode:any;
  open:any;
  is_full:any;
  marginLeft:any;
  vedi:any = 'scrivania';


  @ViewChild('myCanvas', { static: false }) myCanvas: ElementRef<HTMLCanvasElement>;;
  public context: CanvasRenderingContext2D;

  constructor(private apiprotoService: ApiprotoService, private route: ActivatedRoute, private router: Router, private windowService: WindowService, private sanitizer: DomSanitizer,private localStorageService: LocalStorageService) {

       //responsive sidenav
       this.innerWidth = window.innerWidth;
       this.mode = this.innerWidth > 800 ? 'side' : 'over';
       this.open = this.innerWidth > 800 ? true : false;
       //in costruzione dell'interfaccia, la sidenav è aperta in versione slim
       this.marginLeft = this.open ? '60px' : '0px';

       this.route.queryParams.subscribe(
        params => {
          this.id_enc=params['id'];
        });

        this.id=this.decryptData(this.id_enc);

   }

  ngAfterViewInit(): void {
    //this.context = this.myCanvas.nativeElement.getContext('2d');
  }

  ngOnInit(): void {
    
    this.localStorageService.idLogged.subscribe((nextValue) => {
      this.id_user = nextValue;
      this.loggedIn = (this.id_user == '' || this.id_user == undefined || this.id_user == null)  ? false : true;
    });

    let global_view = this;

    var selDiv = $("#selectedFiles");

    var i = 0;

    this.wsImpl = this.windowService.window.WebSocket;
    this.ws = new this.wsImpl('ws://localhost:8181/');
    console.log(this.ws);
    this.ws.onmessage = function (e) {
      if (typeof e.data === "string") {
        //IF Received Data is String
      }
      else if (e.data instanceof ArrayBuffer) {
        //IF Received Data is ArrayBuffer
      }
      else if (e.data instanceof Blob) {

        i++;

        var f = e.data;


        var reader = new FileReader();
        reader.onload = (e) => {

          let result = <string>e.target.result;

          f.srcbase64 = result;
          f.name = "File" + i;
          f.src = global_view.sanitizer.bypassSecurityTrustResourceUrl(result);

          global_view.storedFiles.push(f);

        }

        reader.readAsDataURL(f);
      }
    };

    this.ws.onopen = function () {
      //Do whatever u want when connected succesfully
      //alert('ScanApp correttamente avviata');
    };
    this.ws.onclose = function () {
      //$('.dalert').modal('show');
      alert('Attenzione! ScanApp non è avviata');
    };


  }

  decryptData(data) {

    try {
      const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
  
    }
  }


test_event(newItem: string){
  this.vedi = newItem;
}



full_state_event(full_side_nav: boolean){
  this.marginLeft = full_side_nav ? '200px' : '60px';
  this.is_full = full_side_nav;
}

  scanImage() {
    this.ws.send("1100");
  };


  deleteElFromList(i): void {
    if (confirm("Eliminare l'acquisizione selezionata?")) {
      this.storedFiles.splice(i, 1);
    }
  }

  //async submit(): Promise<void> {
  submit() {
    this.file_data = new FormData();
    var doc = new jsPDF('p', 'mm', 'a4', true);  // optional parameters

    for (let i = 0; i < this.storedFiles.length; i++) {
      if (i != 0) doc.addPage();
      
      //var blob = new Blob([this.storedFiles[i]], { type: "octet/stream" });
      //var file = new File([blob], this.storedFiles[i].name + '.jpg', { type: "image/jpeg", lastModified: Date.now() });

      //this.file_data.append('file[]', file);

      var img = 'data:image/jpeg;base64,' + this.storedFiles[i].srcbase64.split(',')[1];
      var width = doc.internal.pageSize.getWidth();
      var height = doc.internal.pageSize.getHeight();
      doc.addImage(img, 'JPEG', 0, 0, width, height);

    }

    /* 
    invio al server il documento
    */
   
    var merged_blob = doc.output('blob');
    var merged_file = new File([merged_blob], 'documento.pdf', { type: "application/pdf", lastModified: Date.now() });
    this.file_data = new FormData();
    this.file_data.append('file[]', merged_file); 
    
    this.apiprotoService.protoScanner(this.file_data, this.id).subscribe((dati) => {
      alert(dati);
    });
  }

  submit_nonfunziona(){
    let myfile  = this.storedFiles[0];
    var myblob = new Blob([myfile], { type: "application/pdf" });
    //var myblob = new Blob([myfile], { type: "image/png" });
    console.log(myblob);
    var myfileURL = URL.createObjectURL(myblob);
    window.open(myfileURL);


  }



}
