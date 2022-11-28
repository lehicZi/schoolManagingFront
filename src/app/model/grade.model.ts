import {Address} from "./address.model";
import {ClassRoom} from "./classRoom.model";
import {Teacher} from "./teacher.model";

export interface Grade{
  id:number,
  name:string,
  mainTeacher:Teacher
}
