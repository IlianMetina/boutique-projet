import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService, Product } from '../services/products/products-service';
import { CartService } from '../services/cart/cart-service';

@Component({
  selector: 'app-product-component',
  imports: [RouterLink],
  templateUrl: './product-component.html',
  styleUrl: './product-component.css'
})
export class ProductComponent implements OnInit{

  private cartService = inject(CartService);
  private route = inject(ActivatedRoute);
  private productService = inject(ProductsService);
  product = signal<Product>({
    id: 0,
    name: '',
    price: 0,
    description: '',
    imageUrl: '',
  });

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const result = await this.productService.getSingleProduct(+id); // ou `id` si c'est une string
      if (result) {
        this.product.set(result);
        console.log("Produit chargé", this.product());
      }
    }
  }

  addProduct(product: Product){

    console.log('|||||||||||||||||||||||||||||-');
    console.log("Entrée méthode addProduct produits/:id");
    console.log('|||||||||||||||||||||||||||||-');
    console.log(product)

    this.cartService.addToCart([product])
    .then(response => {
      console.log("Produit ajouté au panier !", response);
    })
    .catch(error => {
      console.error("Erreur lors de l'ajout du produit au panier", error);
    });
  }
}
