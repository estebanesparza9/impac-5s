import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  cargando = false;

  constructor(private auth: AuthService, private router: Router) {
  if (this.auth.isLoggedIn()) {
    if (this.auth.isAdmin()) {
      this.router.navigate(['/dashboard']);
    } else if (this.auth.isJefe()) {
      this.router.navigate(['/jefe']);
    } else {
      this.router.navigate(['/auditoria']);
    }
  }
}

 login() {
  this.error = '';
  this.cargando = true;
  setTimeout(() => {
    const ok = this.auth.login(this.email, this.password);
    if (ok) {
      if (this.auth.isAdmin()) {
        this.router.navigate(['/dashboard']);
      } else if (this.auth.isJefe()) {
        this.router.navigate(['/jefe']);
      } else {
        this.router.navigate(['/auditoria']);
      }
    } else {
      this.error = 'Correo o contraseña incorrectos';
      this.cargando = false;
    }
  }, 600);
}
}