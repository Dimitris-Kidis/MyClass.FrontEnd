import { Component } from '@angular/core';
import { ShortClassInfo } from 'src/models/Classes/ShortClassInfo';
import { SubjectNameTeacherNamePair } from 'src/models/Subjects/SubjectNameTeacherNamePair';
import { AuthentificationService } from 'src/services/authentification.service';
import { StudentService } from 'src/services/student.service';
import { TeacherService } from 'src/services/teacher.service';

@Component({
  selector: 'app-classes-list',
  templateUrl: './classes-list.component.html',
  styleUrls: ['./classes-list.component.scss']
})
export class ClassesListComponent {

  constructor(
    private _authService: AuthentificationService,
    private _teacherService: TeacherService
  ) {}

  classesShortInfo: ShortClassInfo[];

  ngOnInit(): void {
    this._teacherService.getShortInfoAboutClasses(this._authService.getUserId()).subscribe((info: ShortClassInfo[]) => {
      this.classesShortInfo = info;
    })
  }


}
