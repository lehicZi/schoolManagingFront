import {School} from "./shool.model";
import {Course} from "./course.model";
import {Grade} from "./grade.model";
import {Teacher} from "./teacher.model";

export interface Lesson{
  id:number,
  startHour : Date
  endHour : Date
  course: Course
  grade: Grade,
  teacher : Teacher

}
