import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Update } from '../home-sections/update/update';
import { ToYou } from '../home-sections/to-you/to-you';
import { Secure } from '../home-sections/secure/secure';
import { Fast } from '../home-sections/fast/fast';
import { ForGoogle } from '../home-sections/for-google/for-google';
import { FrequentQuestions } from '../home-sections/frequent-questions/frequent-questions';

@Component({
  selector: 'app-home',
  imports: [
    MatIconModule,
    Update,
    ToYou,
    Secure,
    Fast,
    ForGoogle,
    FrequentQuestions,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export default class Home {}
