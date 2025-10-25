import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-to-you',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './to-you.html',
  styleUrl: './to-you.scss',
})
export class ToYou implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  activeIndex = 0;
  fillHeight = 0;

  images = [
    '/assets/sections-images/to-you/image1.png',
    'assets/sections-images/image3.png',
    'assets/sections-images/to-you/image3.png',
  ];

  steps = [
    {
      title: 'Personnalisez Chrome',
      text: `Personnalisez votre navigateur Web grâce à des thèmes, au mode sombre
        ainsi qu'à d'autres options conçues juste pour vous.`,
    },
    {
      title: 'Naviguez sur tous les appareils',
      text: `Connectez-vous à Chrome sur l'appareil de votre choix pour accéder à
        vos favoris, mots de passe enregistrés et bien plus encore.`,
    },
    {
      title: 'Gagnez du temps avec la saisie automatique',
      text: `Enregistrez des adresses, des mots de passe et bien plus dans Chrome
        pour la saisie automatique de vos informations.`,
    },
  ];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      requestAnimationFrame(() => this.startProgress());
    }
  }

  startProgress() {
    this.fillHeight = 0;
    const interval = setInterval(() => {
      this.fillHeight += 1;
      if (this.fillHeight >= 100) {
        clearInterval(interval);
        this.nextStep();
      }
    }, 50);
  }

  nextStep() {
    if (this.activeIndex < this.steps.length - 1) {
      this.activeIndex++;
      this.startProgress();
    } else {
      this.activeIndex = 0;
      this.startProgress();
    }
  }

  setActive(i: number) {
    this.activeIndex = i;
    this.fillHeight = 0;
  }
}
