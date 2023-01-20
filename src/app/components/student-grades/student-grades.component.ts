import { Component, OnInit } from '@angular/core';
import { GradesForStudent } from 'src/models/Grades/GradesForStudent';
import { AuthentificationService } from 'src/services/authentification.service';
import { StudentService } from 'src/services/student.service';

@Component({
  selector: 'app-student-grades',
  templateUrl: './student-grades.component.html',
  styleUrls: ['./student-grades.component.scss']
})
export class StudentGradesComponent implements OnInit{

  constructor(
    private _authService: AuthentificationService,
    private _studService: StudentService
  ){}

  grades: GradesForStudent[];

  ngOnInit(): void {
    this._studService.getGradesForStudent(this._authService.getStudentId()).subscribe((grades: GradesForStudent[]) => {
      this.grades = grades;
      console.log(grades)
    });
  }
}
