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

  @Input() forHour: AreaData<Time>[] = [];
  @Input() forDay: AreaData<Time>[] = [];
  @Input() forMonth: AreaData<Time>[] = [];

  private currentInterval: string = '1H'; // Intervalo seleccionado actualmente
  private seriesesData = new Map<string, AreaData<Time>[]>(); // Datos por intervalo
  private lineSeries: ISeriesApi<'Line'> | null = null; // Referencia a la serie de líneas
  private chart: any = null; // Referencia al gráfico
  private dataSubject = new Subject<{ forHour: any; forDay: any; forMonth: any }>();
  constructor() { }

  ngOnInit(): void {
    // Inicializa los datos en seriesesData
    this.seriesesData.set('1H', this.forHour || []);
    this.seriesesData.set('1D', this.forDay || []);
    this.seriesesData.set('1M', this.forMonth || []);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['forHour'] || changes['forDay'] || changes['forMonth']) {
      // Emite los datos al Subject cuando estén disponibles
      this.dataSubject.next({
        forHour: this.forHour,
        forDay: this.forDay,
        forMonth: this.forMonth,
      });
    }
  }

  ngAfterViewInit(): void {
    this.dataSubject.subscribe((data) => {
      if (data.forHour && data.forDay && data.forMonth) {
        // Solo crea el gráfico cuando todos los datos están disponibles
        if (!this.chart) {
          this.createCandlestickChart();
        }
        this.updateChartData('1H', data.forHour);
        this.updateChartData('1D', data.forDay);
        this.updateChartData('1M', data.forMonth);
      }
    });
  }

  private updateChartData(interval: string, data: AreaData<Time>[]): void {
    this.seriesesData.set(interval, data);
    if (this.lineSeries && this.currentInterval === interval) {
      this.lineSeries.setData(data);
    }
  }
  // Crear un Chart
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
        '1H': '#2962FF',
        '1D': 'rgb(225, 87, 90)',
        '1M': 'rgb(242, 142, 44)',
      };

      this.lineSeries = this.chart.addLineSeries({ color: intervalColors['1H'] });


      const setChartInterval = (interval: string) => {
        this.currentInterval = interval;
        const data = this.seriesesData.get(interval) || []; // ??
        this.lineSeries!.setData(data);
        this.lineSeries!.applyOptions({ color: intervalColors[interval] });
        this.chart.timeScale().applyOptions({
          timeVisible: interval === '1H',
          rightOffset: interval === '1H' ? 10 : 20,
          barSpacing: interval === '1H' ? 5 : 10,
        })
        this.chart.timeScale().fitContent();
      }

      setChartInterval('1H');

      const intervals = ['1H', '1D', '1M'];
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