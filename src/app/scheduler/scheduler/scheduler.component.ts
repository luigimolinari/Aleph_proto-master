/**
 * Nota:
 * Errore - Object literal may only specify known properties and 'procedura/sms/notifica/mail' does not exist in type 'CalendarEvent<any>'
 * Proprietà non riconosciute: procedura, sms, notifica, mail
 * Correzione -> uso di interfacce personalizzate: MyEvent (extends CalendarEvent) e MyCalendarEventTimesChangedEvent (extends CalendarEventTimesChangedEvent)
 * 
 * 
 * 
 **/
import {
  Component,
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
import { ApiService } from 'src/app/api.service';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import { faUserClock } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from 'src/app/local-storage.service';


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

/*
Giorgia -- custom interface
*/
interface MyEvent extends CalendarEvent {
  procedura: any;
  sms: any;
  notifica: any,
  mail: any
}
interface MyCalendarEventTimesChangedEvent extends CalendarEventTimesChangedEvent {
  event: MyEvent
}
/**/

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent {

  schedulazioni;
  nuovo = false;
  dati;
  faCalendarDay = faCalendarDay;
  faClipboardCheck = faClipboardCheck;
  faFolder = faFolder;
  faAt = faAt;
  faMobileAlt = faMobileAlt;
  faUserClock = faUserClock;
  procedura;
  id_operatore;

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;
  locale: string = "it";
  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Modifica',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Modificao', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Cancella',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Cancellato', event);
      },
    },
  ];



  refresh: Subject<any> = new Subject();
  //popolamento opzioni gruppo

  events: MyEvent[] = []; /*Giorgia -- custom interface*/

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal, private apiService: ApiService, private localStorageService: LocalStorageService) {
    this.id_operatore = localStorage.getItem('ID');
    this.apiService.getSchedule(this.id_operatore).subscribe((dati) => {
      this.schedulazioni = dati;
      for (var i = 0; i < this.schedulazioni.length; i++) {
        this.events = [
          ...this.events,
          {
            start: addHours(startOfDay(new Date(this.schedulazioni[i].giorno)), 0),
            end: addHours(new Date(this.schedulazioni[i].giorno_end), 0),
            title: this.schedulazioni[i].schedule,
            id: this.schedulazioni[i].id,
            procedura: this.schedulazioni[i].procedura,
            sms: this.schedulazioni[i].sms,
            notifica: this.schedulazioni[i].notifica,
            mail: this.schedulazioni[i].mail,
            color: colors.yellow,
            actions: this.actions,
            resizable: {
              beforeStart: true,
              afterEnd: true,
            },
            draggable: false,
          },
        ];
      }
    });

  }

  public luigi: FlatpickrDefaultsInterface = {
    allowInput: true,
    enableTime: true,
    mode: 'single',
    dateFormat: "Y-m-d H:i",
    // this:
    enable: [{ from: new Date(0, 1), to: new Date(new Date().getFullYear() + 200, 12) }]
  }


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: MyCalendarEventTimesChangedEvent): void { /*Giorgia -- custom interface*/
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.nuovo = true;
    this.events = [
      ...this.events,
      {
        title: 'Nuovo appuntamento',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
        /*Giorgia -- add custom properties*/
        procedura: '',
        sms: '',
        mail: '',
        notifica: ''
        /**/
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent, id) {
    if (confirm("Stai per eliminare l'appuntamento")) {
      this.apiService.DeleteSchedule(id).subscribe((dati) => {
        this.dati = dati['Esito'];
        if (this.dati == "si") {
          this.events = this.events.filter((event) => event !== eventToDelete);
        }
      });

    }
  }
  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }



}