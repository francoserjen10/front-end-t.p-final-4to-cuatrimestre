import { Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { CotizacionesComponent } from './routes/cotizaciones/cotizaciones.component';

export const routes: Routes = [
    { path: 'home', title: 'Home', component: HomeComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'cotizaciones/:codEmpresa', component: CotizacionesComponent },
];
