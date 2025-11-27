import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  success = false;
  error = '';

  register() {
    this.error = '';
    this.success = false;

    if (this.password !== this.confirmPassword) {
      this.error = 'As senhas não coincidem.';
      return;
    }

    // ➜ Aqui você envia para a API (falta conectar Node.js)
    console.log('Cadastro enviado:', {
      name: this.name,
      email: this.email,
      password: this.password
    });

    this.success = true;
  }
}
