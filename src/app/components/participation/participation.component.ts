import { Component, OnInit } from '@angular/core';
import { ChartParticipacionComponent } from './chart-pie/chart-participacion.component';
import { ICotizacion } from '../../interfaces/cotizacion';
import { DbService } from '../../services/db.service';
import { SideBarHomeComponent } from '../sideBar/side-bar-home.component';
import { CotizacionesServiceService } from '../../services/cotizaciones-service.service';

@Component({
  selector: 'app-participation',
  standalone: true,
  imports: [ChartParticipacionComponent, SideBarHomeComponent],
  templateUrl: './participation.component.html',
  styleUrl: './participation.component.css'
})
export class ParticipationComponent implements OnInit {

  originalsCotizaciones: ICotizacion[] = [];
  participaciones: { [empresa: string]: number } = {};
  hasLoaded = false;

  constructor(private dbService: DbService, private cotizacionesServiceService: CotizacionesServiceService) { }

  ngOnInit(): void {
    this.getAllCotizaciones();
  }

  getAllCotizaciones() {
    this.dbService.getAllCotizacionesOfBackEnd()
      .subscribe({
        next: (value: ICotizacion[]) => {
          const flatCotizaciones = value.flat();
          this.originalsCotizaciones = flatCotizaciones;
          this.calculateParticipations();
        }, error(err) {
          console.error('Error al obtener las cotizaciones en el home', err);
        },
        complete: () => {
          this.hasLoaded = true;
        },
      });
  }

  calculateParticipations() {
    const cotizacionesForEmpresa = this.cotizacionesServiceService.groupByCompany(this.originalsCotizaciones);
    const totalMarketCotizacion = this.originalsCotizaciones.reduce((total, cotizacion) => total + cotizacion.cotization, 0);
    for (const empresa in cotizacionesForEmpresa) {
      // hasOwnProperty => devuelve un booleano. verifica si existe la propiedad empresa
      if (cotizacionesForEmpresa.hasOwnProperty(empresa)) {
        const cotizacionesEmpresa = cotizacionesForEmpresa[empresa];
        const totalEmpresaCotizacion = cotizacionesEmpresa.reduce((total, cotizacion) => total + cotizacion.cotization, 0);
        this.participaciones[empresa] = parseFloat(((totalEmpresaCotizacion / totalMarketCotizacion) * 100).toFixed(2));
      }
    }
  }
}
