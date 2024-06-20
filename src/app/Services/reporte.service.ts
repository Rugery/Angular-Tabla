import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reporte } from '../Interfaces/reporte.interface';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  apiUrl = 'http://localhost:5240/api/Lombricultivo/ListaReportePorUsuario';
  token = '';
  constructor(private httpClient:HttpClient) { }
  
  ngOnInit() {
    this.obtenerReportes();
  }
  obtenerReportes() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    return this.httpClient.get<Reporte[]>(this.apiUrl, { headers });
  } 
}