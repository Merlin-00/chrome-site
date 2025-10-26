import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { IS_MEDIUM } from '../../../app.constants';
import { WindowsObserver } from '../../../core/services/utilities/windows-observer';

@Component({
  selector: 'app-fast',
  imports: [MatIconModule, MatCardModule],
  templateUrl: './fast.html',
  styleUrl: './fast.scss',
})
export class Fast {
  private windows = inject(WindowsObserver);
  width = this.windows.width;
  medium = IS_MEDIUM;
}
