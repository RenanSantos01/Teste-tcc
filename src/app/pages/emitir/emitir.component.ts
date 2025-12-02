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

  erro: string = '';
  certificadoGerado = false;
  blocoGerado?: Block;

  constructor(
    private blockchainService: BlockchainService,
    private router: Router
  ) {}

  voltarHome() {
    this.router.navigate(['/']);
  }

  emitirCertificado() {

    if (!this.aluno || !this.curso || !this.data) {
      this.erro = "⚠️ Preencha todos os campos!";
      return;
    }

    this.erro = '';
    this.certificadoGerado = true;

    const dadosCertificado = {
      studentName: this.aluno,
      courseName: this.curso,
      date: this.data
    };

    this.blocoGerado = this.blockchainService.addCertificate(dadosCertificado);

    console.log("Certificado registrado:", this.blocoGerado);

    // ==============
    //  PDF ESTILIZADO
    // ==============
    const doc = new jsPDF('portrait', 'pt', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();

    // Fundo elegante
    doc.setFillColor(245, 240, 255);
    doc.rect(0, 0, pageWidth, 900, "F");

    // Moldura
    doc.setDrawColor(140, 80, 255);
    doc.setLineWidth(3);
    doc.rect(20, 20, pageWidth - 40, 820);

    // Cabeçalho
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(120, 0, 240);
    doc.text("AUTHDELUX CERTIFICAÇÃO", pageWidth / 2, 70, { align: "center" });

    // Título
    doc.setFontSize(28);
    doc.setTextColor(0, 0, 0);
    doc.text("CERTIFICADO DE CONCLUSÃO", pageWidth / 2, 130, { align: "center" });

    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text("Certificamos que", 70, 200);

    // Nome do aluno
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text(this.aluno.toUpperCase(), pageWidth / 2, 240, { align: "center" });

    // Texto inferior
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text("concluiu com êxito o curso:", 70, 280);

    // Nome do curso
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text(this.curso, pageWidth / 2, 320, { align: "center" });

    // Data
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text(`Data de conclusão: ${this.data}`, 70, 380);

    doc.setDrawColor(160, 160, 160);
    doc.line(70, 420, pageWidth - 70, 420);

    // Hash blockchain
    doc.setFont("helvetica", "italic");
    doc.setFontSize(12);
    doc.text("Assinatura digital blockchain:", 70, 460);
    doc.text(this.blocoGerado?.hash || "", 70, 480);

    // Rodapé
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(100, 0, 200);
    doc.text("AuthDelux • Secure Certification", pageWidth / 2, 820, { align: "center" });

    doc.save(`certificado-${this.aluno}.pdf`);
  }

}
