import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { error } from 'console';
import { Observable } from 'rxjs';
import { ICotizacion } from '../interfaces/cotizacion';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  apiUrl = environment.apiURL;

  constructor(private http: HttpClient) { }

  //Obtener las ultimas cotizaciones
  getLastCotizaciones(): Observable<any> {
    const cotizaciones = this.http.get<any>(`${this.apiUrl}/cotizaciones/last-cot`);
    console.log('service db', cotizaciones)
    return cotizaciones;
  }
}
