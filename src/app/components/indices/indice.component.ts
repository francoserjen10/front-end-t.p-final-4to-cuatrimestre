import { Component, OnInit } from '@angular/core';
import { IValueIndice } from '../../interfaces/indices-value';
import { DbService } from '../../services/db.service';
import { ChartIndiceComponent } from './chart-line/chart-indice.component';
import { SideBarHomeComponent } from '../sideBar/side-bar-home.component';
import { IndiceServiceService } from '../../services/indice-service.service';

@Component({
  selector: 'app-indice',
  standalone: true,
  imports: [ChartIndiceComponent, SideBarHomeComponent],
  templateUrl: './indice.component.html',
  styleUrl: './indice.component.css'
})
export class IndiceComponent implements OnInit {

  originalsIndices: IValueIndice[] = [];
  indicesChartDataForDay: { [key: string]: IValueIndice[] } = {};
  indicesChartDataForMonth: { [key: string]: IValueIndice[] } = {};
  hasLoaded = false;

  constructor(private dbService: DbService, private indiceService: IndiceServiceService) { }

  ngOnInit(): void {
    this.getAllIndices();
  }

  getAllIndices() {
    this.dbService.getAllIndicesOfBackEnd()
      .subscribe({
        next: (value: IValueIndice[]) => {
          const norwayDate = this.indiceService.transformDateUTCToNorway(value);
          const sortedIndices = this.indicesSorted(norwayDate);
          const groupedIndices = this.indiceService.groupByIndice(sortedIndices);
          const filteredIndices = this.getLastTwoIndices(groupedIndices);
          this.indicesChartDataForDay = filteredIndices;
          this.indicesChartDataForMonth = this.calculateDailyAverages(groupedIndices)
        }, error(err) {
          console.error('Error al obtener los indices en el home', err);
        },
        complete: () => {
          this.hasLoaded = true;
        },
      });
  }

  indicesSorted(indices: IValueIndice[]) {
    const sortedIndices = indices.sort((a, b) => {
      const dateA = new Date(a.fecha + 'T' + a.hora);
      const dateB = new Date(b.fecha + 'T' + b.hora);
      return Number(dateA) - Number(dateB);
    });
    return sortedIndices;
  }

  calculateDailyAverages(groupedIndices: { [key: string]: IValueIndice[] }): { [key: string]: IValueIndice[] } {
    const processedData: { [key: string]: IValueIndice[] } = {};
    Object.keys(groupedIndices).forEach((key) => {
      const indices = groupedIndices[key];
      const dailyAverages = this.indiceService.averageIndicesByDay(indices); // Usa la función promedio

      // Transformar los datos para el formato del gráfico
      processedData[key] = Object.entries(dailyAverages).map(([fecha, promedio]) => ({
        fecha,
        valorIndice: promedio,
        hora: '', // No es necesario mostrar la hora
        codigoIndice: key, // Usamos la clave como el código del índice
      }));
    });
    return processedData;
  }

  getLastTwoIndices(groupedIndices: { [key: string]: IValueIndice[] }): { [key: string]: IValueIndice[] } {
    const result: { [key: string]: IValueIndice[] } = {};

    // Iterar sobre cada grupo de índices
    for (const key in groupedIndices) {
      if (groupedIndices.hasOwnProperty(key)) {
        const indices = groupedIndices[key];

        const uniqueIndices = indices.filter((value, index, self) => {
          // Comparamos el índice actual con todos los anteriores en el arreglo
          return index === self.findIndex((t) =>
            t.fecha === value.fecha && t.hora === value.hora && t.valorIndice === value.valorIndice
          );
        });

        // Ordenar los índices por fecha (de más reciente a más antiguo)
        const sortedIndices = uniqueIndices.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());

        // Tomar solo el último y anteúltimo índice
        if (sortedIndices.length >= 2) {
          const lastDate = new Date(sortedIndices[sortedIndices.length - 1].fecha).toISOString().split('T')[0];
          // const secondLastDate = new Date(sortedIndices[sortedIndices.length - 2].fecha).toISOString().split('T')[0];

          // Filtrar los índices que pertenecen a esas dos fechas
          const lastDayIndices = sortedIndices.filter(index => new Date(index.fecha).toISOString().split('T')[0] === lastDate);
          // const secondLastDayIndices = sortedIndices.filter(index => new Date(index.fecha).toISOString().split('T')[0] === secondLastDate);
          result[key] = [...lastDayIndices,];
        } else {
          // Si hay menos de 2 índices, solo agregar los disponibles
          result[key] = sortedIndices;
        }
      }
    }
    return result;
  }
}
