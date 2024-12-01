import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ICotizacion } from '../interfaces/cotizacion';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  apiUrl = environment.apiURL;

  constructor(private http: HttpClient) { }

  getAllCotizacionesOfBackEnd(): Observable<ICotizacion[]> {
    return this.http.get<ICotizacion[]>(`${this.apiUrl}/cotizaciones/all-cotizaciones`);
  }

  //Obtener todas las cotizaciones
  getAllCotizacionesForCodEmpOfBackEnd(codEmpresa: string): Observable<ICotizacion[]> {
    return this.http.get<ICotizacion[]>(`${this.apiUrl}/cotizaciones/all-cotizaciones/${codEmpresa}`);
  }

  // Get ultimas cotizaciones de todas las empresas
  getLatestCotizacionesOfBackEnd(): Observable<ICotizacion[]> {
    return this.http.get<ICotizacion[]>(`${this.apiUrl}/cotizaciones/all-latest-cotizaciones`);
  }
}
