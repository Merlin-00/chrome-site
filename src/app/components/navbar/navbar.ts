import { Component, computed, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { APP_NAME, IS_MEDIUM } from '../../app.constants';
import { StateService } from '../../core/services/utilities/state';
import { WindowsObserverService } from '../../core/services/utilities/windows-observer';

@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbarModule,
    MatDividerModule,
    MatSidenavModule,
    RouterLink,
    MatMenuModule,
    MatIconModule,
    RouterLinkActive,
    RouterOutlet,
  ],
  template: `
    <mat-toolbar>
      <div class="left-container">
        @if (viewport() <= medium) {
        <button mat-icon-button matTooltip="menu" (click)="toogleDrawer()">
          <mat-icon>menu</mat-icon>
        </button>
        }
        <span>{{ appName }}</span>
      </div>
    </mat-toolbar>
    <mat-divider />
    <mat-drawer-container autosize style="height: calc(100vh - 65px)">
      <mat-drawer
        [mode]="viewpoint() >= ismedium ? 'side' : 'over'"
        [opened]="viewpoint() >= ismedium || isToogleDrawer()"
      >
        <a
          mat-menu-item
          routerLinkActive="active-link"
          (click)="toogleDrawer()"
        >
          Sécurité</a
        >
        <a mat-menu-item routerLinkActive="active-link" (click)="toogleDrawer()"
          >Par Google</a
        >
        <a
          routerLink="/orders"
          mat-menu-item
          routerLinkActive="active-link"
          (click)="toogleDrawer()"
        >
          Extensions
          <mat-icon>arrow_outward</mat-icon></a
        >
      </mat-drawer>

      <mat-drawer-content>
        <router-outlet />
      </mat-drawer-content>
    </mat-drawer-container>
  `,
  styles: `
  mat-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  mat-drawer{
    width: 220px;
    border-right: 1px solid var(--mat-sys-outline-variant); 
    border-radius: 0%;
  }
  .active-link{
    background: var(--mat-sys-outline-variant)
  }
  `,
})
export class Navbar {
  appName = APP_NAME;
  medium = IS_MEDIUM;
  viewport = inject(WindowsObserverService).width;
  state = inject(StateService);
  toogleDrawer = () => this.state.isToogleDriwer.update((value) => !value);
  ismedium = IS_MEDIUM;
  viewpoint = inject(WindowsObserverService).width;
  isToogleDrawer = computed(() => this.state.isToogleDriwer());
}
