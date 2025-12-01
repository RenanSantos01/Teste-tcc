import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BlockchainService } from '../../services/blockchain-simulada.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verificar',
  standalone: true,
  templateUrl: './verificar.component.html',
  styleUrls: ['./verificar.component.css'],
  imports: [FormsModule, CommonModule]
})
export class VerificarComponent {

  hash: string = "";
  resultado: string = "";
  valido: boolean | null = null;

  constructor(
    private blockchainService: BlockchainService,
    private router: Router
  ) {}

  verificar() {
    const exists = this.blockchainService.validateCertificate(this.hash);

    this.valido = exists;

    if (exists) {
      this.resultado = "✔ Certificado encontrado! Hash válido.";
    } else {
      this.resultado = "❌ Certificado NÃO encontrado! Hash inválido.";
    }
  }

  voltarHome() {
    this.router.navigate(['/']);
  }
}
