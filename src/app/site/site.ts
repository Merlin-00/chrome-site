import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../components/footer/footer';
import { Navbar } from '../components/navbar/navbar';

@Component({
  selector: 'app-site',
  imports: [Footer, RouterOutlet, Navbar],
  template: `
    <app-navbar />
    <router-outlet />
    <app-footer />
  `,
  styles: ``,
})
export default class Site {}
