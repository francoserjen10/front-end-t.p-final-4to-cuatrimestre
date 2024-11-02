import { Component } from '@angular/core';
import { createChart } from 'lightweight-charts';

@Component({
  selector: 'app-candlestick-chart',
  standalone: true,
  imports: [],
  templateUrl: './candlestick-chart.component.html',
  styleUrl: './candlestick-chart.component.css'
})
export class CandlestickChartComponent {

  constructor() { }

  /**
   * ngAfterViewInit: Ciclo de vida.
   * se ejecuta después de que la vista del componente ha sido renderizada completamente
   * if (typeof window !== 'undefined' && typeof document !== 'undefined'): asegura que el código solo se ejecute si estamos en un entorno de navegador
   */
  ngAfterViewInit(): void {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      this.createCandlestickChart();
    }
  }

  // Crear un Chart
  createCandlestickChart() {
    const containerChart = document.getElementById('container-chart');
    if (containerChart) {
      const chart = createChart(containerChart, {
        layout: {
          background: { color: "#222" },
          textColor: "#DDD"
        },
        grid: {
          vertLines: { color: "#444" },
          horzLines: { color: "#444" },
        },
        width: containerChart.clientWidth,
        height: containerChart.clientHeight,
      });

      // Manejo del tamaño del grafico dinamicamente
      const resizeChart = () => {
        chart.applyOptions({
          width: containerChart.clientWidth,
          height: containerChart.clientHeight
        });
      }

      window.addEventListener("resize", resizeChart)

      // Settear la moneda deseada
      const currentLocale = 'nb-NO';
      const myPriceFormatter = Intl.NumberFormat(currentLocale, {
        style: 'currency',
        currency: 'NOK'
      }).format;
      console.log(myPriceFormatter(12345.67)); // "kr 12 345,67"

      // Aplicar el formateador de precios personalizado al gráfico.
      chart.applyOptions({
        localization: {
          priceFormatter: myPriceFormatter,
        },
      });
    }
  }
}
