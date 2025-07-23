import { Routes } from "@angular/router";

export default [
    {
        path: 'login',
        loadComponent: () => import('./components/login-component/login-component').then(m => m.LoginComponent)
    }
] as Routes;