// src/app/interceptors/jwt.interceptor.ts
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification-service';

export const JwtInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  //const token = localStorage.getItem('token');
  const router = inject(Router);
  const notificationService = inject(NotificationService);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;


  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        notificationService.showError('Session expirée. Veuillez vous reconnecter.');
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
