import { Injectable } from '@angular/core';
import { ICotizacion } from '../interfaces/cotizacion';
import { AreaData, Time, UTCTimestamp, WhitespaceData } from 'lightweight-charts';

@Injectable({
  providedIn: 'root'
})
export class HandleDateTimeValueService {

  constructor() { }

  transformDateAndTimeInTimestamp(cotizaciones: ICotizacion[]): AreaData<Time>[] {
    return cotizaciones.map((data) => {
      const combinedDateTime = `${data.fecha}T${data.hora}:00Z`;
      const timestamp: UTCTimestamp = (new Date(combinedDateTime).getTime() / 1000) as UTCTimestamp;
      return {
        time: timestamp,
        value: data.cotization
      };
    });
  }

}
