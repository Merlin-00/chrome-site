import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IS_MEDIUM } from '../../app.constants';
import { WindowsObserver } from '../../core/services/utilities/windows-observer';

@Component({
  selector: 'app-short-bar',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
  ],
  template: `
    <mat-toolbar class="shortbar">
      @for (section of sectionsNav; track $index) {
      <a [routerLink]="section.path" routerLinkActive="active-link">
        {{ section.label }}
      </a>
      } @if (width() >= medium) {
      <button mat-flat-button><mat-icon>download</mat-icon>Télécharger</button>
      }@else {
      <button mat-flat-button>
        <mat-icon>download</mat-icon>Télécharger Chrome
      </button>
      }
    </mat-toolbar>
  `,
  styles: `
  .shortbar {
      position: fixed; 
      top: 15%;
      right: 25%;
      max-width: 50%;
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border: 1px solid #dadce0;
      box-shadow: 1px 1px 1px rgba(0,0,0,0.1);
      padding: 1.5rem;
      z-index: 100;
      border-top-left-radius: 40px;
      border-bottom-left-radius: 40px;
      border-top-right-radius: 40px;
      border-bottom-right-radius: 40px;
      cursor: pointer;
    }
    @media(max-width: 768px){
      .shortbar {
        position: static; 
        top: auto;
        bottom: 0;
        right: auto;
        border-radius: 0;
        max-width: 100%;
      }
    }
  `,
})
export class ShortBar {
  private windows = inject(WindowsObserver);
  width = this.windows.width;
  medium = IS_MEDIUM;
  sectionsNav = [
    {
      label: 'Mise à jour',
      path: '',
    },
    {
      label: 'À vous',
      path: '',
    },
    {
      label: 'Sécurisé',
      path: '',
    },
    {
      label: 'Rapide',
      path: '',
    },
    {
      label: 'Par Google',
      path: '',
    },
  ];
}
