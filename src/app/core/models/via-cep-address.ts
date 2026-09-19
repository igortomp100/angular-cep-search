export interface ViaCepAddress {
    cep: string;
    logradouro: string;
    bairro: string;
    localidade: string;
    uf: string;
}

export interface ViaCepNotFound {
    erro: boolean;
}

export type ViaCepResponse = ViaCepAddress | ViaCepNotFound;
