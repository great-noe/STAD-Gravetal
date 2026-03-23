import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    children: [] 
  },
  {
    path: '**',
    redirectTo: ''
  }
];
