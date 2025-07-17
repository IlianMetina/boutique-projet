import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Cart, CartService } from '../services/cart/cart-service';
import { AuthService } from '../services/auth/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-panier-component',
  imports: [],
  templateUrl: './panier-component.html',
  styleUrl: './panier-component.css'
})
export class PanierComponent implements OnInit {

  private authService = inject(AuthService);
  private platformId = inject(PLATFORM_ID);
  initCount = 0;

  constructor(private readonly cartService: CartService){}

  /* On enregistre et récupère le panier que pour ceux ayant un token, pas de persistance si l'utilisateur reste en invité */
  async ngOnInit(): Promise<Cart | undefined>{
    
    this.initCount++;
    console.log("Tour ngOnInit n°" + this.initCount);

    if(!isPlatformBrowser(this.platformId)){

      console.log("Côté serveur, aucun token disponible");
      return;
    }

    const token = this.authService.getToken();
    console.log('------------------------');
    console.log("Récupération du token onInit : ");
    console.log(token);
    console.log('------------------------');

    console.log("IsTokenFalsy ? : ");
    console.log(token == null);

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
