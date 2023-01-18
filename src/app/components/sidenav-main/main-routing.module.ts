import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassmatesComponent } from '../classmates/classmates/classmates.component';
import { TeachersListComponent } from '../teachers-list/teachers-list/teachers-list.component';
import { SidenavMainComponent } from './sidenav-main/sidenav-main.component';
import { StudentAccountComponent } from '../studentaccount/studentaccount/student-account.component';
import { StudentScheduleComponent } from '../student-schedule/student-schedule.component';
import { StudentGradesComponent } from '../student-grades/student-grades.component';





const mainRoutes: Routes = [
  {
    path: '',
    component: SidenavMainComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'studentaccount', component: StudentAccountComponent },
          { path: 'classmates', component: ClassmatesComponent },
          { path: 'teachers', component: TeachersListComponent },
          { path: 'studentschedule', component: StudentScheduleComponent },
          { path: 'studentgrades', component: StudentGradesComponent },

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