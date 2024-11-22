import { Component, inject } from '@angular/core';
import { DarkModeService } from '../../shared/services/dark-mode.service';
import { CandlestickChartComponent } from '../../shared/candlestick-chart/candlestick-chart.component';
import { AreaData, Time } from 'lightweight-charts';
import { DbService } from '../../shared/services/db.service';
import { HandleDateTimeValueService } from '../../shared/services/handle-date-time-value.service';
import { ICotizacion } from '../../shared/interfaces/cotizacion';

@Component({
  selector: 'app-apple-inc',
  standalone: true,
  imports: [CandlestickChartComponent],
  templateUrl: './apple-inc.component.html',
  styleUrl: './apple-inc.component.css'
})
export class AppleIncComponent {

  darkModeService = inject(DarkModeService)
  cotizacionesChartData: AreaData<Time>[] = [];

  constructor(private dbService: DbService, private handleDTV: HandleDateTimeValueService) { }

  ngOnInit(): void {
    this.getAndTransformLastCotizaciones();
  }

  getAndTransformLastCotizaciones() {
    return this.dbService.getAllCotizacionesOfBackEnd('AAPL').subscribe({
      next: (value: ICotizacion[]) => {
        const flatCotizaciones = value.flat();
        const dateTimeNoruega = this.handleDTV.transformDateAndTimeInTimestamp(flatCotizaciones);
        this.cotizacionesChartData = [
          ...this.cotizacionesChartData,
          ...dateTimeNoruega
        ];
      }, error(err) {
        console.error('Error al obtener las cotizaciones en el home', err)
      },
    });
  }
}
