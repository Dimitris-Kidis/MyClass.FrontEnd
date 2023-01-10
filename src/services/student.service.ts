import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GradesForStudent } from 'src/models/GradesForStudent';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private _httpService: HttpClient) { }
  

  // GET
  getGradesForStudent(id: number): Observable<GradesForStudent[]> {
    return this._httpService.get<GradesForStudent[]>(`api/student-controller/grades-for-student/${id}`);
  }
}
