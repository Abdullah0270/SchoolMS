import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../core/services/token.service';
import { environment } from '../../environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = `${environment.apiUrl}/api/auth`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private token: TokenService
  ) {}

  login(payload: { email: string; password: string }) {
    return this.http.post<any>(`${this.apiUrl}/login`, payload);
  }

  signup(payload: {
    fullName: string;
    email: string;
    password: string;
    role: string;
  }) {
    return this.http.post<any>(`${this.apiUrl}/signup`, payload);
  }

  handleAuthSuccess(token: string) {
    this.token.set(token);
  }

  logout() {
    this.token.remove();
    this.router.navigate(['/login']);
  }

  getUserRole(): string | null {
    return this.token.getRole();
  }

  isLoggedIn(): boolean {
    return this.token.isLoggedIn();
  }
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }
}
