import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BlockchainService, Block } from '../../services/blockchain-simulada.service';
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

  // Agora recebemos um bloco completo ou null
  blocoEncontrado: Block | null = null;

  constructor(
    private blockchainService: BlockchainService,
    private router: Router
  ) {}

  verificar() {

    // validateCertificate agora retorna Block | null
    const block = this.blockchainService.validateCertificate(this.hash);

    this.blocoEncontrado = block;

    if (block) {
      this.resultado = "✔ Certificado encontrado!";
    } else {
      this.resultado = "❌ Certificado NÃO encontrado!";
    }
  }

  voltarHome() {
    this.router.navigate(['/']);
  }
}
