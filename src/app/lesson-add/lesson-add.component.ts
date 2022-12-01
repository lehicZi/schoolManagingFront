import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, Validators} from "@angular/forms";
import {NgbActiveModal, NgbTimepickerModule, NgbTimeStruct} from "@ng-bootstrap/ng-bootstrap";
import {Teacher} from "../model/teacher.model";
import {ClassRoom} from "../model/classRoom.model";
import {Course} from "../model/course.model";
import {TeacherService} from "../teacher.service";
import {ClassRoomService} from "../class-room.service";
import {CourseService} from "../course.service";
import {Grade} from "../model/grade.model";
import {Lesson} from "../model/lesson.model";

@Component({
  selector: 'app-lesson-add',
  templateUrl: './lesson-add.component.html',
  styleUrls: ['./lesson-add.component.scss'],
})
export class LessonAddComponent implements OnInit {

  @Input() grade!: Grade
  @Input() start!: Date
  @Input() end!: Date
  schoolId!: number

  addLessonForm! : FormGroup

  startHourIn = { hour:14, minute : 30 }
  endHourIn= { hour:15, minute :30 }
  teacher! : Teacher
  classRoom! : ClassRoom
  course! :Course

  teachers! : Teacher[]
  classRooms! : ClassRoom[]
  courses! :Course[]

  toDelete: boolean = false

  constructor(private fb : FormBuilder, private teacherService: TeacherService, private classRoomService: ClassRoomService,
              private courseService: CourseService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {

    this.schoolId = this.grade.school.id
    this.startHourIn = { hour:this.start.getHours(), minute :this.start.getMinutes() }
    this.endHourIn= { hour:this.end.getHours(), minute :this.end.getMinutes() }
    this.addLessonForm = this.fb.group({
      id: [],
      grade: this.grade,
      startHour: [''],
      endHour: [''],
      teacher: [''],
      course: [''],
      classRoom: [''],
    })

    //Getting list from back and removing the current object for re putting it ! (because of javascript object comparison sucks)

    this.teacherService.findBySchool(this.schoolId).subscribe(v => {
      this.teachers = v
      if(this.teacher){

        this.teachers = this.teachers.filter(v => !(this.teacher.id == v.id))
        this.teachers.push(this.teacher)

      }

    })

    this.courseService.findBySchool(this.schoolId).subscribe(v => {
      this.courses = v
      if(this.course && this.teacher){

        this.teacher.courses = this.teacher.courses.filter(v => !(this.course.id == v.id))
        this.teacher.courses.push(this.course)

      }
    })

    this.classRoomService.findBySchool(this.schoolId).subscribe(v => {
      this.classRooms = v

      if(this.classRoom){

        this.classRooms = this.classRooms.filter(v => !(this.classRoom.id == v.id))
        this.classRooms.push(this.classRoom)

      }
    })

  }

  getDayByIndex(){
    if (this.start.getDay() == 0){
      return "Lundi"
    }
    else if (this.start.getDay() == 1){
      return "Mardi"
    }
    else if (this.start.getDay() == 2){
      return "Mercredi"
    }
    else if (this.start.getDay() == 3){
      return "Jeudi"
    }
    else if (this.start.getDay() == 4){
      return "Vendredi"
    }
    else if (this.start.getDay() == 5){
      return "Samedi"
    }
    else {
      return "Day Error"
    }
  }

  getAllowedRooms(){
    return this.classRooms.filter(c => !c.excludedCourses.map(c => c.name).includes(this.course.name))
  }

  addLesson(){

    this.start.setHours(this.startHourIn.hour)
    this.start.setMinutes(this.startHourIn.minute)
    this.end.setHours(this.endHourIn.hour)
    this.end.setMinutes(this.endHourIn.minute)
    this.addLessonForm.controls['startHour'].setValue(this.start)
    this.addLessonForm.controls['endHour'].setValue(this.end)
    this.activeModal.close(this.addLessonForm.value)
  }

  close(){
    this.activeModal.close();
  }

  deleteLesson(){
    this.toDelete = true
    this.activeModal.close(this.toDelete)
  }
}
