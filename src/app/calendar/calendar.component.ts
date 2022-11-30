import { Component, OnInit } from '@angular/core';
import {CalendarOptions, DateSelectArg, EventApi, EventClickArg} from "@fullcalendar/angular";
import {createEventId, INITIAL_EVENTS} from "../event-utils";
import {GradeService} from "../grade.service";
import {Grade} from "../model/grade.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LessonAddComponent} from "../lesson-add/lesson-add.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    headerToolbar:false,
    initialView: 'timeGridWeek',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    allDaySlot : false,
    hiddenDays: [6],
    dayHeaderContent: function(arg){
      let weekdays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
      return weekdays[arg.date.getDay()];
    },
    slotLabelFormat : {
      hour : "2-digit",
      minute : "2-digit",
      hour12 : false
    },
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];
  gradeId! : any;
  grade! : Grade;

  constructor(private gradeService : GradeService, private modalService: NgbModal, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.gradeId = this.route.snapshot.paramMap.get("gradeid");
    this.gradeService.findById(this.gradeId).subscribe(v => this.grade = v)
  }

  handleDateSelect(selectInfo: DateSelectArg) {

    const modalRef = this.modalService.open(LessonAddComponent);
    modalRef.componentInstance.grade = this.grade;
    modalRef.componentInstance.start = selectInfo.start;
    modalRef.componentInstance.end = selectInfo.end;
    console.log(selectInfo.endStr)
    console.log(selectInfo.startStr)
    console.log(selectInfo.end)
    console.log(selectInfo.start)
    /*
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
     */
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

}
