import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnderecosComponent } from './enderecos';
import { BuscarCepComponent } from './buscar-cep/buscar-cep';

const routes: Routes = [
  {
    path: '',
    component: EnderecosComponent
  },
  {
    path: 'buscar',
    component: BuscarCepComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnderecosRoutingModule { }
