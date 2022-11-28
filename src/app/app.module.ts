import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SchoolComponent } from './school/school.component';
import { ShoolListComponent } from './shool-list/shool-list.component';
import {FormsModule} from "@angular/forms";
import {FullCalendarModule} from "@fullcalendar/angular";

@NgModule({
  declarations: [
    AppComponent,
    SchoolComponent,
    ShoolListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
