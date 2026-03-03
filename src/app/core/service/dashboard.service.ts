import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../../main-panel/pages/dashboard/models/account.model';
import { Transactions } from '../../main-panel/pages/dashboard/models/transactions.model';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly http = inject(HttpClient);

  apiUrl = 'http://localhost:3000';

  getAccount(): Observable<Account> {
    return this.http.get<Account>(`${this.apiUrl}/account`);
  }

  updateBalanceAccount( id: string, balance: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/account/${id}`, balance );
  }

  // updateTransaction(transaction: Transactions, id: string): Observable<void> {
  //     return this.http.put<void>(`${this.apiUrl}/transactions/${id}`, transaction);
  // }

  getTransactions(): Observable<Transactions> {
    return this.http.get<Transactions>(`${this.apiUrl}/transactions`);
  }

  
  
}
