import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-bar-cotizaciones',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './side-bar-cotizaciones.component.html',
  styleUrl: './side-bar-cotizaciones.component.css'
})
export class SideBarCotizacionesComponent {

  companyId: string | null = '';

  constructor(private router: Router) { }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
