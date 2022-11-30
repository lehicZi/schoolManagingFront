import {Component, Input, OnInit} from '@angular/core';
import {School} from "../model/shool.model";
import {Grade} from "../model/grade.model";
import {GradeService} from "../grade.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbCollapseModule} from "@ng-bootstrap/ng-bootstrap";
import {state} from "@angular/animations";

@Component({
  selector: 'app-grade-list',
  templateUrl: './grade-list.component.html',
  styleUrls: ['./grade-list.component.scss'],
})
export class GradeListComponent implements OnInit {

  schoolId! : any
  grades! : Grade[];
  isCollapsedList! : boolean[];

  constructor(private gradeService : GradeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.schoolId = this.route.snapshot.paramMap.get("shcoolid");
    this.gradeService.findBySchool(this.schoolId).subscribe(v => {
      this.grades = v
      this.isCollapsedList =  Array(this.getSectionList().size)
    })
  }

  getSectionList(){
    return new Set(this.grades.map(g => g.section))
  }

  getNameList(section : string){
    return this.grades.filter(g => g.section === section)
  }

  goToCalendar(gradeId:number) {
    this.router.navigateByUrl(`/calendar/${gradeId}`)
  }

}
