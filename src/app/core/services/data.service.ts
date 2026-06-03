import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { Area } from '../../models/area.model';
import { Auditoria } from '../../models/auditoria.model';

@Injectable({ providedIn: 'root' })
export class DataService {
usuarios: Usuario[] = [
  { id: 1, nombre: 'Esmeralda González', email: 'admin@impac.com', password: 'admin123', rol: 'admin' },
  { id: 2, nombre: 'Brandon Lira', email: 'brandon@impac.com', password: '1234', rol: 'auditor' },
  { id: 3, nombre: 'Magda Gómez', email: 'magda@impac.com', password: '1234', rol: 'auditor' },
  { id: 4, nombre: 'Norberto Martínez', email: 'norberto@impac.com', password: '1234', rol: 'auditor' },
  { id: 5, nombre: 'Roberto Sánchez', email: 'roberto@impac.com', password: '1234', rol: 'auditor' },
  { id: 6, nombre: 'Santiago Ledezma', email: 'santiago@impac.com', password: '1234', rol: 'auditor' },
  { id: 7, nombre: 'Diego Bernal', email: 'diego@impac.com', password: '1234', rol: 'auditor' },
  { id: 8, nombre: 'Christian Gutiérrez', email: 'christian@impac.com', password: '1234', rol: 'auditor' },
  { id: 9, nombre: 'Mario Rodríguez', email: 'mario@impac.com', password: '1234', rol: 'auditor' },
  { id: 10, nombre: 'Alondra Vitela', email: 'alondra@impac.com', password: '1234', rol: 'auditor' },
  { id: 11, nombre: 'Brandon Lira', email: 'jefe.almacen@impac.com', password: '1234', rol: 'jefe', areaIds: [1,2,3,4,5,6] },
  { id: 12, nombre: 'Magda Gómez', email: 'jefe.supply@impac.com', password: '1234', rol: 'jefe', areaIds: [7] },
  { id: 13, nombre: 'Roberto Sánchez', email: 'jefe.operaciones@impac.com', password: '1234', rol: 'jefe', areaIds: [9] },
  { id: 14, nombre: 'Christian Gutiérrez', email: 'jefe.ehs@impac.com', password: '1234', rol: 'jefe', areaIds: [13] },
];

  areas: Area[] = [
    { id: 1, nombre: 'Almacén de Etiquetas', departamento: 'Almacén de Materia Prima', responsableDepto: 'Brandon Lira', auditorAsignadoId: 2, auditorAsignadoNombre: 'Brandon Lira' },
    { id: 2, nombre: 'Almacén Planta 1', departamento: 'Almacén de Materia Prima', responsableDepto: 'Brandon Lira', auditorAsignadoId: 2, auditorAsignadoNombre: 'Brandon Lira' },
    { id: 3, nombre: 'Oficina', departamento: 'Almacén de Materia Prima', responsableDepto: 'Brandon Lira', auditorAsignadoId: 2, auditorAsignadoNombre: 'Brandon Lira' },
    { id: 4, nombre: 'Pesaje, Escritorio y Área envases de retorno', departamento: 'Almacén de Materia Prima', responsableDepto: 'Brandon Lira', auditorAsignadoId: 2, auditorAsignadoNombre: 'Brandon Lira' },
    { id: 5, nombre: 'Silos de Carbonato P1 y Tanques Monómeros 1 y 2', departamento: 'Almacén de Materia Prima', responsableDepto: 'Brandon Lira', auditorAsignadoId: 2, auditorAsignadoNombre: 'Brandon Lira' },
    { id: 6, nombre: 'Tapanco Planta 1 de Materia Prima', departamento: 'Almacén de Materia Prima', responsableDepto: 'Brandon Lira', auditorAsignadoId: 2, auditorAsignadoNombre: 'Brandon Lira' },
    { id: 7, nombre: 'Oficina y baños de Supply Chain', departamento: 'Supply Chain', responsableDepto: 'Magda Gómez', auditorAsignadoId: 3, auditorAsignadoNombre: 'Magda Gómez' },
    { id: 8, nombre: 'Oficinas Logística Tráfico', departamento: 'Logística', responsableDepto: 'Norberto Martínez', auditorAsignadoId: 4, auditorAsignadoNombre: 'Norberto Martínez' },
    { id: 9, nombre: 'Oficina y baños de Dirección de Operaciones', departamento: 'Operaciones', responsableDepto: 'Roberto Sánchez', auditorAsignadoId: 5, auditorAsignadoNombre: 'Roberto Sánchez' },
    { id: 10, nombre: 'Laboratorio Planta 1', departamento: 'Control de Calidad', responsableDepto: 'Santiago Ledezma', auditorAsignadoId: 6, auditorAsignadoNombre: 'Santiago Ledezma' },
    { id: 11, nombre: 'Baños Planta 1', departamento: 'Control de Calidad', responsableDepto: 'Santiago Ledezma', auditorAsignadoId: 6, auditorAsignadoNombre: 'Santiago Ledezma' },
    { id: 12, nombre: 'Oficinas y Baños Investigación', departamento: 'I&D Planta 3', responsableDepto: 'Diego Bernal', auditorAsignadoId: 7, auditorAsignadoNombre: 'Diego Bernal' },
    { id: 13, nombre: 'Caseta Vigilancia y Estacionamiento', departamento: 'EHS', responsableDepto: 'Christian Gutiérrez', auditorAsignadoId: 8, auditorAsignadoNombre: 'Christian Gutiérrez' },
    { id: 14, nombre: 'Enrolladora, Estiba y Almacén Cintas', departamento: 'Producción Planta 2', responsableDepto: 'Mario Rodríguez', auditorAsignadoId: 9, auditorAsignadoNombre: 'Mario Rodríguez' },
    { id: 15, nombre: 'Laboratorio Planta 2 y Rack de muestras', departamento: 'I&D Planta 2', responsableDepto: 'Alondra Vitela', auditorAsignadoId: 10, auditorAsignadoNombre: 'Alondra Vitela' },
  ];

