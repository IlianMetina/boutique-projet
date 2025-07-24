import { inject, Injectable, signal, WritableSignal } from '@angular/core';
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
  private findBasketIdUrl = "http://localhost:3000/orders/basket/user/"
  private addToCartUrl = "http://localhost:3000/orders/"
  private authService = inject(AuthService);
  private removeItemUrl = "http://localhost:3000/order-item/remove/"
  products: WritableSignal<{ quantity: number }[]> = signal([]);
  
  async getCartProducts(userId: number): Promise<Cart | null>{

    try{

      const isUserAuthed = this.authService.isUserAuthenticated();
      console.log("Utilisateur connecté ? : " + isUserAuthed);
      if(isUserAuthed){
        
        const userOrderId: number = await this.getOrderIdbyUser(userId);
        console.log("orderId récupérer : " + userOrderId);
        
        const response = await fetch(this.cartUrl + userOrderId);
        
        if (!response.ok) {
          
          console.error("Erreur HTTP:", response.status);
          return {
              id: 0,
              products: [],
              total: 0
          };
        }
        
        const body = await response.json();

        if (!body || !body.id || !Array.isArray(body.productsInOrder)) {

          console.error("Format de réponse invalide");
          return null;
        }
        
        console.log("-_-_-_-_-_-_-_-Réponse de l'API : -_-_-_-_-_-_-_-");
        console.log(body);
        
        return {
          id: body.id,
          products: body.productsInOrder,
          total: body.total,
        };
        
      }else{
        
        const productsCart = localStorage.getItem('cart-products');
        if(!productsCart) return null;

        try{

          const parsedCart = JSON.parse(productsCart);
          if(typeof parsedCart === 'object' && parsedCart !== null){
            return parsedCart;
          }

          return null;

        }catch(error){

          console.error("Erreur récupération des produits localStorage :", error);
          return null;
        }
    }
    }catch(error){

      console.error("Erreur dans getCardProducts");
      return {id: 0, products: [], total: 0};
    };
  }

  async getOrderIdbyUser(userId: number): Promise<number>{

    const response = await fetch(this.findBasketIdUrl + userId);

    console.log("-_-_-_-_-_-_-_-_-Réponse API getOrderIdByUser :-_-_-_-_-_-_-_-_-");
    console.log(response);
    console.log("-_-_-_-_-_-_-_-_-Réponse API getOrderIdByUser :-_-_-_-_-_-_-_-_-");

    if(!response.ok){
      
      throw new Error("Erreur lors de la récupération orderId");
    }

    const data = await response.json();

    if (!data || !data.id) {
      throw new Error("Erreur : l'orderId retourné n'est pas un nombre valide");
    }

    return data.id;
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

  async removeCartItem(productId: number){

    const isAuthed = this.authService.isUserAuthenticated();
    if(isAuthed){

      try{

        const response = await this.authService.AuthenticatedRequest(this.removeItemUrl + productId, 'DELETE');
        if(!response.ok){

          console.error("Erreur lors de la suppression du produit");
          return null;
        }

        return await response.json();

      }catch(error){
        console.error("Erreur lors de la tentative de suppression");
        return null;
      } 

    }else{

      const storedProducts = localStorage.getItem('cart-products');

      if(!storedProducts){
        return null;
      }

      const cart = JSON.parse(storedProducts);

        const productIndex = cart.products.findIndex((p: { productId: number; }) => 
          p.productId === productId
        );
    }

  }

  // getTotalItems(): number {

  //   return this.products().reduce((sum: any, item: { quantity: any; }) => sum + (item.quantity || 0), 0);
  // }

async modifyQuantity(productId: number, quantity: number): Promise<Cart | null> {
    const isUserAuthed = this.authService.isUserAuthenticated();

    if (isUserAuthed) {
        try {
            // Modification en BDD
            const response = await this.authService.AuthenticatedRequest(
                `${this.cartUrl}products/${productId}/quantity/${quantity}`,
                'PATCH'
            );

            if (!response.ok) {
                console.error('Erreur modification quantité:', response.status);
                return null;
            }

            return await response.json();
        } catch (error) {
            console.error('Erreur modification quantité:', error);
            return null;
        }
    } else {
        // Modification dans le localStorage
        try {
            const cartStr = localStorage.getItem('cart-products');
            if (!cartStr) return null;

            const cart = JSON.parse(cartStr);
            const productIndex = cart.products.findIndex((p: { productId: number; }) => p.productId === productId);

            if (productIndex === -1) return null;

            // Mise à jour de la quantité
            cart.products[productIndex].quantity = quantity;
            // Recalcul du total
            cart.total = cart.products.reduce((sum: number, p: { price: number; quantity: number; }) => sum + (p.price * p.quantity), 0);

            // Sauvegarde dans le localStorage
            localStorage.setItem('cart-products', JSON.stringify(cart));
            return cart;
        } catch (error) {
            console.error('Erreur modification localStorage:', error);
            return null;
        }
    }
}
}
