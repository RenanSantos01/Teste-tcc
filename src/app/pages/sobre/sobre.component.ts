import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.css']
})
export class SobreComponent implements OnInit, OnDestroy {

  currentIndex = 0;
  intervalId: any;

  carouselItems = [
    {
      image: "img/i1.jpg",
      title: "Tecnologia e confiança",
      description: "Segurança e autenticação contra fraudes."
    },
    {
      image: "img/i2.jpg",
      title: "Registro descentralizado",
      description: "Blockchain garantindo transparência."
    },
    {
      image: "assets/img/i3.png",
      title: "Aplicação acadêmica",
      description: "Instituições e alunos protegidos."
    }
  ];

  get carouselTransform() {
    return `translateX(-${this.currentIndex * 100}%)`;
  }

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.next();
    }, 4000);
  }

  stopAutoSlide() {
    clearInterval(this.intervalId);
  }

  next() {
    this.stopAutoSlide();
    this.currentIndex = (this.currentIndex + 1) % this.carouselItems.length;
    this.startAutoSlide();
  }

  prev() {
    this.stopAutoSlide();
    this.currentIndex =
      (this.currentIndex - 1 + this.carouselItems.length) %
      this.carouselItems.length;
    this.startAutoSlide();
  }
}
