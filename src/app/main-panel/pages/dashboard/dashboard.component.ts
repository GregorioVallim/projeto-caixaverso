import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { Account } from './models/Account.model';
import { Transactions } from './models/transactions.model';
import { DashboardService } from './services/dashboard.service';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatTableModule, MatButtonModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private readonly dashboardService = inject(DashboardService);

  account?: Account;
  transactions?: any;

  colunasTabela: string[] = ["date", "description", "amount"];


  ngOnInit(): void {
    this.dashboardService.getAccount().subscribe({
      next: (res: Account) => {
        this.account = res;
        console.log(this.account);
        
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.dashboardService.getTransactions().subscribe({
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
