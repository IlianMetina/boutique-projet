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

  async getCartProducts(id: number): Promise<Cart>{

    /* A changer car il nous faut un orderId pour le joueur et 
    pas son UserID pour trouver sa commande associée (status "BASKET")*/
    const response = await fetch(this.cartUrl + id);

    if(!response.ok){

      throw new Error("Erreur HTTP: " + response.status);
    }

    const body = await response.json();

    if(!body){

      throw new Error("Erreur de récupération du panier");
    }

    return body;
  }

  addToCart(){


  }

  removeCartItem(){


  }

  clearCart(){


  }
}
