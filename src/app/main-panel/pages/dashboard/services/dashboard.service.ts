import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../models/Account.model';
import { Transactions } from '../models/transactions.model';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly http = inject(HttpClient);

  apiUrl = 'http://localhost:3000';

  getAccount(): Observable<Account> {
    return this.http.get<Account>(`${this.apiUrl}/account`);
  }
  
  getTransactions(): Observable<Transactions> {
    return this.http.get<Transactions>(`${this.apiUrl}/transactions`);
  }

  
  
}
