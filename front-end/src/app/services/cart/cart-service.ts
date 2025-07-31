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
  private findBasketIdUrl = "http://localhost:3000/orders/basket/user/";
  private addToCartUrl = "http://localhost:3000/order-item/create/";
  private updateProductCart = "http://localhost:3000/order-item/update-quantity/";
  private authService = inject(AuthService);
  private removeItemUrl = "http://localhost:3000/order-item/remove/";
  products: WritableSignal<{ quantity: number }[]> = signal([]);
  private orderId!: number;
  
  async getCartProducts(userId: number): Promise<Cart | null>{

    try{
      
      const isUserAuthed = this.authService.isUserAuthenticated();
      if(isUserAuthed){

        console.log("userid envoyé à getOrderIdByUser :", userId);
        const userOrderId: number = await this.getOrderIdbyUser(userId);
        console.log("------------- Entrée getCardProducts ---------------");
        console.log("orderId récupérer : " + userOrderId);
        
        const response = await this.authService.AuthenticatedRequest(this.cartUrl + userOrderId, 'GET');
        console.log("Réponse fetch getCartProducts");
        console.log(response);
        
        if (!response || response.error) {

          console.error("Erreur HTTP:", response.status);
          return {
            id: 0,
            products: [],
            total: 0
          };
        }
        
        console.log("(!)(!)(!)(!)Entrée getOrderIdByUser service getCartProducts (cart-service.ts)(!)(!)(!)(!)");

        return {
          id: response.id,
          products: response.productsInOrder,
          total: response.total,
        };
        
      }else{
        
        console.log("))ELSE((");
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

      console.error("Erreur dans getCartProducts");
      return {id: 0, products: [], total: 0};
    };
  }

  async getOrderIdbyUser(userId: number): Promise<number>{

    const orderId = await this.authService.AuthenticatedRequest(this.findBasketIdUrl + userId, 'GET');
    console.log("-_-_-_-_-_-_-_-_-Réponse API getOrderIdByUser :-_-_-_-_-_-_-_-_-");
    console.log(orderId);
    console.log("-_-_-_-_-_-_-_-_-Réponse API getOrderIdByUser :-_-_-_-_-_-_-_-_-");
    
    if(!orderId){
      
      throw new Error("Erreur lors de la récupération orderId");
    }

    this.orderId = orderId;
    
    return orderId;
  }

  async addToCart(products: Product[]){

    /* 
      Logique : Si l'utilisateur est authentifié, on stocke directement les produits mis au panier dans la BDD.
      Si l'utilisateur n'est pas authentifié, on stocke les produits mis dans le panier dans le localStorage.
    */

    console.log("Entrée méthode addtoCart cartService");
    const isUserAuthed = this.authService.isUserAuthenticated();
   
    if(isUserAuthed){

      const token = this.authService.getToken();
      if(!token){

        throw new Error("Erreur récupération token");
      }

      const userId = this.authService.getIdFromToken(token);
      if(!userId){

        throw new Error("Erreur récupération userId");
      }

      const cart = await this.getCartProducts(userId);
      if(!cart){

        throw new Error("Erreur lors de la récupération du cart");
      }

      const product = products[0];

      const isProductInCart = cart.products.some(p => p.productId == product.id);
      if(isProductInCart){

        alert("Produit déjà présent dans le panier");
        return;
      }

      const productDto = {
        
        productId: product.id,
        quantity: 1,
      };


      const response = await this.authService.AuthenticatedRequest(this.addToCartUrl, 'POST', productDto);
      
      return response;
     
    }else{
      
      const productsToString = JSON.stringify(products);
      localStorage.setItem('cart-products', productsToString);
    }
  }

  async removeCartItem(productId: number){

    const isAuthed = this.authService.isUserAuthenticated();
    console.log("isAuthed ? :", isAuthed);
    console.log("productId ? : ", productId);
    console.log("Url removeItem ? : ", this.removeItemUrl);
    
    if(isAuthed){

      try{

        console.log("Url de suppression produit : ", this.removeItemUrl + productId);
        const token = this.authService.getToken();
        if(!token) throw new Error('Erreur récupération token');
        const userId = this.authService.getIdFromToken(token);
        const orderId = await this.getOrderIdbyUser(userId);

        const response = await this.authService.AuthenticatedRequest(this.removeItemUrl + productId + '/' + orderId, 'DELETE');
        
        console.log("Réponse du backend: ", response);
        console.log("is response ok ?:", response.ok);
        console.log("Statut de la response : ", response.status);

        if(!response || !response.id){

          console.error("Erreur lors de la suppression du produit");
          return;
        }

        const cart = await this.getCartProducts(userId);

        this.products.set(cart?.products ?? []);

        const responseData = await response.json();

        return responseData;

      }catch(error){
        console.error("Erreur lors de la tentative de suppression ", error);
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

  async modifyQuantity(productId: number, quantity: number): Promise<Cart | null> {

    const isUserAuthed = this.authService.isUserAuthenticated();
    if(isUserAuthed) {

      const data = {
        orderId: this.orderId,
        productId: productId,
        quantity: quantity,
      }

      console.log("-------DATA modifyQuantity--------");
      console.log("orderId:" + data.orderId, "productId:" + data.productId, "quantity:" + data.quantity)
      console.log("-------DATA modifyQuantity--------");

      if(data.quantity < 1){
        this.removeCartItem(data.productId);
      }

      try {
        // Modification en BDD
        const response = await this.authService.AuthenticatedRequest(this.updateProductCart, 'PATCH', data);

        console.log("response modifyQuantity:");
        console.log(response);

        if (response.error) {
          console.error('Erreur modification quantité:', response.error);
          return null;
        }

        return response;

      } catch (error) {
        console.error('Erreur modification quantité:', error);
        return null;
      }
    }else {
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
