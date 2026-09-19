import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViaCepResponse } from '@core/models/via-cep-address';
import { Observable } from 'rxjs';

@Service()

export class ViaCep {
    private readonly http = inject(HttpClient);

    search(cep: string): Observable<ViaCepResponse> {
        const normalizedCep = cep.replace(/\D/g, '');

        return this.http.get<ViaCepResponse>(`https://viacep.com.br/ws/${normalizedCep}/json/`);
    }
}
