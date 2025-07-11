import { Component } from '@angular/core';
import { EntreeInterface } from '../../../interfaces/entree.interface';
import { EntreeService } from '../../../services/entree.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-entree-component',
  imports: [],
  templateUrl: './list-entree-component.html',
  styleUrl: './list-entree-component.css'
})
export class ListEntreeComponent {
  entrees: EntreeInterface[] = [];

  constructor(
    private entreeService: EntreeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.chargerEntree();
  }

  chargerEntree(): void {
    this.entreeService.getAll().subscribe({
      next: data => this.entrees = data,
      error: err => alert('Erreur lors du chargement : ' + err.message)
    });
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
}
