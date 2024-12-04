import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { IValueIndice } from '../../../interfaces/indices-value';
import 'chartjs-adapter-luxon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-chart-indice',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './chart-indice.component.html',
  styleUrl: './chart-indice.component.css'
})
export class ChartIndiceComponent {

  @Input() dataForDay: { [key: string]: IValueIndice[] } = {};
  @Input() dataForMonth: { [key: string]: IValueIndice[] } = {};
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  private chart: Chart | null = null; // Referencia al gráfico
  private currentData: { [key: string]: IValueIndice[] } = {}; 
  constructor() { }

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      this.currentData = this.dataForDay;
      this.crateChartLine();
    }
  }

  crateChartLine() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      if (this.chart) {
        this.chart.destroy();
      }
      this.chart = new Chart(ctx, {
        type: 'line', // Tipo de gráfico: línea
        data: {
          labels: Object.keys(this.currentData).map(date => new Date(date)), // Usando las claves de 'data' como etiquetas (eje X)
          datasets: this.createDatasets(),
        },
        options: {
          responsive: true,
          maintainAspectRatio: true, // Ajustar el gráfico según el contenedor
          scales: {
            x: {
              title: {
                display: true,
                text: 'Tiempo', // Título del eje X
              },
            },
            y: {
              title: {
                display: true,
                text: 'Valor', // Título del eje Y
              },
            },
          },
          plugins: {
            tooltip: {
              enabled: true, // Mostrar tooltips
              callbacks: {
                label: (tooltipItem) => `Valor: ${tooltipItem.formattedValue}`,
              },
            },
          },
          elements: {
            line: {
              borderWidth: 2, // Grosor de la línea
            },
            point: {
              radius: 3, // Tamaño de los puntos
            },
          },
        },
      });
    }
  }

  // Preparar los datasets para Chart.js
  createDatasets() {
    const datasets: any = [];
    Object.keys(this.currentData).forEach((key) => {
      const areaData = this.currentData[key];
      if (areaData) {
        const chartData = areaData.map((i) => ({
          x: `${i.fecha}T${i.hora}`, // Tiempo en el que ocurrió el valor
          y: i.valorIndice, // El valor que quieres graficar
        }));
        // Agregar el dataset para cada área
        datasets.push({
          label: key, // Nombre del dataset
          data: chartData,
          borderColor: this.getRandomColor(), // Color aleatorio para la línea
          backgroundColor: 'rgba(255, 255, 255, 0.1)', // Color de fondo debajo de la línea
          fill: false, // Rellenar el área debajo de la línea
          tension: 0.4, // Suavizado de la línea
        });
      }
    });
    return datasets;
  }

  // Generar un color aleatorio para cada línea
  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  changeData(type: 'day' | 'month'): void {
    this.currentData = type === 'day' ? this.dataForDay : this.dataForMonth;
    this.crateChartLine();
  }
}