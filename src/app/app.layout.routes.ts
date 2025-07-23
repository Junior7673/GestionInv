import { Routes } from "@angular/router";
import { AuthGuard } from "./services/auth.guard";

export default [
    {
        path: '',
        redirectTo: 'produits',
        pathMatch: 'full'
    },
    {
        path: 'register', loadComponent: () => import('./components/register-component/register-component').then(m => m.RegisterComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./components/login-component/login-component').then(m => m.LoginComponent)
    },
    { 
        path: 'produits', 
        canActivate: [AuthGuard],
        loadComponent: () => import('./components/produit/produit-component-list/produit-component-list').then(m => m.ProduitComponentList),
    }, 
    { 
        path: 'produit', 
        canActivate: [AuthGuard],
        loadComponent: () => import('./components/produit/produit-component/produit-component').then(m => m.ProduitComponent),
    },
    { 
        path: 'produit/:id', 
        canActivate: [AuthGuard],
        loadComponent: () => import('./components/produit/produit-component-update/produit-component-update').then(m => m.ProduitComponentUpdate),
    },
    { 
        path: 'fournisseur', 
        canActivate: [AuthGuard],
        loadComponent: () => import('./components/founisseur/fournisseur-component/fournisseur-component').then(m => m.FournisseurComponent), 
    },
    { 
        path: 'fournisseurs', 
        canActivate: [AuthGuard],
        loadComponent: () => import('./components/founisseur/fournisseur-component-list/fournisseur-component-list').then(m => m.FournisseurComponentList), 
    },
    { 
        path: 'fournisseur/:id', 
        canActivate: [AuthGuard],
        loadComponent: () => import('./components/founisseur/fournisseur-component-update/fournisseur-component-update').then(m => m.FournisseurComponentUpdate), 
    }, 
    { 
        path: 'categorie', 
        canActivate: [AuthGuard],
        loadComponent: () => import('./components/categorie/categorie-component/categorie-component').then(m => m.CategorieComponent), 
    },
    { 
        path: 'categorie/:id', 
        canActivate: [AuthGuard],
        loadComponent: () => import('./components/categorie/categorie-update/categorie-update').then(m => m.CategorieUpdate),
    },
    { 
        path: 'categories', 
        canActivate: [AuthGuard],
        loadComponent: () => import('./components/categorie/categorie-list/categorie-list').then(m => m.CategorieList),
    },  
    {
        path: 'sorties',
        canActivate: [AuthGuard],
        loadComponent: () => import('./components/sortie/list-sortie-component/list-sortie-component').then(m => m.ListSortieComponent)
    },
    {
        path: 'sortie',
        canActivate: [AuthGuard],
        loadComponent: () => import('./components/sortie/add-sortie-component/add-sortie-component').then(m => m.AddSortieComponent)
    },
    {
        path: 'sortie/:id',
        canActivate: [AuthGuard],
        loadComponent: () => import('./components/sortie/sortie-update/sortie-update').then(m => m.SortieUpdate)
    },
    {
        path: 'entrees', 
        canActivate: [AuthGuard],
        loadComponent: () => import('./components/entree/list-entree-component/list-entree-component').then(m => m.ListEntreeComponent)
    },
    {
        path: 'entree',
        canActivate: [AuthGuard],
        loadComponent: () => import('./components/entree/add-entree-component/add-entree-component').then(m => m.AddEntreeComponent)
    },
    {
        path: 'entree/:id',
        canActivate: [AuthGuard],
        loadComponent: () => import('./components/entree/entree-update/entree-update').then(m => m.EntreeUpdate)
    },
    
] as Routes;