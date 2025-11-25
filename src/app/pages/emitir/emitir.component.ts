import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
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

  constructor(private blockchainService: BlockchainService) {}

  emitirCertificado() {
    this.certificadoGerado = true;

    // 🔗 Registrar no blockchain simulado
    const dadosCertificado = {
      studentName: this.aluno,
      courseName: this.curso,
      date: this.data
    };

    this.blocoGerado = this.blockchainService.addCertificate(dadosCertificado);

    console.log("Bloco registrado na blockchain simulada:", this.blocoGerado);

    // 📄 Criar PDF
    const doc = new jsPDF();

    // Título
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('CERTIFICADO DE CONCLUSÃO', 105, 30, { align: 'center' });

    // Corpo do certificado
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.text(`Certificamos que ${this.aluno} concluiu com êxito o curso:`, 20, 60);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text(this.curso, 20, 75);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.text(`Data de conclusão: ${this.data}`, 20, 95);

    // Hash do bloco — assinatura digital
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(12);
    doc.text(`Assinatura blockchain: ${this.blocoGerado?.hash}`, 20, 120);

    // Salvar PDF
    doc.save(`certificado-${this.aluno}.pdf`);
  }
}
