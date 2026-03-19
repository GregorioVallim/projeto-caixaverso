import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Pages } from '../constants/pages.enum';
import { RouterService } from '../core/service/router.service';
import { MenuItem } from '../models/menu-item.model';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  imports: [MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  // private readonly routerService = inject(RouterService);
  

  menuItems: MenuItem[] = [
    {
      label: 'Home',
      icon: 'home',
      page: Pages.DASHBOARD,
      selected: true,
    },
    {
      label: 'Extrato',
      icon: 'analytics',
      page: Pages.TRANSACTIONS,
      selected: false,
    },
    {
      label: 'Transferência',
      icon: 'send_money',
      page: Pages.TRANSFER,
      selected: false,
    },
    {
      label: 'Crédito',
      icon: 'paid',
      page: Pages.CREDIT,
      selected: false,
    },
    {
      label: 'Perfil',
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
