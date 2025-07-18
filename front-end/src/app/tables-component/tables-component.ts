import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FilterProductsComponent } from '../filter-products-component/filter-products-component';
import { isPlatformBrowser } from '@angular/common';
import { ProductsService, Product } from '../services/products/products-service';

@Component({
  selector: 'app-tables-component',
  imports: [FilterProductsComponent],
  templateUrl: './tables-component.html',
  styleUrl: './tables-component.css'
})
export class TablesComponent implements OnInit{

  private productService = inject(ProductsService);
  private platformID = inject(PLATFORM_ID);
  products: Product[] | undefined = [];

  constructor(){}

  async ngOnInit(){

    if(isPlatformBrowser(this.platformID)){
      const products = await this.productService.getAllProductsByCategory(6);

      console.log("Produits récupérés : " + products);
      console.log(products);

      this.products = products;
    }
  }

}
