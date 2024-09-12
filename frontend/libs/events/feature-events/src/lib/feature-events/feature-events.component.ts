import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UiHeaderComponent } from '@angular-monorepo/ui-header';
import { NavListComponent } from './components/nav-list/nav-list.component';
import { ContentComponent } from './components/content/content.component';
@Component({
  selector: 'lib-feature-events',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    UiHeaderComponent,
    NavListComponent,
    ContentComponent,
  ],
  templateUrl: './feature-events.component.html',
  styleUrl: './feature-events.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureEventsComponent {}
