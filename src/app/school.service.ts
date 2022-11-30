import { Injectable } from '@angular/core';
import {School} from "./model/shool.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  endpoint: string = "/schools"


  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<School[]>(`${environment.apiURL}${this.endpoint}`)
  }
}
