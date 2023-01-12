import { Component, OnInit } from '@angular/core';
import { CreateClassCommand } from 'src/commands/Classes/CreateClassCommand';
import { CreateClassTeacherSubjectRelationCommand } from 'src/commands/Classes/CreateClassTeacherSubjectRelationCommand';
import { UpdateGradeCommand } from 'src/commands/Grades/UpdateGradeCommand';
import { CreateImprovementCommand } from 'src/commands/Improvements/CreateImprovementCommand';
import { CreateNoteCommand } from 'src/commands/Notes/CreateNoteCommand';
import { UpdateStudentInfoCommand } from 'src/commands/Students/UpdateStudentInfoCommand';
import { CreateSubjectCommand } from 'src/commands/Subjects/CreateSubjectCommand';
import { UpdateTeacherInfoCommand } from 'src/commands/Teachers/UpdateTeacherInfoCommand';
import { ChangePasswordDto, UserForAuthenticationDto, UserForRegistrationDto } from 'src/models/auth';
import { GradesForStudent } from 'src/models/GradesForStudent';
import { IStudentWithGradesRow } from 'src/models/IStudentWithGradesRow';
import { SchedulesForStudent } from 'src/models/SchedulesForStudent';
import { StudentAboutInfo } from 'src/models/StudentAboutInfo';
import { StudentsClassmatesInfo } from 'src/models/StudentsClassmatesInfo';
import { SubjectNameTeacherNamePair } from 'src/models/SubjectNameTeacherNamePair';
import { TeachersListForStudent } from 'src/models/TeachersListForStudent';
import { User } from 'src/models/User';
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
  

  impr: CreateNoteCommand ={
    userId: 34,
    noteText: "OIHUGOIHUGOIHUGOIHUGOIHUGOIHUGOIHUGOIHUGOIHUGOIHUGOIHUGOIHUGOIHUGOIHUGOIHUGOIHUGOIHUGOIHUGOIHUGOIHUGOIHUGOIHUGOIHUGOIHUG"
  }

  ufa: UpdateGradeCommand = {
    id: 134,
    gradeOne: 5,
    gradeTwo: 5,
    gradeThree: 5,
    gradeFour: 5,
    seminars: 5,
    courses: 5,
    labs: 5
  }

  constructor(
    private _commService: CommonService,
    private _teacherService: TeacherService,
    private _adminService: AdminService
  ) { }

  info: any;

  stud: UpdateTeacherInfoCommand = {
    id: 46,
    firstName: "Olga",
    lastName: "Siiiipchenco",
    email: "olala@utm.md",
    dateOfBirth: "2000-07-05T18:50:48.8880000+00:00",
    gender: "F",
    position: "MMMMMMK",
    experience: "MMMMMMK",
    description: "MMMMMMKMMMMMMKMMMMMMKMMMMMMKMMMMMMKMMMMMMKMMMMMMKMMMMMMKMMMMMMKMMMMMMKMMMMMMKMMMMMMKMMMMMMKMMMMMMKMMMMMMKMMMMMMKMMMMMMKMMMMMMKMMMMMMKMMMMMMKMMMMMMKMMMMMMKMMMMMMKMMMMMMKMMMMMMKMMMMMMKMMMMMMKMMMMMMKMMMMMMK"
  }

  cl: CreateSubjectCommand = {
    subjectName: "History"
  }

  ngOnInit(): void {
    this._adminService.getAllTeachersNamesAndIds().subscribe((info: any) => {
      this.info = info;
      console.log(info);
    });
  }




}

