import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProduitInterface } from '../../../interfaces/produit-interface';
import { ProduitService } from '../../../services/produit-service';
import { Router } from '@angular/router';
import { CategorieInterface } from '../../../interfaces/categorie-interface';
import { CategorieService } from '../../../services/categorie-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-produit-component-list',
    standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    UpperCasePipe
  ],
  templateUrl: './produit-component-list.html',
  styleUrl: './produit-component-list.css'
})
export class ProduitComponentList implements OnInit{
  produitForm!: FormGroup;
  term: string = '';
  produits: ProduitInterface[] = [];
  categories: CategorieInterface[] = [];
  catFilterId: number = 0;

  constructor(
    private produitService: ProduitService,
    private categorieService: CategorieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initProduits();
    this.initCategories();
  }

  initCategories(){
    this.categorieService.getAll().then((categories) => {
      this.categories = categories;
    }).catch((error) => {
      console.log(error);
      alert("Une erreur est survenue !");
    });
  }

  initProduits(): void {
    this.produitService.getAll()
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
          this.initProduits();
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

  searchProduit(){
    if(this.term != ""){
      this.produitService.searchByName(this.term).then((liste)=>{
        this.produits = liste;
      }).catch((error)=>{
        console.log(error);
      });
    }else{
      this.initProduits();
    }
  }

  goToNewProduit(){
    this.router.navigate(['produit']);
  }

  filter(){
    if(this.catFilterId != 0){
      this.produitService.filterByCategory(this.catFilterId).then((liste)=>{
        this.produits = liste;
      }).catch((error)=>{
        console.log(error);
      });
    }else{
      this.catFilterId = 0;
      this.initProduits();
    }
  }

}
