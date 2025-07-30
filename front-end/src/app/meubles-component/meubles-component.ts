import { Component, inject, PLATFORM_ID, signal, ViewChild, WritableSignal } from '@angular/core';
import { Product, ProductsService } from '../services/products/products-service';
import { OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FilterProductsComponent } from '../filter-products-component/filter-products-component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CartService } from '../services/cart/cart-service';

@Component({
  selector: 'app-meubles-component',
  imports: [FilterProductsComponent, MatPaginator],
  templateUrl: './meubles-component.html',
  styleUrl: '../css/main-components-css.css'
})
export class MeublesComponent implements OnInit{

  private productService = inject(ProductsService);
  private platformID = inject(PLATFORM_ID);
  private cartService = inject(CartService);
  pageSize: WritableSignal<number> = signal(6);
  pageIndex: WritableSignal<number> = signal(0);
  products: WritableSignal<Product[]> = signal([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(){}

  async ngOnInit(){

    if(isPlatformBrowser(this.platformID)){
      const products = await this.productService.getAllProductsByCategory(1);

      console.log("Produits récupérés : ");
      console.log(products);

      this.products.set(products ?? []);
      console.log("Longueur du tableau produits : " + this.products().length);
    }
  }

  productsPerPage(): Product[]{

    const start = this.pageIndex() * this.pageSize();
    const end = start + this.pageSize();
    
    return this.products().slice(start, end);
  }

  onPageChange(event: PageEvent): void{

    console.log("Entrée fonction onPageChange");
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }

  addProduct(product: Product){

    this.cartService.addToCart([product])
    .then(response => {
      console.log("Produit ajouté au panier !", response);
    })
    .catch(error => {
      console.error("Erreur lors de l'ajout du produit au panier", error);
    });
  }
}
