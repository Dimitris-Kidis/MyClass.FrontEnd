import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateClassCommand } from 'src/commands/Classes/CreateClassCommand';
import { CreateClassTeacherSubjectRelationCommand } from 'src/commands/Classes/CreateClassTeacherSubjectRelationCommand';
import { UpdateStudentInfoCommand } from 'src/commands/Students/UpdateStudentInfoCommand';
import { CreateSubjectCommand } from 'src/commands/Subjects/CreateSubjectCommand';
import { UpdateTeacherInfoCommand } from 'src/commands/Teachers/UpdateTeacherInfoCommand';
import { ClassWithId } from 'src/models/ClassWithId';
import { ImprovementListItem } from 'src/models/ImprovementListItem';
import { IStudentWithInfoRow } from 'src/models/IStudentWithInfoRow';
import { ITeacherWithInfoRow } from 'src/models/ITeacherWithInfoRow';
import { SubjectsWithId } from 'src/models/SubjectsWithId';
import { TeacherNameAndId } from 'src/models/TeacherNameAndId';
import { PagedResult } from 'src/pagination/PagedResult';
import { PaginatedRequest } from 'src/pagination/PaginatedRequest';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _httpService: HttpClient) { }

  deleteStudent(userId: number): Observable<any> {
    return this._httpService.delete<any>(`api/admin-controller/student/${userId}`);
  }

  updateStudentInfo(command: UpdateStudentInfoCommand): Observable<any> {
    return this._httpService.put<any>("api/admin-controller/student", command);
  }

  getAllClassesWithIds(): Observable<ClassWithId[]> {
    return this._httpService.get<ClassWithId[]>(`api/admin-controller/all-classes-with-ids`);
  }

  createClass(command: CreateClassCommand): Observable<any> {
    return this._httpService.post<any>("api/admin-controller/class", command);
  }

  createClassTeacherSubjectRelation(command: CreateClassTeacherSubjectRelationCommand): Observable<any> {
    return this._httpService.post<any>("api/admin-controller/class-teacher-subject-relation", command);
  }

  getAllImprovements(): Observable<ImprovementListItem[]> {
    return this._httpService.get<ImprovementListItem[]>(`api/admin-controller/all-improvements`);
  }

  getAllSubjectsWithIds(): Observable<SubjectsWithId[]> {
    return this._httpService.get<SubjectsWithId[]>(`api/admin-controller/all-subjects-with-ids`);
  }

  createSubject(command: CreateSubjectCommand): Observable<any> {
    return this._httpService.post<any>("api/admin-controller/subject", command);
  }

  deleteTeacher(userId: number): Observable<any> {
    return this._httpService.delete<any>(`api/admin-controller/teacher/${userId}`);
  }

  updateTeacherInfo(command: UpdateTeacherInfoCommand): Observable<any> {
    return this._httpService.put<any>("api/admin-controller/teacher", command);
  }

  getAllClassesWithIdsOfATeacher(userId: number): Observable<ClassWithId[]> {
    return this._httpService.get<ClassWithId[]>(`api/admin-controller/teacher-classes-with-ids/${userId}`);
  }

  getAllTeachersNamesAndIds(): Observable<TeacherNameAndId[]> {
    return this._httpService.get<TeacherNameAndId[]>(`api/admin-controller/all-teachers-with-ids`);
  }

  getPagedStudentsInfo(paginatedRequest: PaginatedRequest): Observable<PagedResult<IStudentWithInfoRow>> {
    console.log(paginatedRequest);
    return this._httpService.post<PagedResult<IStudentWithInfoRow>>('api/admin-controller/students-paged', paginatedRequest);
  }

  getPagedTeachersInfo(paginatedRequest: PaginatedRequest): Observable<PagedResult<ITeacherWithInfoRow>> {
    console.log(paginatedRequest);
    return this._httpService.post<PagedResult<ITeacherWithInfoRow>>('api/admin-controller/teachers-paged', paginatedRequest);
  }
}
