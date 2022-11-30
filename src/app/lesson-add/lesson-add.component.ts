import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, Validators} from "@angular/forms";
import {NgbActiveModal, NgbTimepickerModule} from "@ng-bootstrap/ng-bootstrap";
import {Teacher} from "../model/teacher.model";
import {ClassRoom} from "../model/classRoom.model";
import {Course} from "../model/course.model";
import {TeacherService} from "../teacher.service";
import {ClassRoomService} from "../class-room.service";
import {CourseService} from "../course.service";
import {Grade} from "../model/grade.model";

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
  addLessonFormSubmitted: boolean = false

  startHourIn = { hour:14, minute : 30 }
  endHourIn= { hour:15, minute :30 }
  teacher! : Teacher
  classRoom! : ClassRoom
  course! :Course

  teachers! : Teacher[]
  classRooms! : ClassRoom[]
  courses! :Course[]

  constructor(private fb : FormBuilder, private teacherService: TeacherService, private classRoomService: ClassRoomService,
              private courseService: CourseService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.schoolId = this.grade.school.id
    this.startHourIn = { hour:this.start.getHours(), minute :this.start.getMinutes() }
    this.endHourIn= { hour:this.end.getHours(), minute :this.end.getMinutes() }

    this.teacherService.findBySchool(this.schoolId).subscribe(v => {this.teachers = v
      console.log(v)} )
    this.classRoomService.findBySchool(this.schoolId).subscribe(v => this.classRooms = v)
    this.courseService.findBySchool(this.schoolId).subscribe(v => this.courses = v)

      this.addLessonForm = this.fb.group({
        id: [],
        startHour: [''],
        endHour: [''],
        teacher: [''],
        course: [''],
        classRoom: [''],
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

  addlesson(){
    console.log(this.addLessonForm.value)
  }

}
