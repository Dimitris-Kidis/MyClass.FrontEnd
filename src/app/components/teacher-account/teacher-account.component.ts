import { Component } from '@angular/core';
import { AuthentificationService } from 'src/services/authentification.service';
import { StudentService } from 'src/services/student.service';
import { TeacherService } from 'src/services/teacher.service';

@Component({
  selector: 'app-teacher-account',
  templateUrl: './teacher-account.component.html',
  styleUrls: ['./teacher-account.component.scss']
})
export class TeacherAccountComponent {

  constructor(
    private _teacherService: TeacherService,
    private _authService: AuthentificationService
  ) {}

  downloadLink!: string;

  ngOnInit(): void {
    // this._teacherService.getTeacherPrintSheet(this._authService.getUserId()).subscribe((obj: any) => {
    //   this.downloadLink = obj.url;
    //   console.log(this.downloadLink);
    // });
  }

}
