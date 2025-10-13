import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WindowsObserverService {
  width = signal<number>(0);

  init() {
    if (typeof window === 'undefined') return;

    this.width.set(window.innerWidth);
    const obs = new ResizeObserver((entries) => {
      const bboxSize = entries[0].borderBoxSize;
      this.width.set(bboxSize[0].inlineSize);
    });
    obs.observe(document.body);
  }
}
