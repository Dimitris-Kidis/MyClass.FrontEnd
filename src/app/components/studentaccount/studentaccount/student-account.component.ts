import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/services/authentification.service';
import { StudentService } from 'src/services/student.service';

@Component({
  selector: 'app-student-account',
  templateUrl: './student-account.component.html',
  styleUrls: ['./student-account.component.scss']
})
export class StudentAccountComponent implements OnInit {

  constructor(
    private _studService: StudentService,
    private _authService: AuthentificationService
  ) {}

  downloadLink!: string;

  ngOnInit(): void {
    this._studService.getStudentPrintSheet(this._authService.getUserId()).subscribe((obj: any) => {
      this.downloadLink = obj.url;
    });
  }

}
