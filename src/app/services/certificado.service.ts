import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CertificadoService {

  private apiUrl = "http://localhost:3000/certificado";

  constructor(private http: HttpClient) {}

  validar(hash: string) {
    return this.http.post(`${this.apiUrl}/validar`, { hash });
  }
}
