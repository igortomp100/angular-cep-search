
import { ChangeDetectorRef, Component, inject, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ViaCep } from '../../../core/services/via-cep';
import { ViaCepAddress, ViaCepResponse } from '@core/models/via-cep-address';
import { Busca } from '@core/models/busca';

@Component({
  selector: 'app-buscar-cep-search',
  standalone: false,
  styleUrl: './buscar-cep-search.scss',
  templateUrl: './buscar-cep-search.html',
})
export class BuscarCepSearchComponent {

  private readonly viaCep = inject(ViaCep);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  @Output() readonly enderecoEncontrado = new EventEmitter<ViaCepAddress>();
  @Input() buscas: Busca[] = [];

  isLoading = false;
  feedbackMessage = '';

  cepForm = new FormGroup({
    cep: new FormControl(''),
  });

  formatCep(value: string): void {
    const digits = value.replace(/\D/g, '').slice(0, 8);
    const formattedCep = digits.length > 5 ? digits.slice(0, 5) + '-' + digits.slice(5) : digits;
    this.cepForm.controls.cep.setValue(formattedCep, { emitEvent: false });
    this.feedbackMessage = '';
  }

  private stopLoading(): void {
    this.isLoading = false;
    this.changeDetectorRef.detectChanges();
  }

  private showFeedback(message: string): void {
    this.feedbackMessage = message;

    const cepControl = this.cepForm.controls.cep;

    cepControl.setErrors({ feedback: true });
    cepControl.markAsTouched();
  }

  search(): void {
    const cep = this.cepForm.controls.cep.value;

    if (!cep) {
      this.showFeedback('Informe um CEP.');
      return;
    }

    const cepNormalizado = cep.replace(/\D/g, '');
    const cepJaExiste = this.buscas.some((busca) => {
      return busca.cep.replace(/\D/g, '') === cepNormalizado;
    });

    if (cepJaExiste || cepNormalizado.length !== 8) {
      this.showFeedback(cepJaExiste ? 'CEP já buscado.' : 'CEP inválido.');
      return;
    }

    this.isLoading = true;

    this.viaCep.search(cep).subscribe({
      next: (address: ViaCepResponse) => {
        // console.log(address);
        if ('erro' in address) {
          this.showFeedback('CEP não encontrado. Revise o número informado.');
          return;
        }
        this.enderecoEncontrado.emit(address)
      },
      error: (error) => {
        // console.error(error);
        this.showFeedback('Erro ao buscar o CEP.');
        this.stopLoading();
      },
      complete: () => {
        this.stopLoading();
      }
    });
  }
}
