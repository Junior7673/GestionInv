import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
 showError(message: string) {
    if (typeof window !== 'undefined') {
      alert(message);
    }
  }
}