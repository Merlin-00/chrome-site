import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Update } from '../home-sections/update/update';
import { ToYou } from '../home-sections/to-you/to-you';
import { Secure } from '../home-sections/secure/secure';
import { Fast } from '../home-sections/fast/fast';
import { ForGoogle } from '../home-sections/for-google/for-google';
import { FrequentQuestions } from '../home-sections/frequent-questions/frequent-questions';
import { WindowsObserver } from '../../core/services/utilities/windows-observer';
import { State } from '../../core/services/utilities/state';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [
    MatIconModule,
    Update,
    ToYou,
    Secure,
    Fast,
    ForGoogle,
    FrequentQuestions,
    MatCheckboxModule,
    MatButtonModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export default class Home implements OnInit {
  private windows = inject(WindowsObserver);
  width = this.windows.width;
  private state = inject(State);

  ngOnInit(): void {
    this.windows.init();
    if (typeof window !== 'undefined') {
      requestAnimationFrame(() => this.initObserver());
    }
  }

  private initObserver() {
    const sections = document.querySelectorAll('[data-home-section]');
    if (!sections || sections.length < 2) return;
    const second = sections[1];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // when second section is visible, show short bar and hide navbar
          this.state.showShortBar.set(
            entry.isIntersecting && entry.intersectionRatio > 0.1
          );
        });
      },
      { root: null, threshold: [0, 0.1, 0.5] }
    );

    observer.observe(second);
  }
}
