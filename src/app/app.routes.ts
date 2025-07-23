import { Routes } from '@angular/router';
export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./components/layout/app-layout-component/app-layout-component').then(m => m.AppLayoutComponent),
    loadChildren: () => import('./app.layout.routes').then(m => m.default)
  },
  { 
    path: 'nolay',
    loadComponent: () => import('./components/layout/no-layout-component/no-layout-component').then(m => m.NoLayoutComponent),
    loadChildren: () => import('./app.nolay.routes').then(m => m.default)
  }
];
