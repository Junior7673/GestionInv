import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProduitInterface } from '../../interfaces/produit-interface';
import { ProduitService } from '../../services/produit-service';
import { Router } from '@angular/router';
import { CategorieInterface } from '../../interfaces/categorie-interface';
import { FournisseurInterface } from '../../interfaces/fournisseur-interface';

@Component({
  selector: 'app-produit-component-list',
    standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './produit-component-list.html',
  styleUrl: './produit-component-list.css'
})
export class ProduitComponentList implements OnInit{
  produitForm!: FormGroup;
  term: string = '';

  produits: ProduitInterface[] = [];
  categorie: CategorieInterface[] = [];
  fournisseur: FournisseurInterface[] = [];
  constructor(
    private produitService: ProduitService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.chargerProduits();  
}

chargerProduits(): void {
  this.produitService.getAllNoms()
    .then(data => this.produits = data)
    .catch(err => {
      console.error('Erreur lors du chargement des produits avec noms:', err);
      alert('Erreur lors du chargement des produits.');
    });
}

  supprimerProduit(id: number): void {
    if (confirm('Confirmer la suppression ?')) {
      this.produitService.delete(id).subscribe({
        next: () => {
          alert('Produit supprimée avec succès.');
          this.chargerProduits();
        },
        error: err => alert('Erreur lors de la suppression : ' + err.message)
      });
    }
  }

  modifierProduit(id: number): void {
    this.router.navigate(['produit/' + id]);
  }
  
  goBack(): void {
  window.history.back();
}
//Pour la recherche
get produitsFiltres(): ProduitInterface[] {
  if (!this.term.trim()) {
    return this.produits;
  }

  const lowerTerm = this.term.toLowerCase();

  return this.produits.filter(prod =>
    prod.nomprod?.toLowerCase().includes(lowerTerm) ||
    prod.nomcat?.toLowerCase().includes(lowerTerm) ||
    prod.nomfourni?.toLowerCase().includes(lowerTerm)
  );
}


}
