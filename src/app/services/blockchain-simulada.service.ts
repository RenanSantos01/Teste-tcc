import { Injectable } from '@angular/core';

export interface CertificateData {
  studentName: string;
  courseName: string;
  institution: string;   
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

  
  //  Criar bloco gênesis
  
  private createGenesisBlock() {
    const genesis: Block = {
      index: 0,
      timestamp: new Date().toISOString(),
      data: {
        studentName: "Genesis",
        courseName: "Genesis Course",
        institution: "Genesis Institution",
        date: new Date().toISOString()
      },
      previousHash: "0",
      hash: this.generateHash("genesis")
    };

    this.blockchain.push(genesis);
  }

  
  //  Gerar hash simples
  
  private generateHash(input: string): string {
    return btoa(input + Math.random().toString(36).substring(2)).substring(0, 32);
  }

 
  //  Registrar novo certificado
 
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

  
  //  Listar toda blockchain
  
  getBlockchain(): Block[] {
    return this.blockchain;
  }

  
  // Verificar validade pelo hash
  
  validateCertificate(hash: string): Block | null {
    return this.blockchain.find(b => b.hash === hash) || null;
  }
}
