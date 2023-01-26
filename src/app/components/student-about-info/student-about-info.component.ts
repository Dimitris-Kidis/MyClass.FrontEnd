import { Component, OnInit } from '@angular/core';
import { StudentAboutInfo } from 'src/models/Students/StudentAboutInfo';
import { AuthentificationService } from 'src/services/authentification.service';
import { StudentService } from 'src/services/student.service';

@Component({
  selector: 'app-student-about-info',
  templateUrl: './student-about-info.component.html',
  styleUrls: ['./student-about-info.component.scss']
})
export class StudentAboutInfoComponent implements OnInit{

  constructor(private _authService: AuthentificationService,
    private _studService: StudentService) {}

  student: StudentAboutInfo;

  ngOnInit(): void {
      this._studService.getStudentAboutInfo(this._authService.getUserId()).subscribe((info: StudentAboutInfo) => {
      this.student = info;
    });
  }


}
