import { Routes } from '@angular/router';
import { DashboardComponent } from './main-panel/pages/dashboard/dashboard.component';
import { TransferComponent } from './main-panel/pages/transfer/transfer.component';
import { TransactionsComponent } from './main-panel/pages/transactions/transactions.component';
import { CreditSimulatorComponent } from './main-panel/pages/credit-simulator/credit-simulator.component';
import { CreateTransactionComponent } from './main-panel/pages/transactions/components/create-transaction/create-transaction.component';
import { ListTransactionComponent } from './main-panel/pages/transactions/components/list-transaction/list-transaction.component';
import { NotFoundComponent } from './main-panel/pages/not-found/not-found.component';
import { ProfileComponent } from './main-panel/pages/profile/profile.component';
import { PersonalDataComponent } from './main-panel/pages/profile/pages/personal-data/personal-data.component';
import { SecurityDataComponent } from './main-panel/pages/profile/pages/security-data/security-data.component';
import { LoginComponent } from './main-panel/pages/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { MainPanelComponent } from './main-panel/main-panel.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent  },
    { 
        path: '',
        component: MainPanelComponent,
        canActivate: [authGuard],
        children:[
            { path: 'dashboard', component: DashboardComponent },
            { 
                path: 'transactions', 
                component: TransactionsComponent,
                children: [
                    { path: 'create', component: CreateTransactionComponent },    
                    { path: 'list', component: ListTransactionComponent },
                    { path: '', redirectTo: 'list', pathMatch: 'full' }
                ] 
            },
            { path: 'transfer', component: TransferComponent },    
            { path: 'credit', component: CreditSimulatorComponent }, 
            {
                path: "perfil",
                component: ProfileComponent,
                children: [
                    { path: 'dados', component: PersonalDataComponent },
                    { path: 'seguranca', component: SecurityDataComponent },
                    { path: '', redirectTo: 'dados', pathMatch: 'full' },
                ]
            },   
        ]

    },    
    { path: '', redirectTo: 'login', pathMatch: "full" },  
    { path: '**', component: NotFoundComponent },  // tem que ser o último item do array
];
