import {Course} from "./course.model";
import {School} from "./shool.model";

export interface ClassRoom{
  id:number,
  name:string,
  capacity:number,
  excludedCourses:Course[],
  school: School
}
