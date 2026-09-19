import { Component, inject, OnInit } from '@angular/core';
import { HistoricoBuscas } from '@core/services/historico-buscas';
import { ViaCepAddress } from '@core/models/via-cep-address';
import { Busca } from '@core/models/busca';

@Component({
  selector: 'app-buscar-cep',
  standalone: false,
  styleUrl: './buscar-cep.scss',
  templateUrl: './buscar-cep.html',
})
export class BuscarCepComponent {

  buscas: Busca[] = []
  private historicoBuscas = inject(HistoricoBuscas);

  ngOnInit(): void {
    this.buscas = this.historicoBuscas.obterBuscas() || [];
  }

  receberEndereco(endereco: ViaCepAddress): void {

    const { cep, logradouro, bairro, localidade, uf } = endereco;

    this.buscas = [{
      cep: cep,
      endereco: `${logradouro} - ${bairro} - ${localidade}/${uf}`,
      data: new Date().toLocaleString('pt-BR')
    }, ...this.buscas,];

    this.historicoBuscas.salvarBuscas(this.buscas);
  }

  removerBusca(indice: number): void {
    this.buscas = this.buscas.filter((_, indiceAtual) => {
      return indiceAtual !== indice;
    });

    this.historicoBuscas.salvarBuscas(this.buscas);
  }

  excluirTodos(): void {
    this.buscas = [];
    this.historicoBuscas.salvarBuscas(this.buscas);
  }

  constructor() { }
}
