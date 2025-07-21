import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { Cart, CartService } from '../services/cart/cart-service';
import { AuthService } from '../services/auth/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { WritableSignal } from '@angular/core';
import { Product } from '../services/products/products-service';

interface ProductInOrder{

  id?: number;
  orderId?: number;
  productId?: number;
  quantity?: number;
  price?: number;
  product?: Product;
}

@Component({
  selector: 'app-panier-component',
  imports: [],
  templateUrl: './panier-component.html',
  styleUrl: './panier-component.css'
})
export class PanierComponent implements OnInit {

  private authService = inject(AuthService);
  private platformId = inject(PLATFORM_ID);
  private cartService = inject(CartService);
  products: WritableSignal<ProductInOrder[]> = signal([]);
  initCount = 0;

  constructor(){}

  /* On enregistre et récupère le panier que pour ceux ayant un token, pas de persistance si l'utilisateur reste en invité */
  async ngOnInit(): Promise<ProductInOrder[] | undefined>{
    
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

    const cart = await this.cartService.getCartProducts(userID);

    if(!cart || !cart.products){

      throw new Error("Erreur récupération produits panier");
    }

    this.products.set(cart.products ?? []);

    return cart.products;
  }

}
