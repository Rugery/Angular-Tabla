import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reporte } from '../Interfaces/reporte.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  apiUrl = 'http://localhost:5240/api/Lombricultivo/ListaReportePorUsuario';
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOlsiMzY4MmQ1MWMtNjc1OS00Nzc2LTkyNTQtZTBkOTI5YzZhOWE2IiwiYWxhbkBnbWFpbC5jb20iXSwibmJmIjoxNzE4ODQ4Mjg1LCJleHAiOjE3MTg4NTEyODUsImlhdCI6MTcxODg0ODI4NX0.uUsPlUqaqvEwWeZc4kvMXzcgsJDZrjNbMm2WZFWXpTk';
  constructor(private httpClient:HttpClient) { }
  
  ngOnInit() {
    this.obtenerReportes();
  }
  obtenerReportes() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.httpClient.get<Reporte[]>(this.apiUrl, { headers }).pipe(
      map(reports => reports.map(report => ({
        NomTipoReporte: report.oFKTipoReporte.NomTipoReporte,
        FechaReporte: report.FechaReporte
      })))
    );
  } 
}