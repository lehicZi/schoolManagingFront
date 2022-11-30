import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {School} from "./model/shool.model";
import {environment} from "../environments/environment";
import {Course} from "./model/course.model";
import {Grade} from "./model/grade.model";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  endpoint: string = "/courses"

  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<Course[]>(`${environment.apiURL}${this.endpoint}`)
  }

  findBySchool(schoolId: number){
    return this.http.get<Course[]>(`${environment.apiURL}${this.endpoint}/find/${schoolId}`)
  }

  countBySchool(schoolId: number){
    return this.http.get<number>(`${environment.apiURL}${this.endpoint}/count/${schoolId}`)
  }
}
