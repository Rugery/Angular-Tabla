import {MatInputModule} from '@angular/material/input';
import { Component, OnInit } from '@angular/core';
import { ReporteService } from '../../Services/reporte.service';
import {MatCell, MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Reporte } from '../../Interfaces/reporte.interface';
import {MatIconModule} from '@angular/material/icon';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { CdkTableModule } from '@angular/cdk/table';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-lista-reporte',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule,MatTableModule, DatePipe, MatIconModule, NgFor, NgIf, MatCell, MatButton, CdkTableModule, MatCardModule],
  templateUrl: './lista-reporte.component.html',
  styleUrl: './lista-reporte.component.css'
})
export class ListaReporteComponent implements OnInit{
  displayedColumns: string[] = ['NomTipoReporte', 'FechaReporte', 'acciones'];
  dataSource = new MatTableDataSource<Reporte>();
  expandedElement: Reporte | null = null;

  constructor(private reporteService: ReporteService) { }

  ngOnInit() {
    this.obtenerDatos();
  }

  obtenerDatos() {
    this.reporteService.obtenerReportes().subscribe(
      data => {
        this.dataSource.data = data.map(reporte => ({
          ...reporte,
          detalleVisible: false,
          detalles: {
            oConsumoRecursos: reporte.oConsumoRecursos,
            oEventoSistemas: reporte.oEventoSistemas,
            oLombrizs: reporte.oLombrizs,
            oMantenimientos: reporte.oMantenimientos,
            oSustratos: reporte.oSustratos
          }
        }));
        console.log(this.dataSource.data);  // Para depuración
      },
      error => {
        console.error('Error al obtener los reportes:', error);
      }
    );
  }

  toggleDetalle(reporte: Reporte) {
    this.expandedElement = this.expandedElement === reporte ? null : reporte;
    console.log(this.expandedElement);  // Para depuración
  }

  isExpansionDetailRow = (index: number, row: Object) => row.hasOwnProperty('detalles');
}