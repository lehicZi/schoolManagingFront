import {Address} from "./address.model";
import {ClassRoom} from "./classRoom.model";
import {Teacher} from "./teacher.model";
import {School} from "./shool.model";

export interface Grade{
  id:number,
  name:string,
  section:string,
  school:School,
  mainTeacher:Teacher
}
