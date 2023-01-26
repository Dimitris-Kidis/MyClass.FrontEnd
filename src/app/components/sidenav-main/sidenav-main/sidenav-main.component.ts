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

  constructor(private _router: Router,
    private _authService: AuthentificationService,
    private _studService: StudentService,
    private _teacherService: TeacherService
  ) { }

  role: string;
  user: User;
  className: string;
  ngOnInit(): void {
    if (!this._authService.isLoggedIn()) this._router.navigate(['/']);
    this.role = this._authService.userRole();
    this.checkRoute();
    this._authService.getUserdata().subscribe((info: User) => {
    this.user = info;
    // console.log(info);
    });
    if ( this.role == 'Student') {
      this._studService.getStudentAboutInfo(this._authService.getUserId()).subscribe((info: StudentAboutInfo) => {
        this.className = info.className;
      });
    } else if ( this.role == 'Teacher') {
    } else {

    }
  }


  checkRoute() {
    var currentRoute = this._router.url;
    var role = this._authService.userRole().toLowerCase();

    if (currentRoute.includes('notes') || (this._router.url).includes(`${role}`)) {

    } else {
      this._router.navigate([`/main/${role}-account`])
    }

  }

  logout(): void {
    localStorage.removeItem('token');
    this._router.navigate(['login']);

  }
}
