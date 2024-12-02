import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { IValueIndice } from '../../../interfaces/indices-value';

@Component({
  selector: 'app-chart-indice',
  standalone: true,
  imports: [],
  templateUrl: './chart-indice.component.html',
  styleUrl: './chart-indice.component.css'
})
export class ChartIndiceComponent {

  @Input() data: { [key: string]: IValueIndice[] } = {};
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  constructor() { }

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      this.crateChartLine();
    }
  }

  crateChartLine() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'line', // Tipo de gráfico: línea
        data: {
          labels: Object.keys(this.data), // Usando las claves de 'data' como etiquetas (eje X)
          datasets: this.createDatasets(),
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Ajustar el gráfico según el contenedor
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
                label: (tooltipItem) => `Valor: ${tooltipItem.formattedValue}`, // Personalizar el contenido del tooltip
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

    Object.keys(this.data).forEach((key) => {
      const areaData = this.data[key];
      if (areaData) {
        const chartData = areaData.map((i) => ({
          x: i.fecha, // Tiempo en el que ocurrió el valor
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
}