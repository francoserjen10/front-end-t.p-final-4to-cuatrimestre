import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICotizacion } from '../interfaces/cotizacion';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {

  private cotizacionSubject = new BehaviorSubject<ICotizacion | null>(null);
  cotizacion$ = this.cotizacionSubject.asObservable();

  private variabilidadSubject = new BehaviorSubject<string>('');
  variabilidad$ = this.variabilidadSubject.asObservable();

  constructor() { }

  // Método para actualizar la cotización
  updateCotizacion(cotizacion: ICotizacion) {
    this.cotizacionSubject.next(cotizacion);
  }

  // Método para actualizar la variabilidad
  updateVariabilidad(variabilidad: string) {
    this.variabilidadSubject.next(variabilidad);
  }
}
