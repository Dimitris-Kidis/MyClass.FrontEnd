import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentAboutInfo } from 'src/models/Students/StudentAboutInfo';
import { User } from 'src/models/Users/User';
import { AuthentificationService } from 'src/services/authentification.service';
import { StudentService } from 'src/services/student.service';
import { TeacherService } from 'src/services/teacher.service';

@Component({
  selector: 'app-sidenav-main',
  templateUrl: './sidenav-main.component.html',
  styleUrls: ['./sidenav-main.component.scss']
})
export class SidenavMainComponent implements OnInit {

  constructor(private router: Router,
    private _authService: AuthentificationService,
    private _studService: StudentService,
    private _teacherService: TeacherService
  ) { }

  role: string;
  user: User;
  className: string;
  ngOnInit(): void {
    this.role = this._authService.userRole();
    this._authService.getUserdata().subscribe((info: User) => {
    this.user = info;
    // console.log(info);
    });
    if ( this.role == 'Student') {
      this._studService.getStudentAboutInfo(this._authService.getUserId()).subscribe((info: StudentAboutInfo) => {
        this.className = info.className;
        // console.log(info);
      });
    } else if ( this.role == 'Teacher') {
      // this._teacherService.getTeacherAboutInfo(this._authService.getUserId()).subscribe((info: StudentAboutInfo) => {
      //   this.className = info.className;
      //   // console.log(info);
      // });
    } else {

    }

  }



  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['login']);

  }
}