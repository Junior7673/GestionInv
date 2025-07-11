import { Component, OnInit } from '@angular/core';
import { CategorieInterface } from '../../interfaces/categorie-interface';
import { CategorieService } from '../../services/categorie-service';
import { Router } from 'express';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-categorie-list',
    standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './categorie-list.html',
  styleUrl: './categorie-list.css'
})

export class CategorieList implements OnInit{
  categorieForm!: FormGroup;

  categories: CategorieInterface[] = [];

  constructor(
    private categorieService: CategorieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.chargerCategories();
  }
  chargerCategories(): void {
    this.categorieService.getAll().subscribe({
      next: data => this.categories = data,
      error: err => alert('Erreur lors du chargement : ' + err.message)
    });
  }

   delete(id: number): void {
    if (confirm('Confirmer la suppression ?')) {
      this.categorieService.delete(id).subscribe({
        next: () => {
          alert('Catégorie supprimée avec succès.');
          this.chargerCategories();
        },
        error: err => alert('Erreur lors de la suppression : ' + err.message)
      });
    }
  }

  modifierCategorie(id: number): void {
    this.router.navigate(['/modifier-categorie', id]);
  }

}
