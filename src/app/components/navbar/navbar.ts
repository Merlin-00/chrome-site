import { Component, OnInit, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { APP_NAME, IS_MEDIUM } from '../../app.constants';
import { State } from '../../core/services/utilities/state';
import { WindowsObserver } from '../../core/services/utilities/windows-observer';

@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbarModule,
    MatDividerModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatTooltipModule,
  ],
  template: `
    <mat-toolbar class="toolbar">
      <div class="left-container">
        @if (width() < medium) {
        <button mat-icon-button (click)="toggleDrawer()">
          <mat-icon>menu</mat-icon>
        </button>
        }
        <a routerLink="/" class="logo-link">
          <img src="/assets/chrome.png" alt="logo" />
          <span>{{ appName }}</span>
        </a>
      </div>

      @if (width() >= medium) {
      <nav class="nav-links">
        @for (link of navLinks; track $index) {
        <a
          [href]="link.path"
          [target]="link.external ? '_blank' : '_self'"
          rel="noopener noreferrer"
        >
          <div class="l">
            {{ link.label }}
            @if(link.external){
            <mat-icon class="extern-icon">arrow_outward</mat-icon>
            }
          </div>
        </a>
        }
      </nav>
      }
    </mat-toolbar>

    <!-- Drawer -->
    @if (state.isToggleDrawer() && width() < medium) {
    <div class="drawer-overlay" (click)="toggleDrawer()"></div>

    } @if (state.isToggleDrawer() && width() < medium) {
    <div class="drawer-wrapper">
      <div class="drawer">
        <div class="drawer-content">
          <div>
            <div class="drawer-header">
              <a routerLink="/" class="logo-link">
                <img
                  style="width: 30px; height: 30px;"
                  src="/assets/chrome.png"
                  alt="logo"
                />
                <span style="font-size: 1.5rem;">{{ appName }}</span>
              </a>
            </div>
            <mat-divider></mat-divider>
            <br />
            <mat-nav-list>
              @for (link of navLinks; track $index) {
              <a
                mat-list-item
                [href]="link.path"
                [target]="link.external ? '_blank' : '_self'"
                rel="noopener noreferrer"
                (click)="onDrawerLinkClick()"
              >
                <div class="l">
                  {{ link.label }}
                  @if (link.external) {
                  <mat-icon class="extern-icon">arrow_outward</mat-icon>
                  }
                </div>
              </a>
              }
            </mat-nav-list>
          </div>

          <div class="drawer-footer">
            <button class="btn" mat-flat-button>Télécharger Chrome</button>
          </div>
        </div>

        <button mat-icon-button class="close-btn" (click)="toggleDrawer()">
          <mat-icon>close</mat-icon>
        </button>
      </div>
    </div>
    }
  `,
  styles: `
    .toolbar {
      position: fixed;
      top: 0;
      display: flex;
      align-items: center;
      gap: 4rem;
      padding: 1rem;
      background-color: white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      z-index: 1100; 
      transform: translateZ(0);
        .left-container {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          .logo-link {
            margin-left: 1rem;
            display: flex;
            align-items: center;
            gap: 1rem;
          }
        }
      }

      .nav-links {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        font-size: 17px;
      }

      .l {
        display: flex;
        align-items: center;
        gap: 5px;
        color: #5b5b5b;
      }

      .extern-icon {
        font-size: 16px;
        margin-top: 10px;
      }

      /* Drawer overlay */
      .drawer-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(32, 33, 36, 0.5);
        z-index: 2000;
        transition: opacity 0.3s ease;
      }

      /* Drawer wrapper */
      .drawer-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        display: flex;
        z-index: 2000;
        animation: slideIn 0.3s ease forwards;
      }

      @keyframes slideIn {
        from {
          transform: translateX(-100%);
        }
        to {
          transform: translateX(0);
        }
      }

      .drawer {
        display: flex;
        flex-direction: row;
        background-color: white;
        height: 100%;
        width: 400px;
        position: relative;
      }

      .drawer-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-between;
      }

      .drawer-header {
        padding: 1rem;
        display: flex;
        align-items: center;
      }

      .drawer-footer {
        padding: 16px;
        border-top: 1px solid #eaeaea;
        .btn {
          background-color: #1a73e8;
          font-size: 16px;
          width: 100%;
          height: 48px;
        }
        .btn:hover{
          background-color: var(--mat-sys-primary);
        }
      }

      .close-btn {
        position: absolute;
        top: 20px;
        right: -60px;
        background: transparent;
        color: white;
        z-index: 11;
      }
    `,
})
export class Navbar implements OnInit {
  appName = APP_NAME;
  medium = IS_MEDIUM;

  private windows = inject(WindowsObserver);
  state = inject(State);
  width = this.windows.width;

  navLinks = [
    {
      label: 'Sécurité',
      path: 'https://www.google.com/intl/fr/chrome/safety/',
      external: false,
    },
    {
      label: 'Par Google',
      path: 'https://www.google.com/intl/fr/chrome/browser-tools/',
      external: false,
    },
    {
      label: 'Extensions',
      path: 'https://chromewebstore.google.com/category/extensions',
      external: true,
    },
  ];

  ngOnInit(): void {
    this.windows.init();
  }

  toggleDrawer() {
    this.state.isToggleDrawer.update((v) => !v);
  }

  onDrawerLinkClick() {
    if (this.width() < this.medium) {
      this.state.isToggleDrawer.set(false);
    }
  }
}
