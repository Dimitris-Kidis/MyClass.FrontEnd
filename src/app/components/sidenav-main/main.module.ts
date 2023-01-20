import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';

import { ClassmatesComponent } from '../classmates/classmates/classmates.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { StudentAccountComponent } from '../studentaccount/studentaccount/student-account.component';
import { StudentAboutInfoComponent } from '../student-about-info/student-about-info.component';
import { SubjectsListComponent } from '../subjects-list/subjects-list.component';
import { UploadAvatarComponent } from '../upload-avatar/upload-avatar.component';
import { ImprovementWindowComponent } from '../improvement-window/improvement-window.component';
import { GenderPipe } from 'src/app/pipes/gender.pipe';
import { TeachersListComponent } from '../teachers-list/teachers-list/teachers-list.component';
import { StudentScheduleComponent } from '../student-schedule/student-schedule.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '../student-schedule/dialog/dialog.component';


@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FullCalendarModule,
    MatDialogModule
  ],
  entryComponents: [],
  declarations: [
    StudentAccountComponent,
    ClassmatesComponent,
    ChangePasswordComponent,
    StudentAboutInfoComponent,
    SubjectsListComponent,
    UploadAvatarComponent,
    ImprovementWindowComponent,
    GenderPipe,
    TeachersListComponent,
    StudentScheduleComponent,
    DialogComponent
  ],
  providers: [

  ]
})
export class MainModule { }
