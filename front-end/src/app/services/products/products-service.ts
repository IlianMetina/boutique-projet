import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() {}

  private productsURL = "http://localhost:3000/products";
  private authService = inject(AuthService);

  async getProducts(): Promise<Product[] | null> {

    const response = await fetch(this.productsURL, {

      headers: this.authService.getAuthHeaders(),
    });

    const data = await response.json();

    console.log("Data reçue getProducts() : " + data);
    
    if(!data){

      return null
    }

    return data;
  }
}
