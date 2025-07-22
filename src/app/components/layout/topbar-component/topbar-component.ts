import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar-component',
  imports: [],
  templateUrl: './topbar-component.html',
  styleUrl: './topbar-component.css'
})
export class TopbarComponent {

  router = inject(Router);

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

}
