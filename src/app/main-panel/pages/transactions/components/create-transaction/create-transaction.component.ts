import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { first } from 'rxjs';
import { TransactionTypes } from '../../../../../constants/transaction-type.enum';
import { TransactionsService } from '../../../../../core/service/transactions.service';
import { Transactions } from '../../../dashboard/models/transactions.model';

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

  form!: FormGroup;
  transactionTypeEnum = TransactionTypes;

  ngOnInit(): void {
    this.form = new FormGroup({
      date: new FormControl(),
      description: new FormControl(),
      amount: new FormControl(),
      type: new FormControl(),
    })
  }

  onSubmit(): void {  
    const payload: Transactions = this.form.getRawValue();  
    payload.amount = (payload.type === TransactionTypes.EXPENSE ? -1 : 1) * payload.amount;
    this.transactionsService
    .createTransaction(payload)
    .pipe(first())
    .subscribe({
      next: () => {
        console.log("Sucesso");        
      },
      error: (err) => {
        console.log(err);        
      },
    });
  }

}
