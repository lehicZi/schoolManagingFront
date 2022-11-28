import {Course} from "./course.model";

export interface ClassRoom{
  id:number,
  name:string,
  capacity:number,
  excludedCourses:Course[]
}
