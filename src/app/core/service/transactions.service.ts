import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transactions } from '../../main-panel/pages/dashboard/models/transactions.model';

@Injectable({
  providedIn: 'root'
})

export class TransactionsService {

  // private readonly http = inject(HttpClient);  



  private apiUrl = 'http://localhost:3000/transactions';

  constructor(private http: HttpClient) {}

  getTransactions(): Observable<Transactions[]> {
    return this.http.get<Transactions[]>(`${this.apiUrl}`);
  }

  createTransaction(transaction: Transactions): Observable<void> {
      return this.http.post<void>(`${this.apiUrl}`, transaction);
  }

  updateTransaction(transaction: Transactions, id: string): Observable<void> {
      return this.http.put<void>(`${this.apiUrl}/${id}`, transaction);
  }

  getTransactionById(id: string): Observable<Transactions> {
    return this.http.get<Transactions>(`${this.apiUrl}/${id}`);
  }

  deleteTransaction(id: string): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
