import { Component } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { SortieInterface } from '../../../interfaces/sortie.interface';
import { SortieService } from '../../../services/sortie.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-sortie-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './list-sortie-component.html',
  styleUrl: './list-sortie-component.css'
})
export class ListSortieComponent {
  sorties: SortieInterface[] = [];
    searchTerm: string = '';

  constructor(
    private sortieService: SortieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.chargerSortie();
  }

  chargerSortie(): void {
    this.sortieService.getAllWithNomProduit()
      .then(data => this.sorties = data)
      .catch(err => {
        console.error('Erreur lors du chargement des sorties :', err);
        alert('Erreur de chargement des sorties');
      });
  }
  get filteredSorties(): SortieInterface[] {
    const terme = this.searchTerm.toLowerCase().trim();
    return this.sorties.filter(s =>
      s.nomprod.toLowerCase().includes(terme) ||
      s.stock.toString().includes(terme) ||
      new Date(s.date).toLocaleDateString().includes(terme)
    );
  }

  modifierSortie(id: number): void {
    this.router.navigate(['sortie/' + id]);
  }

  trackById(index: number, item: SortieInterface): number {
  return item.id;
}


  supp(id: number): void {
    if (confirm('Confirmer la suppression ?')) {
      this.sortieService.delete(id).subscribe({
        next: () => {
          alert('Sortie supprimée avec succès.');
          this.chargerSortie();
        },
        error: err => alert('Erreur lors de la suppression : ' + err.message)
      });
    }
  }
   
goBack(): void {
  window.history.back();
}
}
