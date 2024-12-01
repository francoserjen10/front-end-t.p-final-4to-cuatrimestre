import { Component, OnInit } from '@angular/core';
import { ChartParticipacionComponent } from './chart-pie/chart-participacion.component';
import { ICotizacion } from '../../interfaces/cotizacion';
import { DbService } from '../../services/db.service';
import { Util } from '../../utils/util';

@Component({
  selector: 'app-participation',
  standalone: true,
  imports: [ChartParticipacionComponent],
  templateUrl: './participation.component.html',
  styleUrl: './participation.component.css'
})
export class ParticipationComponent implements OnInit {

  originalsCotizaciones: ICotizacion[] = [];
  util: Util;
  participaciones: { [empresa: string]: number } = {};

  constructor(private dbService: DbService) { this.util = new Util(); }

  ngOnInit(): void {
    this.util = new Util();
    this.getAllCotizaciones();
  }

  getAllCotizaciones() {
    this.dbService.getAllCotizacionesOfBackEnd()
      .subscribe({
        next: (value: ICotizacion[]) => {
          const flatCotizaciones = value.flat();
          this.originalsCotizaciones = flatCotizaciones;
          this.calculateParticipations()
        }, error(err) {
          console.error('Error al obtener las cotizaciones en el home', err);
        },
      });
  }

  calculateParticipations() {
    const cotizacionesForEmpresa = this.util.groupByCompany(this.originalsCotizaciones);
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
