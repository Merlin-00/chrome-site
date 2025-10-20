import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-to-you',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './to-you.html',
  styleUrl: './to-you.scss',
})
export class ToYou {}
