import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateGradeCommand } from 'src/commands/Grades/UpdateGradeCommand';
import { ClassesAndSubjectsWithIds } from 'src/models/Classes/ClassesAndSubjectsWithIds';
import { IStudentWithGradesRow } from 'src/models/Students/IStudentWithGradesRow';
import { SchedulesForTeacher } from 'src/models/Schedules/SchedulesForTeacher';
import { ShortClassInfo } from 'src/models/Classes/ShortClassInfo';
import { TeacherAboutInfo } from 'src/models/Teachers/TeacherAboutInfo';
import { PagedResult } from 'src/pagination/PagedResult';
import { PaginatedRequest } from 'src/pagination/PaginatedRequest';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private _httpService: HttpClient) { }

  updateGrade(command: UpdateGradeCommand): Observable<any> {
    return this._httpService.put<any>("api/teacher-controller/grade-update", command);
  }

  getPagedStudentsWithGrades(paginatedRequest: PaginatedRequest): Observable<PagedResult<IStudentWithGradesRow>> {
    console.log(paginatedRequest);
    return this._httpService.post<PagedResult<IStudentWithGradesRow>>('api/teacher-controller/grades-paged', paginatedRequest);
  }

  getTeacherPrintSheet(userId: any, classId: any){
    return this._httpService.get(`api/teacher-controller/print/${userId}/${classId}`,{
      params: {userId: userId, classId: classId},
      observe: 'response',
      responseType: 'blob'
    });
  }

  getSchedulesForTeacher(userId: number): Observable<SchedulesForTeacher[]> {
    return this._httpService.get<SchedulesForTeacher[]>(`api/teacher-controller/schedule/${userId}`);
  }

  getTeacherAboutInfo(userId: number): Observable<TeacherAboutInfo> {
    return this._httpService.get<TeacherAboutInfo>(`api/teacher-controller/about-info/${userId}`);
  }

  getShortInfoAboutClasses(userId: number): Observable<ShortClassInfo[]> {
    return this._httpService.get<ShortClassInfo[]>(`api/teacher-controller/short-classes-info/${userId}`);
  }

  getAllClassesAndSubjectsWithTheirIds(userId: number): Observable<ClassesAndSubjectsWithIds[]> {
    return this._httpService.get<ClassesAndSubjectsWithIds[]>(`api/teacher-controller/classes-and-subjects-with-their-ids-for-pagination/${userId}`);
  }
}
