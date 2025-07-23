import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth-service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
    localStorage.clear(); // Nettoyer le localStorage
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true when token exists', () => {
    localStorage.setItem('token', 'valid-token');
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should return false when token does not exist', () => {
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should remove token and role on logout', () => {
    localStorage.setItem('token', 'valid-token');
    localStorage.setItem('role', 'ADMIN');
    service.logout();
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('role')).toBeNull();
  });
});