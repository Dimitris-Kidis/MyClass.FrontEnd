import { Component, OnInit } from '@angular/core';
import { StudentsClassmatesInfo } from 'src/models/Students/StudentsClassmatesInfo';
import { AuthentificationService } from 'src/services/authentification.service';
import { StudentService } from 'src/services/student.service';
import { GenderPipe } from 'src/app/pipes/gender.pipe';

@Component({
  selector: 'app-classmates',
  templateUrl: './classmates.component.html',
  styleUrls: ['./classmates.component.scss']
})
export class ClassmatesComponent implements OnInit{

  constructor(
    private _studService: StudentService,
    private _authService: AuthentificationService
  ) {}

  classmates: StudentsClassmatesInfo[];

  ngOnInit(): void {
    this._studService.getStudentsClassmatesInfo(this._authService.getStudentsClassId()).subscribe((classmates: StudentsClassmatesInfo[]) => {
      this.classmates = classmates;
    });
  }

}
