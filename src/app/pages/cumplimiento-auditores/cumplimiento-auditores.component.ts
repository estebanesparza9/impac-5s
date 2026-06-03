import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-cumplimiento-auditores',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  templateUrl: './cumplimiento-auditores.component.html',
  styleUrl: './cumplimiento-auditores.component.css'
})
export class CumplimientoAuditoresComponent implements OnInit {

  mesActual = 5;
  anioActual = 2026;
  meses = ['','Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

  filas: {
    auditor: string;
    area: string;
    departamento: string;
    programada: number;
    cumplimiento: number;
    pct: number;
    estado: 'completo' | 'tarde' | 'no-cumplió' | 'sin-area';
    fecha: string;
    promedio: number;
  }[] = [];

  get nombreMes(): string { return this.meses[this.mesActual]; }
  get totalProgramados(): number { return this.filas.filter(f => f.estado !== 'sin-area').length; }
  get totalCompletaron(): number { return this.filas.filter(f => f.cumplimiento > 0).length; }
  get totalNoCumplieron(): number { return this.filas.filter(f => f.estado === 'no-cumplió').length; }
  get pctParticipacion(): number {
    if (this.totalProgramados === 0) return 0;
    return Math.round((this.totalCompletaron / this.totalProgramados) * 100);
  }

  constructor(private dataService: DataService) {}

  ngOnInit() { this.cargarDatos(); }

  cargarDatos() {
    const auditores = this.dataService.getUsuariosPorRol('auditor');
    const areas = this.dataService.getAreas();
    const auditorias = this.dataService.getAuditoriasPorMes(this.mesActual, this.anioActual);

    this.filas = auditores.map(auditor => {
      const areasAuditor = areas.filter(a => a.auditorAsignadoId === auditor.id);
      const auditoria = auditorias.find(a => a.auditorId === auditor.id);

      if (areasAuditor.length === 0) {
        return {
          auditor: auditor.nombre,
          area: 'Sin área asignada',
          departamento: '—',
          programada: 0,
          cumplimiento: 0,
          pct: 0,
          estado: 'sin-area' as const,
          fecha: '',
          promedio: 0
        };
      }

      const completada = !!auditoria;
      const tarde = auditoria && !auditoria.entregadoATiempo;
      let estado: 'completo' | 'tarde' | 'no-cumplió' | 'sin-area' = 'no-cumplió';
      if (completada && tarde) estado = 'tarde';
      else if (completada) estado = 'completo';

      return {
        auditor: auditor.nombre,
        area: areasAuditor[0].nombre,
        departamento: areasAuditor[0].departamento,
        programada: 1,
        cumplimiento: completada ? 1 : 0,
        pct: completada ? 100 : 0,
        estado,
        fecha: auditoria?.fecha || '',
        promedio: auditoria?.promedioGeneral || 0
      };
    });
  }

  getEstadoLabel(estado: string): string {
    if (estado === 'completo') return '✓ Completó';
    if (estado === 'tarde') return '⚠ Entregó tarde';
    if (estado === 'no-cumplió') return '✗ No cumplió';
    return '— Sin área';
  }

  getColorPromedio(p: number): string {
    if (p === 0) return 'prom-vacio';
    if (p >= 0.85) return 'prom-verde';
    if (p >= 0.70) return 'prom-amarillo';
    if (p >= 0.60) return 'prom-naranja';
    return 'prom-rojo';
  }
}