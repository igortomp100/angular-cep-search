import { Component, inject, isDevMode } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { inject as injectAnalytics, pageview } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';
import { filter } from 'rxjs';
import { Pwa } from '@core/services/pwa';

@Component({
  selector: 'app-root',
  standalone: false,
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly pwa = inject(Pwa);

  constructor() {
    const router = inject(Router);

    injectAnalytics({
      mode: isDevMode() ? 'development' : 'production',
      disableAutoTrack: true,
    });

    injectSpeedInsights({
      framework: 'angular',
      debug: isDevMode(),
    });

    router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((event) => {
        const path = event.urlAfterRedirects.split(/[?#]/)[0];
        pageview({ path, route: path });
      });
  }
}
