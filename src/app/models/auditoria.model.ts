export interface ItemAuditoria {
  id: string;
  pregunta: string;
  puntuacion: number;
}

export interface SeccionS {
  nombre: 'SEIRI' | 'SEITON' | 'SEISO' | 'SEIKETSU' | 'SHITSUKE';
  nombreEs: string;
  items: ItemAuditoria[];
  hallazgo: string;
  fotos?: string[];
  promedio?: number;
}

export interface Auditoria {
  id: number;
  areaId: number;
  areaNombre: string;
  departamento: string;
  auditorId: number;
  auditorNombre: string;
  fecha: string;
  mes: number;
  anio: number;
  secciones: SeccionS[];
  promedioGeneral?: number;
  completada: boolean;
  entregadoATiempo: boolean;
}