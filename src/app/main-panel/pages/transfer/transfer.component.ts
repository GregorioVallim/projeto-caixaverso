import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TransfersService } from '../../../core/service/transfers.service'
import { Transfer } from '../transfer/models/transfer.model'
import { TransactionTypes } from '../../../constants/transaction-type.enum';
import { first } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Transactions } from '../dashboard/models/transactions.model';
import { TransactionsService } from '../../../core/service/transactions.service';
import { TipoPessoa } from '../../../constants/tipo-pessoa.enum';


@Component({
  selector: 'app-transfer',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule
  ],
  templateUrl: './transfer.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './transfer.component.css'
})
export class TransferComponent implements OnInit {
  private readonly transfersService = inject(TransfersService);
  private readonly transactionsService = inject(TransactionsService);

  snack: MatSnackBar = inject(MatSnackBar);   
  form!: FormGroup;
  transactionTypeEnum = TransactionTypes;
  tipoPessoaEnum = TipoPessoa;

  ngOnInit(): void {
    this.buildForm();
  }

  onSubmit(): void {  
      const payload: Transfer = this.form.getRawValue();  
      payload.amount = (payload.type === TransactionTypes.EXPENSE ? -1 : 1) * payload.amount;
      
      this.saveTransfer(payload);  
      this.saveTransaction(payload);  
    }
  
    saveTransfer(payload: Transfer): void {
      this.transfersService
        .createTransfer(payload)
        .pipe(first())
        .subscribe({
          next: () => {
            console.log("Sucesso");                    
          },
          error: (err) => {
            console.log(err);        
          },
        });      
      this.snack.open('Transação cadastrada com sucesso!', 'OK');
    }

    saveTransaction(payload: Transactions): void {
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

  buildForm(): void {
    this.form = new FormGroup({
      agencia: new FormControl(),
      conta: new FormControl(),
      tipoPessoa: new FormControl(),
      nome: new FormControl(),
      cpf: new FormControl(),
      date: new FormControl(),
      description: new FormControl(),
      amount: new FormControl(),
      type: new FormControl(),
      deletando: new FormControl(false)      
    });
  }
}
