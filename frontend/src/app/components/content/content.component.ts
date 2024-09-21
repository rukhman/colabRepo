import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { LayoutModule } from '@angular/cdk/layout';
import { ScreenService } from '../../shared/services/screen.service';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [
    MatGridListModule,
    NgScrollbarModule,
    CommonModule,
    ScrollingModule,
    LayoutModule,
  ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
})
export class ContentComponent {
  list = new Array(100).fill(0).map((_, i) => i + 1);
  constructor(public screenService: ScreenService) {}
}
