import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Product } from '../../services/products/products-service';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart/cart-service';

@Component({
  selector: 'app-main-component',
  imports: [RouterLink],
  templateUrl: './main-component.html',
  styleUrl: './main-component.css'
})
export class MainComponent implements OnInit{

  constructor(){}

  private authService = inject(AuthService);
  private cartService = inject(CartService);
  private productsUrl = 'http://localhost:3000/products/all';
  products: WritableSignal<Product[]> = signal([]);

  async ngOnInit(): Promise<void> {

    console.log('|||||||||| NG ON INIT |||||||||')
    const getProducts = await this.authService.AuthenticatedRequest(this.productsUrl, 'GET');
    if(!getProducts) throw new Error("Erreur récupération des produits page d'accueil.");
    this.products.set(getProducts.slice(0, 4));
    console.log("Produits récupérés :");
    console.log(this.products());
  }

  async addProduct(product: Product){

    await this.cartService.addToCart([product]);
  }

}
