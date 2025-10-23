import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-fast',
  imports: [MatIconModule, MatCardModule],
  templateUrl: './fast.html',
  styleUrl: './fast.scss',
})
export class Fast {}