  auditorias: Auditoria[] = [
    {
      id: 1, areaId: 1, areaNombre: 'Almacén de Etiquetas', departamento: 'Almacén de Materia Prima',
      auditorId: 2, auditorNombre: 'Brandon Lira', fecha: '2026-05-10', mes: 5, anio: 2026,
      completada: true, entregadoATiempo: true, promedioGeneral: 0.814,
      secciones: [
        { nombre: 'SEIRI', nombreEs: 'Clasificar', hallazgo: 'Se encontraron artículos obsoletos sin identificar.', promedio: 0.771,
            fotos: ['assets/evidencias/ev2.jpg'],
            items: [{ id: '1.1', pregunta: '¿Existe una regla para identificar artículos innecesarios?', puntuacion: 4 }, { id: '1.2', pregunta: 'Se ha establecido una lista de artículos requeridos.', puntuacion: 4 }, { id: '1.3', pregunta: '¿Hay artículos innecesarios u obsoletos?', puntuacion: 4 }, { id: '1.4', pregunta: 'Los artículos están en buenas condiciones.', puntuacion: 4 }, { id: '1.5', pregunta: 'Los pasillos están libres de obstáculos.', puntuacion: 4 }, { id: '1.6', pregunta: '¿Artículos innecesarios fueron enviados a cuarentena?', puntuacion: 4 }, { id: '1.7', pregunta: '¿Hay plan de acción para objetos en mal estado?', puntuacion: 4 }] },
        { nombre: 'SEITON', nombreEs: 'Ordenar', hallazgo: 'Ninguno', promedio: 0.8,
          items: [{ id: '2.1', pregunta: 'Hay ubicaciones definidas para cada elemento.', puntuacion: 4 }, { id: '2.2', pregunta: 'El piso tiene señalización adecuada.', puntuacion: 4 }, { id: '2.3', pregunta: '¿Hay un Layout adecuado?', puntuacion: 4 }, { id: '2.4', pregunta: 'Los artículos tienen identificación y señalización.', puntuacion: 4 }, { id: '2.5', pregunta: 'Se respetan las ubicaciones y etiquetas.', puntuacion: 4 }, { id: '2.6', pregunta: 'Hay información visual actualizada.', puntuacion: 4 }, { id: '2.7', pregunta: 'Es posible identificar cuando algo está fuera de lugar.', puntuacion: 4 }, { id: '2.8', pregunta: 'Es posible encontrar cualquier elemento en 30 seg.', puntuacion: 4 }] },
        { nombre: 'SEISO', nombreEs: 'Limpiar', hallazgo: 'Ninguno', promedio: 0.886,
          items: [{ id: '3.1', pregunta: 'Las áreas de trabajo están limpias.', puntuacion: 4 }, { id: '3.2', pregunta: 'Las herramientas están limpias y en buenas condiciones.', puntuacion: 5 }, { id: '3.3', pregunta: 'Se han establecido métodos para evitar suciedad.', puntuacion: 4 }, { id: '3.4', pregunta: 'Hay programas de limpieza documentados.', puntuacion: 5 }, { id: '3.5', pregunta: 'Los suministros de limpieza están disponibles.', puntuacion: 4 }, { id: '3.6', pregunta: '¿Los contenedores están en buenas condiciones?', puntuacion: 5 }, { id: '3.7', pregunta: 'La apariencia del equipo se ve limpia.', puntuacion: 4 }] },
        { nombre: 'SEIKETSU', nombreEs: 'Estandarizar', hallazgo: 'Ninguno', promedio: 0.85,
          items: [{ id: '4.1', pregunta: 'Se han estandarizado códigos de colores.', puntuacion: 4 }, { id: '4.2', pregunta: 'Se han estandarizado muebles y herramientas.', puntuacion: 4 }, { id: '4.3', pregunta: 'Se ha estandarizado el uso de EPP.', puntuacion: 5 }, { id: '4.4', pregunta: 'Hay manual de estandarización 5S disponible.', puntuacion: 4 }] },
        { nombre: 'SHITSUKE', nombreEs: 'Disciplina', hallazgo: 'Ninguno', promedio: 0.767,
          items: [{ id: '5.1', pregunta: '¿Las personas recibieron capacitación en 5S?', puntuacion: 4 }, { id: '5.2', pregunta: '¿Todos están involucrados en actividades 5S?', puntuacion: 4 }, { id: '5.3', pregunta: 'Las personas saben dónde encontrar procedimientos.', puntuacion: 4 }, { id: '5.4', pregunta: 'Los resultados 5S son informados a todos.', puntuacion: 4 }, { id: '5.5', pregunta: 'Está publicado el plan de acción de seguimiento.', puntuacion: 3 }, { id: '5.6', pregunta: 'Los responsables dieron seguimiento a hallazgos.', puntuacion: 4 }] }
      ]
    },
    {
      id: 2, areaId: 7, areaNombre: 'Oficina y baños de Supply Chain', departamento: 'Supply Chain',
      auditorId: 3, auditorNombre: 'Magda Gómez', fecha: '2026-05-08', mes: 5, anio: 2026,
      completada: true, entregadoATiempo: true, promedioGeneral: 0.724,
      secciones: [
        { nombre: 'SEIRI', nombreEs: 'Clasificar', hallazgo: 'Falta lista de artículos requeridos actualizada.', promedio: 0.829,
          items: [{ id: '1.1', pregunta: '¿Existe una regla para identificar artículos innecesarios?', puntuacion: 4 }, { id: '1.2', pregunta: 'Se ha establecido una lista de artículos requeridos.', puntuacion: 3 }, { id: '1.3', pregunta: '¿Hay artículos innecesarios u obsoletos?', puntuacion: 4 }, { id: '1.4', pregunta: 'Los artículos están en buenas condiciones.', puntuacion: 5 }, { id: '1.5', pregunta: 'Los pasillos están libres de obstáculos.', puntuacion: 4 }, { id: '1.6', pregunta: '¿Artículos innecesarios fueron enviados a cuarentena?', puntuacion: 4 }, { id: '1.7', pregunta: '¿Hay plan de acción para objetos en mal estado?', puntuacion: 4 }] },
        { nombre: 'SEITON', nombreEs: 'Ordenar', hallazgo: 'Señalización de piso incompleta.', promedio: 0.875,
          items: [{ id: '2.1', pregunta: 'Hay ubicaciones definidas para cada elemento.', puntuacion: 4 }, { id: '2.2', pregunta: 'El piso tiene señalización adecuada.', puntuacion: 3 }, { id: '2.3', pregunta: '¿Hay un Layout adecuado?', puntuacion: 5 }, { id: '2.4', pregunta: 'Los artículos tienen identificación y señalización.', puntuacion: 5 }, { id: '2.5', pregunta: 'Se respetan las ubicaciones y etiquetas.', puntuacion: 4 }, { id: '2.6', pregunta: 'Hay información visual actualizada.', puntuacion: 4 }, { id: '2.7', pregunta: 'Es posible identificar cuando algo está fuera de lugar.', puntuacion: 5 }, { id: '2.8', pregunta: 'Es posible encontrar cualquier elemento en 30 seg.', puntuacion: 5 }] },
        { nombre: 'SEISO', nombreEs: 'Limpiar', hallazgo: 'Ninguno', promedio: 0.914,
          items: [{ id: '3.1', pregunta: 'Las áreas de trabajo están limpias.', puntuacion: 5 }, { id: '3.2', pregunta: 'Las herramientas están limpias y en buenas condiciones.', puntuacion: 4 }, { id: '3.3', pregunta: 'Se han establecido métodos para evitar suciedad.', puntuacion: 5 }, { id: '3.4', pregunta: 'Hay programas de limpieza documentados.', puntuacion: 4 }, { id: '3.5', pregunta: 'Los suministros de limpieza están disponibles.', puntuacion: 5 }, { id: '3.6', pregunta: '¿Los contenedores están en buenas condiciones?', puntuacion: 4 }, { id: '3.7', pregunta: 'La apariencia del equipo se ve limpia.', puntuacion: 5 }] },
        { nombre: 'SEIKETSU', nombreEs: 'Estandarizar', hallazgo: 'Ninguno', promedio: 0.8,
          items: [{ id: '4.1', pregunta: 'Se han estandarizado códigos de colores.', puntuacion: 4 }, { id: '4.2', pregunta: 'Se han estandarizado muebles y herramientas.', puntuacion: 4 }, { id: '4.3', pregunta: 'Se ha estandarizado el uso de EPP.', puntuacion: 4 }, { id: '4.4', pregunta: 'Hay manual de estandarización 5S disponible.', puntuacion: 4 }] },
        { nombre: 'SHITSUKE', nombreEs: 'Disciplina', hallazgo: 'Ninguno', promedio: 0.2,
          items: [{ id: '5.1', pregunta: '¿Las personas recibieron capacitación en 5S?', puntuacion: 1 }, { id: '5.2', pregunta: '¿Todos están involucrados en actividades 5S?', puntuacion: 1 }, { id: '5.3', pregunta: 'Las personas saben dónde encontrar procedimientos.', puntuacion: 1 }, { id: '5.4', pregunta: 'Los resultados 5S son informados a todos.', puntuacion: 1 }, { id: '5.5', pregunta: 'Está publicado el plan de acción de seguimiento.', puntuacion: 1 }, { id: '5.6', pregunta: 'Los responsables dieron seguimiento a hallazgos.', puntuacion: 1 }] }
      ]
    },
    {
      id: 3, areaId: 8, areaNombre: 'Oficinas Logística Tráfico', departamento: 'Logística',
      auditorId: 4, auditorNombre: 'Norberto Martínez', fecha: '2026-05-12', mes: 5, anio: 2026,
      completada: true, entregadoATiempo: true, promedioGeneral: 0.823,
      secciones: [
        { nombre: 'SEIRI', nombreEs: 'Clasificar', hallazgo: 'Ninguno', promedio: 0.743,
          items: [{ id: '1.1', pregunta: '¿Existe una regla para identificar artículos innecesarios?', puntuacion: 4 }, { id: '1.2', pregunta: 'Se ha establecido una lista de artículos requeridos.', puntuacion: 3 }, { id: '1.3', pregunta: '¿Hay artículos innecesarios u obsoletos?', puntuacion: 4 }, { id: '1.4', pregunta: 'Los artículos están en buenas condiciones.', puntuacion: 4 }, { id: '1.5', pregunta: 'Los pasillos están libres de obstáculos.', puntuacion: 4 }, { id: '1.6', pregunta: '¿Artículos innecesarios fueron enviados a cuarentena?', puntuacion: 3 }, { id: '1.7', pregunta: '¿Hay plan de acción para objetos en mal estado?', puntuacion: 4 }] },
        { nombre: 'SEITON', nombreEs: 'Ordenar', hallazgo: 'Ninguno', promedio: 0.85,
          items: [{ id: '2.1', pregunta: 'Hay ubicaciones definidas para cada elemento.', puntuacion: 4 }, { id: '2.2', pregunta: 'El piso tiene señalización adecuada.', puntuacion: 4 }, { id: '2.3', pregunta: '¿Hay un Layout adecuado?', puntuacion: 4 }, { id: '2.4', pregunta: 'Los artículos tienen identificación y señalización.', puntuacion: 5 }, { id: '2.5', pregunta: 'Se respetan las ubicaciones y etiquetas.', puntuacion: 4 }, { id: '2.6', pregunta: 'Hay información visual actualizada.', puntuacion: 4 }, { id: '2.7', pregunta: 'Es posible identificar cuando algo está fuera de lugar.', puntuacion: 5 }, { id: '2.8', pregunta: 'Es posible encontrar cualquier elemento en 30 seg.', puntuacion: 4 }] },
        { nombre: 'SEISO', nombreEs: 'Limpiar', hallazgo: 'Ninguno', promedio: 0.857,
          items: [{ id: '3.1', pregunta: 'Las áreas de trabajo están limpias.', puntuacion: 4 }, { id: '3.2', pregunta: 'Las herramientas están limpias y en buenas condiciones.', puntuacion: 4 }, { id: '3.3', pregunta: 'Se han establecido métodos para evitar suciedad.', puntuacion: 4 }, { id: '3.4', pregunta: 'Hay programas de limpieza documentados.', puntuacion: 5 }, { id: '3.5', pregunta: 'Los suministros de limpieza están disponibles.', puntuacion: 4 }, { id: '3.6', pregunta: '¿Los contenedores están en buenas condiciones?', puntuacion: 4 }, { id: '3.7', pregunta: 'La apariencia del equipo se ve limpia.', puntuacion: 5 }] },
        { nombre: 'SEIKETSU', nombreEs: 'Estandarizar', hallazgo: 'Ninguno', promedio: 0.9,
          items: [{ id: '4.1', pregunta: 'Se han estandarizado códigos de colores.', puntuacion: 4 }, { id: '4.2', pregunta: 'Se han estandarizado muebles y herramientas.', puntuacion: 5 }, { id: '4.3', pregunta: 'Se ha estandarizado el uso de EPP.', puntuacion: 4 }, { id: '4.4', pregunta: 'Hay manual de estandarización 5S disponible.', puntuacion: 5 }] },
        { nombre: 'SHITSUKE', nombreEs: 'Disciplina', hallazgo: 'Ninguno', promedio: 0.767,
          items: [{ id: '5.1', pregunta: '¿Las personas recibieron capacitación en 5S?', puntuacion: 4 }, { id: '5.2', pregunta: '¿Todos están involucrados en actividades 5S?', puntuacion: 4 }, { id: '5.3', pregunta: 'Las personas saben dónde encontrar procedimientos.', puntuacion: 4 }, { id: '5.4', pregunta: 'Los resultados 5S son informados a todos.', puntuacion: 4 }, { id: '5.5', pregunta: 'Está publicado el plan de acción de seguimiento.', puntuacion: 3 }, { id: '5.6', pregunta: 'Los responsables dieron seguimiento a hallazgos.', puntuacion: 4 }] }
      ]
    },
    {
      id: 4, areaId: 9, areaNombre: 'Oficina y baños de Dirección de Operaciones', departamento: 'Operaciones',
      auditorId: 5, auditorNombre: 'Roberto Sánchez', fecha: '2026-05-05', mes: 5, anio: 2026,
      completada: true, entregadoATiempo: true, promedioGeneral: 1.0,
      secciones: [
        { nombre: 'SEIRI', nombreEs: 'Clasificar', hallazgo: 'Ninguno', promedio: 1.0,
          items: [{ id: '1.1', pregunta: '¿Existe una regla para identificar artículos innecesarios?', puntuacion: 5 }, { id: '1.2', pregunta: 'Se ha establecido una lista de artículos requeridos.', puntuacion: 5 }, { id: '1.3', pregunta: '¿Hay artículos innecesarios u obsoletos?', puntuacion: 5 }, { id: '1.4', pregunta: 'Los artículos están en buenas condiciones.', puntuacion: 5 }, { id: '1.5', pregunta: 'Los pasillos están libres de obstáculos.', puntuacion: 5 }, { id: '1.6', pregunta: '¿Artículos innecesarios fueron enviados a cuarentena?', puntuacion: 5 }, { id: '1.7', pregunta: '¿Hay plan de acción para objetos en mal estado?', puntuacion: 5 }] },
        { nombre: 'SEITON', nombreEs: 'Ordenar', hallazgo: 'Ninguno', promedio: 1.0,
          items: [{ id: '2.1', pregunta: 'Hay ubicaciones definidas para cada elemento.', puntuacion: 5 }, { id: '2.2', pregunta: 'El piso tiene señalización adecuada.', puntuacion: 5 }, { id: '2.3', pregunta: '¿Hay un Layout adecuado?', puntuacion: 5 }, { id: '2.4', pregunta: 'Los artículos tienen identificación y señalización.', puntuacion: 5 }, { id: '2.5', pregunta: 'Se respetan las ubicaciones y etiquetas.', puntuacion: 5 }, { id: '2.6', pregunta: 'Hay información visual actualizada.', puntuacion: 5 }, { id: '2.7', pregunta: 'Es posible identificar cuando algo está fuera de lugar.', puntuacion: 5 }, { id: '2.8', pregunta: 'Es posible encontrar cualquier elemento en 30 seg.', puntuacion: 5 }] },
        { nombre: 'SEISO', nombreEs: 'Limpiar', hallazgo: 'Ninguno', promedio: 1.0,
          items: [{ id: '3.1', pregunta: 'Las áreas de trabajo están limpias.', puntuacion: 5 }, { id: '3.2', pregunta: 'Las herramientas están limpias y en buenas condiciones.', puntuacion: 5 }, { id: '3.3', pregunta: 'Se han establecido métodos para evitar suciedad.', puntuacion: 5 }, { id: '3.4', pregunta: 'Hay programas de limpieza documentados.', puntuacion: 5 }, { id: '3.5', pregunta: 'Los suministros de limpieza están disponibles.', puntuacion: 5 }, { id: '3.6', pregunta: '¿Los contenedores están en buenas condiciones?', puntuacion: 5 }, { id: '3.7', pregunta: 'La apariencia del equipo se ve limpia.', puntuacion: 5 }] },
        { nombre: 'SEIKETSU', nombreEs: 'Estandarizar', hallazgo: 'Ninguno', promedio: 1.0,
          items: [{ id: '4.1', pregunta: 'Se han estandarizado códigos de colores.', puntuacion: 5 }, { id: '4.2', pregunta: 'Se han estandarizado muebles y herramientas.', puntuacion: 5 }, { id: '4.3', pregunta: 'Se ha estandarizado el uso de EPP.', puntuacion: 5 }, { id: '4.4', pregunta: 'Hay manual de estandarización 5S disponible.', puntuacion: 5 }] },
        { nombre: 'SHITSUKE', nombreEs: 'Disciplina', hallazgo: 'Ninguno', promedio: 1.0,
          items: [{ id: '5.1', pregunta: '¿Las personas recibieron capacitación en 5S?', puntuacion: 5 }, { id: '5.2', pregunta: '¿Todos están involucrados en actividades 5S?', puntuacion: 5 }, { id: '5.3', pregunta: 'Las personas saben dónde encontrar procedimientos.', puntuacion: 5 }, { id: '5.4', pregunta: 'Los resultados 5S son informados a todos.', puntuacion: 5 }, { id: '5.5', pregunta: 'Está publicado el plan de acción de seguimiento.', puntuacion: 5 }, { id: '5.6', pregunta: 'Los responsables dieron seguimiento a hallazgos.', puntuacion: 5 }] }
      ]
    },
    {
      id: 5, areaId: 13, areaNombre: 'Caseta Vigilancia y Estacionamiento', departamento: 'EHS',
      auditorId: 8, auditorNombre: 'Christian Gutiérrez', fecha: '2026-05-14', mes: 5, anio: 2026,
      completada: true, entregadoATiempo: true, promedioGeneral: 0.447,
      secciones: [
        { nombre: 'SEIRI', nombreEs: 'Clasificar', hallazgo: 'No existe regla para identificar artículos innecesarios. Área con materiales sin clasificar.', promedio: 0.543,
          items: [{ id: '1.1', pregunta: '¿Existe una regla para identificar artículos innecesarios?', puntuacion: 2 }, { id: '1.2', pregunta: 'Se ha establecido una lista de artículos requeridos.', puntuacion: 2 }, { id: '1.3', pregunta: '¿Hay artículos innecesarios u obsoletos?', puntuacion: 2 }, { id: '1.4', pregunta: 'Los artículos están en buenas condiciones.', puntuacion: 3 }, { id: '1.5', pregunta: 'Los pasillos están libres de obstáculos.', puntuacion: 3 }, { id: '1.6', pregunta: '¿Artículos innecesarios fueron enviados a cuarentena?', puntuacion: 3 }, { id: '1.7', pregunta: '¿Hay plan de acción para objetos en mal estado?', puntuacion: 4 }] },
        { nombre: 'SEITON', nombreEs: 'Ordenar', hallazgo: 'Sin señalización de piso. No hay layout visible.', promedio: 0.5,
          items: [{ id: '2.1', pregunta: 'Hay ubicaciones definidas para cada elemento.', puntuacion: 2 }, { id: '2.2', pregunta: 'El piso tiene señalización adecuada.', puntuacion: 2 }, { id: '2.3', pregunta: '¿Hay un Layout adecuado?', puntuacion: 2 }, { id: '2.4', pregunta: 'Los artículos tienen identificación y señalización.', puntuacion: 3 }, { id: '2.5', pregunta: 'Se respetan las ubicaciones y etiquetas.', puntuacion: 3 }, { id: '2.6', pregunta: 'Hay información visual actualizada.', puntuacion: 3 }, { id: '2.7', pregunta: 'Es posible identificar cuando algo está fuera de lugar.', puntuacion: 2 }, { id: '2.8', pregunta: 'Es posible encontrar cualquier elemento en 30 seg.', puntuacion: 3 }] },
        { nombre: 'SEISO', nombreEs: 'Limpiar', hallazgo: 'Área sucia, sin programa de limpieza documentado.', promedio: 0.0,
            fotos: ['assets/evidencias/hallazgo1.jpg', 'assets/evidencias/ev4.jpg'],
            items: [{ id: '3.1', pregunta: 'Las áreas de trabajo están limpias.', puntuacion: 0 }, { id: '3.2', pregunta: 'Las herramientas están limpias y en buenas condiciones.', puntuacion: 0 }, { id: '3.3', pregunta: 'Se han establecido métodos para evitar suciedad.', puntuacion: 0 }, { id: '3.4', pregunta: 'Hay programas de limpieza documentados.', puntuacion: 0 }, { id: '3.5', pregunta: 'Los suministros de limpieza están disponibles.', puntuacion: 0 }, { id: '3.6', pregunta: '¿Los contenedores están en buenas condiciones?', puntuacion: 0 }, { id: '3.7', pregunta: 'La apariencia del equipo se ve limpia.', puntuacion: 0 }] },
            { nombre: 'SEIKETSU', nombreEs: 'Estandarizar', hallazgo: 'Sin estándares documentados ni código de colores.', promedio: 0.2,
            fotos: ['assets/evidencias/hallazgo2.jpg', 'assets/evidencias/ev5.jpg'],
            items: [{ id: '4.1', pregunta: 'Se han estandarizado códigos de colores.', puntuacion: 1 }, { id: '4.2', pregunta: 'Se han estandarizado muebles y herramientas.', puntuacion: 1 }, { id: '4.3', pregunta: 'Se ha estandarizado el uso de EPP.', puntuacion: 1 }, { id: '4.4', pregunta: 'Hay manual de estandarización 5S disponible.', puntuacion: 1 }] },
        { nombre: 'SHITSUKE', nombreEs: 'Disciplina', hallazgo: 'Personal sin capacitación en 5S.', promedio: 0.333,
          items: [{ id: '5.1', pregunta: '¿Las personas recibieron capacitación en 5S?', puntuacion: 1 }, { id: '5.2', pregunta: '¿Todos están involucrados en actividades 5S?', puntuacion: 2 }, { id: '5.3', pregunta: 'Las personas saben dónde encontrar procedimientos.', puntuacion: 2 }, { id: '5.4', pregunta: 'Los resultados 5S son informados a todos.', puntuacion: 1 }, { id: '5.5', pregunta: 'Está publicado el plan de acción de seguimiento.', puntuacion: 2 }, { id: '5.6', pregunta: 'Los responsables dieron seguimiento a hallazgos.', puntuacion: 2 }] }
      ]
    },
  ];

