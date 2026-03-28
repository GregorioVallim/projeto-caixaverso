import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-consignado',
  imports: [MatRadioModule,              
            MatCardModule, 
            MatInputModule, 
            MatButtonModule, 
            MatSelectModule,
            FormsModule,
            CommonModule
          ],
  templateUrl: './consignado.component.html',
  styleUrl: './consignado.component.css'
})
export class ConsignadoComponent {
    loanLimit = signal(40000);
    valor: number = 0;
    parcela: number = 0;
    prestacao: number = 0;
    taxa: number = 1.99;

    calcularPrestacao(valorPrincipal: number, numeroParcelas: number) {
    // Converte a taxa de porcentagem para decimal (ex: 2% -> 0.02)
      let i = this.taxa / 100;    
    
    // Fórmula de juros compostos para prestações fixas (Price)
      this.prestacao = (valorPrincipal * i) / (1 - Math.pow(1 + i, -numeroParcelas));

      console.log(this.prestacao);
      console.log(this.prestacao * numeroParcelas);     
    }
}
