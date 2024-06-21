import {MatInputModule} from '@angular/material/input';
import { Component, OnInit } from '@angular/core';
import { ReporteService } from '../../Services/reporte.service';
import {MatCell, MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ConsumoRecurso, EventoSistema, Lombriz, Mantenimiento, Reporte, Sustrato } from '../../Interfaces/reporte.interface';
import {MatIconModule} from '@angular/material/icon';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { CdkTableModule } from '@angular/cdk/table';
import {MatCardModule} from '@angular/material/card';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
            oConsumoRecursos: reporte.oConsumoRecursos || [], // Manejar caso donde oConsumoRecursos puede ser undefined
            oEventoSistemas: reporte.oEventoSistemas || [], // Manejar caso donde oEventoSistemas puede ser undefined
            oLombrizs: reporte.oLombrizs || [], // Manejar caso donde oLombrizs puede ser undefined
            oMantenimientos: reporte.oMantenimientos || [], // Manejar caso donde oMantenimientos puede ser undefined
            oSustratos: reporte.oSustratos || [] // Manejar caso donde oSustratos puede ser undefined
          }
        }));
      },
      error => {
        console.error('Error al obtener los reportes:', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  toggleDetalle(reporte: Reporte) {
    this.expandedElement = this.expandedElement === reporte ? null : reporte;
  }

  isExpansionDetailRow(index: number, row: any): boolean {
    return row.detalles !== undefined;
  }

  descargarPDF(reporte: Reporte) {
    const doc = new jsPDF();
  
    // Título principal del reporte
    doc.setFontSize(18);
    doc.text('Reporte Detallado', 14, 15);
  
    // Separador visual
    doc.setLineWidth(0.5);
    doc.line(14, 18, 100, 18); // Línea horizontal bajo el título
  
    // Información básica del reporte
    doc.setFontSize(12);
    doc.text(`Fecha de Reporte: ${this.formatDate(reporte.FechaReporte)}`, 14, 25);
    doc.text(`Tipo de Reporte: ${reporte.oFKTipoReporte?.NomTipoReporte}`, 14, 35);
  
    let finalY = 45;
  
    const detalles = reporte.detalles;
    const secciones = [
      { title: 'Consumo de Recursos', data: detalles.oConsumoRecursos, mapping: { CantAguaConsumo: 'Cantidad de Agua', CantEnergiaConsumo: 'Cantidad de Energía', DescConsumo: 'Descripción' } },
      { title: 'Eventos de Sistemas', data: detalles.oEventoSistemas, mapping: { DescEvento: 'Descripción', AccionEvento: 'Acción', AnomaliaEvento: 'Anomalía' } },
      { title: 'Lombrices', data: detalles.oLombrizs, mapping: { EspecieLombriz: 'Especie', PesoLombriz: 'Peso', LongitudLombriz: 'Longitud', EtapaReprLombriz: 'Etapa de Reproducción' } },
      { title: 'Mantenimientos', data: detalles.oMantenimientos, mapping: { TipoMantenimiento: 'Tipo', DescMantenimiento: 'Descripción' } },
      { title: 'Sustratos', data: detalles.oSustratos, mapping: { PhSustrato: 'pH', ComposSustrato: 'Composición', NivNutSustrato: 'Nivel de Nutrientes', TempSustrato: 'Temperatura', HumSustrato: 'Humedad' } }
    ];
  
    secciones.forEach((seccion, index) => {
      if (seccion.data.length > 0) {
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 255); // Color azul para los títulos de sección
        doc.text(seccion.title, 14, finalY + 10);
  
        // Filtrar las claves para excluir las PK, FK y oFKTipoReporte
        const keys = Object.keys(seccion.data[0]) as (keyof (ConsumoRecurso | EventoSistema | Lombriz | Mantenimiento | Sustrato))[];
        const filteredKeys = keys.filter(key => typeof key === 'string' && !(key as string).startsWith('Pk') && !(key as string).startsWith('Fk') && key !== 'oFKusrReporte');
  
        // Mapear los valores a cadenas de texto utilizando el mapeo definido
        const values = seccion.data.map(item => filteredKeys.map(key => {
          if (item[key] !== undefined && item[key] !== null) {
            const value = item[key];
            const unit = this.getUnitForKey(key);
            return `${value} ${unit}`;
          } else {
            return '';
          }
        }));
  
        // Generar la tabla con autoTable
        doc.autoTable({
          head: [filteredKeys.map(key => this.capitalizeFirstLetter(seccion.mapping[key] || key as string))], // Capitalizar la primera letra de las columnas
          body: values,
          startY: finalY + 15,
          theme: 'grid', // Añadir un borde alrededor de las celdas
          margin: { left: 14 } // Alinear la tabla con el resto del contenido
        });
  
        finalY = (doc as any).lastAutoTable.finalY || 20; // Actualizar finalY asegurando un valor inicial si es undefined
      }
    });
  
    // Guardar el PDF con un nombre único
    doc.save(`reporte_${reporte.PkusrReporte}.pdf`);
  }
  
  // Función para formatear la fecha
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });
  }
  
  // Función para capitalizar la primera letra de una cadena
  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  // Función para obtener la unidad correspondiente a una clave
  getUnitForKey(key: string): string {
    switch (key) {
      case 'PesoLombriz':
        return 'gramos';
      case 'LongitudLombriz':
        return 'cm';
      case 'TempSustrato':
        return '°C';
      case 'HumSustrato':
        return '%';
      case 'CantAguaConsumo':
        return 'litros';
      case 'CantEnergiaConsumo':
        return 'kWh';
      default:
        return ''; // Si no hay unidad definida, retornar cadena vacía
    }
  }
}