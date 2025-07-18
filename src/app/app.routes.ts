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
    loadComponent: () => import('./components/dashboard-component/dashboard-component').then(m => m.DashboardComponent)
  },

  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },


  //{ path: 'produit', component: ProduitComponent },
  { path: 'produit', 
    loadComponent: () => import('./components/produit-component/produit-component').then(m => m.ProduitComponent),
  },
  //{ path: 'produits', component: ProduitComponentList},
  { path: 'produits', 
    loadComponent: () => import('./components/produit-component-list/produit-component-list').then(m => m.ProduitComponentList),
  },
 // { path: 'produit/ajouter', component: ProduitComponentUpdate }, 
   { path: 'produit/ajouter', 
    loadComponent: () => import('./components/produit-component-update/produit-component-update').then(m => m.ProduitComponentUpdate),
  },  
  //{ path: 'produit/:id', component: ProduitComponentUpdate },
   { path: 'produit/:id', 
    loadComponent: () => import('./components/produit-component-update/produit-component-update').then(m => m.ProduitComponentUpdate),
  },    
  
  //Fournisseur
  { path: 'fournisseur', component: FournisseurComponent },
  { path: 'fournisseurs', component: FournisseurComponentList},
  { path: 'fournisseur/ajouter', component: FournisseurComponentUpdate },     
  { path: 'fournisseur/:id', component: FournisseurComponentUpdate },    

  //Categorie
  { path: 'categorie', component: CategorieComponent },
  { path: 'categorie/:id', component: CategorieUpdate },
  { path: 'modifier-categorie/:id', component: CategorieComponent },  
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
    loadComponent: () => import('./components/sortie-update/sortie-update').then(m => m.SortieUpdate)
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
    loadComponent: () => import('./components/entree-update/entree-update').then(m => m.EntreeUpdate)
  },


  //Connexion
  { path: 'login',
     loadComponent: () => import('./components/login-component/login-component').then(m => m.LoginComponent)
  }
];
