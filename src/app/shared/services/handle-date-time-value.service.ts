import { Injectable } from '@angular/core';
import { ICotizacion } from '../interfaces/cotizacion';
import { AreaData, Time, UTCTimestamp } from 'lightweight-charts';

@Injectable({
  providedIn: 'root'
})
export class HandleDateTimeValueService {

  constructor() { }

  transformDateAndTimeInTimestamp(cotizaciones: ICotizacion[]): AreaData<Time>[] {
    const cotizacionesInBusinessDays = this.filterByWeekdays(cotizaciones);
    const cotizacionesInBusinesHours = this.filterByMarketHours(cotizacionesInBusinessDays);
    return cotizacionesInBusinesHours.map((data) => {
      const dateTimeUtc = `${data.fecha}T${data.hora}Z`
      const timestamp: UTCTimestamp = (Date.parse(dateTimeUtc) / 1000) as UTCTimestamp;
      const timestampOslo: UTCTimestamp = (timestamp + 3600) as UTCTimestamp;
      return {
        time: timestampOslo,
        value: data.cotization,
      };
    });
  }

  filterByWeekdays(cotizaciones: ICotizacion[]): ICotizacion[] {
    return cotizaciones.filter((cotMarket) => {
      const day = new Date(cotMarket.fecha).getDay();
      return day >= 0 && day <= 4;
    });
  }

  filterByMarketHours(cotizaciones: ICotizacion[]): ICotizacion[] {
    return cotizaciones.filter((cotMarket) => {
      const hour = parseInt(cotMarket.hora);
      return hour >= 8 && hour <= 15;
    });
  }
}