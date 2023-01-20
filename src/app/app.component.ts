import { Component, OnInit } from '@angular/core';
import { CreateClassCommand } from 'src/commands/Classes/CreateClassCommand';
import { CreateClassTeacherSubjectRelationCommand } from 'src/commands/Classes/CreateClassTeacherSubjectRelationCommand';
import { UpdateGradeCommand } from 'src/commands/Grades/UpdateGradeCommand';
import { CreateImprovementCommand } from 'src/commands/Improvements/CreateImprovementCommand';
import { CreateNoteCommand } from 'src/commands/Notes/CreateNoteCommand';
import { UpdateStudentInfoCommand } from 'src/commands/Students/UpdateStudentInfoCommand';
import { CreateSubjectCommand } from 'src/commands/Subjects/CreateSubjectCommand';
import { UpdateTeacherInfoCommand } from 'src/commands/Teachers/UpdateTeacherInfoCommand';
import { ChangePasswordDto, UserForAuthenticationDto, UserForRegistrationDto } from 'src/models/Auth/auth';
import { GradesForStudent } from 'src/models/Grades/GradesForStudent';

import { User } from 'src/models/Users/User';
import { PagedResult } from 'src/pagination/PagedResult';
import { PaginatedRequest } from 'src/pagination/PaginatedRequest';
import { AdminService } from 'src/services/admin.service';
import { AuthentificationService } from 'src/services/authentification.service';
import { AvatarService } from 'src/services/avatar.service';
import { CommonService } from 'src/services/common.service';
import { StudentService } from 'src/services/student.service';
import { TeacherService } from 'src/services/teacher.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {  
  
  constructor(
    private _commService: CommonService,
    private _teacherService: TeacherService,
    private _adminService: AdminService
  ) { }


  ngOnInit(): void {
    // this._adminService.getAllTeachersNamesAndIds().subscribe((info: any) => {
    //   this.info = info;
    //   console.log(info);
    // });
  }




}

