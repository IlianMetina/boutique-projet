import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { CartService } from '../services/cart/cart-service';

@Component({
  selector: 'app-cancel-component',
  imports: [],
  templateUrl: './cancel-component.html',
  styleUrl: './cancel-component.css'
})
export class CancelComponent implements OnInit{

  private authService = inject(AuthService);
  private cartService = inject(CartService);
  private orderUrl = 'http://localhost:3000/orders/'

  constructor(){}

  async ngOnInit() {
    
    const token = this.authService.getToken();
    if(!token) throw new Error("Erreur récupération token");
    const userId = this.authService.getIdFromToken(token);
    if(!userId) throw new Error("Erreur récupération userId");
    const orderId = this.cartService.getOrderIdbyUser(userId);
    if(!orderId) throw new Error("Erreur récupération orderId");

  }



}
