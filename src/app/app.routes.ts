import { Routes } from '@angular/router';
import { DashboardComponent } from './main-panel/pages/dashboard/dashboard.component';
import { TransferComponent } from './main-panel/pages/transfer/transfer.component';
import { TransactionsComponent } from './main-panel/pages/transactions/transactions.component';
import { CreditSimulatorComponent } from './main-panel/pages/credit-simulator/credit-simulator.component';
import { CreateTransactionComponent } from './main-panel/pages/transactions/components/create-transaction/create-transaction.component';
import { ListTransactionComponent } from './main-panel/pages/transactions/components/list-transaction/list-transaction.component';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'transactions', component: TransactionsComponent },    
    { path: 'transactions/create', component: CreateTransactionComponent },    
    { path: 'transactions/list', component: ListTransactionComponent },    
    { path: 'transfer', component: TransferComponent },    
    { path: 'credit', component: CreditSimulatorComponent },    
    { path: '', redirectTo: 'dashboard', pathMatch: "full" },    
];
