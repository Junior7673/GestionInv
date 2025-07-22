import { Routes } from '@angular/router';
import { CategorieComponent } from './components/categorie/categorie-component/categorie-component';
import { FournisseurComponent } from './components/founisseur/fournisseur-component/fournisseur-component';
import { DashboardComponent } from './components/layout/dashboard-component/dashboard-component';
import { CategorieList } from './components/categorie/categorie-list/categorie-list';
import { CategorieUpdate } from './components/categorie/categorie-update/categorie-update';
import { FournisseurComponentList } from './components/founisseur/fournisseur-component-list/fournisseur-component-list';
import { FournisseurComponentUpdate } from './components/founisseur/fournisseur-component-update/fournisseur-component-update';
export const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/produit',
    pathMatch: 'full'
  },
  { path: 'dashboard', component: DashboardComponent },
  //{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { 
    path: 'produit', 
    loadComponent: () => import('./components/produit/produit-component/produit-component').then(m => m.ProduitComponent),
  },
  { 
    path: 'produits', 
    loadComponent: () => import('./components/produit/produit-component-list/produit-component-list').then(m => m.ProduitComponentList),
  }, 
  { 
    path: 'produit/:id', 
    loadComponent: () => import('./components/produit/produit-component-update/produit-component-update').then(m => m.ProduitComponentUpdate),
  },
  
  //Fournisseur
  { path: 'fournisseur', component: FournisseurComponent },
  { path: 'fournisseurs', component: FournisseurComponentList},
  { path: 'fournisseur/:id', component: FournisseurComponentUpdate },    

  //Categorie
  { path: 'categorie', component: CategorieComponent },
  { path: 'categorie/:id', component: CategorieUpdate },
  { path: 'categories', component: CategorieList},

//Sortie
  {
    path: 'sorties',loadComponent: () => import('./components/sortie/list-sortie-component/list-sortie-component').then(m => m.ListSortieComponent)
  },
  {
    path: 'sortie',
    loadComponent: () => import('./components/sortie/add-sortie-component/add-sortie-component').then(m => m.AddSortieComponent)
  },
  {
    path: 'sortie/:id',
    loadComponent: () => import('./components/sortie/sortie-update/sortie-update').then(m => m.SortieUpdate)
  },

  //Entree
  {
    path: 'entrees', loadComponent: () => import('./components/entree/list-entree-component/list-entree-component').then(m => m.ListEntreeComponent)
  },
  {
    path: 'entree',loadComponent: () => import('./components/entree/add-entree-component/add-entree-component').then(m => m.AddEntreeComponent)
  },
  {
    path: 'entree/:id',
    loadComponent: () => import('./components/entree/entree-update/entree-update').then(m => m.EntreeUpdate)
  },


  //Connexion
  { path: 'login',
     loadComponent: () => import('./components/login-component/login-component').then(m => m.LoginComponent)
  }
];
