import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { CreateTransactionComponent } from './components/create-transaction/create-transaction.component';
import { ListTransactionComponent } from './components/list-transaction/list-transaction.component';

@Component({
  selector: 'app-transactions',
  imports: [MatButtonModule, CreateTransactionComponent, ListTransactionComponent],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent {

  showCreateForm = false;

  redirectToCreate(): void {
    this.showCreateForm = !this.showCreateForm;
  }

}
