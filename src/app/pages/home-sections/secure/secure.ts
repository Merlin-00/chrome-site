import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ShowCard } from '../../../core/services/utilities/show-card';

@Component({
  selector: 'app-secure',
  imports: [MatIconModule, MatCardModule, MatButtonModule],
  templateUrl: './secure.html',
  styleUrl: './secure.scss',
})
export class Secure {
  ShowCard = inject(ShowCard);
}
