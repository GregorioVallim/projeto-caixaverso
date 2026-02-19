import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Pages } from '../constants/pages.enum';
import { RouterService } from '../core/service/router.service';
import { MenuItem } from '../models/menu-item.model';

@Component({
  selector: 'app-sidebar',
  imports: [MatButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  private readonly routerService = inject(RouterService);
  

  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: '',
      page: Pages.DASHBOARD,
      selected: true,
    },
    {
      label: 'Extrato',
      icon: '',
      page: Pages.TRANSACTIONS,
      selected: false,
    },
    {
      label: 'Transferência',
      icon: '',
      page: Pages.TRANSFER,
      selected: false,
    },
    {
      label: 'Crédito',
      icon: '',
      page: Pages.CREDIT,
      selected: false,
    },
  ];

  redirectToPage(page: Pages): void {
    this.routerService.setCurrentPage(page);
  }

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
