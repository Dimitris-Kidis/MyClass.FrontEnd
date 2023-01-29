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
import { StudentGradesComponent } from '../student-grades/student-grades.component';
import { NotesComponent } from '../notes/notes.component';
import { TeacherAccountComponent } from '../teacher-account/teacher-account.component';
import { TeacherAboutInfoComponent } from '../teacher-about-info/teacher-about-info.component';
import { ClassesListComponent } from 'src/app/components/classes-list/classes-list.component';
import { TeacherScheduleComponent } from '../teacher-schedule/teacher-schedule.component';
import { TeacherGradesComponent } from '../teacher-grades/teacher-grades.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';
import { AdminAccountComponent } from '../admin-account/admin-account.component';
import { AllImprovementsComponent } from '../all-improvements/all-improvements.component';
import { AdminsTeacherListComponent } from '../admins-teacher-list/admins-teacher-list.component';
import { AdminsStudentListComponent } from '../admins-student-list/admins-student-list.component';
import { AdminsAdminListComponent } from '../admins-admin-list/admins-admin-list.component';
import { AdminScheduleComponent } from '../admin-schedule/admin-schedule.component';
import { AdminRelationsComponent } from '../admin-relations/admin-relations.component';
import { AdminLessonsComponent } from '../admin-lessons/admin-lessons.component';
import { PostsComponent } from '../posts/posts.component';


@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FullCalendarModule,
    MatDialogModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatInputModule,
    // NoopAnimationsModule,
    MatSidenavModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSortModule
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
    DialogComponent,
    StudentGradesComponent,
    NotesComponent,
    TeacherAccountComponent,
    TeacherAboutInfoComponent,
    ClassesListComponent,
    TeacherScheduleComponent,
    TeacherGradesComponent,
    AdminAccountComponent,
    AllImprovementsComponent,
    AdminsTeacherListComponent,
    AdminsStudentListComponent,
    AdminsAdminListComponent,
    AdminScheduleComponent,
    AdminRelationsComponent,
    AdminLessonsComponent,
    PostsComponent
  ],
  providers: [

  ],
  exports: [
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule
  ]
})
export class MainModule { }
