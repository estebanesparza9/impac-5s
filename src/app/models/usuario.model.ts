export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password: string;
  rol: 'admin' | 'auditor' | 'jefe';
  areaIds?: number[];
}