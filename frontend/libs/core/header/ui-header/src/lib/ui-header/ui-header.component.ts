import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'lib-ui-header',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatToolbarModule],
  templateUrl: './ui-header.component.html',
  styleUrl: './ui-header.component.css',
})
export class UiHeaderComponent {
  showFiller = false;
  @Output() drawerToggle = new EventEmitter();
}
