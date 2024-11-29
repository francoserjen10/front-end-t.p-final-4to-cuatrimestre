import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CotizacionesComponent } from './components/cotizaciones/cotizaciones.component';
import { ParticipationComponent } from './components/participation/participation.component';
import { IndiceComponent } from './components/indices/indice.component';

export const routes: Routes = [
    { path: 'home', title: 'Home', component: HomeComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },

    // Aca me tiene que llevar desde el nav bar home a cotizaciones
    { path: 'cotizaciones', component: CotizacionesComponent },
    { path: 'participacion', component: ParticipationComponent },
    { path: 'indices', component: IndiceComponent },

    // Cotizaciones
    { path: 'cotizaciones/:codEmpresa', component: CotizacionesComponent },
];
