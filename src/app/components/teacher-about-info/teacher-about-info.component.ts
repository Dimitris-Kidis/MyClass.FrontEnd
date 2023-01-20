import { Component } from '@angular/core';
import { StudentAboutInfo } from 'src/models/Students/StudentAboutInfo';
import { TeacherAboutInfo } from 'src/models/Teachers/TeacherAboutInfo';
import { AuthentificationService } from 'src/services/authentification.service';
import { StudentService } from 'src/services/student.service';
import { TeacherService } from 'src/services/teacher.service';

@Component({
  selector: 'app-teacher-about-info',
  templateUrl: './teacher-about-info.component.html',
  styleUrls: ['./teacher-about-info.component.scss']
})
export class TeacherAboutInfoComponent {

  constructor(private _authService: AuthentificationService,
    private _teachService: TeacherService) {}

  teacher: TeacherAboutInfo;

  ngOnInit(): void {
      this._teachService.getTeacherAboutInfo(this._authService.getUserId()).subscribe((info: TeacherAboutInfo) => {
      console.log(info);
      this.teacher = info;
    });
  }
}
