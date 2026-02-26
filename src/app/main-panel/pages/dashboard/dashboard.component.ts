import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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


@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatTableModule, MatButtonModule, CommonModule, CurrencyPipe, NegativeValuesPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private readonly dashboardService = inject(DashboardService);
  private readonly routerService = inject(RouterService);

  account?: Account;
  transactions?: any;  
  transctionPagesEnum = TransactionPagesEnum;
  pagesEnum = Pages;
  somaTransactions: Transactions[] = [];

  colunasTabela: string[] = ["date", "description", "amount"];

   redirectToPage(page: Pages): void {
    this.routerService.setCurrentPage(page);
    this.backToList();
  }

   backToList(): void {
      this.routerService.setTransactionPage(TransactionPagesEnum.LIST);
    }


  ngOnInit(): void {
    this.dashboardService.getAccount().pipe(first()).subscribe({
      next: (res: Account) => {
        this.account = res;            
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.dashboardService.getTransactions().pipe(first()).subscribe({
      next: (res: Transactions) => {
        this.transactions = res;                
      },
      error: (err) => {
        console.log(err);
      },
    })

    //  if(this.transactions.amount > 0) {
    //       this.soma = this.soma + this.transactions.amount;
    //       console.log(this.soma);
    //     } 
    //     this.soma = this.transactions.amount < 0 ? this.soma = this.soma + this.transactions.amount : 1; 
  }

  // Soma(soma: number): number {
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


  

  

}
