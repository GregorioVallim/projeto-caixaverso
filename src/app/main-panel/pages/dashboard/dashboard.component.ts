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

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatTableModule, MatButtonModule, CommonModule, CurrencyPipe, NegativeValuesPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private readonly dashboardService = inject(DashboardService);

  account?: Account;
  transactions?: any;

  colunasTabela: string[] = ["date", "description", "amount"];


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
        console.log(this.transactions);
        
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  

}
