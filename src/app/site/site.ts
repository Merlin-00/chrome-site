import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../components/footer/footer';
import { Navbar } from '../components/navbar/navbar';
import { MatIconModule } from '@angular/material/icon';
import { State } from '../core/services/utilities/state';
import { IS_MEDIUM } from '../app.constants';
import { WindowsObserver } from '../core/services/utilities/windows-observer';
import { ShortBar } from '../components/short-bar/short-bar';
@Component({
  selector: 'app-site',
  imports: [Footer, RouterOutlet, Navbar, MatIconModule, ShortBar],
  template: `
    @if (width() >= medium) { @if (state.isToggleDrawer()){
    <div class="footer-qr-code" (click)="toggleDrawer()">
      <div class="item1">
        <img
          src="/assets/chrome_qr_code.png"
          alt="QR Code Télécharger Chrome"
          class="qr-image"
        />
        <mat-icon class="arrow1">arrow_forward_ios</mat-icon>
      </div>
      <span class="qr-text">Télécharger Chrome pour votre téléphone</span>
    </div>
    }@else {
    <div class="item2" (click)="toggleDrawer()">
      <mat-icon>tablet_android</mat-icon>
      <mat-icon class="arrow2">arrow_back_ios</mat-icon>
    </div>
    } }
    <app-navbar />
    <router-outlet />
    <app-footer />
    <app-short-bar />
  `,
  styles: `
    .footer-qr-code, .item2 {
      position: fixed; 
      right: 0;
      top: 40%; 
      transform: translateY(-50%); 
      background-color: white;
      border: 1px solid #dadce0;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      padding: 1rem;
      z-index: 1000; 
      width: 100px;
      height: 150px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      text-align: center;
      line-height: 1.3;
      cursor: pointer;
    }
    .footer-qr-code{
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
    }
    .item1{
      display: flex;
      gap: 0.5rem;
      margin-right: 20px;
    }
    .item2{
      top: 30%;
      flex-direction: row;
      width: fit-content;
      height: auto;
      gap: 0.5rem;
      border-top-left-radius: 40px;
      border-bottom-left-radius: 40px;
    }
    mat-icon{
      color: #1a73e8;
    }
    .arrow1,.arrow2{
      font-size: 1rem;
    }
    .arrow2{
      margin-top: 0.4rem;
    }
    .qr-image {
      width: 80px;
      height: 80px;
      margin-left: 40px;
    }
    .qr-text {
      font-size: 0.70rem;
      color: #5f6368;
      margin-right: 20px;
    }
  `,
})
export default class Site {
  private windows = inject(WindowsObserver);
  width = this.windows.width;
  medium = IS_MEDIUM;
  state = inject(State);
  toggleDrawer() {
    this.state.isToggleDrawer.update((v) => !v);
  }
}
