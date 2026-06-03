import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { AuthService } from '../../core/services/auth.service';
import { DataService } from '../../core/services/data.service';
import { Auditoria, SeccionS } from '../../models/auditoria.model';
import { Area } from '../../models/area.model';

@Component({
  selector: 'app-auditoria-form',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './auditoria-form.component.html',
  styleUrl: './auditoria-form.component.css'
})
export class AuditoriaFormComponent implements OnInit {

  area: Area | null = null;
  auditoria: Auditoria | null = null;
  seccionActual = 0;
  enviada = false;
  fueraDeTiempo = false;
  yaCompletada = false;

  mesActual = 5;
  anioActual = 2026;
  diaLimite = 15;

  secciones: SeccionS[] = [
    {
      nombre: 'SEIRI', nombreEs: 'Clasificar', hallazgo: '',
      items: [
        { id: '1.1', pregunta: '¿Existe una regla para identificar y separar los artículos innecesarios u obsoletos?', puntuacion: -1 },
        { id: '1.2', pregunta: 'Se ha establecido una lista de artículos requeridos en el área de trabajo.', puntuacion: -1 },
        { id: '1.3', pregunta: 'De acuerdo a la lista de artículos requeridos, ¿hay artículos innecesarios u obsoletos en el lugar de trabajo?', puntuacion: -1 },
        { id: '1.4', pregunta: 'Los artículos requeridos están en buenas condiciones para su uso.', puntuacion: -1 },
        { id: '1.5', pregunta: 'Los pasillos y áreas de trabajo están libres de obstáculos y artículos innecesarios.', puntuacion: -1 },
        { id: '1.6', pregunta: '¿Los artículos innecesarios fueron enviados al área de cuarentena, desechados, reubicados o vendidos?', puntuacion: -1 },
        { id: '1.7', pregunta: 'En caso de tener objetos en malas condiciones, ¿ya se tiene un plan de acción para la reparación?', puntuacion: -1 },
      ]
    },
    {
      nombre: 'SEITON', nombreEs: 'Ordenar', hallazgo: '',
      items: [
        { id: '2.1', pregunta: 'Hay ubicaciones definidas para cada elemento del área (equipo, máquinas, herramientas, materiales, etc).', puntuacion: -1 },
        { id: '2.2', pregunta: 'El piso de las áreas se ha grabado de acuerdo a la señalización (pasillos, zonas de cruce, etc.).', puntuacion: -1 },
        { id: '2.3', pregunta: '¿Hay un Layout adecuado? FGC-002 Estándar 5S.', puntuacion: -1 },
        { id: '2.4', pregunta: '¿Los artículos tienen identificación y señalización con colores y etiquetado?', puntuacion: -1 },
        { id: '2.5', pregunta: 'Se respetan las ubicaciones y etiquetas de cada artículo.', puntuacion: -1 },
        { id: '2.6', pregunta: 'Hay información visual que comunica la organización de áreas y está actualizada.', puntuacion: -1 },
        { id: '2.7', pregunta: 'Es posible identificar cuando algo está fuera de lugar.', puntuacion: -1 },
        { id: '2.8', pregunta: 'Es posible encontrar cualquier elemento de la lista de artículos en 30 segundos o menos.', puntuacion: -1 },
      ]
    },
    {
      nombre: 'SEISO', nombreEs: 'Limpiar', hallazgo: '',
      items: [
        { id: '3.1', pregunta: 'Las áreas de trabajo están limpias.', puntuacion: -1 },
        { id: '3.2', pregunta: 'Las herramientas y los artículos del área están limpios y en buenas condiciones.', puntuacion: -1 },
        { id: '3.3', pregunta: 'Se han establecido métodos para evitar que las áreas o elementos se ensucien.', puntuacion: -1 },
        { id: '3.4', pregunta: 'Se han establecido programas de limpieza y las actividades están documentadas.', puntuacion: -1 },
        { id: '3.5', pregunta: 'Los suministros y equipos de limpieza necesarios están disponibles y en buenas condiciones.', puntuacion: -1 },
        { id: '3.6', pregunta: '¿Están los contenedores y basura reciclable en buenas condiciones?', puntuacion: -1 },
        { id: '3.7', pregunta: 'La apariencia de los miembros del equipo se ve limpia (uniforme, zapatos, etc.).', puntuacion: -1 },
      ]
    },
    {
      nombre: 'SEIKETSU', nombreEs: 'Estandarizar', hallazgo: '',
      items: [
        { id: '4.1', pregunta: 'Se han estandarizado códigos de colores para delimitaciones en piso, etiquetas en herramientas y máquinas.', puntuacion: -1 },
        { id: '4.2', pregunta: 'Se han estandarizado muebles, herramientas, elementos de trabajo y materiales.', puntuacion: -1 },
        { id: '4.3', pregunta: 'Se ha estandarizado el uso de equipos de seguridad (EPP) y se muestran en las operaciones.', puntuacion: -1 },
        { id: '4.4', pregunta: 'Se ha establecido un manual de estandarización de 5S y está disponible en el área.', puntuacion: -1 },
      ]
    },
    {
      nombre: 'SHITSUKE', nombreEs: 'Disciplina', hallazgo: '',
      items: [
        { id: '5.1', pregunta: '¿Las personas en el área han recibido capacitación en 5S y conocen la metodología?', puntuacion: -1 },
        { id: '5.2', pregunta: '¿Todas las personas están involucradas en las actividades de 5S, cumpliendo los estándares definidos?', puntuacion: -1 },
        { id: '5.3', pregunta: 'Las personas saben en qué lugar pueden encontrar los procedimientos y estándares de 5S.', puntuacion: -1 },
        { id: '5.4', pregunta: 'El resultado de 5S y los indicadores del área, ¿son informados a todos?', puntuacion: -1 },
        { id: '5.5', pregunta: 'Se encuentra publicado el plan de acción para el seguimiento de hallazgos y mejoras.', puntuacion: -1 },
        { id: '5.6', pregunta: 'Los responsables dieron seguimiento a los hallazgos de la última auditoría.', puntuacion: -1 },
      ]
    }
  ];