  getUsuarios(): Usuario[] { return this.usuarios; }
  getAreas(): Area[] { return this.areas; }
  getAuditorias(): Auditoria[] { return this.auditorias; }

  getAreasPorAuditor(auditorId: number): Area[] {
    return this.areas.filter(a => a.auditorAsignadoId === auditorId);
  }

  getAuditoriasPorMes(mes: number, anio: number): Auditoria[] {
    return this.auditorias.filter(a => a.mes === mes && a.anio === anio);
  }

  getAuditoriaPorAuditorYMes(auditorId: number, mes: number, anio: number): Auditoria | undefined {
    return this.auditorias.find(a => a.auditorId === auditorId && a.mes === mes && a.anio === anio);
  }

  getResumenPorDepartamento(mes: number, anio: number) {
    const auditoriasDelMes = this.getAuditoriasPorMes(mes, anio);
    const deptos: { [key: string]: number[] } = {};
    auditoriasDelMes.forEach(a => {
      if (!deptos[a.departamento]) deptos[a.departamento] = [];
      if (a.promedioGeneral) deptos[a.departamento].push(a.promedioGeneral);
    });
    return Object.entries(deptos).map(([depto, promedios]) => ({
      departamento: depto,
      promedio: promedios.reduce((a, b) => a + b, 0) / promedios.length
    }));
  }

