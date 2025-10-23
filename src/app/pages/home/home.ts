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
import { Router } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

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
    MatCardModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export default class Home implements OnInit {
  private windows = inject(WindowsObserver);
  width = this.windows.width;
  private state = inject(State);
  private router = inject(Router);

  ngOnInit(): void {
    this.windows.init();
    if (typeof window !== 'undefined') {
      requestAnimationFrame(() => this.initObserver());
    }
  }

  private initObserver() {
    const sections = document.querySelectorAll<HTMLElement>(
      '[data-home-section]'
    );
    if (!sections || sections.length === 0) return;

    // Observer to show/hide the shortbar based on the first section
    const first = sections[0];
    const firstObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const firstVisible =
            entry.isIntersecting && entry.intersectionRatio > 0.1;
          this.state.showShortBar.set(!firstVisible);
        });
      },
      { threshold: [0, 0.1, 0.5] }
    );
    firstObserver.observe(first);

    // Observer to track the most visible section
    const allObserver = new IntersectionObserver(
      (entries) => {
        // Create a temporary map
        const visibilityMap = new Map<string, number>();

        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id;
          if (id) visibilityMap.set(id, entry.intersectionRatio);
        }

        // Determine the most visible section at this precise moment
        const mostVisible = Array.from(visibilityMap.entries()).sort(
          (a, b) => b[1] - a[1]
        )[0];

        if (!mostVisible) return;
        const [id, ratio] = mostVisible;

        // More tolerant threshold: > 0.25 for short sections
        if (ratio > 0.25 && id !== this.state.activeSection()) {
          this.state.activeSection.set(id);
          try {
            this.router.navigate([], { fragment: id, replaceUrl: true });
          } catch {}
        }
      },
      { threshold: Array.from({ length: 20 }, (_, i) => i / 20) } // very fine thresholds
    );

    sections.forEach((s) => allObserver.observe(s));
  }
}
