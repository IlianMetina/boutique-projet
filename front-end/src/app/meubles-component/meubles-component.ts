import { Component, inject, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { Product, ProductsService } from '../services/products/products-service';
import { OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FilterProductsComponent } from '../filter-products-component/filter-products-component';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-meubles-component',
  imports: [FilterProductsComponent, MatPaginatorModule],
  templateUrl: './meubles-component.html',
  styleUrl: './meubles-component.css'
})
export class MeublesComponent implements OnInit{

  private productService = inject(ProductsService);
  private platformID = inject(PLATFORM_ID);
  pageSize = 10;
  pageIndex = 0;
  products: WritableSignal<Product[]> = signal([]);

  constructor(){}

  async ngOnInit(){

    if(isPlatformBrowser(this.platformID)){
      const products = await this.productService.getAllProductsByCategory(1);

      console.log("Produits récupérés : " + products);
      console.log(products);

      this.products.set(products ?? []);
    }
  }
}
