import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AreaData, createChart, ISeriesApi, Time } from 'lightweight-charts';

@Component({
  selector: 'app-candlestick-chart',
  standalone: true,
  imports: [],
  templateUrl: './candlestick-chart.component.html',
  styleUrl: './candlestick-chart.component.css'
})
export class CandlestickChartComponent implements AfterViewInit, OnChanges {

  @Input() data: AreaData<Time>[] = [];
  private areaSeries: ISeriesApi<'Area'> | null = null;

  constructor() { }

  /*
   * ngAfterViewInit: Ciclo de vida.
   * se ejecuta después de que la vista del componente ha sido renderizada completamente
   * if (typeof window !== 'undefined' && typeof document !== 'undefined'): asegura que el código solo se ejecute si estamos en un entorno de navegador
   */
  ngAfterViewInit(): void {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      this.createCandlestickChart();
    }
  }

  /*
   * ciclo de vida de Angular que se ejecuta cada vez que cambian los valores de las propiedades de entrada (@Input) del componente
   * @param changes Verifica si hubo un cambio en la propiedad de entrada data.
   * @param this.chart Comprueba que el gráfico ya ha sido creado antes de intentar actualizarlo.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.areaSeries) {
      //actualizar data del chart
      const newData = changes['data'].currentValue;
      if (newData && newData.length) {
        const orderedData = newData.sort((a: { time: any; }, b: { time: any; }) => {
          const timeA = typeof a.time === 'number' ? a.time : Number(a.time);
          const timeB = typeof b.time === 'number' ? b.time : Number(b.time);
          return timeA - timeB;
        });
        const dataWithoutDuplicates = orderedData.filter((item: { time: any; }, index: number, array: { time: any; }[]) => {
          return index === 0 || item.time !== array[index - 1].time;
        });
        dataWithoutDuplicates.forEach((datas: AreaData<Time>) => {
          // Asegurarme de que this.areaSeries no sea nulo => !
          this.areaSeries!.update(datas);
        });
      }
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

      this.areaSeries = chart.addAreaSeries()
      const orderedData = this.data.sort((a, b) => {
        const timeA = typeof a.time === 'number' ? a.time : Number(a.time);
        const timeB = typeof b.time === 'number' ? b.time : Number(b.time);
        return timeA - timeB;
      });
      const dataWithoutDuplicates = orderedData.filter((item, index, array) => {
        return index === 0 || item.time !== array[index - 1].time;
      });
      this.areaSeries.setData(dataWithoutDuplicates);
      chart.timeScale().applyOptions({
        borderColor: '#71649C',
        timeVisible: true,
        rightOffset: 20,
        barSpacing: 10,
        minBarSpacing: 0,
        fixLeftEdge: true,
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
      // Aplicar el formateador de precios personalizado al gráfico.
      chart.applyOptions({
        localization: {
          priceFormatter: myPriceFormatter,
        },
      });
    }
  }
}
