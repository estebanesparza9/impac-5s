import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { DataService } from '../../core/services/data.service';
import { AuthService } from '../../core/services/auth.service';

export interface Marcador {
  x: number;
  y: number;
  numero: number;
  hallazgo: string;
  estado: 'pendiente' | 'en-proceso' | 'resuelto';
}

export interface GembaReporte {
  id: number;
  fecha: string;
  area: string;
  creadoPor: string;
  imagenBase64: string;
  marcadores: Marcador[];
  estado: 'pendiente' | 'en-proceso' | 'resuelto';
}

@Component({
  selector: 'app-gemba-walk',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NavbarComponent],
  templateUrl: './gemba-walk.component.html',
  styleUrl: './gemba-walk.component.css'
})
export class GembaWalkComponent {

  areas = [
    'Almacén de Materia Prima', 'Supply Chain', 'Logística', 'Operaciones',
    'Control de Calidad', 'EHS', 'Embarques', 'Producción Planta 1',
    'Producción Planta 2', 'Producción Planta 3', 'Mantenimiento',
    'Recursos Humanos', 'I&D Planta 1', 'I&D Planta 2'
  ];

  areaSeleccionada = '';
  imagenCargada = false;
  imagenBase64 = '';
  marcadores: Marcador[] = [];
  modoAgregar = false;
  reporteGuardado = false;
  reportes: GembaReporte[] = [];

  constructor(public auth: AuthService, private dataService: DataService) {
    this.cargarReportes();
    this.cargarReportesFake();
  }

  cargarReportes() {
    const guardados = localStorage.getItem('gembaReportes');
    if (guardados) this.reportes = JSON.parse(guardados);
  }

  cargarReportesFake() {
    if (this.reportes.length === 0) {
      this.reportes = [
        {
          id: 1,
          fecha: '2026-05-28',
          area: 'Producción Planta 1',
          creadoPor: 'Esmeralda González',
          imagenBase64: 'assets/evidencias/ev3.jpg',
          marcadores: [
            { x: 30, y: 45, numero: 1, hallazgo: 'Materiales sin clasificar bloqueando pasillo de emergencia', estado: 'pendiente' },
            { x: 65, y: 30, numero: 2, hallazgo: 'Etiquetas de identificación faltantes en estantes', estado: 'en-proceso' },
            { x: 50, y: 70, numero: 3, hallazgo: 'Basura acumulada en zona de trabajo', estado: 'pendiente' }
            ],
          estado: 'pendiente'
        },
        {
          id: 2,
          fecha: '2026-05-25',
          area: 'Almacén de Materia Prima',
          creadoPor: 'Esmeralda González',
          imagenBase64: 'assets/evidencias/ev1.jpg',
         marcadores: [
            { x: 40, y: 55, numero: 1, hallazgo: 'Tarimas fuera de su lugar designado', estado: 'pendiente' },
            { x: 75, y: 40, numero: 2, hallazgo: 'Señalización de piso desgastada, requiere reposición', estado: 'en-proceso' }
            ],
          estado: 'en-proceso'
        }
      ];
      localStorage.setItem('gembaReportes', JSON.stringify(this.reportes));
    }
  }

  onImagenSeleccionada(event: any) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagenBase64 = e.target.result;
      this.imagenCargada = true;
      this.marcadores = [];
      this.reporteGuardado = false;
    };
    reader.readAsDataURL(file);
  }

  toggleModoAgregar() {
    this.modoAgregar = !this.modoAgregar;
  }

  onClickImagen(event: MouseEvent) {
    if (!this.modoAgregar) return;
    const img = event.currentTarget as HTMLElement;
    const rect = img.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    this.marcadores.push({
      x, y,
      numero: this.marcadores.length + 1,
      hallazgo: '',
      estado: 'pendiente'
    });
    this.modoAgregar = false;
  }

  eliminarMarcador(i: number) {
    this.marcadores.splice(i, 1);
    this.marcadores.forEach((m, idx) => m.numero = idx + 1);
  }

  guardarReporte() {
    if (!this.areaSeleccionada || !this.imagenBase64) return;
    const reporte: GembaReporte = {
      id: Date.now(),
      fecha: new Date().toISOString().split('T')[0],
      area: this.areaSeleccionada,
      creadoPor: this.auth.getUsuarioActual()?.nombre || 'Admin',
      imagenBase64: this.imagenBase64,
      marcadores: this.marcadores,
      estado: 'pendiente'
    };
    this.reportes.unshift(reporte);
    localStorage.setItem('gembaReportes', JSON.stringify(this.reportes));
    this.reporteGuardado = true;
    this.imagenCargada = false;
    this.imagenBase64 = '';
    this.marcadores = [];
    this.areaSeleccionada = '';
  }

  limpiar() {
    this.imagenCargada = false;
    this.imagenBase64 = '';
    this.marcadores = [];
    this.areaSeleccionada = '';
    this.reporteGuardado = false;
  }
}