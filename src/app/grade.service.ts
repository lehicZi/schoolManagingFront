import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {School} from "./model/shool.model";
import {environment} from "../environments/environment";
import {Grade} from "./model/grade.model";

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  endpoint: string = "/grades"

  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<Grade[]>(`${environment.apiURL}${this.endpoint}`)
  }

  findById(id:number){
    return this.http.get<Grade>(`${environment.apiURL}${this.endpoint}/${id}`)
  }

  findBySchool(schoolId: number){
    return this.http.get<Grade[]>(`${environment.apiURL}${this.endpoint}/find/${schoolId}`)
  }

  countBySchool(schoolId: number){
    return this.http.get<number>(`${environment.apiURL}${this.endpoint}/count/${schoolId}`)
  }
}
