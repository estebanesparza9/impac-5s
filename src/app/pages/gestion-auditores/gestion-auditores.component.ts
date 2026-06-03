import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { DataService } from '../../core/services/data.service';
import { Area } from '../../models/area.model';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-gestion-auditores',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NavbarComponent],
  templateUrl: './gestion-auditores.component.html',
  styleUrl: './gestion-auditores.component.css'
})
export class GestionAuditoresComponent implements OnInit {

  areas: Area[] = [];
  auditores: Usuario[] = [];
  jefes: Usuario[] = [];
  filtroDepto = '';
  departamentos: string[] = [];
  mensajeExito = '';
  mesActual = 5;
  anioActual = 2026;

  // Modal reasignar auditor
  modalReasignar = false;
  areaSeleccionada: Area | null = null;
  nuevoAuditorId: number = 0;

  // Modal agregar auditor
  modalAgregar = false;
  nuevoAuditor = { nombre: '', email: '', password: '1234' };

  // Modal eliminar auditor
  modalEliminar = false;
  auditorEliminarId: number = 0;

  // Modal cambiar jefe
  modalJefe = false;
  areaJefeSeleccionada: Area | null = null;
  nuevoJefeId: number = 0;

  // Aviso BD
  modalAviso = false;
  avisoMensaje = '';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.areas = this.dataService.getAreas();
    this.auditores = this.dataService.getUsuarios().filter(u => u.rol === 'auditor');
    this.jefes = this.dataService.getUsuarios().filter(u => u.rol === 'jefe');
    this.departamentos = [...new Set(this.areas.map(a => a.departamento))];
  }

  get areasFiltradas(): Area[] {
    if (!this.filtroDepto) return this.areas;
    return this.areas.filter(a => a.departamento === this.filtroDepto);
  }

  // Reasignar auditor
  abrirModalReasignar(area: Area) {
    this.areaSeleccionada = area;
    this.nuevoAuditorId = area.auditorAsignadoId;
    this.modalReasignar = true;
  }

  guardarReasignacion() {
    if (this.areaSeleccionada && this.nuevoAuditorId) {
      this.dataService.reasignarAuditor(this.areaSeleccionada.id, Number(this.nuevoAuditorId));
      this.areas = [...this.dataService.getAreas()];
      this.mostrarExito('✓ Auditor reasignado correctamente');
      this.modalReasignar = false;
    }
  }

  // Agregar auditor
  abrirModalAgregar() {
    this.nuevoAuditor = { nombre: '', email: '', password: '1234' };
    this.modalAgregar = true;
  }

  guardarNuevoAuditor() {
    this.modalAgregar = false;
    this.mostrarAviso('➕ Agregar Auditor', `En producción, el auditor "${this.nuevoAuditor.nombre}" sería registrado en la base de datos con email: ${this.nuevoAuditor.email}. Esta funcionalidad estará disponible con el backend conectado.`);
  }

  // Eliminar auditor
  abrirModalEliminar() {
    this.auditorEliminarId = 0;
    this.modalEliminar = true;
  }

  confirmarEliminar() {
    const auditor = this.auditores.find(a => a.id === Number(this.auditorEliminarId));
    this.modalEliminar = false;
    this.mostrarAviso('🗑 Eliminar Auditor', `En producción, el auditor "${auditor?.nombre || ''}" sería eliminado del sistema y sus áreas asignadas quedarían sin auditor. Esta funcionalidad estará disponible con el backend conectado.`);
  }

  // Cambiar jefe de área
  abrirModalJefe(area: Area) {
    this.areaJefeSeleccionada = area;
    this.nuevoJefeId = 0;
    this.modalJefe = true;
  }

  guardarCambioJefe() {
    const jefe = this.jefes.find(j => j.id === Number(this.nuevoJefeId));
    this.modalJefe = false;
    this.mostrarAviso('👤 Cambiar Jefe de Área', `En producción, el jefe "${jefe?.nombre || ''}" sería asignado como responsable del área "${this.areaJefeSeleccionada?.nombre}". Esta funcionalidad estará disponible con el backend conectado.`);
  }

  mostrarAviso(titulo: string, mensaje: string) {
    this.avisoMensaje = `<strong>${titulo}</strong><br><br>${mensaje}`;
    this.modalAviso = true;
  }

  mostrarExito(msg: string) {
    this.mensajeExito = msg;
    setTimeout(() => this.mensajeExito = '', 3000);
  }

  tieneAuditoria(areaId: number): boolean {
    return this.dataService.getAuditorias().some(
      a => a.areaId === areaId && a.mes === this.mesActual && a.anio === this.anioActual
    );
  }
}