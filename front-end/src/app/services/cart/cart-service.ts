import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Product } from '../products/products-service';

export interface Cart {

  id: number;
  products: {

    productId: number;
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  private cartUrl = "http://localhost:3000/orders/";
  private findBasketUrl = "http://localhost:3000/orders/basket/";
  private findBasketIdUrl = "http://localhost:3000/basket/user/"
  private addToCartUrl = "http://localhost:3000/orders/"
  private authService = inject(AuthService);

  async getCartProducts(userId: number): Promise<Cart | null>{

    const isUserAuthed = this.authService.isUserAuthenticated();
    console.log("Utilisateur connecté ? : " + isUserAuthed);
    if(isUserAuthed){
      
      const userOrderId: number = await this.getOrderIdbyUser(userId);
      console.log("orderId récupérer : " + userOrderId);
      if(typeof userOrderId !== "number"){
        
        throw new Error("Erreur de récupération de l'ID de la commande");
      }
      
      const response = await fetch(this.cartUrl + userOrderId);
      
      if(!response.ok){
        
        throw new Error("Erreur HTTP: " + response.status);
      }
      
      const body = await response.json();
      
      if(!body){
        
        throw new Error("Erreur de récupération du panier");
      }

      console.log("-_-_-_-_-_-_-_-Réponse de l'API : -_-_-_-_-_-_-_-");
      console.log(body);
      
      return body;

    }else{

      const productsCart = localStorage.getItem('token');
      if(productsCart){

        const productsArray = JSON.parse(productsCart) ?? [];
        return productsArray;

      }else{

        return null;
      }
    }
  }

  async getOrderIdbyUser(userId: number): Promise<number>{

    const response = await fetch(this.findBasketIdUrl + userId);

    console.log("-_-_-_-_-_-_-_-_-Réponse API getOrderIdByUser :-_-_-_-_-_-_-_-_-");
    console.log(response);
    console.log("-_-_-_-_-_-_-_-_-Réponse API getOrderIdByUser :-_-_-_-_-_-_-_-_-");

    if(!response.ok){
      
      throw new Error("Erreur lors de la récupération orderId");
    }

    const userOrderId = await response.json();

    if (typeof userOrderId !== "number") {
      throw new Error("Erreur : l'orderId retourné n'est pas un nombre valide");
    }

    return userOrderId;
  }

  async addToCart(products: Product[]){

    /* 
      Logique : Si l'utilisateur est authentifié, on stocke directement les produits mis au panier dans la BDD.
      Si l'utilisateur n'est pas authentifié, on stocke les produits mis dans le panier dans le localStorage.
    */
   
   const isUserAuthed = this.authService.isUserAuthenticated();
   
   if(isUserAuthed){
     
     const response = await this.authService.AuthenticatedRequest(this.addToCartUrl, 'POST', products);
     const body = await response.json();
     
     return body;
     
    }else{
      
      const productsToString = products.toString();
      localStorage.setItem('cart-products', productsToString);
    }

  }

  removeCartItem(){

    

  }

  clearCart(){


  }

  updateQuantity(productId: number){


  }
}
