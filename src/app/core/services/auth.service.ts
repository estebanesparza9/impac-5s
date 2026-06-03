import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';
import { Usuario } from '../../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private usuarioActual: Usuario | null = null;

  constructor(private dataService: DataService, private router: Router) {
    const guardado = localStorage.getItem('usuarioActual');
    if (guardado) this.usuarioActual = JSON.parse(guardado);
  }

  login(email: string, password: string): boolean {
    const usuario = this.dataService.getUsuarios().find(
      u => u.email === email && u.password === password
    );
    if (usuario) {
      this.usuarioActual = usuario;
      localStorage.setItem('usuarioActual', JSON.stringify(usuario));
      return true;
    }
    return false;
  }

  logout(): void {
    this.usuarioActual = null;
    localStorage.removeItem('usuarioActual');
    this.router.navigate(['/login']);
  }

  getUsuarioActual(): Usuario | null {
    return this.usuarioActual;
  }

  isLoggedIn(): boolean {
    return this.usuarioActual !== null;
  }

  isAdmin(): boolean {
    return this.usuarioActual?.rol === 'admin';
  }
  isJefe(): boolean {
  return this.usuarioActual?.rol === 'jefe';
}
isAuditor(): boolean {
  return this.usuarioActual?.rol === 'auditor';
}
}