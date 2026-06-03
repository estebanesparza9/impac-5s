import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-resultados-area',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  templateUrl: './resultados-area.component.html',
  styleUrl: './resultados-area.component.css'
})
export class ResultadosAreaComponent implements OnInit {

  mesActual = 5;
  anioActual = 2026;
  meses = ['','Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

  departamentos: {
    nombre: string;
    responsable: string;
    areas: {
      nombre: string;
      seiri: number[];
      seiton: number[];
      seiso: number[];
      seiketsu: number[];
      shitsuke: number[];
      hSeiri: number;
      hSeiton: number;
      hSeiso: number;
      hSeiketsu: number;
      hShitsuke: number;
      promedioSeiri: number;
      promedioSeiton: number;
      promedioSeiso: number;
      promedioSeiketsu: number;
      promedioShitsuke: number;
      promedioGeneral: number;
      auditada: boolean;
    }[];
  }[] = [];

  get nombreMes(): string { return this.meses[this.mesActual]; }

  constructor(private dataService: DataService) {}

  ngOnInit() { this.cargarDatos(); }

  cargarDatos() {
    const areas = this.dataService.getAreas();
    const auditorias = this.dataService.getAuditoriasPorMes(this.mesActual, this.anioActual);
    const deptoMap: { [key: string]: any } = {};

    areas.forEach(area => {
      const auditoria = auditorias.find(a => a.areaId === area.id);

      const getItems = (nombre: string): number[] => {
        if (!auditoria) return [];
        const s = auditoria.secciones.find(s => s.nombre === nombre);
        return s ? s.items.map(i => i.puntuacion) : [];
      };

      const getHallazgos = (nombre: string): number => {
        if (!auditoria) return 0;
        const s = auditoria.secciones.find(s => s.nombre === nombre);
        return s ? s.items.filter(i => i.puntuacion <= 2).length : 0;
      };

      const getPromedio = (nombre: string): number => {
        if (!auditoria) return 0;
        const s = auditoria.secciones.find(s => s.nombre === nombre);
        return s?.promedio || 0;
      };

      const fila = {
        nombre: area.nombre,
        seiri: getItems('SEIRI'),
        seiton: getItems('SEITON'),
        seiso: getItems('SEISO'),
        seiketsu: getItems('SEIKETSU'),
        shitsuke: getItems('SHITSUKE'),
        hSeiri: getHallazgos('SEIRI'),
        hSeiton: getHallazgos('SEITON'),
        hSeiso: getHallazgos('SEISO'),
        hSeiketsu: getHallazgos('SEIKETSU'),
        hShitsuke: getHallazgos('SHITSUKE'),
        promedioSeiri: getPromedio('SEIRI'),
        promedioSeiton: getPromedio('SEITON'),
        promedioSeiso: getPromedio('SEISO'),
        promedioSeiketsu: getPromedio('SEIKETSU'),
        promedioShitsuke: getPromedio('SHITSUKE'),
        promedioGeneral: auditoria?.promedioGeneral || 0,
        auditada: !!auditoria
      };

      if (!deptoMap[area.departamento]) {
        deptoMap[area.departamento] = {
          nombre: area.departamento,
          responsable: area.responsableDepto,
          areas: []
        };
      }
      deptoMap[area.departamento].areas.push(fila);
    });

    this.departamentos = Object.values(deptoMap);
  }

  getColorItem(val: number, auditada: boolean): string {
    if (!auditada || val < 0) return 'celda-vacia';
    if (val <= 1) return 'celda-critico';
    if (val === 2) return 'celda-alerta';
    if (val === 3) return 'celda-ok';
    return 'celda-bien';
  }

  getColorPromedio(val: number): string {
    if (val === 0) return 'prom-vacio';
    if (val >= 0.85) return 'prom-verde';
    if (val >= 0.70) return 'prom-amarillo';
    if (val >= 0.60) return 'prom-naranja';
    return 'prom-rojo';
  }

  formatPct(val: number): string {
    if (val === 0) return '—';
    return (val * 100).toFixed(0) + '%';
  }

  coloresDepto = [
    '#fce8e8','#e8f0fe','#e8f8ef','#fef8e8','#f3e8fe',
    '#e8fefe','#fff0e8','#f0e8fe','#e8fee8','#fee8f0'
  ];

  getColorDepto(i: number): string {
    return this.coloresDepto[i % this.coloresDepto.length];
  }
}