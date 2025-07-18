import { Component } from '@angular/core';
import { EntreeInterface } from '../../../interfaces/entree.interface';
import { EntreeService } from '../../../services/entree.service';
import { Router } from '@angular/router';
import { ProduitInterface } from '../../../interfaces/produit-interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-entree-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './list-entree-component.html',
  styleUrl: './list-entree-component.css'
})
export class ListEntreeComponent {
  entrees: EntreeInterface[] = [];
  produit: ProduitInterface[] = [];
  searchTerm: string = '';


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
  
  get filteredEntrees(): EntreeInterface[] {
  if (!this.searchTerm.trim()) return this.entrees;
  const term = this.searchTerm.toLowerCase();
  return this.entrees.filter(e =>
    e.nomprod?.toLowerCase().includes(term) ||
    new Date(e.date).toDateString().toLowerCase().includes(term) ||
    e.stock?.toString().includes(term) ||
    e.id?.toString().includes(term)
  );
}

  
  modifierEntree(id: number): void {
    this.router.navigate(['entree/' + id]);
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
