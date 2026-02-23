import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { first } from 'rxjs';
import { TransactionTypes } from '../../../../../constants/transaction-type.enum';
import { DashboardService } from '../../../../../core/service/dashboard.service';
import { NegativeValuesPipe } from '../../../../../shared/pipes/negative-values.pipe';
import { Transactions } from '../../../dashboard/models/transactions.model';

@Component({
  selector: 'app-list-transaction',
  imports: [MatCardModule, MatTableModule, CurrencyPipe, CommonModule, NegativeValuesPipe],
  templateUrl: './list-transaction.component.html',
  styleUrl: './list-transaction.component.css'
})
export class ListTransactionComponent implements OnInit{
  private readonly dashboardService = inject(DashboardService);

  transactions?: any;
  transactionsTypesEnum = TransactionTypes;

  colunasTabela: string[] = ["date", "description", "amount", "type"];

  ngOnInit(): void {     
  
      this.dashboardService.getTransactions().pipe(first()).subscribe({
        next: (res: Transactions) => {
          this.transactions = res;       
        },
        error: (err) => {
          console.log(err);
        },
      })
    }

  }
