import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageIntroComponent } from './page-intro/page-intro';

@NgModule({
  declarations: [PageIntroComponent],
  imports: [CommonModule, RouterModule],
  exports: [PageIntroComponent],
})
export class SharedModule { }
