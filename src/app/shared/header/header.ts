import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class HeaderComponent {
  submenuAberto = false;
}
