import { Component, OnInit } from '@angular/core';
import {SchoolService} from "../school.service";
import {School} from "../model/shool.model";

@Component({
  selector: 'app-shool-list',
  templateUrl: './shool-list.component.html',
  styleUrls: ['./shool-list.component.scss']
})
export class ShoolListComponent implements OnInit {

  schools : School[] = []

  constructor(private ss : SchoolService) { }

  ngOnInit(): void {
    this.schools = this.ss.findAll()
  }

}
