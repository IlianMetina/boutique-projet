import { Component, inject, PLATFORM_ID } from '@angular/core';
import { Product, ProductsService } from '../services/products/products-service';
import { OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FilterProductsComponent } from '../filter-products-component/filter-products-component';
@Component({
  selector: 'app-meubles-component',
  imports: [FilterProductsComponent],
  templateUrl: './meubles-component.html',
  styleUrl: './meubles-component.css'
})
export class MeublesComponent implements OnInit{

  private productService = inject(ProductsService);
  private platformID = inject(PLATFORM_ID);
  private products: Product[] | undefined = [];

  constructor(){}

  async ngOnInit(){

    if(isPlatformBrowser(this.platformID)){
      const products = await this.productService.getAllProductsByCategory(1);

      console.log("Produits récupérés : " + products);
      console.log(products);

      this.products = products;
    }
  }
}
