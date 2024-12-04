import { Routes } from '@angular/router';
import { CotizacionesComponent } from './components/cotizaciones/cotizaciones.component';
import { ParticipationComponent } from './components/participation/participation.component';
import { IndiceComponent } from './components/indices/indice.component';

export const routes: Routes = [

    // Aca me tiene que llevar desde el nav bar home a cotizaciones
    { path: 'cotizaciones', component: CotizacionesComponent },
    { path: 'cotizaciones/:codEmpresa', component: CotizacionesComponent },
    { path: 'participacion', component: ParticipationComponent },
    { path: 'indices', component: IndiceComponent },
    { path: '', redirectTo: 'indices', pathMatch: 'full' },
];
