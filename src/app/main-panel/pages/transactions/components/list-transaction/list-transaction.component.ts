import { CommonModule, CurrencyPipe} from '@angular/common';
import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { first } from 'rxjs';
import { TransactionTypes } from '../../../../../constants/transaction-type.enum';
import { NegativeValuesPipe } from '../../../../../shared/pipes/negative-values.pipe';
import { Transactions } from '../../../dashboard/models/transactions.model';
import { MatButtonModule } from '@angular/material/button';
import { RouterService } from '../../../../../core/service/router.service';
import { TransactionPagesEnum } from '../../../../../constants/transaction-pages.enum';
import { MatIcon } from "@angular/material/icon";
import { TransactionsService } from '../../../../../core/service/transactions.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-list-transaction',
  imports: [MatCardModule, MatTableModule, MatButtonModule, CurrencyPipe, CommonModule, NegativeValuesPipe, MatIcon],
  templateUrl: './list-transaction.component.html',
  styleUrl: './list-transaction.component.css'
})
export class ListTransactionComponent implements OnInit{
  
  private readonly routerService = inject(RouterService);
  // private readonly transactionsService = inject(TransactionsService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private transactionsService = inject(TransactionsService);

  @Output() editEmitter = new EventEmitter<string>();

  transactions = toSignal(this.transactionsService.getTransactions(), {
    initialValue: [] as Transactions[],
  })

  // transactions: Transactions[] = [];
  transactionsTypesEnum = TransactionTypes;
  snack: MatSnackBar = inject(MatSnackBar);

  // colunasTabela: string[] = ["id", "date", "description", "amount", "type", "actions"];

  ngOnInit(): void {     
    // this.getTransactions();
      
    }

    // getTransactions(): void {
    //   this.transactionsService
    //   .getTransactions()
    //   .pipe(first())
    //   .subscribe({
    //     next: (res) => {
    //       this.transactions() = res;       
    //     },
    //     error: (err) => {
    //       console.log(err);
    //     },
    //   });
    // }

    redirectToCreate(): void {
      this.router.navigate(['/transactions/create']);
    }

    onEdit(id: string) : void {
      this.router.navigate(['/transactions/create'], { queryParams: { "id": id }});
      // this.editEmitter.emit(id);
    }

    prepararadelete(transaction: Transactions) {
      transaction.deletando = true;
    }

    onDelete(transaction: Transactions): void {
      this.transactionsService
      .deleteTransaction(transaction.id)
      .pipe(first())
      .subscribe({
        next: () => {
          this.transactions();     
        },
        error: (err) => {
          console.log(err);
        },
      });
      
      this.snack.open('Transação excluída com sucesso!', 'OK');
    }
    
    backToList(): void {
      this.router.navigate(['/transactions']);
    }

  }

  
