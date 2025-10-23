import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ShowCard } from '../../../core/services/utilities/show-card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-for-google',
  imports: [MatIconModule, MatCardModule, MatButtonModule],
  templateUrl: './for-google.html',
  styleUrl: './for-google.scss',
})
export class ForGoogle {
  ShowCard = inject(ShowCard);
}
