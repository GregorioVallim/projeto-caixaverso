import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs';
import { TransactionTypes } from '../../../../../constants/transaction-type.enum';
import { TransactionsService } from '../../../../../core/service/transactions.service';
import { Transactions } from '../../../dashboard/models/transactions.model';
import { DashboardService } from '../../../../../core/service/dashboard.service';
import { Account } from '../../../dashboard/models/account.model';
import { RouterService } from '../../../../../core/service/router.service';
import { TransactionPagesEnum } from '../../../../../constants/transaction-pages.enum';

@Component({
  selector: 'app-create-transaction',
  imports: [
    ReactiveFormsModule,
    MatCardModule, 
    FormsModule, 
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
  ],
  templateUrl: './create-transaction.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './create-transaction.component.css'
})
export class CreateTransactionComponent implements OnInit {
  private readonly transactionsService = inject(TransactionsService);
  private readonly dashboardService = inject(DashboardService);
  private readonly routerService = inject(RouterService);

  @Input() id?: string;

  account?: Account;
  form!: FormGroup;
  transactionTypeEnum = TransactionTypes;
  snack: MatSnackBar = inject(MatSnackBar);

  ngOnInit(): void {
   this.buildForm();
   if (this.id){
    this.getTransactionById();
   }
  }

  buildForm(): void {
    this.form = new FormGroup({
      date: new FormControl(),
      description: new FormControl(),
      amount: new FormControl(),
      type: new FormControl(),
      deletando: new FormControl(false)      
    });
  }

  getTransactionById(): void {
    this.transactionsService
    .getTransactionById(this.id!)
    .pipe(first())
    .subscribe({
      next: (transaction) => {
         this.form.patchValue(transaction);     
      },
      error: (err) => {
        console.log(err);        
      },
    });
  }

  onSubmit(): void {  
    const payload: Transactions = this.form.getRawValue();  
    payload.amount = (payload.type === TransactionTypes.EXPENSE ? -1 : 1) * payload.amount;
    if (this.id) {
      this.updateTransaction(payload);
      return;
    }
    this.saveTransaction(payload);    
  }

  saveTransaction(payload: Transactions): void {
    this.transactionsService
      .createTransaction(payload)
      .pipe(first())
      .subscribe({
        next: () => {
          console.log("Sucesso"); 
          this.backToList();       
        },
        error: (err) => {
          console.log(err);        
        },
      });      
    this.snack.open('Transação cadastrada com sucesso!', 'OK');
  }

  updateTransaction(payload: Transactions): void {
    this.transactionsService
      .updateTransaction(payload, this.id!)
      .pipe(first())
      .subscribe({
        next: () => {
          console.log("Sucesso"); 
          this.backToList();       
        },
        error: (err) => {
          console.log(err);        
        },
      });      
    this.snack.open('Transação atualizada com sucesso!', 'OK');
  }

   backToList(): void {
    this.routerService.setTransactionPage(TransactionPagesEnum.LIST);
  }

  // this.dashboardService.getAccount().pipe(first()).subscribe({
      //       next: (res: Account) => {
      //         this.account = res;            
      //       },
      //       error: (err) => {
      //         console.log(err);
      //       },
      //     });

}
