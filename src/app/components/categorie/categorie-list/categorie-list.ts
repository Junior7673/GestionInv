import { Component, OnInit } from '@angular/core';
import { CategorieInterface } from '../../../interfaces/categorie-interface';
import { CategorieService } from '../../../services/categorie-service';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
  termeRecherche: string = '';

  categories: CategorieInterface[] = [];
  term: string = '';

  constructor(
    private categorieService: CategorieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initCategories();
  }
  
  initCategories() {
    this.categorieService.getAll().then(
      (categories) => {
        this.categories = categories;
      }
    );
  }

  searchCategory(){
    this.categorieService.searchbyName(this.term).then(
      (categories) => {
        this.categories = categories;
      }
    ).catch((error) => {
      console.log(error);
      alert("Une erreur est survenue !");
    });
  }

  removeCategory(id: number): void {
    if (confirm('Confirmer la suppression ?')) {
      this.categorieService.delete(id).then(
        () => {
          alert('Catégorie supprimée avec succès.');
          this.initCategories();
        }
      ).catch((error) => {
        console.log(error);
        alert("Une erreur est survenue !");
      });
    }
  }

  updateCategory(id: number): void {
    this.router.navigate(['categorie/' + id]);
  }

  goToNewCategory(){
    this.router.navigate(['categorie']);
  }

}
