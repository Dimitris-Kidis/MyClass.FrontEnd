import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassmatesComponent } from '../classmates/classmates/classmates.component';
import { TeachersListComponent } from '../teachers-list/teachers-list/teachers-list.component';
import { SidenavMainComponent } from './sidenav-main/sidenav-main.component';
import { StudentAccountComponent } from '../studentaccount/studentaccount/student-account.component';
import { StudentScheduleComponent } from '../student-schedule/student-schedule.component';
import { StudentGradesComponent } from '../student-grades/student-grades.component';
import { NotesComponent } from '../notes/notes.component';
import { TeacherAccountComponent } from '../teacher-account/teacher-account.component';
import { TeacherScheduleComponent } from '../teacher-schedule/teacher-schedule.component';
import { TeacherGradesComponent } from '../teacher-grades/teacher-grades.component';
import { AdminAccountComponent } from '../admin-account/admin-account.component';
import { AdminsTeacherListComponent } from '../admins-teacher-list/admins-teacher-list.component';
import { AdminsStudentListComponent } from '../admins-student-list/admins-student-list.component';
import { AdminsAdminListComponent } from '../admins-admin-list/admins-admin-list.component';
import { AdminScheduleComponent } from '../admin-schedule/admin-schedule.component';
import { AdminRelationsComponent } from '../admin-relations/admin-relations.component';
import { AdminLessonsComponent } from '../admin-lessons/admin-lessons.component';





const mainRoutes: Routes = [
  {
    path: '',
    component: SidenavMainComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'student-account', component: StudentAccountComponent },
          { path: 'classmates', component: ClassmatesComponent },
          { path: 'student-teachers', component: TeachersListComponent },
          { path: 'student-schedule', component: StudentScheduleComponent },
          { path: 'student-grades', component: StudentGradesComponent },

          { path: 'teacher-account', component: TeacherAccountComponent },
          { path: 'teacher-schedule', component: TeacherScheduleComponent },
          { path: 'teacher-grades', component: TeacherGradesComponent },


          { path: 'admin-account', component: AdminAccountComponent },
          { path: 'admin-teachers', component: AdminsTeacherListComponent },
          { path: 'admin-students', component: AdminsStudentListComponent },
          { path: 'admin-admins', component: AdminsAdminListComponent },
          { path: 'admin-relations', component: AdminRelationsComponent },
          { path: 'admin-lessons', component: AdminLessonsComponent },
          { path: 'admin-schedule', component: AdminScheduleComponent },




          { path: 'notes', component: NotesComponent },

        ]
      }
    ]
  }
];




@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(mainRoutes)
  ],
  exports: [RouterModule]
})
export class MainRoutingModule { }


// const mainRoutes: Routes = [
//   {
//     path: '',
//     component: SidenavMainComponent,
//     children: [
//       {
//         path: '/myclass/account',
//         children: [
//           { path: 'account', component: AccountComponent },
//           // { path: 'books', component: BookListComponent },
//           // { path: 'editBook/:id', component: EditBookComponent }
//         ]
//       }
//     ]
//   }
// ];