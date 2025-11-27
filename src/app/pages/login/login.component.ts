import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule, RouterModule] // ✔ Agora o routerLink funciona
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private router: Router) {}

  login() {
    this.error = '';

    // Simulação temporária
    if (!this.email || !this.password) {
      this.error = 'Preencha todos os campos.';
      return;
    }

    if (this.email !== 'admin@email.com' || this.password !== '123') {
      this.error = 'Credenciais inválidas.';
      return;
    }

    // Se deu certo ✔
    localStorage.setItem('token', 'fake-jwt');

    // Redirecionar para o dashboard
    this.router.navigate(['/dashboard']);
  }
}
