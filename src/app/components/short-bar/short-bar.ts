import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { State } from '../../core/services/utilities/state';
import { IS_MEDIUM } from '../../app.constants';
import { WindowsObserver } from '../../core/services/utilities/windows-observer';

@Component({
  selector: 'app-short-bar',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
  template: `
    @if (showShortBar()) {
    <mat-toolbar class="shortbar" role="navigation">
      @for (section of sectionsNav; track $index) {
      <a href="#{{ section.hash }}" (click)="onClick($event, section.hash)">
        {{ section.label }}
      </a>
      } @if (width() >= medium) {
      <button class="btn" mat-flat-button>
        <mat-icon>download</mat-icon>Télécharger
      </button>
      }@else {
      <button class="btn" mat-flat-button>
        <mat-icon>download</mat-icon>Télécharger Chrome
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
      max-width: 50%;
      display:flex;
      align-items:center;
      justify-content:space-between;
      background-color: white;
      border: 1px solid #dadce0;
      box-shadow: 0 6px 18px rgba(32,33,36,0.08);
      padding: 0.5rem 1rem;
      z-index: 100;
      border-radius: 28px;
      transform-origin: top right;
      animation: shortbar-enter 360ms cubic-bezier(.2,.8,.2,1) both;
      .btn{
        background-color: #1a73e8;
        font-size: 16px;
      }
      .btn:hover{
          background-color: var(--mat-sys-primary);
        }
    }
    @keyframes shortbar-enter{
      from{opacity:0;transform:translateY(-8px) scale(.98)}
      to{opacity:1;transform:translateY(0) scale(1)}
    }

    .shortbar{
      display: flex;
      justify-content: space-between;
    }

    @media(max-width:768px){
      .shortbar{
        position:fixed;
        left:0;
        right:0;
        bottom:0;
        top:auto;
        border-radius:0;
        padding:0.75rem 1rem;
        position: fixed;
        max-width: 100%;
        border-radius: 0;
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
      hash: 'update',
    },
    {
      label: 'À vous',
      path: '',
      hash: 'to-you',
    },
    {
      label: 'Sécurisé',
      path: '',
      hash: 'secure',
    },
    {
      label: 'Rapide',
      path: '',
      hash: 'fast',
    },
    {
      label: 'Par Google',
      path: '',
      hash: 'by-google',
    },
  ];
  private state = inject(State);
  showShortBar = this.state.showShortBar;

  onClick(e: Event, hash: string) {
    e.preventDefault();
    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
