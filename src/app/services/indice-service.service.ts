import { Injectable } from '@angular/core';
import { IValueIndice } from '../interfaces/indices-value';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root'
})
export class IndiceServiceService {

  constructor() { }

  transformDateUTCToNorway(indice: IValueIndice[]): IValueIndice[] {
    return indice.map(data => {
      const dateTimeUtc = `${data.fecha}T${data.hora}Z`
      const norwayDate = DateTime.fromISO(dateTimeUtc).setZone('Europe/Oslo');
      return {
        ...data,
        fecha: norwayDate.toFormat('yyyy-MM-dd'),
        hora: norwayDate.toFormat('HH:mm')
      };
    });
  }

  groupByIndice(indices: IValueIndice[]): { [key: string]: IValueIndice[] } {
    return indices.reduce((acc, indice) => {
      if (!acc[indice.codigoIndice]) {
        acc[indice.codigoIndice] = [];
      }
      acc[indice.codigoIndice].push(indice);
      return acc;
    }, {} as { [key: string]: IValueIndice[] });
  }

  averageIndicesByDay(indices: IValueIndice[]): { [key: string]: number } {
    const dailySums: { [key: string]: { sum: number; count: number } } = {};

    indices.forEach((indice) => {
      const day = indice.fecha; // Tomar la fecha como clave para agrupar
      if (!dailySums[day]) {
        dailySums[day] = { sum: 0, count: 0 };
      }
      dailySums[day].sum += indice.valorIndice; // Sumar el valor del índice
      dailySums[day].count += 1; // Incrementar el contador
    });

    // Calcular el promedio para cada día
    const dailyAverages: { [key: string]: number } = {};
    Object.keys(dailySums).forEach((day) => {
      dailyAverages[day] = dailySums[day].sum / dailySums[day].count;
    });

    return dailyAverages;
  }
}
