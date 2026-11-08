import { computed, DestroyRef, inject, Service, signal } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs';

/** Evento do Chrome/Edge que permite abrir a instalação oficial pelo site. */
interface BeforeInstallPromptEvent extends Event {
    prompt(): Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

declare global {
    interface Window {
        /** Evento capturado cedo pelo script do index.html, antes do Angular iniciar. */
        __installPrompt?: BeforeInstallPromptEvent;
    }
}

/** Como a instalação acontece neste navegador. */
export type ModoInstalacao =
    | 'prompt'       // Chrome/Edge: abre a janela oficial
    | 'ios'          // iPhone/iPad: Compartilhar → Adicionar à Tela de Início
    | 'mac-safari'   // Safari no Mac: Arquivo → Adicionar ao Dock
    | 'indisponivel'; // navegador sem suporte, ou app já instalado


@Service()
export class Pwa {
    private readonly swUpdate = inject(SwUpdate);
    private readonly destroyRef = inject(DestroyRef);

    readonly online = signal(navigator.onLine);
    readonly updateAvailable = signal(false);

    /** Aberto como app instalado (sem barra do navegador). */
    readonly standalone = signal(this.detectarStandalone());
    readonly instalado = signal(false);
    readonly mobile = this.detectarMobile();

    private readonly promptInstalacao = signal<BeforeInstallPromptEvent | undefined>(window.__installPrompt);
    private readonly plataformaApple = this.detectarPlataformaApple();

    readonly modoInstalacao = computed<ModoInstalacao>(() => {
        if (this.standalone() || this.instalado()) return 'indisponivel';
        if (this.promptInstalacao()) return 'prompt';
        return this.plataformaApple ?? 'indisponivel';
    });

    /** O ícone do menu aparece sempre, exceto dentro do app já instalado. */
    readonly mostrarIcone = computed(() => !this.standalone() && !this.instalado());

    constructor() {
        const setOnline = () => this.online.set(true);
        const setOffline = () => this.online.set(false);
        // Sem preventDefault: o aviso automático do navegador continua; o ícone é uma opção a mais.
        const onPrompt = (e: Event) => this.promptInstalacao.set(e as BeforeInstallPromptEvent);
        const onInstalado = () => {
            this.instalado.set(true);
            this.promptInstalacao.set(undefined);
        };

        window.addEventListener('online', setOnline);
        window.addEventListener('offline', setOffline);
        window.addEventListener('beforeinstallprompt', onPrompt);
        window.addEventListener('appinstalled', onInstalado);
        this.destroyRef.onDestroy(() => {
            window.removeEventListener('online', setOnline);
            window.removeEventListener('offline', setOffline);
            window.removeEventListener('beforeinstallprompt', onPrompt);
            window.removeEventListener('appinstalled', onInstalado);
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

    /** Abre a janela oficial de instalação (Chrome/Edge). Retorna se o usuário aceitou. */
    async instalar(): Promise<boolean> {
        const evento = this.promptInstalacao();
        if (!evento) return false;

        // O evento só pode ser usado uma vez.
        this.promptInstalacao.set(undefined);
        window.__installPrompt = undefined;
        await evento.prompt();
        const { outcome } = await evento.userChoice;
        return outcome === 'accepted';
    }

    private detectarStandalone(): boolean {
        const iosStandalone = (navigator as Navigator & { standalone?: boolean }).standalone === true;
        return iosStandalone || window.matchMedia('(display-mode: standalone)').matches;
    }

    private detectarMobile(): boolean {
        return window.matchMedia('(pointer: coarse)').matches || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    }

    private detectarPlataformaApple(): 'ios' | 'mac-safari' | undefined {
        const ua = navigator.userAgent;
        // iPad recente se identifica como Mac, mas tem tela de toque.
        const ios = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
        if (ios) return 'ios';
        const safariMac = /Macintosh/.test(ua) && /Safari/.test(ua) && !/Chrome|Chromium|Edg|Firefox|OPR/.test(ua);
        return safariMac ? 'mac-safari' : undefined;
    }
}
