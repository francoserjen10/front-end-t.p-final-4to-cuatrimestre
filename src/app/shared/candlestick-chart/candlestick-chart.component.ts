import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AreaData, createChart, ISeriesApi, Time } from 'lightweight-charts';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-candlestick-chart',
  standalone: true,
  imports: [],
  templateUrl: './candlestick-chart.component.html',
  styleUrl: './candlestick-chart.component.css'
})
export class CandlestickChartComponent implements AfterViewInit, OnInit, OnChanges {

  @Input() forDay: AreaData<Time>[] = [];
  @Input() forMonth: AreaData<Time>[] = [];
  @Input() forYear: AreaData<Time>[] = [];

  private currentInterval: string = '1D'; // Intervalo seleccionado actualmente
  private seriesesData = new Map<string, AreaData<Time>[]>(); // Datos por intervalo
  private lineSeries: ISeriesApi<'Line'> | null = null; // Referencia a la serie de líneas
  private chart: any = null; // Referencia al gráfico
  private dataSubject = new Subject<{ forDay: any; forMonth: any; forYear: any }>();
  constructor() { }

  ngOnInit(): void {
    this.seriesesData.set('1D', this.forDay || []);
    this.seriesesData.set('1M', this.forMonth || []);
    this.seriesesData.set('1A', this.forYear || []);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['forHour'] || changes['forDay'] || changes['forMonth']) {
      // Emite los datos al Subject cuando estén disponibles
      this.dataSubject.next({
        forDay: this.forDay,
        forMonth: this.forMonth,
        forYear: this.forYear,
      });
    }
  }

  ngAfterViewInit(): void {
    this.dataSubject.subscribe((data) => {
      if (data.forDay && data.forMonth && data.forYear) {
        // Solo crea el gráfico cuando todos los datos están disponibles
        if (!this.chart) {
          this.createCandlestickChart();
        }
        this.updateChartData('1D', data.forDay);
        this.updateChartData('1M', data.forMonth);
        this.updateChartData('1A', data.forYear);
      }
    });
  }

  private updateChartData(interval: string, data: AreaData<Time>[]): void {
    this.seriesesData.set(interval, data);
    if (this.lineSeries && this.currentInterval === interval) {
      this.lineSeries.setData(data);
    }
  }
  createCandlestickChart() {
    const containerChart = document.getElementById('container-chart');
    if (containerChart) {
      this.chart = createChart(containerChart, {
        layout: { background: { color: "#222" }, textColor: "#DDD" },
        grid: { vertLines: { color: "#444" }, horzLines: { color: "#444" }, },
        width: containerChart.clientWidth,
        height: containerChart.clientHeight,
      });

      const intervalColors: { [key: string]: string } = {
        '1D': '#2962FF',
        '1M': 'rgb(225, 87, 90)',
        '1A': 'rgb(242, 142, 44)',
      };

      this.lineSeries = this.chart.addLineSeries({ color: intervalColors['1D'] });

      const setChartInterval = (interval: string) => {
        this.currentInterval = interval;
        const data = this.seriesesData.get(interval) || []; // ??
        this.lineSeries!.setData(data);
        this.lineSeries!.applyOptions({ color: intervalColors[interval] });
        this.chart.timeScale().applyOptions({
          timeVisible: interval === '1D',
          rightOffset: interval === '1D' ? 10 : 20,
          barSpacing: interval === '1D' ? 5 : 10,
        })
        this.chart.timeScale().fitContent();
      }

      setChartInterval('1D');

      const intervals = ['1D', '1M', '1A'];
      const buttonsContainer = document.createElement('div');
      buttonsContainer.style.display = 'flex';
      buttonsContainer.style.gap = '10px';

      intervals.forEach((interval) => {
        const button = document.createElement('button');
        button.innerText = interval;
        button.addEventListener('click', () => setChartInterval(interval));
        buttonsContainer.appendChild(button);
      });

      containerChart.appendChild(buttonsContainer);

      this.chart.timeScale().applyOptions({
        borderColor: '#71649C',
        timeVisible: true,
        rightOffset: 20,
        barSpacing: 10,
        minBarSpacing: 0,
        fixLeftEdge: true,
      });
      const resizeChart = () => {
        this.chart.applyOptions({
          width: containerChart.clientWidth,
          height: containerChart.clientHeight
        });
      }
      window.addEventListener("resize", resizeChart);
      const currentLocale = 'nb-NO';
      const myPriceFormatter = Intl.NumberFormat(currentLocale, {
        style: 'currency',
        currency: 'NOK'
      }).format
      this.chart.applyOptions({
        localization: {
          priceFormatter: myPriceFormatter,
        },
      });
    }
  }
}