import { Component, inject, Input, signal, OnInit } from '@angular/core';
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
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';



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
    RouterOutlet,
    MatDialogModule,    
],
  templateUrl: './create-transaction.component.html',
  providers: [provideNativeDateAdapter(), provideNgxMask()],
  styleUrl: './create-transaction.component.css'
})
export class CreateTransactionComponent implements OnInit {
  private readonly transactionsService = inject(TransactionsService);  
  // private readonly dialogRef = inject(MatDialogRef<CreateTransactionComponent>);
  readonly data = inject(MAT_DIALOG_DATA, { optional: true });
  readonly id = this.data?.id;

  private readonly routerService = inject(RouterService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  idd: string = '';

  snack: MatSnackBar = inject(MatSnackBar);

  form = new FormGroup({
    date: new FormControl(new Date().toISOString().split('T')[0], {
      validators: [Validators.required],
      nonNullable: true,
    }),
    description: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ],
      nonNullable: true,
    }),
    amount: new FormControl(0, {
      validators: Validators.required,
      nonNullable: true,
    }),
    type: new FormControl<TransactionTypes | null> (null, {
      validators: Validators.required
    }),
    deletando: new FormControl(false, {
      nonNullable: true,
    }),
  });

  transactionTypeEnum = TransactionTypes;
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

    ngOnInit(): void {  
      this.route.queryParamMap.subscribe( (query: any) => {
        const params = query['params'];
        this.idd = params['id'];
      })
      if (this.idd){
        this.getTransactionById(this.idd);
      }
    }

  onSubmit() {
    if (this.form.valid) {
      this.isLoading.set(true);
      this.errorMessage.set(null); // Limpa error anteriores 

      const formValue = this.form.getRawValue();
      const payload: Omit<Transactions, 'id'> = {
        ...formValue,
        amount: 
          formValue.type === TransactionTypes.EXPENSE
          ? -Math.abs(formValue.amount) // Garante que despesas sejam negativas
          : Math.abs(formValue.amount), // Garante que despesas seja positivas
        type: formValue.type!,  // Garante que o tipo seja um enum
      };

      if (this.idd) {
        this.updateTransaction(payload);
      return;
      }
      this.saveTransaction(payload);      
    }
  }

  saveTransaction(payload: Omit<Transactions, 'id'>): void {
    this.transactionsService
      .createTransaction(payload)
      .subscribe({
        next: () => {
          this.form.reset();
          this.snack.open('Transação cadastrada com sucesso!', 'OK');
          this.backToList();
        },
        error: (err) => {
          console.error('Erro ao criar transação:', err);
          this.errorMessage.set('Ocorreu um erro ao criar a transação.');
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
  }

  updateTransaction(payload: Omit<Transactions, 'id'>): void {
      this.transactionsService
      .updateTransaction(payload, this.idd!)
      .subscribe({
        next: () => {
          this.form.reset();
          this.snack.open('Transação cadastrada com sucesso!', 'OK');
          this.backToList();
        },
        error: (err) => {
          console.error('Erro ao criar transação:', err);
          this.errorMessage.set('Ocorreu um erro ao criar a transação.');
        },
        complete: () => {
          this.isLoading.set(false);
        },
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

  backToList(): void {
    this.router.navigate(['/transactions']);
  }
  



//   @Input() id?: string;

//   account?: Account;
//   form!: FormGroup;
//   transactionTypeEnum = TransactionTypes;
//   snack: MatSnackBar = inject(MatSnackBar);

//   ngOnInit(): void {
//    this.buildForm();
//    this.route.queryParamMap.subscribe( (query: any) => {
//     const params = query['params'];
//     this.id = params['id'];
//   })
//   if (this.id){
//     this.getTransactionById(this.id);
//   }

//   }

//   buildForm(): void {
//     this.form = new FormGroup({
//       date: new FormControl(null, Validators.required),
//       description: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
//       amount: new FormControl(null, Validators.required),
//       type: new FormControl(null, Validators.required),
//       deletando: new FormControl(false)      
//     });
//   }

//   getTransactionById(id : string): void {
//     this.transactionsService
//     .getTransactionById(id)
//     .pipe(first())
//     .subscribe({
//       next: (transaction) => {
//          this.form.patchValue(transaction);     
//       },
//       error: (err) => {
//         console.log(err);        
//       },
//     });
//   }

//   onSubmit(): void {  
//     const payload: Transactions = this.form.getRawValue();  
//     payload.amount = (payload.type === TransactionTypes.EXPENSE ? -1 : 1) * payload.amount;
//     if (this.id) {
//       this.updateTransaction(payload);
//       return;
//     }
//     this.saveTransaction(payload);    
//   }

//   saveTransaction(payload: Transactions): void {
//     this.transactionsService
//       .createTransaction(payload)
//       .pipe(first())
//       .subscribe({
//         next: () => {
//           console.log("Sucesso"); 
//           this.backToList();       
//         },
//         error: (err) => {
//           console.log(err);        
//         },
//       });      
//     this.snack.open('Transação cadastrada com sucesso!', 'OK');
//   }

//   updateTransaction(payload: Transactions): void {
//     this.transactionsService
//       .updateTransaction(payload, this.id!)
//       .pipe(first())
//       .subscribe({
//         next: () => {
//           console.log("Sucesso"); 
//           this.backToList();       
//         },
//         error: (err) => {
//           console.log(err);        
//         },
//       });      
//     this.snack.open('Transação atualizada com sucesso!', 'OK');
//   }

//    backToList(): void {
//     this.router.navigate(['/transactions']);
//   }

  
}
