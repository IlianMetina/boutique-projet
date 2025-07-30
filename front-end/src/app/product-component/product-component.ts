import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService, Product } from '../services/products/products-service';

@Component({
  selector: 'app-product-component',
  imports: [],
  templateUrl: './product-component.html',
  styleUrl: './product-component.css'
})
export class ProductComponent implements OnInit{

  private route = inject(ActivatedRoute);
  private productService = inject(ProductsService);
  product = signal<Product | null>(null);

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const result = await this.productService.getSingleProduct(+id); // ou `id` si c'est une string
      if (result) {
        this.product.set(result);
      }
    }
  }
}
