import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3001'; // URL da sua API Node.js

  constructor(private http: HttpClient, private router: Router) {}

  // -------------------------------
  // CADASTRO
  // -------------------------------
  register(name: string, email: string, password: string) {
    return this.http.post(`${this.apiUrl}/register`, {
      name,
      email,
      password
    });
  }

  // -------------------------------
  // LOGIN
  // -------------------------------
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, {
      email,
      password
    });
  }

  // -------------------------------
  // SALVAR TOKEN
  // -------------------------------
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  // -------------------------------
  // PEGAR TOKEN
  // -------------------------------
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // -------------------------------
  // VERIFICAR LOGIN
  // -------------------------------
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  // -------------------------------
  // LOGOUT
  // -------------------------------
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // -------------------------------
  // HEADERS PARA ROTAS PROTEGIDAS
  // -------------------------------
  getAuthHeaders() {
    const token = this.getToken();

    return {
      headers: new HttpHeaders({
        // EXEMPLO CORRETO:
        // Authorization: Bearer SEU_TOKEN
        Authorization: token ? 'Bearer ' + token : ''
      })
    };
  }
}
