import {Address} from "./address.model";
import {ClassRoom} from "./classRoom.model";

export interface School{
  id:number,
  name:string,
  type:string,
  phoneNumber:string,
  logo:string,
  address:Address,
  classRooms:ClassRoom[];
}
