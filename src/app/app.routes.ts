import { Routes } from '@angular/router';
import { ProduitComponent } from './components/produit-component/produit-component';
import { CategorieComponent } from './components/categorie-component/categorie-component';
import { FournisseurComponent } from './components/fournisseur-component/fournisseur-component';
import { DashboardComponent } from './components/dashboard-component/dashboard-component';
import { CategorieList } from './components/categorie-list/categorie-list';
import { CategorieUpdate } from './components/categorie-update/categorie-update';
import { FournisseurComponentList } from './components/fournisseur-component-list/fournisseur-component-list';
import { FournisseurComponentUpdate } from './components/fournisseur-component-update/fournisseur-component-update';

export const routes: Routes = [
  { 
    path: '', 
    // ceci est un lazy load. ça permet de chargé le component uniquement quand cet url est appelé. ainsi ça réduit la charge de l'appli
    //essaie de faire pareil avec le reste après
    loadComponent: () => import('./components/dashboard-component/dashboard-component').then(m => m.DashboardComponent)
  },
  { path: 'produit', component: ProduitComponent },
  //Fournisseur
  { path: 'fournisseur', component: FournisseurComponent },
  { path: 'fournisseurs', component: FournisseurComponentList},
  { path: 'modifier-fournisseur/:id', component: FournisseurComponent},
  { path: 'fournisseur/id', component: FournisseurComponentUpdate},
  { path: 'fournisseur/:id', component: FournisseurComponent }, // ou ModifierFournisseurComponent

  //Categorie
  { path: 'categorie', component: CategorieComponent },
  { path: 'categorie/:id', component: CategorieUpdate },
  { path: 'modifier-categorie/:id', component: CategorieComponent },  
  { path: 'categories', component: CategorieList},

  {
    path: 'sorties',
    loadComponent: () => import('./components/sortie/list-sortie-component/list-sortie-component').then(m => m.ListSortieComponent)
  },
  {
    path: 'sortie',
    loadComponent: () => import('./components/sortie/add-sortie-component/add-sortie-component').then(m => m.AddSortieComponent)
  },
  {
    path: 'entrees',
    loadComponent: () => import('./components/entree/list-entree-component/list-entree-component').then(m => m.ListEntreeComponent)
  },
  {
    path: 'entree',
    loadComponent: () => import('./components/entree/add-entree-component/add-entree-component').then(m => m.AddEntreeComponent)
  }


];
