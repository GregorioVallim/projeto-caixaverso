import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pages } from '../../constants/pages.enum';
import { TransactionPagesEnum } from '../../constants/transaction-pages.enum';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  private currentPage$ = new BehaviorSubject<Pages>(Pages.DASHBOARD) ;// Usar BehaviorSubject()
  private transactionPage$ = new BehaviorSubject<TransactionPagesEnum>(TransactionPagesEnum.LIST);

  setCurrentPage(page: Pages): void {
    this.currentPage$.next(page);    
  }

  getCurrentPage(): Observable<Pages> {
    return this.currentPage$;
  }

  setTransactionPage(page: TransactionPagesEnum): void {
    this.transactionPage$.next(page);    
  }

  getTransactionPage(): Observable<TransactionPagesEnum> {
    return this.transactionPage$;
  }
}
