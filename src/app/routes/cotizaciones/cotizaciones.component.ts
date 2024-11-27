import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DarkModeService } from '../../shared/services/dark-mode.service';
import { ICotizacion } from '../../shared/interfaces/cotizacion';
import { DbService } from '../../shared/services/db.service';
import { CandlestickChartComponent } from '../../shared/candlestick-chart/candlestick-chart.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cotizaciones',
  standalone: true,
  imports: [CandlestickChartComponent, FormsModule],
  templateUrl: './cotizaciones.component.html',
  styleUrl: './cotizaciones.component.css'
})
export class CotizacionesComponent implements OnInit {

  darkModeService = inject(DarkModeService);
  originalsCotizaciones: ICotizacion[] = [];
  cotizacionesChartData: ICotizacion[] = [];
  selectedOption: string = '';
  private cotizacionesSubscription: any;
  companyId: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private dbService: DbService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.companyId = params.get('codEmpresa');
      this.getAllCotizaciones();
    });
  }

  getAllCotizaciones() {
    if (this.companyId) {
      this.cotizacionesSubscription = this.dbService.getAllCotizacionesOfBackEnd(this.companyId)
        .subscribe({
          next: (value: ICotizacion[]) => {
            const flatCotizaciones = value.flat();
            this.originalsCotizaciones = flatCotizaciones;
            this.cotizacionesChartData = [...this.originalsCotizaciones];
          }, error(err) {
            console.error('Error al obtener las cotizaciones en el home', err);
          },
        });
    } else {
      console.log("No encontré el id");
    }
  }
}


// import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
// import { DarkModeService } from '../../shared/services/dark-mode.service';
// import { CandlestickChartComponent } from '../../shared/candlestick-chart/candlestick-chart.component';
// import { DbService } from '../../shared/services/db.service';
// import { ICotizacion } from '../../shared/interfaces/cotizacion';
// import { FormsModule } from '@angular/forms';
// import { Subject, takeUntil } from 'rxjs';

// @Component({
//   selector: 'app-apple-inc',
//   standalone: true,
//   imports: [CandlestickChartComponent, FormsModule],
//   templateUrl: './apple-inc.component.html',
//   styleUrl: './apple-inc.component.css'
// })
// export class AppleIncComponent implements OnInit, OnDestroy {

//   darkModeService = inject(DarkModeService);
//   originalsCotizaciones: ICotizacion[] = [];
//   cotizacionesChartData: ICotizacion[] = [];
//   selectedOption: string = '';
//   private cotizacionesSubscription: any;

//   constructor(private dbService: DbService) { }

//   ngOnInit(): void {
//     this.getAllCotizaciones();
//   }

//   getAllCotizaciones() {
//     this.cotizacionesSubscription = this.dbService.getAllCotizacionesOfBackEnd('AAPL')
//       .subscribe({
//         next: (value: ICotizacion[]) => {
//           console.log("apple onInidddddddddddddddt", this.cotizacionesChartData);
//           const flatCotizaciones = value.flat();
//           this.originalsCotizaciones = flatCotizaciones;
//           this.cotizacionesChartData = [...this.originalsCotizaciones];
//         }, error(err) {
//           console.error('Error al obtener las cotizaciones en el home', err);
//         },
//       });
//   }

//   ngOnDestroy(): void {
//     if (this.cotizacionesSubscription) {
//       this.cotizacionesSubscription.unsubscribe();
//     }
//   }
// }
