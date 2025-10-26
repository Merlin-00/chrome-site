import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IS_MEDIUM } from '../../../app.constants';
import { WindowsObserver } from '../../../core/services/utilities/windows-observer';

@Component({
  selector: 'app-fast',
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './fast.html',
  styleUrl: './fast.scss',
})
export class Fast {
  private windows = inject(WindowsObserver);
  width = this.windows.width;
  medium = IS_MEDIUM;

  currentIndex = 0;
  cards = [0, 1, 2];

  nextCard() {
    if (this.currentIndex < this.cards.length - 1) {
      this.currentIndex++;
    }
  }

  prevCard() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  getTransform() {
    const offset = this.currentIndex * (900 + 48 - 150);
    return `translateX(-${offset}px)`;
  }
}
