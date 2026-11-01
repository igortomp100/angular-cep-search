import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarCepComponent } from './buscar-cep/buscar-cep';

const routes: Routes = [
  {
    path: '',
    component: BuscarCepComponent
  },
  {
    path: 'buscar',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnderecosRoutingModule { }
