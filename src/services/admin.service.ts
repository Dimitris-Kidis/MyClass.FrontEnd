import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateClassCommand } from 'src/commands/Classes/CreateClassCommand';
import { CreateClassTeacherSubjectRelationCommand } from 'src/commands/Classes/CreateClassTeacherSubjectRelationCommand';
import { UpdateStudentInfoCommand } from 'src/commands/Students/UpdateStudentInfoCommand';
import { CreateSubjectCommand } from 'src/commands/Subjects/CreateSubjectCommand';
import { UpdateTeacherInfoCommand } from 'src/commands/Teachers/UpdateTeacherInfoCommand';
import { ClassWithId } from 'src/models/Classes/ClassWithId';
import { ImprovementListItem } from 'src/models/Improvements/ImprovementListItem';
import { IStudentWithInfoRow } from 'src/models/Students/IStudentWithInfoRow';
import { ITeacherWithInfoRow } from 'src/models/Teachers/ITeacherWithInfoRow';
import { SubjectsWithId } from 'src/models/Subjects/SubjectsWithId';
import { TeacherNameAndId } from 'src/models/Teachers/TeacherNameAndId';
import { PagedResult } from 'src/pagination/PagedResult';
import { PaginatedRequest } from 'src/pagination/PaginatedRequest';
import { AdminAboutInfo } from 'src/models/Admins/AdminAboutInfo';
import { StudentOrAdminRow } from 'src/models/Students/StudentOrAdminRow';
import { TeacherRow } from 'src/models/Teachers/TeacherRow';
import { IAdminRow } from 'src/models/Admins/IAdminRow';
import { RelationInfoRow } from 'src/models/Relations/RelationInfoRow';
import { ScheduleInfo } from 'src/models/Schedules/ScheduleInfo';
import { CreateScheduleCommand } from 'src/commands/Schedules/CreateScheduleCommand';

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

  getAllTeachersWithIds(): Observable<TeacherNameAndId[]> {
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

  getAdminAboutInfo(userId: number): Observable<AdminAboutInfo> {
    return this._httpService.get<AdminAboutInfo>(`api/admin-controller/about-info/${userId}`);
  }

  getStudentOrAdmin(userId: number): Observable<StudentOrAdminRow> {
    return this._httpService.get<StudentOrAdminRow>(`api/admin-controller/student-or-admin/${userId}`);
  }

  getTeacher(userId: number): Observable<TeacherRow> {
    return this._httpService.get<TeacherRow>(`api/admin-controller/teacher/${userId}`);
  }

  getPagedAdminsInfo(paginatedRequest: PaginatedRequest): Observable<PagedResult<IAdminRow>> {
    console.log(paginatedRequest);
    return this._httpService.post<PagedResult<IAdminRow>>('api/admin-controller/admins-paged', paginatedRequest);
  }

  getAllRelations(): Observable<RelationInfoRow[]> {
    return this._httpService.get<RelationInfoRow[]>(`api/admin-controller/relations`);
  }

  getAllSchedules(): Observable<ScheduleInfo[]> {
    return this._httpService.get<ScheduleInfo[]>(`api/admin-controller/all-schedules`);
  }

  createSchedule(command: CreateScheduleCommand): Observable<any> {
    return this._httpService.post<any>("api/admin-controller/schedule", command);
  }

  updateAdminInfo(command: UpdateStudentInfoCommand): Observable<any> {
    return this._httpService.put<any>("api/admin-controller/admin", command);
  }
  
  deleteAdmin(userId: number): Observable<any> {
    return this._httpService.delete<any>(`api/admin-controller/admin/${userId}`);
  }

  deleteSubject(subjectId: number): Observable<any> {
    return this._httpService.delete<any>(`api/admin-controller/subject/${subjectId}`);
  }

  deleteClass(classId: number): Observable<any> {
    return this._httpService.delete<any>(`api/admin-controller/class/${classId}`);
  }

  deleteRelation(relationId: number): Observable<any> {
    return this._httpService.delete<any>(`api/admin-controller/relation/${relationId}`);
  }

  deleteSchedule(scheduleId: number): Observable<any> {
    return this._httpService.delete<any>(`api/admin-controller/schedule/${scheduleId}`);
  }
}
