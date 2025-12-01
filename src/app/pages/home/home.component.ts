import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService) {}

  currentIndex = 0;
  intervalId: any;

  // ====================
  // Agora usando imagens de:  src/assets/img
  // ====================
  carouselItems = [
    { image: "img/i1.jpg" },
    { image: "img/i2.jpg" },
    { image: "img/i3.jpg" }
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

  logout() {
    this.authService.logout();
  }
}
