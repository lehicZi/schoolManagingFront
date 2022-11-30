import {Address} from "./address.model";
import {ClassRoom} from "./classRoom.model";
import {Teacher} from "./teacher.model";
import {Grade} from "./grade.model";
import {Course} from "./course.model";

export interface School{
  id:number,
  name:string,
  type:string,
  phoneNumber:string,
  logo:string,
  address:Address,
}
