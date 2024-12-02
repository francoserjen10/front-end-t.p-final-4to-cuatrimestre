import { AreaData, Time, UTCTimestamp } from "lightweight-charts";
import { ICotizacion } from "../interfaces/cotizacion";
import { IValueIndice } from "../interfaces/indices-value";
import { DateTime } from 'luxon';

export class Util {

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
        const weekdaysCotizaciones = cotizaciones.filter((cotMarket) => {
            const day = new Date(cotMarket.fecha).getDay();
            return day >= 0 && day <= 4;
        });

        const cotizacionesPorDia: Record<string, ICotizacion[]> = {};
        weekdaysCotizaciones.forEach((cotizacion) => {
            const dayKey = cotizacion.fecha.split('T')[0];
            if (!cotizacionesPorDia[dayKey]) {
                cotizacionesPorDia[dayKey] = [];
            }
            cotizacionesPorDia[dayKey].push(cotizacion);
        });

        const promediosPorDia: ICotizacion[] = Object.values(cotizacionesPorDia).map((cotizaciones) => {
            const promedio =
                cotizaciones.reduce((sum, cot) => sum + cot.cotization, 0) /
                cotizaciones.length;
            const baseCotizacion = cotizaciones[0];
            return {
                ...baseCotizacion,
                cotization: promedio,
            };
        });
        return promediosPorDia;
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

    groupByCompany(cotizaciones: ICotizacion[]): { [key: string]: ICotizacion[] } {
        return cotizaciones.reduce((acc, cotizacion) => {
            if (!acc[cotizacion.empresa]) {
                acc[cotizacion.empresa] = [];
            }
            acc[cotizacion.empresa].push(cotizacion);
            return acc;
        }, {} as { [key: string]: ICotizacion[] });
    }

    // ----------------------- INDICES
    groupByIndice(indices: IValueIndice[]): { [key: string]: IValueIndice[] } {
        return indices.reduce((acc, indice) => {
            if (!acc[indice.codigoIndice]) {
                acc[indice.codigoIndice] = [];
            }
            acc[indice.codigoIndice].push(indice);
            return acc;
        }, {} as { [key: string]: IValueIndice[] });
    }
}
