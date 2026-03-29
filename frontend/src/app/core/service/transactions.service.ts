import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  createTransaction(transaction: Omit<Transactions, 'id'>): Observable<Transactions> {      
      return this.http.post<Transactions>(`${this.apiUrl}`, transaction);
  }

  updateTransaction(transaction: Omit<Transactions, 'id'>, id: string): Observable<Transactions> {    
      return this.http.put<Transactions>(`${this.apiUrl}/${id}`, transaction);
  }

  getTransactionById(id: string): Observable<Transactions> {
    return this.http.get<Transactions>(`${this.apiUrl}/${id}`);
  }

  deleteTransaction(id: string): Observable<void> {
    // Exemplo para enviar um motivo de cancelamento junto com a requisição de DELETE
      const params = new HttpParams().set('motivo', 'cancelamento');
      return this.http.delete<void>(`${this.apiUrl}/${id}`, { params });
  }
}
