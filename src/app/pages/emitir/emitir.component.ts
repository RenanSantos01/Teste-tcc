import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import { Router } from '@angular/router';
import { BlockchainService, Block } from '../../services/blockchain-simulada.service';

@Component({
  selector: 'app-emitir',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './emitir.component.html',
  styleUrls: ['./emitir.component.css']
})
export class EmitirComponent {

  aluno: string = '';
  curso: string = '';
  data: string = '';

  certificadoGerado = false;
  blocoGerado?: Block;

  erro: string = ''; // ⚠️ mensagem de erro

  constructor(
    private blockchainService: BlockchainService,
    private router: Router
  ) {}

  // 🔙 VOLTAR PARA HOME
  voltarHome() {
    this.router.navigate(['/home']);
  }

  // 📄 EMITIR CERTIFICADO
  emitirCertificado() {

    // 🔍 1. VALIDAR CAMPOS OBRIGATÓRIOS
    if (!this.aluno || !this.curso || !this.data) {
      this.erro = "Por favor, preencha todos os campos antes de emitir o certificado.";
      return;
    }

    // 👍 Se chegou até aqui, limpa erros
    this.erro = '';
    this.certificadoGerado = true;

    // 🔗 2. Registrar no blockchain simulado
    const dadosCertificado = {
      studentName: this.aluno,
      courseName: this.curso,
      date: this.data
    };

    this.blocoGerado = this.blockchainService.addCertificate(dadosCertificado);

    console.log("Bloco registrado:", this.blocoGerado);

    // 📄 3. Criar PDF
    const doc = new jsPDF();

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('CERTIFICADO DE CONCLUSÃO', 105, 30, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.text(`Certificamos que ${this.aluno} concluiu com êxito o curso:`, 20, 60);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text(this.curso, 20, 75);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.text(`Data de conclusão: ${this.data}`, 20, 95);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(12);
    doc.text(`Assinatura blockchain: ${this.blocoGerado?.hash}`, 20, 120);

    doc.save(`certificado-${this.aluno}.pdf`);
  }
}
