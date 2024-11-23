import { Component, inject } from '@angular/core';
import { DarkModeService } from '../../shared/services/dark-mode.service';
import { CandlestickChartComponent } from '../../shared/candlestick-chart/candlestick-chart.component';
import { DbService } from '../../shared/services/db.service';
import { ICotizacion } from '../../shared/interfaces/cotizacion';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-apple-inc',
  standalone: true,
  imports: [CandlestickChartComponent, FormsModule],
  templateUrl: './apple-inc.component.html',
  styleUrl: './apple-inc.component.css'
})
export class AppleIncComponent {

  darkModeService = inject(DarkModeService);
  originalsCotizaciones: ICotizacion[] = [];
  cotizacionesChartData: ICotizacion[] = [];
  selectedOption: string = '';

  constructor(private dbService: DbService) { }

  ngOnInit(): void {
    this.getAllCotizaciones();
  }

  getAllCotizaciones() {
    return this.dbService.getAllCotizacionesOfBackEnd('AAPL').subscribe({
      next: (value: ICotizacion[]) => {
        const flatCotizaciones = value.flat();
        this.originalsCotizaciones = flatCotizaciones;
        this.cotizacionesChartData = [...this.originalsCotizaciones];
      }, error(err) {
        console.error('Error al obtener las cotizaciones en el home', err);
      },
    });
  }
}
