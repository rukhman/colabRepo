import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@angular-monorepo/feature-events').then(
        (m) => m.featureEventsRoutes
      ),
  },
];
