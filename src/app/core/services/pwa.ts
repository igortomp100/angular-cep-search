import { DestroyRef, inject, Service, signal } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs';

@Service()
export class Pwa {
    private readonly swUpdate = inject(SwUpdate);
    private readonly destroyRef = inject(DestroyRef);

    readonly online = signal(navigator.onLine);
    readonly updateAvailable = signal(false);

    constructor() {
        const setOnline = () => this.online.set(true);
        const setOffline = () => this.online.set(false);

        window.addEventListener('online', setOnline);
        window.addEventListener('offline', setOffline);
        this.destroyRef.onDestroy(() => {
            window.removeEventListener('online', setOnline);
            window.removeEventListener('offline', setOffline);
        });

        if (this.swUpdate.isEnabled) {
            const sub = this.swUpdate.versionUpdates
                .pipe(filter((e): e is VersionReadyEvent => e.type === 'VERSION_READY'))
                .subscribe(() => this.updateAvailable.set(true));
            this.destroyRef.onDestroy(() => sub.unsubscribe());
        }
    }

    reload(): void {
        document.location.reload();
    }
}
