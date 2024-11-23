import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AreaData, createChart, ISeriesApi, Time } from 'lightweight-charts';
import { ICotizacion } from '../interfaces/cotizacion';
import { HandleDateTimeValueService } from '../services/handle-date-time-value.service';

@Component({
  selector: 'app-candlestick-chart',
  standalone: true,
  imports: [],
  templateUrl: './candlestick-chart.component.html',
  styleUrl: './candlestick-chart.component.css'
})
export class CandlestickChartComponent implements AfterViewInit, OnInit, OnChanges {

  @Input() data: ICotizacion[] = [];
  allCotizacionesForHour: AreaData<Time>[] = [];
  allCotizacionesForDay: AreaData<Time>[] = [];
  allCotizacionesForMonth: AreaData<Time>[] = [];
  private areaSeries: ISeriesApi<'Area'> | null = null;
  private chart: any = null;

  constructor(private handleDTV: HandleDateTimeValueService) { }

  ngOnInit(): void {
    this.data;
    console.log("this.data", this.data)
    this.transformCotizacionesForHours();
    this.transformCotizacionesForDay()
    this.transformCotizacionesForMonth();
  }

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      this.createCandlestickChart();
    }
  }

   ngOnChanges(changes: SimpleChanges): void {
     if (this.chart) {
       if(this.areaSeries) {
       this.chart.update!([
         this.transformCotizacionesForHours(),
         this.transformCotizacionesForDay(),
         this.transformCotizacionesForMonth()
       ])
     }}
   }


  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['data'] && this.areaSeries) {
  //     //  actualizar data del chart
  //     const newData = changes['data'].currentValue;
  //     console.log('newData', nre)
  //     if (newData && newData.length) {
  //       const orderedData = newData.sort((a: { time: any; }, b: { time: any; }) => {
  //         const timeA = typeof a.time === 'number' ? a.time : Number(a.time);
  //         const timeB = typeof b.time === 'number' ? b.time : Number(b.time);
  //         return timeA - timeB;
  //       });

  //       // Eliminar duplicados por la propiedad 'time'
  //       const dataWithoutDuplicates = orderedData.filter((item: { time: any; }, index: number, array: { time: any; }[]) => {
  //         return index === 0 || item.time !== array[index - 1].time;
  //       });
  //       dataWithoutDuplicates.forEach((datas: AreaData<Time>) => {
  //         // Asegurarme de que this.areaSeries no sea nulo => !
  //         this.areaSeries!.update(datas);
  //       });
  //     }
  //   }
  // }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['data'] && this.areaSeries) {
  //     //  actualizar data del chart
  //     const newData = changes['data'].currentValue;
  //     console.log('newData', newData)
  //     if (newData && newData.length) {
  //       this.allCotizacionesForDay(newData)
  //     }
  //   }
  // }

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

      const seriesesData = new Map([
        ['1H', this.allCotizacionesForHour],
        ['1D', this.allCotizacionesForDay],
        ['1M', this.allCotizacionesForMonth]
      ]);
      console.log(seriesesData)
      const intervalColors: { [key: string]: string } = {
        '1H': '#2962FF',
        '1D': 'rgb(225, 87, 90)',
        '1M': 'rgb(242, 142, 44)',
      };
      const lineSeries = chart.addLineSeries({ color: intervalColors['1H'] });

      function setChartInterval(interval: string) {
        const data = seriesesData.get(interval) ?? [];
        lineSeries.setData(data);
        lineSeries.applyOptions({
          color: intervalColors[interval],
        });
        chart.timeScale().applyOptions({
          timeVisible: interval === '1H',
          rightOffset: interval === '1H' ? 10 : 20,
          barSpacing: interval === '1H' ? 5 : 10,
        })
        chart.timeScale().fitContent();
      }
      setChartInterval('1H');

      const intervals = ['1H', '1D', '1M'];
      const buttonsContainer = document.createElement('div');

      intervals.forEach(interval => {
        const button = document.createElement('button');
        button.innerText = interval;
        button.addEventListener('click', () => setChartInterval(interval));
        buttonsContainer.appendChild(button);
      });
      containerChart.appendChild(buttonsContainer);

      chart.timeScale().applyOptions({
        borderColor: '#71649C',
        timeVisible: true,
        rightOffset: 20,
        barSpacing: 10,
        minBarSpacing: 0,
        fixLeftEdge: true,
      });
      const resizeChart = () => {
        chart.applyOptions({
          width: containerChart.clientWidth,
          height: containerChart.clientHeight
        });
      }
      window.addEventListener("resize", resizeChart)
      const currentLocale = 'nb-NO';
      const myPriceFormatter = Intl.NumberFormat(currentLocale, {
        style: 'currency',
        currency: 'NOK'
      }).format;
      chart.applyOptions({
        localization: {
          priceFormatter: myPriceFormatter,
        },
      });
    }
  }

  transformCotizacionesForHours() {
    const cotsForHours: ICotizacion[] = this.handleDTV.filterByMarketHours(this.data);
    const dateTimeNoruega = this.handleDTV.transformDateAndTimeInTimestamp(cotsForHours);
    const sortedData = dateTimeNoruega.sort((a, b) => Number(a.time) - Number(b.time));
    this.allCotizacionesForHour = sortedData.filter((item, index, array) => {
      return index === 0 || item.time !== array[index - 1].time;
    });
  }

  transformCotizacionesForDay() {
    const cotsForHours: ICotizacion[] = this.handleDTV.filterByMarketHours(this.data);
    const cotsForDays: ICotizacion[] = this.handleDTV.filterByWeekdays(cotsForHours);
    console.log("cotsForDays", cotsForDays)
    const dateTimeNoruega = this.handleDTV.transformDateAndTimeInTimestamp(cotsForDays);
    const sortedData = dateTimeNoruega.sort((a, b) => Number(a.time) - Number(b.time));
    this.allCotizacionesForDay = sortedData.filter((item, index, array) => {
      return index === 0 || item.time !== array[index - 1].time;
    });
  }

  transformCotizacionesForMonth() {
    const cotsForHours: ICotizacion[] = this.handleDTV.filterByMarketHours(this.data);
    const cotsForDays: ICotizacion[] = this.handleDTV.filterByWeekdays(cotsForHours);
    const cotsForMonths: ICotizacion[] = this.handleDTV.filterByMonths(cotsForDays);
    const dateTimeNoruega = this.handleDTV.transformDateAndTimeInTimestamp(cotsForMonths);
    const sortedData = dateTimeNoruega.sort((a, b) => Number(a.time) - Number(b.time));
    this.allCotizacionesForMonth = sortedData.filter((item, index, array) => {
      return index === 0 || item.time !== array[index - 1].time;
    });
  }
}