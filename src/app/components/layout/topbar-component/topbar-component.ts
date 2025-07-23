import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-topbar-component',
  imports: [],
  templateUrl: './topbar-component.html',
  styleUrl: './topbar-component.css'
})
export class TopbarComponent {

  router = inject(Router);
  authService = inject(AuthService);

  toProduit(){
    this.router.navigate(['produits']);
  }

  toEntree(){
    this.router.navigate(['entrees']);
  }

  toSortie(){
    this.router.navigate(['sorties']);
  }

  toCategorie(){
    this.router.navigate(['categories']);
  }

  toFournisseur(){
    this.router.navigate(['fournisseurs']);
  }

  logout(){
    console.log("logout");
    this.authService.logout();
    this.router.navigate(['nolay/login']);
  }

}
