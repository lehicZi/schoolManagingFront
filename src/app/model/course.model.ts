import {Address} from "./address.model";
import {ClassRoom} from "./classRoom.model";
import {Teacher} from "./teacher.model";

export interface Course{
  id:number,
  name:string,
  color:string,
  teachers:Teacher[]
}
