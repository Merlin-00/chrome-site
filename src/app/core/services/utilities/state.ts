import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class State {
  isToggleDrawer = signal<boolean>(false);
  showShortBar = signal<boolean>(false);
  constructor() {}
}
