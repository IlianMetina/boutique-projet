import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FilterProductsComponent } from '../filter-products-component/filter-products-component';
import { isPlatformBrowser } from '@angular/common';
import { ProductsService, Product } from '../services/products/products-service';

@Component({
  selector: 'app-rangements-component',
  imports: [FilterProductsComponent],
  templateUrl: './rangements-component.html',
  styleUrl: './rangements-component.css'
})
export class RangementsComponent implements OnInit{

    private productService = inject(ProductsService);
  private platformID = inject(PLATFORM_ID);
  products: Product[] | undefined = [];

  constructor(){}

  async ngOnInit(){

    if(isPlatformBrowser(this.platformID)){
      const products = await this.productService.getAllProductsByCategory(3);

      console.log("Produits récupérés : " + products);
      console.log(products);

      this.products = products;
    }
  }

}
