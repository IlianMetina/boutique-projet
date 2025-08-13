import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';


@Component({
  selector: 'app-admin-component',
  imports: [],
  templateUrl: './admin-component.html',
  styleUrl: './admin-component.css'
})
export class AdminComponent implements OnInit{

  private ordersCountUrl = 'http://localhost:3000/orders/total';
  private clientsCountUrl = 'http://localhost:3000/users/total';
  private authService = inject(AuthService);
  ordersCount = signal<number>(0);
  clientsCount = signal<number>(0);

  async ngOnInit(): Promise<void> {

    console.log("Orders récupérées:");
    const orders = await this.authService.AuthenticatedRequest(this.ordersCountUrl, 'GET');
    console.log(orders)
    if(orders.statusCode == '404'){
      console.log("Erreur récupération des ordersCount");
      this.ordersCount.set(0);
      this.clientsCount.set(0);
      return;
    }
    const clients = await this.authService.AuthenticatedRequest(this.clientsCountUrl, 'GET');
    console.log("Client récupérés :");
    console.log(clients);
    if(!clients) console.log("Erreur récupération clientsCount");

    this.ordersCount.set(orders);
    this.clientsCount.set(clients);
  }

}
