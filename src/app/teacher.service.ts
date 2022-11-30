import { Injectable } from '@angular/core';
import {School} from "./model/shool.model";
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Teacher} from "./model/teacher.model";
import {Grade} from "./model/grade.model";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  endpoint: string = "/teachers"

  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<Teacher[]>(`${environment.apiURL}${this.endpoint}`)
  }

  findBySchool(schoolId: number){
    return this.http.get<Teacher[]>(`${environment.apiURL}${this.endpoint}/find/${schoolId}`)
  }

  countBySchool(schoolId: number){
    return this.http.get<number>(`${environment.apiURL}${this.endpoint}/count/${schoolId}`)
  }
}
