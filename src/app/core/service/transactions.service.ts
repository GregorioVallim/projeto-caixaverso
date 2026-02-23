import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transactions } from '../../main-panel/pages/dashboard/models/transactions.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private readonly http = inject(HttpClient);

  apiUrl = 'http://localhost:3000';

  createTransaction(transaction: Transactions): Observable<void> {
      return this.http.post<void>(`${this.apiUrl}/transactions`, transaction);
    }
}
