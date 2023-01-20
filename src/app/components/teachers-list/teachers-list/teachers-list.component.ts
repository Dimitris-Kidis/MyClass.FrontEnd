import { Component, OnInit } from '@angular/core';
import { TeachersListForStudent } from 'src/models/Teachers/TeachersListForStudent';
import { AuthentificationService } from 'src/services/authentification.service';
import { StudentService } from 'src/services/student.service';

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.scss']
})
export class TeachersListComponent implements OnInit{

  constructor(
    private _authService: AuthentificationService,
    private _studService: StudentService
  ){}

  
  teachers: TeachersListForStudent[];
  ngOnInit(): void {
    this._studService.getTeachersList(this._authService.getStudentId()).subscribe((teachers: TeachersListForStudent[]) => {
      this.teachers = teachers;
      console.log(teachers);
    });
  }

}
