import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-intro',
  standalone: false,
  styleUrl: './page-intro.scss',
  templateUrl: './page-intro.html',
})
export class PageIntroComponent {
  @Input() subtitle!: string;
  @Input({ required: true }) title: string = "";
  @Input({ required: true }) description: string = "";
  @Input() actionText: string = "";
  @Input() actionLink: string = "";
}
