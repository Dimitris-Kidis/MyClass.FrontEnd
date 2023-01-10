import { Component, OnInit } from '@angular/core';
import { GradesForStudent } from 'src/models/GradesForStudent';
import { StudentService } from 'src/services/student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'MyClass';
  

  grades: GradesForStudent[];
  constructor (private _studService: StudentService) {}

  ngOnInit(): void {
    this._studService.getGradesForStudent(29)
    .subscribe((grades: GradesForStudent[]) => {
        this.grades = grades;
        console.log(this.grades);
      });
  }
}
