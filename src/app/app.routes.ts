import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },

  {
    path: 'sign-in',
    loadComponent: () =>
      import('./core/pages/sign-in/sign-in.component').then(
        (m) => m.SignInComponent
      ),
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'home',
    loadComponent: () =>
      import('./core/pages/home/home.component').then((m) => m.HomeComponent),
  },
];
