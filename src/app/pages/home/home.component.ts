import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  currentIndex = 0;

  carouselItems = [
    {
      image: "assets/carousel/angular.png",
      title: "Projeto Angular",
      description: "Crie aplicações web modernas com Angular."
    },
    {
      image: "assets/carousel/blockchain.png",
      title: "Certificados Blockchain",
      description: "Emissão e validação com simulação de blockchain."
    },
    {
      image: "assets/carousel/frontend.png",
      title: "Front-End Moderno",
      description: "HTML, CSS e JavaScript para interfaces incríveis."
    }
  ];

  get carouselTransform() {
    return `translateX(-${this.currentIndex * 100}%)`;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.carouselItems.length;
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.carouselItems.length) %
      this.carouselItems.length;
  }

}
