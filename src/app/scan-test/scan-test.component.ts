import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { WindowService } from "./../window.service";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-scan-test',
  templateUrl: './scan-test.component.html',
  styleUrls: ['./scan-test.component.css']
})
export class ScanTestComponent implements OnInit, AfterViewInit {


  wsImpl;
  ws;
  storedFiles = [];
  toServerFiles = [];
  scandetail_show = false;
  file_data;
  srcData: SafeResourceUrl;

  @ViewChild('myCanvas', { static: false }) myCanvas: ElementRef<HTMLCanvasElement>;;
  public context: CanvasRenderingContext2D;

  constructor(private apiService: ApiService, private windowService: WindowService, private sanitizer: DomSanitizer) { }

  ngAfterViewInit(): void {
    //this.context = this.myCanvas.nativeElement.getContext('2d');
  }

  ngOnInit(): void {

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

  scanImage() {
    this.ws.send("1100");
  };


  deleteElFromList(i): void {
    if (confirm("Eliminare l'acquuisizione selezionata?")) {
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
    var merged_file = new File([merged_blob], 'test_scanner.pdf', { type: "application/pdf", lastModified: Date.now() });
    this.file_data = new FormData();
    this.file_data.append('file[]', merged_file); 
    
    this.apiService.testScanner(this.file_data).subscribe((dati) => {
      console.log(dati);
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