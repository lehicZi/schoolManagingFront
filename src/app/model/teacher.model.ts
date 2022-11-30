import {Grade} from "./grade.model";
import {Course} from "./course.model";

export interface Teacher{
  id:number,
  firstName:string,
  lastName:string,
  birthDate:string
  mainGrade:Grade
  courses:Course[]
}
