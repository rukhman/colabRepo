import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';

export enum ISize {
  xs = 1,
  s,
  m,
  l,
}

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  size = ISize.xs;

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
            this.size = ISize.xs;
          } else if (small) {
            this.size = ISize.s;
          } else if (medium) {
            this.size = ISize.m;
          } else if (large) {
            this.size = ISize.l;
          }
        } else {
          this.size = ISize.l;
        }
      });
  }
}
