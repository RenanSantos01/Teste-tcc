import { Injectable } from '@angular/core';

export interface CertificateData {
  studentName: string;
  courseName: string;
  date: string;
}

export interface Block {
  index: number;
  timestamp: string;
  data: CertificateData;
  previousHash: string;
  hash: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  private blockchain: Block[] = [];

  constructor() {
    this.createGenesisBlock();
  }

  // 🔹 Primeiro bloco da cadeia
  private createGenesisBlock() {
    const genesis: Block = {
      index: 0,
      timestamp: new Date().toISOString(),
      data: {
        studentName: "Genesis",
        courseName: "Genesis",
        date: new Date().toISOString()
      },
      previousHash: "0",
      hash: this.generateHash("genesis")
    };

    this.blockchain.push(genesis);
  }

  // 🔹 Função para gerar hash (simples)
  private generateHash(input: string): string {
    return btoa(
      input + Math.random().toString(36).substring(2)
    ).substring(0, 32);
  }

  // 🔹 Adiciona um certificado na blockchain simulada
  addCertificate(data: CertificateData): Block {
    const previousBlock = this.blockchain[this.blockchain.length - 1];

    const block: Block = {
      index: this.blockchain.length,
      timestamp: new Date().toISOString(),
      data,
      previousHash: previousBlock.hash,
      hash: this.generateHash(JSON.stringify(data))
    };

    this.blockchain.push(block);
    return block;
  }

  // 🔹 Lista todos os certificados gravados
  getBlockchain(): Block[] {
    return this.blockchain;
  }

  // 🔹 Valida se o certificado está na cadeia
  validateCertificate(hash: string): boolean {
    return this.blockchain.some(b => b.hash === hash);
  }
}
