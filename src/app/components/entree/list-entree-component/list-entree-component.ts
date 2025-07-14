import { Component } from '@angular/core';
import { EntreeInterface } from '../../../interfaces/entree.interface';
import { EntreeService } from '../../../services/entree.service';
import { Router } from '@angular/router';
import { ProduitInterface } from '../../../interfaces/produit-interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-entree-component',
  imports: [CommonModule],
  templateUrl: './list-entree-component.html',
  styleUrl: './list-entree-component.css'
})
export class ListEntreeComponent {
  entrees: EntreeInterface[] = [];
  produit: ProduitInterface[] = [];

  constructor(
    private entreeService: EntreeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.chargerEntree();
  }

  chargerEntree(): void {
    this.entreeService.getAllWithNomProduit()
    .then(data => this.entrees = data)
    .catch(err => console.error('Erreur de chargement des entrées :', err));

  }

  supp(id: number): void {
    if (confirm('Confirmer la suppression ?')) {
      this.entreeService.delete(id).subscribe({
        next: () => {
          alert('Entree supprimée avec succès.');
          this.chargerEntree();
        },
        error: err => alert('Erreur lors de la suppression : ' + err.message)
      });
    }
  }
  
goBack(): void {
  window.history.back();
}
}
