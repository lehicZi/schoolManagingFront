import { Injectable } from '@angular/core';
import {School} from "./model/shool.model";

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  schools : School[] = [{
    id : 1,
    address : {
      id :1,
      country : "fr",
      street : "Rue deschamps",
      streetNumber : 25
    },
    logo : "logo",
    name : "hello",
    type : "mid school",
    phoneNumber : "0000000000",
    classRooms : []
  },
    {
      id : 2,
      address : {
        id :2,
        country : "fr",
        street : "Chemin deschats",
        streetNumber : 254
      },
      logo : "logo",
      name : "Coucou",
      type : "high school",
      phoneNumber : "0000000000",
      classRooms : []
    }]

  constructor() { }

  findAll(){
    return this.schools
  }
}
