import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';


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
    NgxMaskDirective,
    RouterOutlet
],
  templateUrl: './create-transaction.component.html',
  providers: [provideNativeDateAdapter(), provideNgxMask()],
  styleUrl: './create-transaction.component.css'
})
export class CreateTransactionComponent implements OnInit {
  private readonly transactionsService = inject(TransactionsService);  
  private readonly routerService = inject(RouterService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  @Input() id?: string;

  account?: Account;
  form!: FormGroup;
  transactionTypeEnum = TransactionTypes;
  snack: MatSnackBar = inject(MatSnackBar);

  ngOnInit(): void {
   this.buildForm();
   this.route.queryParamMap.subscribe( (query: any) => {
    const params = query['params'];
    this.id = params['id'];
  })
  if (this.id){
    this.getTransactionById(this.id);
  }

  }

  buildForm(): void {
    this.form = new FormGroup({
      date: new FormControl(null, Validators.required),
      description: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      amount: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      deletando: new FormControl(false)      
    });
  }

  getTransactionById(id : string): void {
    this.transactionsService
    .getTransactionById(id)
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
    this.router.navigate(['/transactions/list']);
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
