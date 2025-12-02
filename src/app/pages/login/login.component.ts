import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule, RouterModule]
})
export class LoginComponent {

  email = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.error = '';

    // Validação simples
    if (!this.email || !this.password) {
      this.error = 'Preencha todos os campos.';
      return;
    }

    // Envia para API
    this.authService.login(this.email, this.password).subscribe({
      next: (res: any) => {
        console.log("LOGIN OK", res);

        // Salva o token
        this.authService.saveToken(res.token);

        // Redireciona corretamente para a Home
        this.router.navigate(['/']);
      },

      error: (err) => {
        console.error(err);
        this.error = err.error?.error || 'Credenciais inválidas.';
      }
    });
  }

  // 🔥 Botão voltar para página Sobre
  goToSobre() {
    this.router.navigate(['/sobre']);
  }
}
