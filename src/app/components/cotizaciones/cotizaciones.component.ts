import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ICotizacion } from '../../interfaces/cotizacion';
import { DbService } from '../../services/db.service';
import { FormsModule } from '@angular/forms';
import { ChartCotizacionesComponent } from './chart-line/chart-cotizaciones.component';
import { AreaData, Time } from 'lightweight-charts';
import { CotizacionesServiceService } from '../../services/cotizaciones-service.service';
import { DateTime } from 'luxon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cotizaciones',
  standalone: true,
  imports: [ChartCotizacionesComponent, FormsModule, RouterLink, TranslateModule],
  templateUrl: './cotizaciones.component.html',
  styleUrl: './cotizaciones.component.css'
})
export class CotizacionesComponent implements OnInit {

  companyId: string | null = '';
  cotizacion: number | null = null;
  cotizacionChange: string = '';
  originalsCotizaciones: ICotizacion[] = [];
  cotChartDataFoyDay: AreaData<Time>[] = [];
  cotChartDataFoyMonth: AreaData<Time>[] = [];
  cotChartDataFoyYear: AreaData<Time>[] = [];
  marketOpen: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dbService: DbService,
    private cotizacionesServiceService: CotizacionesServiceService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.companyId = params.get('codEmpresa');
      this.getAllCotizaciones();
    });
    this.marketOpeningAndClosing()
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
            this.detailsOfEmpresa(this.originalsCotizaciones);
          }, error(err) {
            console.error('Error al obtener las cotizaciones en el home', err);
          }
        });
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
    const cotsForHours: ICotizacion[] = this.cotizacionesServiceService.filterByMarketHours(this.originalsCotizaciones);
    const dateTimeNoruega = this.cotizacionesServiceService.transformDateAndTimeInTimestamp(cotsForHours);
    const sortedData = dateTimeNoruega.sort((a, b) => Number(a.time) - Number(b.time));
    this.cotChartDataFoyDay = sortedData.filter((item, index, array) => {
      return index === 0 || item.time !== array[index - 1].time;
    });
  }

  transformCotizacionesForDay() {
    const cotsForHours: ICotizacion[] = this.cotizacionesServiceService.filterByMarketHours(this.originalsCotizaciones);
    const cotsForDays: ICotizacion[] = this.cotizacionesServiceService.filterByWeekdays(cotsForHours);
    const dateTimeNoruega = this.cotizacionesServiceService.transformDateAndTimeInTimestamp(cotsForDays);
    const sortedData = dateTimeNoruega.sort((a, b) => Number(a.time) - Number(b.time));
    this.cotChartDataFoyMonth = sortedData.filter((item, index, array) => {
      return index === 0 || item.time !== array[index - 1].time;
    });
  }

  transformCotizacionesForMonth() {
    const cotsForHours: ICotizacion[] = this.cotizacionesServiceService.filterByMarketHours(this.originalsCotizaciones);
    const cotsForDays: ICotizacion[] = this.cotizacionesServiceService.filterByWeekdays(cotsForHours);
    const cotsForMonths: ICotizacion[] = this.cotizacionesServiceService.filterCotizacionesByMonths(cotsForDays);
    const dateTimeNoruega = this.cotizacionesServiceService.transformDateAndTimeInTimestamp(cotsForMonths);
    const sortedData = dateTimeNoruega.sort((a, b) => Number(a.time) - Number(b.time));
    this.cotChartDataFoyYear = sortedData.filter((item, index, array) => {
      return index === 0 || item.time !== array[index - 1].time;
    });
  }

  marketOpeningAndClosing() {
    const newDate = new Date().toISOString();
    const dateNorway = DateTime.fromISO(newDate).setZone('Europe/Oslo');
    const day = dateNorway.day;
    const hora = dateNorway.hour;
    if ((day < 0 || day > 4) || hora < 9 || hora >= 16) {
      this.marketOpen = false;
    } else {
      this.marketOpen = true;
    }
  }
}