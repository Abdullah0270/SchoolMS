import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';


@Injectable({ providedIn: 'root' })
export class EventsService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/admin/events`;

  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addEvent(event: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, event);
  }

  deleteEvent(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
