import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
// import { NgScrollbarModule } from 'ngx-scrollbar';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {
  BreakpointObserver,
  Breakpoints,
  LayoutModule,
} from '@angular/cdk/layout';

@Component({
  selector: 'lib-content',
  standalone: true,
  imports: [MatGridListModule, CommonModule, ScrollingModule, LayoutModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent {
  list = new Array(100).fill(0).map((_, i) => i + 1);
  layoutCollsCount = 1;
  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
      ])
      .subscribe((result) => {
        const [xsmall, small, medium, large] = Object.values(
          result.breakpoints
        );
        if (result.matches) {
          if (xsmall) {
            this.layoutCollsCount = 1;
          } else if (small) {
            this.layoutCollsCount = 2;
          } else if (medium) {
            this.layoutCollsCount = 3;
          } else if (large) {
            this.layoutCollsCount = 4;
          }
        } else {
          this.layoutCollsCount = 4;
        }
      });
  }
}
