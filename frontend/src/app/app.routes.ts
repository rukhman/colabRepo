import { Routes } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import { AuthComponent } from './features/auth/auth.component';
import { RedirectPageComponent } from './features/auth/vk/pages/redirect-page/redirect-page.component';

export const routes: Routes = [
  { path: '', component: ContentComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'redirect-auth', component: RedirectPageComponent },
];