  reasignarAuditor(areaId: number, nuevoAuditorId: number): void {
    const area = this.areas.find(a => a.id === areaId);
    const auditor = this.usuarios.find(u => u.id === nuevoAuditorId);
    if (area && auditor) {
      area.auditorAsignadoId = nuevoAuditorId;
      area.auditorAsignadoNombre = auditor.nombre;
    }
  }

  guardarAuditoria(auditoria: Auditoria): void {
    const idx = this.auditorias.findIndex(a => a.id === auditoria.id);
    if (idx >= 0) this.auditorias[idx] = auditoria;
    else this.auditorias.push({ ...auditoria, id: this.auditorias.length + 1 });
  }

  getUsuariosPorRol(rol: string): Usuario[] {
  return this.usuarios.filter(u => u.rol === rol);
}

getAreasPorJefe(jefeId: number): Area[] {
  const jefe = this.usuarios.find(u => u.id === jefeId);
  if (!jefe?.areaIds) return [];
  return this.areas.filter(a => jefe.areaIds!.includes(a.id));
}

getAuditoriasPorArea(areaId: number, mes: number, anio: number): Auditoria | undefined {
  return this.auditorias.find(a => a.areaId === areaId && a.mes === mes && a.anio === anio);
}

getHallazgosCriticosPorArea(areaId: number, mes: number, anio: number) {
  const auditoria = this.getAuditoriasPorArea(areaId, mes, anio);
  if (!auditoria) return [];
  const criticos: { seccion: string, hallazgo: string, fotos: string[], items: any[] }[] = [];
  auditoria.secciones.forEach(s => {
    const itemsCriticos = s.items.filter(i => i.puntuacion <= 2);
    if (itemsCriticos.length > 0 || s.hallazgo) {
      criticos.push({
        seccion: s.nombre,
        hallazgo: s.hallazgo,
        fotos: s.fotos || [],
        items: itemsCriticos
      });
    }
  });
  return criticos;
}
}