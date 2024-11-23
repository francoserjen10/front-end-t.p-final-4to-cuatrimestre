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
      const timestamp: UTCTimestamp = (Date.parse(dateTimeUtc) / 1000) as UTCTimestamp;
      const timestampOslo: UTCTimestamp = (timestamp + 3600) as UTCTimestamp;
      return {
        time: timestampOslo,
        value: data.cotization,
      };
    });
  }

  filterByMarketHours(cotizaciones: ICotizacion[]): ICotizacion[] {
    return cotizaciones.filter((cotMarket) => {
      const hour = parseInt(cotMarket.hora);
      return hour >= 8 && hour <= 15;
    });
  }

  filterByWeekdays(cotizaciones: ICotizacion[]): ICotizacion[] {
    return cotizaciones.filter((cotMarket) => {
      const day = new Date(cotMarket.fecha).getDay();
      return day >= 0 && day <= 4;
    });
  }

  filterByMonths(cotizaciones: ICotizacion[]): ICotizacion[] {
    const uniqueMonths = new Set<string>();
    return cotizaciones.filter((cotMarket) => {
      const month = cotMarket.fecha.slice(0, 7);
      if (uniqueMonths.has(month)) {
        return false;
      }
      uniqueMonths.add(month);
      return true;
    });
  }
}