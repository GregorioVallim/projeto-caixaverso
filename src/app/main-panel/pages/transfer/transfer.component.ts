import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { first } from 'rxjs';
import { TipoPessoa } from '../../../constants/tipo-pessoa.enum';
import { TransactionTypes } from '../../../constants/transaction-type.enum';
import { TransactionsService } from '../../../core/service/transactions.service';
import { TransfersService } from '../../../core/service/transfers.service';
import { Transactions } from '../dashboard/models/transactions.model';
import { Transfer } from '../transfer/models/transfer.model';
import { NgIf } from '@angular/common';

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
    MatDatepickerModule,
    NgxMaskDirective,
    NgIf   
],
  templateUrl: './transfer.component.html',
  providers: [provideNativeDateAdapter(), provideNgxMask()],
  styleUrl: './transfer.component.css'
})
export class TransferComponent implements OnInit {
  private readonly transfersService = inject(TransfersService);
  private readonly transactionsService = inject(TransactionsService);

  snack: MatSnackBar = inject(MatSnackBar);   
  form!: FormGroup;
  transactionTypeEnum = TransactionTypes;
  tipoPessoaEnum = TipoPessoa;
  selectedOption: string = '';




 

  ngOnInit(): void {
    this.buildForm();
  }

    buildForm(): void {
    this.form = new FormGroup({
      agencia: new FormControl(null, [Validators.required, Validators.maxLength(4)]),
      conta: new FormControl(null, Validators.required),
      tipoPessoa: new FormControl(null, Validators.required),
      nome: new FormControl(null, Validators.required),
      cpf: new FormControl(),
      cnpj: new FormControl(),
      date: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      deletando: new FormControl(false)      
    });
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

      onSelectChange(event: any) {
        this.selectedOption = event.value;
      }


}
