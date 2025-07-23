import { Component, inject, OnInit, PLATFORM_ID, Signal, signal } from '@angular/core';
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
  currentStage: WritableSignal<number> = signal(0);

  constructor(){}

  /* On enregistre et récupère le panier que pour ceux ayant un token, pas de persistance si l'utilisateur reste en invité */
  async ngOnInit(): Promise<ProductInOrder[] | undefined>{
    
    if(!isPlatformBrowser(this.platformId)){

      console.log("Côté serveur, aucun token disponible");
      return;
    }

    const token = this.authService.getToken();
    // console.log('------------------------');
    // console.log("Récupération du token onInit : ");
    // console.log(token);
    // console.log('------------------------');

    // console.log("IsTokenFalsy ? : ");
    // console.log(token == null);

    if(token == null){

      this.products.set([]);
      return;
    }

    const userID = this.authService.getIdFromToken(token);

    if(!userID){

      this.products.set([]);
      return;
    }

    try{

      const cart = await this.cartService.getCartProducts(userID);
      
      if(!cart || !cart.products){
        
        console.log("Panier vide ou non trouvé");
        this.products.set([]);
        return;
      }
      
      const settedProducts = cart.products ?? [];
      console.log("Produits avant set :", settedProducts);
      this.products.set(settedProducts);
      console.log("Produits après set :", this.products());
      
      return settedProducts;

    }catch(error){

      console.error("Erreur :", error);
      this.products.set([]);
      return;
    }
  }

  nextStep(){

    if(this.currentStage() < 2){
      this.currentStage.set(this.currentStage() + 1);
    }
  }

  previousStep(){

    if(this.currentStage() > 0){

      this.currentStage.set(this.currentStage() - 1);
    }

  }

}
