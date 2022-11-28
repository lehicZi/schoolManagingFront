import {Grade} from "./grade.model";

export interface Teacher{
  id:number,
  firstName:string,
  lastName:string,
  birthDate:string
  mainGrade:Grade
}
