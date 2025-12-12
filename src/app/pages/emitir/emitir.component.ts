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

  aluno = '';
  curso = '';
  instituicao = '';
  data = '';

  erro = '';
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

    // 🔍 Validação
    if (!this.aluno || !this.curso || !this.instituicao || !this.data) {
      this.erro = "⚠️ Preencha todos os campos!";
      return;
    }

    this.erro = '';
    this.certificadoGerado = true;

    // Dados do bloco
    const dadosCertificado = {
      studentName: this.aluno,
      courseName: this.curso,
      institution: this.instituicao,
      date: this.data
    };

    // Gravar na blockchain simulada
    this.blocoGerado = this.blockchainService.addCertificate(dadosCertificado);

    console.log("Certificado registrado:", this.blocoGerado);

    
    const doc = new jsPDF('portrait', 'pt', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();

    // Fundo
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

    // Identificação
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text("Certificamos que", 70, 200);

    // Aluno
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text(this.aluno.toUpperCase(), pageWidth / 2, 240, { align: "center" });

    // Curso
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text("concluiu com êxito o curso:", 70, 280);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text(this.curso, pageWidth / 2, 320, { align: "center" });

    // Instituição
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text(`Instituição: ${this.instituicao}`, 70, 360);

    // Data
    doc.text(`Data de conclusão: ${this.data}`, 70, 390);

    
    doc.setDrawColor(160, 160, 160);
    doc.line(70, 420, pageWidth - 70, 420);

    // Hash blockchain
    doc.setFont("helvetica", "italic");
    doc.setFontSize(12);
    doc.text("Assinatura digital blockchain:", 70, 460);
    doc.text(this.blocoGerado?.hash || "", 70, 480);

    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(100, 0, 200);
    doc.text("AuthDelux • Secure Certification", pageWidth / 2, 820, { align: "center" });

    // Exportar PDF
    doc.save(`certificado-${this.aluno}.pdf`);
  }
}
