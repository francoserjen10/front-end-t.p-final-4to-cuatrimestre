import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AreaData, createChart, ISeriesApi, Time } from 'lightweight-charts';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-chart-cotizaciones',
  standalone: true,
  imports: [],
  templateUrl: './chart-cotizaciones.component.html',
  styleUrl: './chart-cotizaciones.component.css'
})
export class ChartCotizacionesComponent implements AfterViewInit, OnInit, OnChanges {

  @Input() forDay: AreaData<Time>[] = [];
  @Input() forMonth: AreaData<Time>[] = [];
  @Input() forYear: AreaData<Time>[] = [];

  private currentInterval: string = '1D'; // Intervalo seleccionado actualmente
  private seriesesData = new Map<string, AreaData<Time>[]>(); // Datos por intervalo
  private lineSeries: ISeriesApi<'Line'> | null = null; // Referencia a la serie de líneas
  private chart: any = null; // Referencia al gráfico
  private dataSubject = new Subject<{ forDay: any; forMonth: any; forYear: any }>();
  private originalSeriesData = new Map<string, AreaData<Time>[]>();
  private isMultiplied = false;
  constructor() { }

  ngOnInit(): void {
    this.seriesesData.set('1D', this.forDay || []);
    this.seriesesData.set('1M', this.forMonth || []);
    this.seriesesData.set('1A', this.forYear || []);
    this.originalSeriesData.set('1D', [...this.forDay]); // Clona los datos
    this.originalSeriesData.set('1M', [...this.forMonth]);
    this.originalSeriesData.set('1A', [...this.forYear]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['forHour'] || changes['forDay'] || changes['forMonth']) {
      this.originalSeriesData.set('1D', [...this.forDay]);
      this.originalSeriesData.set('1M', [...this.forMonth]);
      this.originalSeriesData.set('1A', [...this.forYear]);
      // Emite los datos al Subject cuando estén disponibles
      this.dataSubject.next({
        forDay: this.forDay,
        forMonth: this.forMonth,
        forYear: this.forYear,
      });
    }
  }

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
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
      buttonsContainer.style.flexDirection = 'row';
      buttonsContainer.style.gap = '8px';
      buttonsContainer.style.justifyContent = 'center'
      intervals.forEach((interval) => {
        const button = document.createElement('button');
        // Estilos de los botones
        button.style.all = 'initial';
        button.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif";
        button.style.fontSize = '16px';
        button.style.fontWeight = '510';
        button.style.lineHeight = '24px';
        button.style.letterSpacing = '-0.32px';
        button.style.padding = '8px 24px';
        button.style.margin = '8px 24px';
        button.style.color = 'rgba(19, 23, 34, 1)';
        button.style.backgroundColor = '#a6ff33';
        button.style.borderRadius = '8px';
        button.style.cursor = 'pointer';
        button.innerText = interval;
        button.addEventListener('click', () => setChartInterval(interval));
        // Estilos para hover y active (puedes usar eventos también)
        button.addEventListener('mouseover', () => {
          button.style.backgroundColor = '#FFAA00';
        });
        button.addEventListener('mouseout', () => {
          button.style.backgroundColor = '#a6ff33';
        });
        button.addEventListener('mousedown', () => {
          button.style.backgroundColor = '#FF0066';
        });
        button.addEventListener('mouseup', () => {
          button.style.backgroundColor = '#a6ff33';
        });
        buttonsContainer.appendChild(button);
      });
      const multiplyButton = document.createElement('button');
      multiplyButton.style.all = 'initial';
      multiplyButton.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif";
      multiplyButton.style.fontSize = '16px';
      multiplyButton.style.fontWeight = '510';
      multiplyButton.style.lineHeight = '24px';
      multiplyButton.style.letterSpacing = '-0.32px';
      multiplyButton.style.padding = '8px 24px';
      multiplyButton.style.margin = '8px 24px';
      multiplyButton.style.color = 'rgba(19, 23, 34, 1)';
      multiplyButton.style.backgroundColor = '#ff8000';
      multiplyButton.style.borderRadius = '8px';
      multiplyButton.style.cursor = 'pointer';
      multiplyButton.innerText = 'kr NOK';
      multiplyButton.addEventListener('click', () => {
        if (!this.isMultiplied) {
          const multiplyFactor = 11.07;
          intervals.forEach((interval) => {
            const data = this.seriesesData.get(interval);
            if (data) {
              const multipliedData = data.map((point) => ({
                time: point.time,
                value: point.value * multiplyFactor,
              }));
              this.seriesesData.set(interval, multipliedData);

              // Si el intervalo actual es el mismo, actualiza el gráfico directamente
              if (this.currentInterval === interval) {
                this.lineSeries!.setData(multipliedData);
              }
            }
          })
        }
        this.isMultiplied = true;
      });
      const restoreButton = document.createElement('button');
      restoreButton.style.all = 'initial';
      restoreButton.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif";
      restoreButton.style.fontSize = '16px';
      restoreButton.style.fontWeight = '510';
      restoreButton.style.lineHeight = '24px';
      restoreButton.style.letterSpacing = '-0.32px';
      restoreButton.style.padding = '8px 24px';
      restoreButton.style.margin = '8px 24px';
      restoreButton.style.color = 'rgba(19, 23, 34, 1)';
      restoreButton.style.backgroundColor = '#ff8000';
      restoreButton.style.borderRadius = '8px';
      restoreButton.style.cursor = 'pointer';
      restoreButton.innerText = '$ USD';
      restoreButton.addEventListener('click', () => this.restoreOriginalData());
      this.chart.timeScale().fitContent();
      buttonsContainer.appendChild(restoreButton);
      containerChart.appendChild(buttonsContainer);
      buttonsContainer.appendChild(multiplyButton);
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

  restoreOriginalData(): void {
    this.seriesesData = new Map(this.originalSeriesData); // Restaura los datos originales
    if (this.currentInterval) {
      const originalData = this.seriesesData.get(this.currentInterval);
      if (originalData) {
        this.lineSeries!.setData(originalData); // Actualiza la serie con los datos originales
      }
    }
    this.isMultiplied = false;
  }
}