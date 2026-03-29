import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { EmprestimoPessoalComponent } from './components/emprestimo-pessoal/emprestimo-pessoal.component';
import { ConsignadoComponent } from './components/consignado/consignado.component';

@Component({
  selector: 'app-credit-simulator',
  imports: [MatRadioModule,              
            MatCardModule, 
            MatInputModule, 
            MatButtonModule, 
            MatSelectModule, 
            NgIf,
            FormsModule,
            EmprestimoPessoalComponent,
            ConsignadoComponent
          ],
  templateUrl: './credit-simulator.component.html',
  styleUrl: './credit-simulator.component.css'
})
export class CreditSimulatorComponent {

valor: number = 0;
parcela: number = 0;
selectedOption: string = '';
taxa: number = 2;
prestacao: number = 0;
imprime: number = 0;


// onSelectChange(event: any) {
//   this.selectedOption = event.value;
// }

calcularPrestacao(valorPrincipal: number, numeroParcelas: number) {
    // Converte a taxa de porcentagem para decimal (ex: 2% -> 0.02)
    let i = this.taxa / 100;    
    
    // Fórmula de juros compostos para prestações fixas (Price)
    this.prestacao = (valorPrincipal * i) / (1 - Math.pow(1 + i, -numeroParcelas));

    console.log(this.prestacao);
    console.log(this.prestacao * numeroParcelas);     
}

// Exemplo: R$ 10.000,00, 2% ao mês, 12 parcelas
// let valor: number = 10000;
// let taxa = 2; 
// let parcelas = 12;

// let resultado = calcularPrestacao(valor, taxa, parcelas);
// console.log(`Valor da prestação: R$ ${resultado}`); // Saída: R$ 945.60

}
