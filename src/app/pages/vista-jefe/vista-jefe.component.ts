import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { AuthService } from '../../core/services/auth.service';
import { DataService } from '../../core/services/data.service';
import { Area } from '../../models/area.model';
import { GembaReporte } from '../gemba-walk/gemba-walk.component';

@Component({
  selector: 'app-vista-jefe',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './vista-jefe.component.html',
  styleUrl: './vista-jefe.component.css'
})
export class VistaJefeComponent implements OnInit {

  areas: Area[] = [];
  mesActual = 5;
  anioActual = 2026;
  meses = ['','Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

  areaSeleccionada: Area | null = null;
  hallazgos: { seccion: string, hallazgo: string, fotos: string[], items: any[] }[] = [];
  modalFotoAbierto = false;
  gembaReportes: GembaReporte[] = [];
  reporteSeleccionado: GembaReporte | null = null;
  fotoActual = '';

  constructor(public auth: AuthService, private dataService: DataService) {}

  ngOnInit() {
  const usuario = this.auth.getUsuarioActual();
  if (!usuario) return;
  this.areas = this.dataService.getAreasPorJefe(usuario.id);
  this.cargarGembaReportes();
}

  

  get nombreMes(): string { return this.meses[this.mesActual]; }

  seleccionarArea(area: Area) {
    this.areaSeleccionada = area;
    this.hallazgos = this.dataService.getHallazgosCriticosPorArea(
      area.id, this.mesActual, this.anioActual
    );
  }

  tieneAuditoria(areaId: number): boolean {
    return !!this.dataService.getAuditoriasPorArea(areaId, this.mesActual, this.anioActual);
  }

  getPromedio(areaId: number): number {
    const a = this.dataService.getAuditoriasPorArea(areaId, this.mesActual, this.anioActual);
    return a?.promedioGeneral || 0;
  }

  getColorPorcentaje(p: number): string {
    if (p >= 0.85) return 'verde';
    if (p >= 0.70) return 'amarillo';
    if (p >= 0.60) return 'naranja';
    return 'rojo';
  }

  abrirFoto(foto: string) {
    this.fotoActual = foto;
    this.modalFotoAbierto = true;
  }

  cerrarFoto() {
    this.modalFotoAbierto = false;
    this.fotoActual = '';
  }

  volverAreas() {
    this.areaSeleccionada = null;
    this.hallazgos = [];
  }
  cargarGembaReportes() {
  const guardados = localStorage.getItem('gembaReportes');
  if (guardados) {
    this.gembaReportes = JSON.parse(guardados);
  }
}

toggleEstadoMarcador(reporte: GembaReporte, marcadorIndex: number, estado: 'pendiente' | 'en-proceso' | 'resuelto') {
  reporte.marcadores[marcadorIndex].estado = estado;
  const todos: GembaReporte[] = JSON.parse(localStorage.getItem('gembaReportes') || '[]');
  const idx = todos.findIndex(r => r.id === reporte.id);
  if (idx >= 0) todos[idx] = reporte;
  localStorage.setItem('gembaReportes', JSON.stringify(todos));
}
}