import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Busca } from '@core/models/busca';

@Component({
  selector: 'app-lista-enderecos',
  standalone: false,
  styleUrl: './lista-enderecos.scss',
  templateUrl: './lista-enderecos.html',
})
export class ListaEnderecos {
  @Input() buscas: Busca[] = [];
  @Output() buscaExcluida = new EventEmitter<number>();
  @Output() excluirTodosEvent = new EventEmitter<void>();
}
