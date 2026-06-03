import { Routes } from '@angular/router';
import { authGuard, adminGuard, jefeGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard-admin/dashboard-admin.component').then(m => m.DashboardAdminComponent),
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'auditores',
    loadComponent: () => import('./pages/gestion-auditores/gestion-auditores.component').then(m => m.GestionAuditoresComponent),
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'resultados',
    loadComponent: () => import('./pages/resultados-area/resultados-area.component').then(m => m.ResultadosAreaComponent),
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'cumplimiento',
    loadComponent: () => import('./pages/cumplimiento-auditores/cumplimiento-auditores.component').then(m => m.CumplimientoAuditoresComponent),
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'auditoria',
    loadComponent: () => import('./pages/auditoria-form/auditoria-form.component').then(m => m.AuditoriaFormComponent),
    canActivate: [authGuard]
  },
  {
    path: 'jefe',
    loadComponent: () => import('./pages/vista-jefe/vista-jefe.component').then(m => m.VistaJefeComponent),
    canActivate: [authGuard, jefeGuard]
  },
  {
    path: 'gemba',
    loadComponent: () => import('./pages/gemba-walk/gemba-walk.component').then(m => m.GembaWalkComponent),
    canActivate: [authGuard, adminGuard]
  },
  { path: '**', redirectTo: 'login' }
];