import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-back',
  standalone: true,
  imports: [MatIcon, MatButtonModule],
  templateUrl: './back.component.html',
  styleUrl: './back.component.scss',
})
export class BackComponent {}
