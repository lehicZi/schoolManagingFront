import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Grade} from "./model/grade.model";
import {environment} from "../environments/environment";
import {Lesson} from "./model/lesson.model";
import {Course} from "./model/course.model";

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  endpoint: string = "/lessons"

  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<Lesson[]>(`${environment.apiURL}${this.endpoint}`)
  }

  findById(id:number){
    return this.http.get<Lesson>(`${environment.apiURL}${this.endpoint}/${id}`)
  }

  findByGrade(gradeId: number){
    return this.http.get<Lesson[]>(`${environment.apiURL}${this.endpoint}/findbygrade/${gradeId}`)
  }

  add(lesson: Lesson){
    return this.http.post<Lesson>(`${environment.apiURL}${this.endpoint}`, lesson)
  }

  delete(id: number){
    return this.http.delete<Lesson>(`${environment.apiURL}${this.endpoint}/${id}`)
  }
}
