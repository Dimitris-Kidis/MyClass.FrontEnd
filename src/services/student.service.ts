import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GradesForStudent } from 'src/models/Grades/GradesForStudent';
import { StudentAboutInfo } from 'src/models/Students/StudentAboutInfo';
import { SubjectNameTeacherNamePair } from 'src/models/Subjects/SubjectNameTeacherNamePair';
import { StudentsClassmatesInfo } from 'src/models/Students/StudentsClassmatesInfo';
import { SchedulesForStudent } from 'src/models/Schedules/SchedulesForStudent';
import { TeachersListForStudent } from 'src/models/Teachers/TeachersListForStudent';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private _httpService: HttpClient) { }
  
  getStudentAboutInfo(userId: number): Observable<StudentAboutInfo> {
    return this._httpService.get<StudentAboutInfo>(`api/student-controller/about-info/${userId}`);
  }

  getSubjectNameTeacherNamePairs(classId: number): Observable<SubjectNameTeacherNamePair[]> {
    return this._httpService.get<SubjectNameTeacherNamePair[]>(`api/student-controller/subjects-for-class/${classId}`);
  }

  getStudentsClassmatesInfo(classId: number): Observable<StudentsClassmatesInfo[]> {
    return this._httpService.get<StudentsClassmatesInfo[]>(`api/student-controller/classmates/${classId}`);
  }

  getGradesForStudent(studentId: number): Observable<GradesForStudent[]> {
    return this._httpService.get<GradesForStudent[]>(`api/student-controller/grades-for-student/${studentId}`);
  }

  getStudentPrintSheet(userId: any){
    return this._httpService.get(`api/student-controller/print-student-info/${userId}`,{
      params: userId,
      observe: 'response',
      responseType: 'blob'
    });
  }

  getSchedulesForStudent(classId: number): Observable<SchedulesForStudent[]> {
    return this._httpService.get<SchedulesForStudent[]>(`api/student-controller/schedule-for-class/${classId}`);
  }

  getTeachersList(studentId: number): Observable<TeachersListForStudent[]> {
    return this._httpService.get<TeachersListForStudent[]>(`api/student-controller/teachers-of-student/${studentId}`);
  }

}
