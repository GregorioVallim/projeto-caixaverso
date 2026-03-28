import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Pages } from '../constants/pages.enum';
import { RouterService } from '../core/service/router.service';
import { MenuItem } from '../models/menu-item.model';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  imports: [MatButtonModule, MatIconModule, RouterModule, TranslatePipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  // private readonly routerService = inject(RouterService);
  

  menuItems: MenuItem[] = [
    {
      label: 'SIDEBAR.DASHBOARD',
      icon: 'home',
      page: Pages.DASHBOARD,
      selected: true,
    },
    {
      label: 'SIDEBAR.TRANSACTIONS',
      icon: 'analytics',
      page: Pages.TRANSACTIONS,
      selected: false,
    },
    {
      label: 'SIDEBAR.TRANSFER',
      icon: 'send_money',
      page: Pages.TRANSFER,
      selected: false,
    },
    {
      label: 'SIDEBAR.CREDIT',
      icon: 'paid',
      page: Pages.CREDIT,
      selected: false,
    },
    {
      label: 'SIDEBAR.PROFILE',
      icon: 'person',
      page: Pages.PROFILE,
      selected: false,
    },
  ];

  // redirectToPage(page: Pages): void {
  //   this.routerService.setCurrentPage(page);
  // }

  /*
    Comunicação entre components
    Do .ts para o template
      Pai pra filho
        Interpolação de string {{}}
        Property Binding []
      Filho para pai
        Event binding ()
      Pai para filho e filho para pai, ao mesmo tempo
        Two way binding [()]
      Comunicação entre componentes irmãos
        Estado centralizado (services ou ngrx)
  */
}
