import { HttpClient } from '@angular/common/http';
import { Inject, PLATFORM_ID, Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { LoginInterface } from '../interfaces/login-interface';
import { LoginResponse } from '../interfaces/login-response-interface';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root' // 👈 permet l’injection automatique
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient,
              @Inject(PLATFORM_ID) private platformId: Object) {
    
  }

  login(credentials: LoginInterface): Observable<any> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role); // Stocker le rôle
      }),
      catchError(err => throwError(() => err))
    );
  }

  register(newUser: LoginInterface): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, newUser).pipe(
      catchError(err => throwError(() => err))
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      //return !localStorage.getItem('token');
      return !!localStorage.getItem('token'); // TRUE si le token existe
    }else{
      return false;
    }
  }
  getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'ADMIN';
  }
}
