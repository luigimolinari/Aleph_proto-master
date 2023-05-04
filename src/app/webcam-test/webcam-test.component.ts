import { Component, OnInit } from '@angular/core';
import {Subject, Observable} from 'rxjs';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-webcam-test',
  templateUrl: './webcam-test.component.html',
  styleUrls: ['./webcam-test.component.css']
})
export class WebcamTestComponent implements OnInit {

  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();


  //CROP
  imgChangeEvt: any = '';
  cropImgPreview: any = '';
  canvasRotation = 0;

  //format_data
  file_data;

  //filter img
  img_brightness = 1;
  img_contrast = 1;
  img_grayScale = 0;

  constructor(private apiService: ApiService) { }


  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }


  public cropImg(e: ImageCroppedEvent) {
      this.cropImgPreview = e.base64;
  }

  public imgLoad() {
      // display cropper tool
  }

  public initCropper() {
      // init cropper
  }
  
  public imgFailed() {
      // error msg
  }

  public rotate_cropedImg(){
    this.canvasRotation--;  
  }


  public new_snapshot(){
    if(confirm('Vuoi eseguire una nuova acquisizione?')){
      this.webcamImage = null;
    }
  }

  public submit(){
    if(this.img_brightness == 1 && this.img_contrast == 1 && this.img_grayScale == 0){
      this.submit_semplice();
    }else{
      this.submit_confiltro();
    }

  }

  public submit_semplice() {
    console.log('semplice');
    var canvas_w = document.getElementById('cropImgPreview').offsetWidth;
    var canvas_h = document.getElementById('cropImgPreview').offsetHeight;
    this.file_data = new FormData();
    var doc = new jsPDF('p', 'px', [canvas_w,canvas_h]);  // optional parameters
    var img = this.cropImgPreview.split(',')[1];
   /*  var width = doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.getHeight(); */
    doc.addImage(img, 'JPEG', 0, 0, canvas_w, canvas_h);
    doc.save('TestWebCam.pdf');
    

    /* 
    invio al server il documento
    
   
    var blob = doc.output('blob');
    var file = new File([blob], 'test_webcam.pdf', { type: "application/pdf", lastModified: Date.now() });
    this.file_data = new FormData();
    this.file_data.append('file[]', file); 
    
    this.apiService.testScanner(this.file_data).subscribe((dati) => {
      console.log(dati);
    });

    */
  }

  public submit_confiltro(){
    
    //creo il canvas di appoggio
    var mycanvas =<HTMLCanvasElement> document.getElementById("myCanvas");
    
    var ctx = mycanvas.getContext("2d");

    var w =  document.getElementById('cropImgPreview').offsetWidth;
    var h = document.getElementById('cropImgPreview').offsetHeight;

    mycanvas.width =w;
    mycanvas.height = h;
   
    //applica il filtro
    
    ctx.filter = 'contrast('+this.img_contrast+')  brightness('+this.img_brightness+') grayscale('+this.img_grayScale+')';
 
    // applica l'immagine
    var img = <HTMLImageElement>document.getElementById("cropImgPreview");
    ctx.drawImage(img, 0, 0, w, h);

    var img_url = mycanvas.toDataURL();

    //save
    var canvas_w = document.getElementById('cropImgPreview').offsetWidth;
    var canvas_h = document.getElementById('cropImgPreview').offsetHeight;
    var doc = new jsPDF('p', 'px', [canvas_w,canvas_h]);  // optional parameters
    doc.addImage(img_url, 'JPEG', 0, 0, canvas_w, canvas_h);
    doc.save('TestWebCam.pdf');

    /* mycanvas.toBlob(function(blob){
      console.log(blob);
      console.log(URL.createObjectURL(blob)); // this line should be here
      window.open(URL.createObjectURL(blob));
    },'image/png'); */
  }
  

}