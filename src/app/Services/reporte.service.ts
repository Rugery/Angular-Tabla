import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reporte } from '../Interfaces/reporte.interface';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  apiUrl = 'http://localhost:5240/api/Lombricultivo/ListaReportePorUsuario';
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOlsiMzY4MmQ1MWMtNjc1OS00Nzc2LTkyNTQtZTBkOTI5YzZhOWE2IiwiYWxhbkBnbWFpbC5jb20iXSwibmJmIjoxNzE4ODUxODM1LCJleHAiOjE3MTg4NTQ4MzUsImlhdCI6MTcxODg1MTgzNX0.FcGon-P1w81ZSBRM_hsN0W1akabCBxmuT4647fFzLPE';
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