import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ICotizacion } from '../interfaces/cotizacion';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  apiUrl = environment.apiURL;

  constructor(private http: HttpClient) { }

  //Obtener todas las cotizaciones
  getAllCotizacionesOfBackEnd(codEmpresa: string): Observable<ICotizacion[]> {
    return this.http.get<ICotizacion[]>(`${this.apiUrl}/cotizaciones/all-cotizaciones/${codEmpresa}`);
  }
}
