import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CotizacionesComponent } from './components/cotizaciones/cotizaciones.component';

export const routes: Routes = [
    { path: 'home', title: 'Home', component: HomeComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'cotizaciones/:codEmpresa', component: CotizacionesComponent },
];
