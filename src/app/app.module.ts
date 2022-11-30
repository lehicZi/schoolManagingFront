import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SchoolComponent } from './school/school.component';
import { ShoolListComponent } from './shool-list/shool-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FullCalendarModule} from "@fullcalendar/angular";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarComponent } from './calendar/calendar.component';
import { GradeListComponent } from './grade-list/grade-list.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {NgbModule, NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';
import { LessonAddComponent } from './lesson-add/lesson-add.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
])

const routes: Routes = [
  { path: '', redirectTo: '/schools', pathMatch: 'full' },
  {path: 'schools', component: ShoolListComponent},
  {path: "grades/:shcoolid", component: GradeListComponent},
  {path: "calendar/:gradeid", component: CalendarComponent},

]

@NgModule({
  declarations: [
    AppComponent,
    SchoolComponent,
    ShoolListComponent,
    CalendarComponent,
    GradeListComponent,
    LessonAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FullCalendarModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgbModule,
    NgbTimepickerModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
