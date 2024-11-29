import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DbService } from '../../models/services/db.service';
import { ICotizacion } from '../../models/interfaces/cotizacion';

@Component({
  selector: 'app-stock-ticker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stock-ticker.component.html',
  styleUrl: './stock-ticker.component.css'
})
export class StockTickerComponent implements OnInit {

  cotizaciones: ICotizacion[] | any = [];

  constructor(private dbService: DbService) { }

  ngOnInit(): void {
    this.getAllCotizaciones();
  }

  getAllCotizaciones() {
    this.dbService.getLatestCotizacionesOfBackEnd()
      .subscribe({
        next: (value: ICotizacion[]) => {
          const groupedCotizaciones = this.groupByCompany(value);
          this.cotizaciones = this.calculateVariability(groupedCotizaciones);
        },
        error(err) {
          console.error('Error al obtener las cotizaciones', err);
        },
      });
  }

  groupByCompany(cotizaciones: ICotizacion[]): { [key: string]: ICotizacion[] } {
    return cotizaciones.reduce((acc, cotizacion) => {
      if (!acc[cotizacion.empresa]) {
        acc[cotizacion.empresa] = [];
      }
      acc[cotizacion.empresa].push(cotizacion);
      return acc;
    }, {} as { [key: string]: ICotizacion[] });
  }

  calculateVariability(groupedCotizaciones: any): any[] {
    const result = [];
    for (let empresa in groupedCotizaciones) {
      const cotizacionesEmpresa = groupedCotizaciones[empresa];
      cotizacionesEmpresa.sort((a: { fecha: string; hora: string; }, b: { fecha: string; hora: string; }) => new Date(b.fecha + 'T' + b.hora).getTime() - new Date(a.fecha + 'T' + a.hora).getTime());
      const latestCotizacion = cotizacionesEmpresa[0];
      const previousCotizacion = cotizacionesEmpresa[1];
      let variabilidad = 0;
      let variabilidadPercentage = 0;
      if (previousCotizacion) {
        const variabilidadValue = latestCotizacion.cotization - previousCotizacion.cotization;
        variabilidad = variabilidadValue
        variabilidadPercentage = ((variabilidadValue / previousCotizacion.cotization) * 100);
      }
      result.push({
        empresa: latestCotizacion.empresa,
        cotizacion: latestCotizacion.cotization,
        variabilidad: `${variabilidad.toFixed(2)} (${variabilidadPercentage.toFixed(2)}%)`
      });
    }
    return result;
  }
}
