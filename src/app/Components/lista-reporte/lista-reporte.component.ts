import {MatInputModule} from '@angular/material/input';
import { Component, OnInit } from '@angular/core';
import { ReporteService } from '../../Services/reporte.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-lista-reporte',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule,MatTableModule],
  templateUrl: './lista-reporte.component.html',
  styleUrl: './lista-reporte.component.css'
})
export class ListaReporteComponent implements OnInit{

  listaReportes: { NomTipoReporte: string, FechaReporte: string }[] = [];
  displayedColumns: string[] = ['Tipo Reporte', 'FechaReporte'];
  dataSource = new MatTableDataSource<{ NomTipoReporte: string, FechaReporte: string }>(this.listaReportes);

  constructor(private reporteService: ReporteService) { }

  ngOnInit(): void {
    this.obtenerReportes();
  }

  obtenerReportes(): void {
    this.reporteService.obtenerReportes().subscribe(
      (result: { NomTipoReporte: string, FechaReporte: string }[]) => {
        this.listaReportes = result;
        this.dataSource.data = this.listaReportes; // Actualizar dataSource con los datos obtenidos
        console.log('Reportes obtenidos:', result);
      },
      (error: any) => {
        console.error('Error al obtener reportes:', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
