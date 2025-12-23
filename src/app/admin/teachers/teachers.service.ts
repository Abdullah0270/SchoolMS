import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class TeachersService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/admin/teachers`;

  getTeachers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addTeacher(payload: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, payload);
  }

  deleteTeacher(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
