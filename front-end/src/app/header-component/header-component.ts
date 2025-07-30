import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Product, ProductsService } from '../services/products/products-service';


@Component({
  selector: 'app-header-component',
  imports: [RouterModule, RouterLink],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css'
})
export class HeaderComponent {

  allProducts: WritableSignal<Product[]> = signal([]);

  search = signal('');

  filteredProducts = computed(() =>
    this.allProducts().filter(product =>
      product.name.toLowerCase().includes(this.search().toLowerCase())
    )
  );

  private authService = inject(AuthService);
  private productService = inject(ProductsService);

  constructor(){
    this.loadProducts();
  }

  isUserConnected(){
    return this.authService.isUserAuthenticated() ? 'Mon compte' : 'Se connecter';
  }

  async loadProducts(){

    const allProducts = await this.productService.getProducts();
    if(allProducts){
      this.allProducts.set(allProducts);
    }
  }

  // cartCount(){
    
  //   return this.cartService.getTotalItems();
  // }
}
