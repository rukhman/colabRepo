import { Injectable, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  lastRoute: string | null = null;
  routeObservable = new BehaviorSubject<string | null>(null);

  constructor(public router: Router) {
    this.router.events.subscribe((resp) => {
      if (!(resp instanceof NavigationEnd)) return;

      this.routeObservable.next(resp.url);
      this.lastRoute = resp.url;
    });
  }
}
