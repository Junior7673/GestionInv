import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SortieInterface } from '../../../interfaces/sortie.interface';
import { SortieService } from '../../../services/sortie.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-sortie-component',
  imports: [CommonModule],
  templateUrl: './list-sortie-component.html',
  styleUrl: './list-sortie-component.css'
})
export class ListSortieComponent {
  sorties: SortieInterface[] = [];

  constructor(
    private sortieService: SortieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.chargerSortie();
  }

  chargerSortie(): void {
    /*this.sortieService.getAll().subscribe({
      next: data => this.sorties = data,
      error: err => alert('Erreur lors du chargement : ' + err.message)
    });*/
    this.sortieService.getAllWithNomProduit()
  .then(data => this.sorties = data)
  .catch(err => {
    console.error('Erreur lors du chargement des sorties :', err);
    alert('Erreur de chargement des sorties');
  });

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
