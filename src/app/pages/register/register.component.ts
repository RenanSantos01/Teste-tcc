import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule, CommonModule]
})
export class RegisterComponent {

  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  aceitaLGPD = false;

  error = '';
  success = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register() {
    this.error = '';
    this.success = false;

    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.error = 'Preencha todos os campos.';
      return;
    }

    if (this.password.length < 6) {
      this.error = 'A senha deve ter no mínimo 6 caracteres.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = 'As senhas não coincidem.';
      return;
    }

    if (!this.aceitaLGPD) {
      this.error = 'Você deve aceitar os termos de privacidade (LGPD).';
      return;
    }

    this.authService.register(this.name, this.email, this.password)
      .subscribe({
        next: () => {
          this.success = true;

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1200);
        },

        error: (err) => {
          console.error(err);
          this.error = err.error?.error || 'Erro ao cadastrar.';
        }
      });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToSobre() {
    this.router.navigate(['/sobre']);
  }
}
