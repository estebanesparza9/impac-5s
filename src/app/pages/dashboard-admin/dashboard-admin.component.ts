import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { DataService } from '../../core/services/data.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent implements OnInit, AfterViewInit {

  @ViewChild('chartDepartamentos') chartDeptosRef!: ElementRef;
  @ViewChild('chartGlobal') chartGlobalRef!: ElementRef;

  mesActual = 5;
  anioActual = 2026;

  resumenDeptos: { departamento: string, promedio: number }[] = [];
  totalAuditores = 0;
  auditoresCompletaron = 0;
  promedioGlobal = 0;
  hallazgosCriticos: { area: string, seccion: string, hallazgo: string, puntuacion: number }[] = [];

  meses = ['', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.cargarDatos();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.crearGraficas();
    }, 100);
  }

  cargarDatos() {
    this.resumenDeptos = this.dataService.getResumenPorDepartamento(this.mesActual, this.anioActual);
    const auditorias = this.dataService.getAuditoriasPorMes(this.mesActual, this.anioActual);
    this.totalAuditores = this.dataService.getUsuarios().filter(u => u.rol === 'auditor').length;
    this.auditoresCompletaron = auditorias.filter(a => a.completada).length;

    if (auditorias.length > 0) {
      this.promedioGlobal = auditorias.reduce((sum, a) => sum + (a.promedioGeneral || 0), 0) / auditorias.length;
    }

    this.hallazgosCriticos = [];
    auditorias.forEach(a => {
      a.secciones.forEach(s => {
        s.items.forEach(item => {
          if (item.puntuacion <= 2) {
            this.hallazgosCriticos.push({
              area: a.areaNombre,
              seccion: s.nombreEs,
              hallazgo: item.pregunta,
              puntuacion: item.puntuacion
            });
          }
        });
      });
    });
  }

  crearGraficas() {
    const deptos = this.resumenDeptos;
    const colores = deptos.map(d =>
      d.promedio >= 0.85 ? '#27ae60' :
      d.promedio >= 0.70 ? '#f39c12' :
      d.promedio >= 0.60 ? '#e67e22' : '#e74c3c'
    );

    new Chart(this.chartDeptosRef.nativeElement, {
      type: 'bar',
      data: {
        labels: deptos.map(d => d.departamento.length > 15 ? d.departamento.substring(0, 15) + '...' : d.departamento),
        datasets: [{
          label: '% Cumplimiento',
          data: deptos.map(d => Math.round(d.promedio * 100)),
          backgroundColor: colores,
          borderRadius: 6,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.parsed.y}% cumplimiento`
            }
          }
        },
        scales: {
          y: {
            min: 0, max: 100,
            ticks: { callback: (v) => v + '%' },
            grid: { color: 'rgba(0,0,0,0.05)' }
          },
          x: { grid: { display: false } }
        }
      }
    });

    const pct = Math.round(this.promedioGlobal * 100);
    new Chart(this.chartGlobalRef.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [pct, 100 - pct],
          backgroundColor: [pct >= 85 ? '#27ae60' : pct >= 70 ? '#f39c12' : '#e74c3c', '#eef1f7'],
          borderWidth: 0,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '75%',
        plugins: { legend: { display: false }, tooltip: { enabled: false } }
      }
    });
  }

  getColorPorcentaje(promedio: number): string {
    if (promedio >= 0.85) return 'verde';
    if (promedio >= 0.70) return 'amarillo';
    if (promedio >= 0.60) return 'naranja';
    return 'rojo';
  }

  getColorPuntuacion(p: number): string {
    if (p === 0) return 'critico';
    if (p === 1) return 'critico';
    return 'alerta';
  }

  get nombreMes(): string {
    return this.meses[this.mesActual];
  }
}