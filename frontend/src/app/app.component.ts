import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';
import { NavListComponent } from './components/nav-list/nav-list.component';
import { AuthComponent } from './features/auth/auth.component';
import { RouteService } from './shared/services/route.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    HeaderComponent,
    ContentComponent,
    NavListComponent,
    AuthComponent,
  ],
  // providers: [RouteService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Shrimp';
}