import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class TokenService {
  private KEY = 'token';

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  set(token: string) {
    if (this.isBrowser()) localStorage.setItem(this.KEY, token);
  }

  get(): string | null {
    if (this.isBrowser()) return localStorage.getItem(this.KEY);
    return null;
  }

  remove() {
    if (this.isBrowser()) localStorage.removeItem(this.KEY);
  }

  isLoggedIn(): boolean {
    return this.isBrowser() && !!this.get();
  }

  
 decode(): any | null {
    const token = this.get();
    if (!token) return null;

    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  }
  getRole(): string | null {
    const decoded = this.decode();
    return decoded
      ? decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      : null;
  }
}
