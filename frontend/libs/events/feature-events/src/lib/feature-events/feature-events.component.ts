import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UiHeaderComponent } from '@angular-monorepo/ui-header';
@Component({
  selector: 'lib-feature-events',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    UiHeaderComponent,
  ],
  templateUrl: './feature-events.component.html',
  styleUrl: './feature-events.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureEventsComponent {}
