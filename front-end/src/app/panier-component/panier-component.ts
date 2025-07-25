import { Component, inject, OnInit, PLATFORM_ID, Signal, signal } from '@angular/core';
import { CartService } from '../services/cart/cart-service';
import { AuthService } from '../services/auth/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { WritableSignal } from '@angular/core';
import { Product } from '../services/products/products-service';

interface ProductInOrder{

  id?: number;
  orderId?: number;
  productId: number;
  quantity?: number;
  price: number;
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
  tax: number = 1.2;
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

      console.log("------------Produits vides------------");
      this.products.set([]);
      return;
    }

    const userID = this.authService.getIdFromToken(token);

    if(!userID){
      console.log("------------Produits vides------------");
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

  getTotalItems(): number {

    const products = this.products();
    if(!products || !Array.isArray(products)){
      return 0
    }
    return products.reduce((sum, item) => sum + (item.quantity || 0), 0);
  }

  getSubTotal(): number {
    const subTotal = this.products().reduce((sum, item) => {
        const price = item.product?.price ? Number(item.product.price) : 0;
        const quantity = item.quantity ?? 0;
        return sum + (price * quantity);
    }, 0);

    return Number(subTotal.toFixed(2));
  }

  getTotal(): number {
    const total = this.getSubTotal() * this.tax;
    return Number(total.toFixed(2));
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

  async updateQuantity(product: ProductInOrder, change: number) {
    console.log("Mise à jour de la quantité pour le produit");
    const newQuantity = (product.quantity || 0) + change;
    if (newQuantity >= 0) {

      await this.cartService.modifyQuantity(product.productId, newQuantity);
      const token = this.authService.getToken();
      if(!token){
        throw new Error("Erreur récupération token");
      }
      const userId = this.authService.getIdFromToken(token);
      const cart = await this.cartService.getCartProducts(userId);
      this.products.set(cart?.products ?? []);
    }
  }

  async removeItems(product: ProductInOrder){

    try{

      console.log("Suppression du produit : ", product);
      await this.cartService.removeCartItem(product.productId);
      
    }catch(error){

      console.error("Erreur lors de la suppression produit :", error);
    }

  }

}
