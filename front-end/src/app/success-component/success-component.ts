import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { CartService } from '../services/cart/cart-service';
import { Order } from '../orders-component/orders-component';

@Component({
  selector: 'app-success-component',
  imports: [],
  templateUrl: './success-component.html',
  styleUrl: './success-component.css'
})
export class SuccessComponent implements OnInit{


  private authService = inject(AuthService);
  private cartService = inject(CartService);
  private orderUrl = 'http://localhost:3000/orders/';
  orderTotal = signal<number>(0);

    async ngOnInit() {
    
    const token = this.authService.getToken();
    if(!token) throw new Error("Erreur récupération token");
    const userId = this.authService.getIdFromToken(token);
    if(!userId) throw new Error("Erreur récupération userId");
    const orderId = await this.cartService.getOrderIdbyUser(userId);
    if(!orderId) throw new Error("Erreur récupération orderId");


    const response = await this.authService.AuthenticatedRequest(this.orderUrl + orderId, 'GET');
    this.orderTotal.set(response.total);
    console.log("Total réponse :");
    console.log(response.total);
    console.log('-----------------------------------------------');
    console.log("Total this.orderTotal :");
    console.log(this.orderTotal);
  }

}
