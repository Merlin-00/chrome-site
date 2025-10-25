import { Component, Inject, inject, PLATFORM_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { State } from '../../core/services/utilities/state';
import { IS_MEDIUM } from '../../app.constants';
import { WindowsObserver } from '../../core/services/utilities/windows-observer';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-short-bar',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatSelectModule],
  template: `
    @if (showShortBar()) {
    <mat-toolbar class="shortbar" role="navigation">
      @if (width() >= medium) {
      <!-- Version bureau -->
      <div class="links">
        @for (section of sectionsNav; track $index) {
        <a
          href="#{{ section.hash }}"
          class="{{ activeSection() === section.hash ? 'active' : '' }}"
          (click)="onClick($event, section.hash)"
        >
          {{ section.label }}
        </a>
        }
      </div>
      <button class="btn" mat-flat-button>
        <mat-icon>download</mat-icon>
        Télécharger
      </button>
      } @else {
      <!-- Version mobile -->
      <mat-select
        class="mobile-select"
        placeholder="Explorer"
        (selectionChange)="onSelect($event.value)"
      >
        @for (section of sectionsNav; track $index) {
        <mat-option [value]="section.hash">{{ section.label }}</mat-option>
        }
      </mat-select>

      <button class="btn" mat-flat-button>
        <mat-icon>download</mat-icon>
        Télécharger Chrome
      </button>
      }
    </mat-toolbar>
    }
  `,
  styles: `
    .shortbar {
      position: fixed;
      top: 5%;
      right: 25%;
      left: 25%;
      transform: translateX(50%);
      display: flex;
      align-items: center;
      gap: 1.5rem;
      background-color: white;
      border: 1px solid #dadce0;
      box-shadow: 0 6px 18px rgba(32, 33, 36, 0.08);
      border-radius: 35px;
      z-index: 100;
      animation: shortbar-enter 360ms cubic-bezier(.2,.8,.2,1) both;
      max-width: max-content;
          .btn {
            background-color: #1a73e8;
            color: #fff;
            border-radius: 999px;
            font-size: 16px;
            padding: 2rem;
            padding-top: 0;
            padding-bottom: 0;
            transition: background-color 0.2s;
          }

          .btn:hover {
            background-color: var(--mat-sys-primary);
          }

    }

    .links {
      display: flex;
      gap: 1.5rem;
      padding: 0;
    }

    .links a {    
      padding: 0.3rem 0.8rem;
      border-radius: 999px;
      font-weight: 500;
      transition: background-color 0.2s;
    }

    .links a.active,
    .links a:hover {
      background-color: #eef0f1;
    }

    @keyframes shortbar-enter {
      from { opacity: 0; transform: translateY(-8px) scale(.98); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    /* --- Version mobile --- */
    @media (max-width: 920px) {
      .shortbar {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: auto;
        justify-content: space-between;
        border-radius: 0;
        border-top: 1px solid #dadce0;
        box-shadow: 0 -4px 18px rgba(32, 33, 36, 0.08);
        gap: 1rem;
        padding: 0.75rem 1rem;
        animation: slide-up 420ms cubic-bezier(.2,.8,.2,1) both;
        max-width: 100%;
      }

      .mobile-select {
        max-width: 120px;
        padding: 3rem;
        color: #1a73e8;
      }

      @keyframes slide-up {
        from {
          opacity: 0;
          transform: translateY(100%);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    }
  `,
})
export class ShortBar {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  private windows = inject(WindowsObserver);
  width = this.windows.width;
  medium = IS_MEDIUM;

  sectionsNav = [
    { label: 'Mises à jour', hash: 'update' },
    { label: 'À vous', hash: 'to-you' },
    { label: 'Sécurisé', hash: 'secure' },
    { label: 'Rapide', hash: 'fast' },
    { label: 'Par Google', hash: 'by-google' },
  ];

  private state = inject(State);
  showShortBar = this.state.showShortBar;
  activeSection = this.state.activeSection;

  onClick(e: Event, hash: string) {
    e.preventDefault();
    this.navigateTo(hash);
  }

  onSelect(hash: string) {
    this.navigateTo(hash);
  }

  private navigateTo(hash: string) {
    this.activeSection.set(hash);
    if (isPlatformBrowser(this.platformId)) {
      window.location.hash = hash;
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
