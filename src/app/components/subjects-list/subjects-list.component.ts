import { Component, OnInit } from '@angular/core';
import { SubjectNameTeacherNamePair } from 'src/models/Subjects/SubjectNameTeacherNamePair';
import { AuthentificationService } from 'src/services/authentification.service';
import { StudentService } from 'src/services/student.service';

@Component({
  selector: 'app-subjects-list',
  templateUrl: './subjects-list.component.html',
  styleUrls: ['./subjects-list.component.scss']
})
export class SubjectsListComponent implements OnInit{

  constructor(
    private _authService: AuthentificationService,
    private _studService: StudentService
  ) {}

  subjectsList: SubjectNameTeacherNamePair[];

  ngOnInit(): void {
    this._studService.getSubjectNameTeacherNamePairs(this._authService.getStudentsClassId()).subscribe((info: SubjectNameTeacherNamePair[]) => {
      this.subjectsList = info;
    })
  }


}
