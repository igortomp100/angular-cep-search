import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./pages/home/home-module').then(m => m.HomeModule),
  },
  {
    path: 'enderecos', loadChildren: () => import('./pages/enderecos/enderecos-module').then(m => m.EnderecosModule),
  },
  {
    path: '**', redirectTo: '', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
