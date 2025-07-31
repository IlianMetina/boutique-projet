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

  async ngOnInit(){
    
    const allOrders = await this.accountService.getAllUserOrders();
    
    console.log("AllOrders:");
    console.log(allOrders);
    console.log(allOrders.error);
    if(allOrders.error == "Unauthorized"){
      this.ordersCount.set(0);
      throw new Error("Aucune(s) commande(s) trouvée");
    }
    this.ordersCount.set(allOrders);
    const allPendingOrders = this.accountService.getPendingOrders();
    console.log("allPendingORders : ")
    console.log(allPendingOrders);
    const getUserName = await this.accountService.getUserName();
    console.log("Prénom récupérer :", getUserName);
    this.userName.set(getUserName);
  }
}
