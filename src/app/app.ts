import { Component, inject, isDevMode } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { inject as injectAnalytics, pageview } from '@vercel/analytics';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: false,
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  constructor() {
    const router = inject(Router);

    injectAnalytics({
      mode: isDevMode() ? 'development' : 'production',
      disableAutoTrack: true,
    });

    router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      takeUntilDestroyed(),
    ).subscribe((event) => {
      const path = event.urlAfterRedirects.split(/[?#]/)[0];
      pageview({ path, route: path });
    });
  }
}
