import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DarkModeService } from '../../services/dark-mode.service';
import { ICotizacion } from '../../interfaces/cotizacion';
import { DbService } from '../../services/db.service';
import { FormsModule } from '@angular/forms';
import { ChartCotizacionesComponent } from './chart-line/chart-cotizaciones.component';
import { AreaData, Time } from 'lightweight-charts';
import { Util } from '../../utils/util';

@Component({
  selector: 'app-cotizaciones',
  standalone: true,
  imports: [ChartCotizacionesComponent, FormsModule, RouterLink],
  templateUrl: './cotizaciones.component.html',
  styleUrl: './cotizaciones.component.css'
})
export class CotizacionesComponent implements OnInit {

  darkModeService = inject(DarkModeService);
  companyId: string | null = '';
  cotizacion: number | null = null;
  cotizacionChange: string = '';
  originalsCotizaciones: ICotizacion[] = [];
  cotChartDataFoyDay: AreaData<Time>[] = [];
  cotChartDataFoyMonth: AreaData<Time>[] = [];
  cotChartDataFoyYear: AreaData<Time>[] = [];
  isDataLoaded: boolean = false; // Estado para controlar la carga de datos
  util: Util;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dbService: DbService,
  ) {
    this.util = new Util();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.companyId = params.get('codEmpresa');
      this.getAllCotizaciones();
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  getAllCotizaciones() {
    if (this.companyId) {
      this.dbService.getAllCotizacionesForCodEmpOfBackEnd(this.companyId)
        .subscribe({
          next: (value: ICotizacion[]) => {
            const flatCotizaciones = value.flat();
            this.originalsCotizaciones = flatCotizaciones;
            this.transformCotizacionesForHours();
            this.transformCotizacionesForDay();
            this.transformCotizacionesForMonth();
            this.isDataLoaded = true;
            this.detailsOfEmpresa(this.originalsCotizaciones);
          }, error(err) {
            console.error('Error al obtener las cotizaciones en el home', err);
          },
        });
    } else {
      this.companyId = 'AAPL';
    }
  }

  detailsOfEmpresa(cotizaciones: ICotizacion[]) {
    if (cotizaciones.length > 1) {
      const sortedCotizaciones = cotizaciones.sort((a, b) => {
        const dateA = new Date(a.fecha + 'T' + a.hora);
        const dateB = new Date(b.fecha + 'T' + b.hora);
        return Number(dateB) - Number(dateA);
      });
      const latestCotizacion = sortedCotizaciones[0];
      const previousCotizacion = sortedCotizaciones[1];
      const cotizacionChangeValue = latestCotizacion.cotization - previousCotizacion.cotization;
      const cotizacionChangePercentage = (cotizacionChangeValue / previousCotizacion.cotization) * 100;
      this.cotizacion = latestCotizacion.cotization;
      this.cotizacionChange = `${cotizacionChangeValue.toFixed(2)} (${cotizacionChangePercentage.toFixed(2)}%)`;
    }
  }

  transformCotizacionesForHours() {
    const cotsForHours: ICotizacion[] = this.util.filterByMarketHours(this.originalsCotizaciones);
    const dateTimeNoruega = this.util.transformDateAndTimeInTimestamp(cotsForHours);
    const sortedData = dateTimeNoruega.sort((a, b) => Number(a.time) - Number(b.time));
    this.cotChartDataFoyDay = sortedData.filter((item, index, array) => {
      return index === 0 || item.time !== array[index - 1].time;
    });
  }

  transformCotizacionesForDay() {
    const cotsForHours: ICotizacion[] = this.util.filterByMarketHours(this.originalsCotizaciones);
    const cotsForDays: ICotizacion[] = this.util.filterByWeekdays(cotsForHours);
    const dateTimeNoruega = this.util.transformDateAndTimeInTimestamp(cotsForDays);
    const sortedData = dateTimeNoruega.sort((a, b) => Number(a.time) - Number(b.time));
    this.cotChartDataFoyMonth = sortedData.filter((item, index, array) => {
      return index === 0 || item.time !== array[index - 1].time;
    });
  }

  transformCotizacionesForMonth() {
    const cotsForHours: ICotizacion[] = this.util.filterByMarketHours(this.originalsCotizaciones);
    const cotsForDays: ICotizacion[] = this.util.filterByWeekdays(cotsForHours);
    const cotsForMonths: ICotizacion[] = this.util.filterCotizacionesByMonths(cotsForDays);
    const dateTimeNoruega = this.util.transformDateAndTimeInTimestamp(cotsForMonths);
    const sortedData = dateTimeNoruega.sort((a, b) => Number(a.time) - Number(b.time));
    this.cotChartDataFoyYear = sortedData.filter((item, index, array) => {
      return index === 0 || item.time !== array[index - 1].time;
    });
  }
}
