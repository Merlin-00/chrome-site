import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class State {
  isToggleDrawer = signal<boolean>(false);
  showShortBar = signal<boolean>(false);
  // current active section id (hash without #)
  activeSection = signal<string | null>(null);
  constructor() {}
}
