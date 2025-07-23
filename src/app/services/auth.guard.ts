// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service'; // Assurez-vous d'avoir un service d'authentification

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.isAuthenticated()) {
      return true; // L'utilisateur est authentifié, l'accès est autorisé
    } else {
      // L'utilisateur n'est pas authentifié, rediriger vers la page de connexion
      this.router.navigate(['/nolay/login']);
      return false; // L'accès est refusé
    }
  }
}