import {School} from "./shool.model";
import {Course} from "./course.model";
import {Grade} from "./grade.model";
import {Teacher} from "./teacher.model";
import {ClassRoom} from "./classRoom.model";

export interface Lesson{
  id:number,
  startHour : string | Date
  endHour : string | Date
  course: Course
  grade: Grade,
  teacher : Teacher
  classRoom : ClassRoom

}
