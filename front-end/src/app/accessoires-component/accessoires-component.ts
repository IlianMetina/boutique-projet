import { Component, inject, OnInit, PLATFORM_ID, signal, ViewChild, WritableSignal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ProductsService, Product } from '../services/products/products-service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CartService } from '../services/cart/cart-service';
import { FilterComponent } from '../filter-component/filter-component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-accessoires-component',
  imports: [MatPaginator, FilterComponent, RouterLink],
  templateUrl: './accessoires-component.html',
  styleUrl: '../css/main-components-css.css'
})
export class AccessoiresComponent implements OnInit{

  private productService = inject(ProductsService);
  private platformID = inject(PLATFORM_ID);
  private cartService = inject(CartService);
  pageSize: WritableSignal<number> = signal(6);
  pageIndex: WritableSignal<number> = signal(0);
  products: WritableSignal<Product[]> = signal([]);
  originalSortedProducts: WritableSignal<Product[]> = signal([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(){}

  async ngOnInit(){

    if(isPlatformBrowser(this.platformID)){
      const products = await this.productService.getAllProductsByCategory(2);

      console.log("Produits récupérés : " + products);
      console.log(products);

      this.products.set(products ?? []);
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

  async updateSorting(sorting: string){

    const clonedProducts = [... this.products()];

    console.log("JE SUIS DANS UPDATESORTING GADGET-COMPONENT !");

    if(sorting == 'asc'){
      console.log("||| JE SUIS DANS LE COMPOSANT PARENT, ÇA DOIT ETRE FILTRE PAR ORDRE CROISSANT |||");
      clonedProducts.sort((a, b) => Number(a.price) - Number(b.price));

      this.products.set(clonedProducts);

    }else if(sorting == 'desc'){

      clonedProducts.sort((a, b) => Number(b.price) - Number(a.price));
      console.log("||| JE SUIS DANS LE COMPOSANT PARENT, ÇA DOIT ETRE FILTRE PAR ORDRE DÉCROISSANT |||");
      this.products.set(clonedProducts);

    }else{

      this.products.set(this.originalSortedProducts());
    }    
  }
  
}
