import { Injectable } from '@angular/core';

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
  private findBasketUrl = "http://localhost:3000/orders/basket/"

  async getCartProducts(userId: number): Promise<Cart>{

    /* A changer car il nous faut un orderId pour le joueur et 
    pas son UserID pour trouver sa commande associée (status "BASKET")*/

    const userOrderId: number = await this.getOrderIdbyUser(userId);

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

    return body;
  }

  async getOrderIdbyUser(userId: number): Promise<number>{

    const response = await fetch(this.findBasketUrl + userId);

    if(!response.ok){
      
      throw new Error("Erreur lors de la récupération orderId");
    }

    const userOrderId = await response.json();

    if (typeof userOrderId !== "number") {
      throw new Error("Erreur : l'orderId retourné n'est pas un nombre valide");
    }

    return userOrderId;
  }

  addToCart(){


  }

  removeCartItem(){


  }

  clearCart(){


  }
}
