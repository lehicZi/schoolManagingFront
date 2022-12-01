import { Component, OnInit } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg, EventAddArg,
  EventApi, EventChangeArg,
  EventClickArg,
  EventInput,
  EventRemoveArg
} from "@fullcalendar/angular";
import {createEventId, INITIAL_EVENTS, parseString} from "../event-utils";
import {GradeService} from "../grade.service";
import {Grade} from "../model/grade.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LessonAddComponent} from "../lesson-add/lesson-add.component";
import {ActivatedRoute} from "@angular/router";
import {Lesson} from "../model/lesson.model";
import {LessonService} from "../lesson.service";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  initialEvents! : EventInput[]

  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    headerToolbar:false,
    eventOverlap: false,
    slotMinTime: "07:00:00",
    slotMaxTime: "19:00:00",
    height: 625,
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    },
    initialView: 'timeGridWeek',
    initialEvents: [],
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
    eventsSet: this.handleEvents.bind(this),
    eventAdd: this.addLesson.bind(this),
    eventChange:this.updateLesson.bind(this),
    eventRemove: this.deleteLesson.bind(this)
  };
  currentEvents: EventApi[] = [];
  gradeId! : any;
  grade! : Grade;

  lessonToAdd!: Lesson

  constructor(private gradeService : GradeService, private modalService: NgbModal, private route: ActivatedRoute,
              private lessonService: LessonService) { }

  ngOnInit(): void {
    this.gradeId = this.route.snapshot.paramMap.get("gradeid");
    this.gradeService.findById(this.gradeId).subscribe(v => this.grade = v)
    this.createInitialLessons()
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


    const calendarApi = selectInfo.view.calendar;

    //Getting form datas back
    modalRef.result.then((result) => {
      if (result) {
        this.lessonToAdd = result
        console.log(this.lessonToAdd);

        calendarApi.addEvent({
          id: createEventId(),
          title: `${this.lessonToAdd.course.name} avec ${this.lessonToAdd.teacher.firstName} ${this.lessonToAdd.teacher.lastName} en salle ${this.lessonToAdd.classRoom.name}`,
          start: this.lessonToAdd.startHour,
          end: this.lessonToAdd.endHour,
          color: this.lessonToAdd.course.color,
          extendedProps:{
            lesson: this.lessonToAdd
          }
        })

      }
    });
  }

  handleEventClick(clickInfo: EventClickArg) {

    console.log(clickInfo.event.extendedProps['lesson'])

    const modalRef = this.modalService.open(LessonAddComponent);
    modalRef.componentInstance.grade = this.grade;
    modalRef.componentInstance.start = clickInfo.event.extendedProps['lesson'].startHour
    modalRef.componentInstance.end = clickInfo.event.extendedProps['lesson'].endHour
    modalRef.componentInstance.teacher = clickInfo.event.extendedProps['lesson'].teacher
    modalRef.componentInstance.course = clickInfo.event.extendedProps['lesson'].course
    modalRef.componentInstance.classRoom = clickInfo.event.extendedProps['lesson'].classRoom

    modalRef.result.then((result) => {
      if (result) {
        if(typeof result == "boolean"){
          clickInfo.event.remove()
        }
        else {
          this.lessonToAdd = result

          clickInfo.event.setStart(this.lessonToAdd.startHour)
          clickInfo.event.setEnd(this.lessonToAdd.endHour)
          clickInfo.event.setProp('title', `${this.lessonToAdd.course.name} avec ${this.lessonToAdd.teacher.firstName} ${this.lessonToAdd.teacher.lastName}  en salle ${this.lessonToAdd.classRoom.name}`)
          clickInfo.event.setProp('color', this.lessonToAdd.course.color)
          this.lessonToAdd.id = clickInfo.event.extendedProps['lesson'].id
          clickInfo.event.setExtendedProp('lesson', this.lessonToAdd)
        }

      }
    });

  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  addLesson(addInfo : EventAddArg){
    this.lessonService.add(addInfo.event.extendedProps['lesson']).subscribe(value => addInfo.event.extendedProps['lesson'].id = value.id)
  }

  updateLesson(changeInfo: EventChangeArg){
    console.log( changeInfo.event.extendedProps['lesson'])

    changeInfo.event.extendedProps['lesson'].startHour = changeInfo.event.start
    changeInfo.event.extendedProps['lesson'].endHour = changeInfo.event.end

    this.lessonService.add(changeInfo.event.extendedProps['lesson']).subscribe(value => console.log(value))
  }

  deleteLesson(removeInfo : EventRemoveArg){
    this.lessonService.delete(removeInfo.event.extendedProps['lesson'].id).subscribe(value => console.log(value))
  }

  createInitialLessons(){
    this.lessonService.findByGrade(this.gradeId).subscribe(value => {
      this.initialEvents = []
      for (let lesson of value){
        lesson.startHour = new Date(lesson.startHour)
        lesson.endHour = new Date(lesson.endHour)
        this.initialEvents.push({
          id: createEventId(),
          title: `${lesson.course.name} avec ${lesson.teacher.firstName} ${lesson.teacher.lastName} en salle ${lesson.classRoom.name}`,
          start: new Date(lesson.startHour),
          end: new Date(lesson.endHour),
          color: lesson.course.color,
          extendedProps:{
          lesson: lesson
        }
        })
      }
      this.calendarOptions.initialEvents = this.initialEvents
    })

  }

}
