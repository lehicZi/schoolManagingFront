import {Component, Input, OnInit} from '@angular/core';
import {School} from "../model/shool.model";

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss']
})
export class SchoolComponent implements OnInit {

  @Input() school! : School;

  constructor() { }

  ngOnInit(): void {
  }

}
