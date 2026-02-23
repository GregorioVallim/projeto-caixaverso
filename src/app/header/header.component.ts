import { Component, inject, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { DashboardService } from '../core/service/dashboard.service';
import { Account } from '../main-panel/pages/dashboard/models/account.model';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private readonly dashboardService = inject(DashboardService);

  account?: Account;

  ngOnInit(): void {
    this.dashboardService.getAccount().subscribe({
      next: (res: Account) => {
        this.account = res;
        // console.log(this.account);        
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
