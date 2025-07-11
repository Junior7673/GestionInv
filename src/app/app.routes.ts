import { Routes } from '@angular/router';
import { ProduitComponent } from './components/produit-component/produit-component';
import { CategorieComponent } from './components/categorie-component/categorie-component';
import { FournisseurComponent } from './components/fournisseur-component/fournisseur-component';
import { DashboardComponent } from './components/dashboard-component/dashboard-component';
import { CategorieList } from './components/categorie-list/categorie-list';

export const routes: Routes = [
  { 
    path: '', 
    // ceci est un lazy load. ça permet de chargé le component uniquement quand cet url est appelé. ainsi ça réduit la charge de l'appli
    //essaie de faire pareil avec le reste après
    loadComponent: () => import('./components/dashboard-component/dashboard-component').then(m => m.DashboardComponent)
  },
  { path: 'produit', component: ProduitComponent },
  { path: 'fournisseur', component: FournisseurComponent },
  { path: 'categorie', component: CategorieComponent },
  {path: 'categories', component: CategorieList},
  { path: 'modifier-categorie/:id', component: CategorieComponent },  // réutilise le formulaire



];
