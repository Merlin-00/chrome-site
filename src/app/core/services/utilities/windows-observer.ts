import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WindowsObserver {
  // signal contenant la largeur courante
  width = signal<number>(typeof window !== 'undefined' ? window.innerWidth : 0);

  private initialized = false;

  init() {
    if (this.initialized) return;
    this.initialized = true;

    if (typeof window === 'undefined') return;

    // initial value
    this.width.set(window.innerWidth);

    // ResizeObserver is nice but some environments simpler to use window resize as fallback
    try {
      const observer = new ResizeObserver((entries) => {
        if (!entries || entries.length === 0) return;
        const entry = entries[0];
        // support different shapes of borderBoxSize
        const inlineSize =
          (entry.borderBoxSize &&
            (entry.borderBoxSize as any)[0]?.inlineSize) ??
          entry.contentRect?.width;
        if (typeof inlineSize === 'number') {
          this.width.set(Math.round(inlineSize));
        }
      });
      observer.observe(document.body);
    } catch (err) {
      // fallback to window resize event
      const onResize = () => this.width.set(window.innerWidth);
      window.addEventListener('resize', onResize, { passive: true });
      // set once
      this.width.set(window.innerWidth);
    }
  }
}