  meses = ['', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    get nombreMes(): string {
    return this.meses[this.mesActual];
    }

  coloresSecciones: { [key: string]: string } = {
    'SEIRI': '#27ae60',
    'SEITON': '#2980b9',
    'SEISO': '#e91e8c',
    'SEIKETSU': '#e67e22',
    'SHITSUKE': '#2c3e50'
  };

  constructor(public auth: AuthService, private dataService: DataService) {}

  ngOnInit() {
    const usuario = this.auth.getUsuarioActual();
    if (!usuario) return;

    const hoy = new Date();
    this.fueraDeTiempo = hoy.getDate() > this.diaLimite && hoy.getMonth() + 1 === this.mesActual;

    const areas = this.dataService.getAreasPorAuditor(usuario.id);
    if (areas.length > 0) this.area = areas[0];

    const auditoriaExistente = this.dataService.getAuditoriaPorAuditorYMes(
      usuario.id, this.mesActual, this.anioActual
    );

    if (auditoriaExistente) {
      this.yaCompletada = true;
      this.auditoria = auditoriaExistente;
      this.secciones = auditoriaExistente.secciones;
    }
  }

  get seccion(): SeccionS {
    return this.secciones[this.seccionActual];
  }

  get progresoSeccion(): number {
    const respondidos = this.seccion.items.filter(i => i.puntuacion >= 0).length;
    return Math.round((respondidos / this.seccion.items.length) * 100);
  }

  get progresoTotal(): number {
    const total = this.secciones.reduce((sum, s) => sum + s.items.length, 0);
    const respondidos = this.secciones.reduce((sum, s) =>
      sum + s.items.filter(i => i.puntuacion >= 0).length, 0);
    return Math.round((respondidos / total) * 100);
  }

  get seccionCompleta(): boolean {
    return this.seccion.items.every(i => i.puntuacion >= 0);
  }

  get todasCompletas(): boolean {
    return this.secciones.every(s => s.items.every(i => i.puntuacion >= 0));
  }

  setPuntuacion(itemId: string, valor: number) {
    const item = this.seccion.items.find(i => i.id === itemId);
    if (item) item.puntuacion = valor;
  }

  siguienteSeccion() {
    if (this.seccionActual < this.secciones.length - 1) this.seccionActual++;
  }

  seccionAnterior() {
    if (this.seccionActual > 0) this.seccionActual--;
  }

  irASeccion(i: number) {
    this.seccionActual = i;
  }

  calcularPromedio(seccion: SeccionS): number {
    const items = seccion.items.filter(i => i.puntuacion >= 0);
    if (items.length === 0) return 0;
    return items.reduce((sum, i) => sum + i.puntuacion, 0) / (items.length * 5);
  }

  enviarAuditoria() {
    if (!this.area || !this.auth.getUsuarioActual()) return;

    const usuario = this.auth.getUsuarioActual()!;
    const seccionesConPromedio = this.secciones.map(s => ({
      ...s,
      promedio: this.calcularPromedio(s)
    }));

    const promedioGeneral = seccionesConPromedio.reduce(
      (sum, s) => sum + (s.promedio || 0), 0) / seccionesConPromedio.length;

    const nuevaAuditoria: Auditoria = {
      id: Date.now(),
      areaId: this.area.id,
      areaNombre: this.area.nombre,
      departamento: this.area.departamento,
      auditorId: usuario.id,
      auditorNombre: usuario.nombre,
      fecha: new Date().toISOString().split('T')[0],
      mes: this.mesActual,
      anio: this.anioActual,
      secciones: seccionesConPromedio,
      promedioGeneral,
      completada: true,
      entregadoATiempo: !this.fueraDeTiempo
    };

    this.dataService.guardarAuditoria(nuevaAuditoria);
    this.enviada = true;
  }

  getColorSeccion(nombre: string): string {
    return this.coloresSecciones[nombre] || '#1a2f5e';
  }
}