import {Component, HostListener, Input, OnInit} from '@angular/core';
import {School} from "../model/shool.model";
import {CourseService} from "../course.service";
import {TeacherService} from "../teacher.service";
import {GradeService} from "../grade.service";
import {ClassRoomService} from "../class-room.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss']
})
export class SchoolComponent implements OnInit {

  @Input() school! : School;

  nbTeachers! : number;
  nbCourses! : number;
  nbGrades! : number;
  nbClassRooms! : number;

  constructor(private courseService : CourseService, private teacherService : TeacherService,
              private gradeService : GradeService, private classroomService : ClassRoomService,
              private router: Router) { }

  ngOnInit(): void {
    this.teacherService.countBySchool(this.school.id).subscribe(v => this.nbTeachers = v)
    this.courseService.countBySchool(this.school.id).subscribe(v => this.nbCourses = v)
    this.gradeService.countBySchool(this.school.id).subscribe(v => this.nbGrades = v)
    this.classroomService.countBySchool(this.school.id).subscribe(v => this.nbClassRooms = v)
  }

  @HostListener("click")
  sentProduct(){
    this.router.navigateByUrl(`/grades/${this.school.id}`)
  }

}
