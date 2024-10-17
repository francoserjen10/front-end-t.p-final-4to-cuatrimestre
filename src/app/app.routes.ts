import { Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';

export const routes: Routes = [
    { path: 'home', loadComponent: () => import('./routes/home/home.component').then(m => m.HomeComponent) }
];
