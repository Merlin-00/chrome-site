import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShowCard {
  isCard1Visible = signal(false);
  isCard2Visible = signal(false);
  isCard3Visible = signal(false);
  isCard4Visible = signal(false);
  isCard5Visible = signal(false);
  isCard6Visible = signal(false);
  toogleCardVisibility(cardSignal: WritableSignal<boolean>): void {
    cardSignal.set(!cardSignal());
  }
}
