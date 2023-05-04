import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router'; 
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, FormBuilder,  Validators, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NativeDateAdapter } from '@angular/material/core';
import { MatDateFormats } from '@angular/material/core';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/format-datepicker';
import { LocalStorageService } from 'src/app/local-storage.service';
import {
ChangeDetectionStrategy,
ViewChild,
TemplateRef,
} from '@angular/core';
import {
  startOfDay,
endOfDay,
subDays,
addDays,
endOfMonth,
isSameDay,
isSameMonth,
addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
CalendarEvent,
CalendarEventAction,
CalendarEventTimesChangedEvent,
CalendarView,
CalendarDateFormatter
} from 'angular-calendar';
import { FlatpickrDefaults } from 'angularx-flatpickr';
import { FlatpickrDefaultsInterface } from 'angularx-flatpickr/flatpickr-defaults.service';
import flatpickr from "flatpickr"
import { Italian } from "flatpickr/dist/l10n/it.js"


flatpickr.localize(Italian);

const colors: any = {
red: {
  primary: '#ad2121',
  secondary: '#FAE3E3',
},
blue: {
  primary: '#1e90ff',
  secondary: '#D1E8FF',
},
yellow: {
  primary: '#e3bc08',
  secondary: '#FDF1BA',
},
};


@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class AddScheduleComponent implements OnInit {
  id;
  faBuilding=faBuilding;
  faEdit=faEdit;
  faMobileAlt=faMobileAlt;
  faAt=faAt;
  esito;
  msgerror:string;
  tipoalert;
  tipoalertdanger;
  tipoalertuncomplete;
  dati;
  form: FormGroup;
  schedule;
  oggetto;
  giorno;
  giorno_fine;
  ora_inizio;
  id_operatore;
  data;
  procedura;
  faFolder=faFolder;
  id_procedura;
  notifica;
  sms;
  mail;


  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private localStorageService: LocalStorageService) { 
    this.id_operatore=localStorage.getItem('ID');  
  }




  public luigi : FlatpickrDefaultsInterface = {
    allowInput : true,
    enableTime : true,
    time24hr: true,
    mode : 'single',
    dateFormat : "Y-m-d H:i",
    // this:
    enable : [{from : new Date(0, 1), to : new Date(new Date().getFullYear() + 200, 12)}]
  }

  Trasmetti(): void {

    if (this.form.valid) {
    this.apiService.AddSchedule(this.schedule=this.form.value, this.id_operatore).subscribe((dati)=>{
      this.dati = dati['Esito'];
      if(this.dati=="si"){
        if(confirm("Appuntamento correttamente registrato")) {
        this.router.navigate(['/scheduler']);
        }
       }
       else{
        alert("Attenzione. Impossibile inserire il flusso");
       }
    });
  } else {
alert("Attenzione. Non tutti i campi obbligatori hanno un valore valido");
  }
    }

  
    ngOnInit(): void {
        this.form = this.formBuilder.group({
        oggetto: new FormControl('', Validators.required),
        giorno: new FormControl('', Validators.required),
        giorno_fine: new FormControl('', Validators.required),
        id_procedura: new FormControl(),
        notifica: new FormControl(),
        sms: new FormControl(),
        mail: new FormControl(),
            });
            this.apiService.getProcedureOperatore(this.id_operatore).subscribe((data)=>{
 
              this.data = data;
         
                  }, error => console.error(error));
    }
}