import { Injectable, signal, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class WindowsObserver {
  width = signal<number>(0);
  private initialized = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  init() {
    if (this.initialized) return;
    this.initialized = true;

    if (!isPlatformBrowser(this.platformId)) return;

    this.width.set(window.innerWidth);

    try {
      if (typeof ResizeObserver !== 'undefined') {
        const observer = new ResizeObserver((entries) => {
          if (!entries || entries.length === 0) return;
          const entry = entries[0];
          const inlineSize =
            (entry.borderBoxSize &&
              (entry.borderBoxSize as any)[0]?.inlineSize) ??
            entry.contentRect?.width;
          if (typeof inlineSize === 'number') {
            this.width.set(Math.round(inlineSize));
          }
        });
        observer.observe(document.body);
      }
    } catch (err) {
      // fallback
      const onResize = () => this.width.set(window.innerWidth);
      window.addEventListener('resize', onResize, { passive: true });
      this.width.set(window.innerWidth);
    }
  }
}
