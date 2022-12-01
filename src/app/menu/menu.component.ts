import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SchoolService} from "../school.service";
import {GradeService} from "../grade.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  inCalendar!: boolean
  gradeId!: any
  schoolId!: number

  constructor(private router: Router,private route: ActivatedRoute,private gradeService: GradeService) { }

  ngOnInit(): void {

    if(this.router.url.includes('calendar')){
      this.inCalendar = true;
      this.gradeId = this.route.snapshot.paramMap.get("gradeid");
      this.gradeService.findById(this.gradeId).subscribe(value => this.schoolId = value.school.id)

    }
    console.log(this.gradeId)
  }

  goToGradeList() {
    this.router.navigateByUrl(`/grades/${this.schoolId}`)
  }
}
