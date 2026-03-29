import { Component, inject, OnInit } from '@angular/core';
import { Pages } from '../constants/pages.enum';
import { RouterService } from '../core/service/router.service';
import { CreditSimulatorComponent } from './pages/credit-simulator/credit-simulator.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { TransferComponent } from './pages/transfer/transfer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-panel',
  imports: [ RouterModule ],
  templateUrl: './main-panel.component.html',
  styleUrl: './main-panel.component.css'
})
export class MainPanelComponent {
  // private readonly routerService = inject(RouterService);
  
  // page!: Pages;
  // pagesEnum = Pages;  

  // ngOnInit(): void {  
  //   this.routerService.getCurrentPage().subscribe((page: Pages) =>{
  //     this.page = page;
  //   });
    
  // }
}
