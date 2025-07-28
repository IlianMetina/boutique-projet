import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AccountService } from '../services/account/account-service';

@Component({
  selector: 'app-account-component',
  imports: [RouterLink, RouterModule],
  templateUrl: './account-component.html',
  styleUrl: './account-component.css'
})
export class AccountComponent implements OnInit {

  private accountService = inject(AccountService);
  ordersCount: WritableSignal<number> = signal(0);
  currentOrdersCount: WritableSignal<number> = signal(0);
  userName: WritableSignal<string> = signal('Patoulet');

  async ngOnInit(): Promise<void> {
    
    const allOrders = this.accountService.getAllOrders();
    // console.log(allOrders);
    const allPendingOrders = this.accountService.getPendingOrders();
    // console.log(allPendingOrders);
    const getUserName = this.accountService.getUserName();
    // console.log(getUserName);
  }
}
