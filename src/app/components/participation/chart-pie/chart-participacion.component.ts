import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-chart-participacion',
  standalone: true,
  imports: [],
  templateUrl: './chart-participacion.component.html',
  styleUrl: './chart-participacion.component.css'
})
export class ChartParticipacionComponent implements AfterViewInit {

  @Input() data: { [empresa: string]: number } = {};
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  constructor() { }

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      this.crateChartPie();
    }
  }

  crateChartPie() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: Object.keys(this.data),
          datasets: [
            {
              label: 'Participación de mercado',
              data: Object.values(this.data),
              backgroundColor: [
                'rgba(255, 99, 132, 0.3)',
                'rgba(54, 162, 235, 0.3)',
                'rgba(75, 192, 192, 0.3)',
                'rgba(153, 102, 255, 0.3)',
                'rgba(255, 159, 64, 0.3)',
                'rgba(255, 205, 86, 0.3)',
                'rgba(201, 203, 207, 0.3)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 205, 86, 1)',
                'rgba(201, 203, 207, 1)'
              ],
              borderWidth: 2,
              hoverOffset: 10
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          animation: {
            duration: 1000,
            easing: 'easeOutBounce'
          },
          plugins: {
            legend: {
              position: 'top',
              display: true,
              labels: {
                font: {
                  size: 14,
                  family: "'Helvetica Neue', 'Arial', sans-serif"
                },
                color: '#333'
              }
            },
            tooltip: {
              enabled: true,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              titleFont: {
                size: 16,
                family: "'Helvetica Neue', 'Arial', sans-serif",
                weight: 'bold'
              },
              callbacks: {
                label: (ppc) => {
                  const empresa = ppc.label;
                  const participacion = ppc.raw;
                  return `${empresa}: ${participacion}%`;
                }
              }
            },
          }
        }
      });
    }
  }
}
