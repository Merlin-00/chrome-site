import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class State {
  // signal boolean pour l'état du drawer
  isToggleDrawer = signal<boolean>(false);

  constructor() {}
}
