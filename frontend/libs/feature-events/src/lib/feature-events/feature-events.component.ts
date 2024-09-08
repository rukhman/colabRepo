import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-feature-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-events.component.html',
  styleUrl: './feature-events.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureEventsComponent {}
