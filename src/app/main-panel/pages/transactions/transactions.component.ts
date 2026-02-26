import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { CreateTransactionComponent } from './components/create-transaction/create-transaction.component';
import { ListTransactionComponent } from './components/list-transaction/list-transaction.component';
import { RouterService } from '../../../core/service/router.service';
import { TransactionPagesEnum } from '../../../constants/transaction-pages.enum';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-transactions',
  imports: [MatButtonModule, CreateTransactionComponent, ListTransactionComponent, AsyncPipe],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent {
  private readonly routerService = inject(RouterService);

  id?: string;

  page$ = this.routerService.getTransactionPage();
  pagesEnum = TransactionPagesEnum;

  handleEditTransaction(id: string): void{
    this.id = id;
    this.routerService.setTransactionPage(TransactionPagesEnum.EDIT);
  }

}
