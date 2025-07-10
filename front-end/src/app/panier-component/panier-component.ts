import { Component, OnInit } from '@angular/core';
import { Cart, CartService } from '../services/cart/cart-service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-panier-component',
  imports: [],
  templateUrl: './panier-component.html',
  styleUrl: './panier-component.css'
})
export class PanierComponent implements OnInit {

  constructor(private readonly cartService: CartService, private readonly authService: AuthService){}

  async ngOnInit(): Promise<Cart>{
    
    const token = this.authService.getToken();

    if(token == null){

      throw new Error("Token non valide");
    }

    const userID = this.authService.getIdFromToken(token);

    if(!userID){

      throw new Error("Erreur récupération ID");
    }

    const cartProducts = this.cartService.getCartProducts(userID);

    if(!cartProducts){

      throw new Error("Erreur récupération produits panier");
    }

    return cartProducts;
  }

}
