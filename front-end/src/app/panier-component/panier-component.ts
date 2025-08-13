import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { CartService } from '../services/cart/cart-service';
import { AuthService } from '../services/auth/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { WritableSignal } from '@angular/core';
import { Product } from '../services/products/products-service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

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
  imports: [RouterLink],
  templateUrl: './panier-component.html',
  styleUrl: './panier-component.css'
})
export class PanierComponent implements OnInit {

  private authService = inject(AuthService);
  private platformId = inject(PLATFORM_ID);
  private cartService = inject(CartService);
  private router = inject(Router);
  localStorageProducts: WritableSignal<ProductInOrder[]> = signal([]);
  isCartEmpty = true;
  isLocalStorage = false;
  tax: number = 1.2;
  products: WritableSignal<ProductInOrder[]> = signal([]);

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

    if(!token){
      
      const products = localStorage.getItem("cart-products");
      if(!products){
        this.products.set([]);
        this.isCartEmpty = true;
        return;
      }
      
      const productsArray = JSON.parse(products);
      console.log("Produits récupérés localStorage :", productsArray);
      
      // Convertir le format du localStorage en ProductInOrder
      const formattedProducts: ProductInOrder[] = productsArray.map((item: any) => ({
        productId: item.id,
        quantity: 1,
        price: parseFloat(item.price),
        product: {
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          imageUrl: item.imageUrl,
          stock: item.stock,
          categoryId: item.categoryId
        }
      }));

      this.localStorageProducts.set(formattedProducts);
      this.products.set(formattedProducts); // Mettre à jour aussi products
      this.isCartEmpty = false;
      this.isLocalStorage = true;
      console.log("Products formatés :", formattedProducts);
      return formattedProducts;
    }

    const userID = this.authService.getIdFromToken(token);

    console.log("User ID récupérer :", userID);

    if(!userID){
      console.log("------------Produits vides------------");
      this.products.set([]);
      this.isCartEmpty = true;
      return;
    }

    try{

      const cart = await this.cartService.getCartProducts(userID);
      console.log("------CART--------");
      console.log(cart);
      console.log("------REPONSE--------");

      console.log("------CART.PRODUCTS-------");
      if(cart){

        console.log("------CART.PRODUCTS-------");
        console.log(cart.products)
      }
      
      if(!cart || !cart.products){
        
        console.log("Panier vide ou non trouvé");
        this.products.set([]);
        this.isCartEmpty = true;
        return;
      }
      
      const settedProducts = cart.products ?? [];
      console.log("Produits avant set :", settedProducts);
      this.products.set(settedProducts);
      this.isCartEmpty = false;
      console.log("Produits après set :", this.products());
      console.log("isLocalStorage & isCartEmpty ? :", this.isCartEmpty, this.isLocalStorage);

      return settedProducts;

    }catch(error){

      console.error("Erreur :", error);
      this.products.set([]);
      this.isCartEmpty = true;
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

  async updateQuantity(product: ProductInOrder, change: number) {
    console.log("Mise à jour de la quantité pour le produit");
    console.log(product, change);
    const newQuantity = (product.quantity || 0) + change;
    if (newQuantity >= 0) {
      if (this.isLocalStorage) {
        // Mise à jour du localStorage
        const cartProducts = localStorage.getItem('cart-products');
        if (cartProducts) {
          const products = JSON.parse(cartProducts);
          const productIndex = products.findIndex((p: any) => p.id === product.product?.id);
          if (productIndex !== -1) {
            products[productIndex] = {
              ...products[productIndex],
              quantity: newQuantity
            };
            localStorage.setItem('cart-products', JSON.stringify(products));
            
            // Mettre à jour l'état local
            const currentProducts = this.products();
            const updatedProducts = [...currentProducts];
            const index = updatedProducts.findIndex(p => p.product?.id === product.product?.id);
            if (index !== -1) {
              updatedProducts[index] = {
                ...updatedProducts[index],
                quantity: newQuantity
              };
              this.products.set(updatedProducts);
            }
          }
        }
      } else {
        // Mise à jour pour utilisateur connecté
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
  }

  async removeItems(product: ProductInOrder){
    try {
      if (this.isLocalStorage) {
        // Supprimer du localStorage
        const cartProducts = localStorage.getItem('cart-products');
        if (cartProducts) {
          const products = JSON.parse(cartProducts);
          const filteredProducts = products.filter((p: any) => p.id !== product.product?.id);
          localStorage.setItem('cart-products', JSON.stringify(filteredProducts));
          
          // Mettre à jour l'état local
          const updatedProducts = this.products().filter(p => p.product?.id !== product.product?.id);
          this.products.set(updatedProducts);
          
          if (updatedProducts.length === 0) {
            this.isCartEmpty = true;
          }
        }
      } else {
        // Supprimer de la BDD
        console.log("Suppression du produit : ", product);
        await this.cartService.removeCartItem(product.productId);
        const token = this.authService.getToken();
        if (token) {
          const userId = this.authService.getIdFromToken(token);
          const cart = await this.cartService.getCartProducts(userId);
          this.products.set(cart?.products ?? []);
        }
      }
    } catch(error) {
      console.error("Erreur lors de la suppression produit :", error);
    }
  }

  nextOrderStage(){

    console.log("Taille tableau produits :" + this.products().length)

    if(this.products().length < 1){

      alert("Vous n'avez aucun produit dans votre panier");
      return;
    }

    this.router.navigate(['panier/livraison']);
  }

}
