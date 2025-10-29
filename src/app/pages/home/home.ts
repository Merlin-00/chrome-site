import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
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
import { isPlatformBrowser } from '@angular/common';
import { IS_LARGE, IS_MEDIUM } from '../../app.constants';

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
  medium = IS_MEDIUM;
  large = IS_LARGE;
  width = this.windows.width;
  private state = inject(State);
  private router = inject(Router);
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private lastScrollY = 0;
  private currentTranslateX = 0;
  private maxTranslate = 200;

  private lastActiveId: string | null = null;
  private observer: IntersectionObserver | null = null;
  private debounceTimeout: any = null;
  private readonly DEBOUNCE_TIME = 100; // Delay in ms for debounce
  private readonly INTERSECTION_THRESHOLD = [0, 0.25, 0.5, 0.75, 1]; // Multiple thresholds for better accuracy

  ngOnInit(): void {
    this.windows.init();

    if (isPlatformBrowser(this.platformId)) {
      requestAnimationFrame(() => this.initObserver());

      // Keep handleImageScroll if the parallax effect is still desired
      this.lastScrollY = window.scrollY;
      window.addEventListener('scroll', this.handleImageScroll.bind(this), {
        passive: true,
      });
    }
  }

  // Component destruction to clean up the observer
  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.handleImageScroll.bind(this));
    }
  }

  private initObserver() {
    if (!isPlatformBrowser(this.platformId)) return;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-home-section]')
    );
    if (!sections.length) return;

    // Set the active section when at least 50% of it is visible
    // Or: '0px 0px -50% 0px' to activate when its top reaches the middle of the screen.
    // The 'rootMargin' option is recommended for mobile.
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '-10% 0px -40% 0px', // Adjust detection area for more stability
      threshold: this.INTERSECTION_THRESHOLD, // Use multiple thresholds
    };

    const callback: IntersectionObserverCallback = (entries) => {
      // Cancel any previous debounce
      if (this.debounceTimeout) {
        clearTimeout(this.debounceTimeout);
      }

      // Debounce the update of the active section
      this.debounceTimeout = setTimeout(() => {
        let activeSectionId: string | null = null;
        let maxVisibility = 0;

        // 1. Handle the top bar (show when leaving the first section)
        const first = sections[0];
        const firstEntry = entries.find((e) => e.target.id === first.id);
        if (firstEntry) {
          // If the first section is no longer in view (entered the negative margin)
          // The condition for displaying the top bar can be reviewed for more fluidity
          // For example, if the top of the viewport exceeds half of the first section
          this.state.showShortBar.set(
            window.scrollY > first.offsetHeight * 0.5
          );
        }

        // Find the entry that INTERSECTS (is active)
        // Look for the last section that starts to intersect the defined area
        // Sort entries by intersection ratio to find the most visible
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry) => {
            const ratio = entry.intersectionRatio;
            if (ratio > maxVisibility) {
              maxVisibility = ratio;
              activeSectionId = entry.target.id;
            }
          });

        // Fallback if at the very beginning/top
        if (window.scrollY === 0 && sections.length > 0) {
          activeSectionId = sections[0].id;
        }

        // Apply changes only if necessary
        if (activeSectionId && this.lastActiveId !== activeSectionId) {
          this.lastActiveId = activeSectionId;
          this.state.activeSection.set(activeSectionId);

          // Silent update of the URL
          try {
            this.router.navigate([], {
              fragment: activeSectionId,
              replaceUrl: true,
            });
          } catch {}
        }
      }, this.DEBOUNCE_TIME); // Fin du timeout
      // End of timeout
    };

    // Create the observer
    this.observer = new IntersectionObserver(callback, options);

    // Observe all sections
    sections.forEach((section) => {
      this.observer!.observe(section);
    });

    // Initialize the active section on load
    // The first section should be active at the start
    if (sections.length > 0) {
      const firstSectionId = sections[0].id;
      this.lastActiveId = firstSectionId;
      this.state.activeSection.set(firstSectionId);
    }
  }

  private handleImageScroll() {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }
    const container = document.getElementById('section-image-scroll');
    if (!container) return;
    const scrollY = window.scrollY;
    const delta = scrollY - this.lastScrollY;
    this.lastScrollY = scrollY;

    // Scroll direction: delta > 0 = down, delta < 0 = up
    // Move the container horizontally
    this.currentTranslateX -= delta * 0.5;
    // Limit the movement
    this.currentTranslateX = Math.max(
      -this.maxTranslate,
      Math.min(this.maxTranslate, this.currentTranslateX)
    );
    container.style.transform = `translateX(${this.currentTranslateX}px)`;
  }
}
