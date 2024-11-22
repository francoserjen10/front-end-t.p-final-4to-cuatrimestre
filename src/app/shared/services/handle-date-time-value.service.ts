import { Injectable } from '@angular/core';
import { ICotizacion } from '../interfaces/cotizacion';
import { AreaData, Time, UTCTimestamp } from 'lightweight-charts';

@Injectable({
  providedIn: 'root'
})
export class HandleDateTimeValueService {

  constructor() { }

  transformDateAndTimeInTimestamp(cotizaciones: ICotizacion[]): AreaData<Time>[] {
    return cotizaciones.map((data) => {
      const dateTimeUtc = `${data.fecha}T${data.hora}Z`
      const timestamp: UTCTimestamp = (Date.parse(dateTimeUtc) / 1000) as UTCTimestamp; // Convertir de milisegundos a segundos
      const timestampOslo: UTCTimestamp = (timestamp + 3600) as UTCTimestamp;
      return {
        time: timestampOslo,
        value: data.cotization
      };
    });
  }
}