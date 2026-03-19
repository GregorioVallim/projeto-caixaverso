import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit, signal, effect } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { first } from 'rxjs';
import { DashboardService } from '../../../core/service/dashboard.service';
import { NegativeValuesPipe } from '../../../shared/pipes/negative-values.pipe';
import { Account } from './models/account.model';
import { Transactions } from './models/transactions.model';
import { RouterService } from '../../../core/service/router.service';
import { TransactionPagesEnum } from '../../../constants/transaction-pages.enum';
import { Pages} from '../../../constants/pages.enum';
import { BehaviorSubject } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIcon } from "@angular/material/icon";



@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule,
    MatTableModule,
    MatButtonModule,
    CommonModule,
    CurrencyPipe,
    NegativeValuesPipe,
    MatInputModule,
    MatFormFieldModule,
    FormsModule, MatIcon],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private readonly dashboardService = inject(DashboardService);
  private readonly routerService = inject(RouterService);
  
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  private valorSubject = new BehaviorSubject<number | null>(null);
  account2$ = this.valorSubject.asObservable();
  
  account?: Account;
  newBalance?: Account;
  calculator: number = 0;
  transactions?: any;  
  transctionPagesEnum = TransactionPagesEnum;
  pagesEnum = Pages;
  searchTransactions: string = '';

  colunasTabela: string[] = ["id", "date", "description", "amount"];
 
  isBalanceVisible = signal(true);
  
  constructor() {
    effect(() => {
      console.log('A visibilade do extrato mudou para:', this.isBalanceVisible());      
    });
  }

  toogleBalance(): void {
    this.isBalanceVisible.update((visible) => !visible);
  }


  ngOnInit(): void {
    this.getAccount();
    this.getTransactions();   
    
    this.getAccountValue();     
  }

  getAccount (): void {
    this.dashboardService.getAccount().pipe(first()).subscribe({
      next: (res: Account) => {
        this.account = res;            
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getTransactions (): void {
    this.dashboardService.getTransactions().pipe(first()).subscribe({
      next: (res: Transactions) => {
        this.transactions = res;                
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  filterTransactions() : Transactions[] {
    return this.transactions.filter((item: Transactions) =>
       item.description.toLowerCase().includes(this.searchTransactions.toLowerCase()))
  }


  getAccountValue (): any {
    const acc = this.valorSubject.getValue();
    console.log(acc);
    

    this.dashboardService.getAccount().pipe(first()).subscribe({
      next: (res: Account) => {
        this.valorSubject.next(res.balance);
        
        console.log(this.valorSubject);
        const valorAtual = this.valorSubject.getValue();


        if (valorAtual !== null) {
            let numero: number = valorAtual; // agora é garantidamente um inteiro
            console.log('Número pronto para enviar:', numero);
            // numero = numero + 20000;
            console.log('Número pronto para enviar:', numero);
            this.saveBalance(numero);
        }                 
      },
      error: (err) => {
        console.log(err);
      },
    });    
  }

 

  

  saveBalance(valor: number): void {
   this.dashboardService
      .updateBalanceAccount({balance: valor })
      .pipe(first())
      .subscribe({
        next: () => {
          console.log("Sucesso");                  
        },
        error: (err) => {
          console.log(err);        
        },
      });    
  }


    redirectToPage(page: Pages): void {
    this.router.navigate(['/transactions/list']);    
    }
  // CalculatorBalance() {
  //   this.getAccount(); 
  //   let soma: number;
  //   this.calculator?.balance = this.account?.balance;
     
      
      
  //    }
  // }




  // Soma(): number {
  //   this.dashboardService
  //     .getTransactions()
  //     .pipe(first())
  //     .subscribe({
  //     next: (res) => {
  //       somaTransactions = res;                
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   })
  //   return soma;
  //   for (let index = 0; index < this.transactions.length; index++) {
  //     soma = soma + this.transactions[index].
      
  //   }
  // }

//  fazerSoma(): number | null {
//     const valor = this.valorSubject.getValue();
//     return valor !== null ? valor + 5000 : null;     
//   }
  

  

}
