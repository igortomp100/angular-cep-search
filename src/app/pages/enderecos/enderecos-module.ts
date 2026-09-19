import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { EnderecosRoutingModule } from './enderecos-routing-module';
import { EnderecosComponent } from './enderecos';
import { SharedModule } from '../../shared/shared-module';
import { BuscarCepComponent } from './buscar-cep/buscar-cep';
import { BuscarCepSearchComponent } from './buscar-cep-search/buscar-cep-search';
import { ReactiveFormsModule } from '@angular/forms';
import { ListaEnderecos } from './lista-enderecos/lista-enderecos';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [EnderecosComponent, BuscarCepComponent, BuscarCepSearchComponent, ListaEnderecos],
  imports: [
    CommonModule,
    EnderecosRoutingModule,
    SharedModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
  ],
})
export class EnderecosModule { }
