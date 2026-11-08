import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { Pwa } from '@core/services/pwa';

@Component({
  selector: 'app-header',
  standalone: false,
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class HeaderComponent {
  protected readonly pwa = inject(Pwa);
  private readonly elemento = inject(ElementRef<HTMLElement>);

  protected readonly baloAberto = signal(false);

  protected async aoClicarInstalar(): Promise<void> {
    if (this.pwa.modoInstalacao() === 'prompt') {
      this.baloAberto.set(false);
      await this.pwa.instalar();
      return;
    }
    this.baloAberto.update((aberto) => !aberto);
  }

  @HostListener('document:click', ['$event'])
  protected fecharAoClicarFora(evento: MouseEvent): void {
    if (this.baloAberto() && !this.elemento.nativeElement.querySelector('.site-header__install')?.contains(evento.target as Node)) {
      this.baloAberto.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  protected fecharComEsc(): void {
    this.baloAberto.set(false);
  }
}
