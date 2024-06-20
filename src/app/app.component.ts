import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaReporteComponent } from './Components/lista-reporte/lista-reporte.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ListaReporteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Angular-Tabla';
}
