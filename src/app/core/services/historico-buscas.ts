import { Service } from '@angular/core';
import { Busca } from '@core/models/busca';

@Service()

export class HistoricoBuscas {
    private readonly chave = 'historico_buscas';

    obterBuscas(): Busca[] {
        const dadosSalvos = localStorage.getItem(this.chave);

        if (!dadosSalvos) {
            return [];
        }

        return JSON.parse(dadosSalvos);
    }

    salvarBuscas(buscas: Busca[]): void {
        localStorage.setItem(this.chave, JSON.stringify(buscas));
    }
}
