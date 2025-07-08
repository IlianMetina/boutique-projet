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

  private allProductsURL = "http://localhost:3000/products/all";
  private singleProductURL = "http://localhost:3000/products";
  private createProductURL = "http://localhost:3000/products";
  private authService = inject(AuthService);

  async getProducts(): Promise<Product[] | undefined> {

    const response = await this.authService.AuthenticatedRequest(this.allProductsURL, 'GET');

    const data = await response.json();

    console.log("Data reçue getProducts() : " + data);

    if(!data){

      return undefined;
    }

    return data;
  }

  async getSingleProduct(): Promise<Product>{

    console.log("Entrée méthode getSingleProduct products-service Angular");
    const response = await this.authService.AuthenticatedRequest(this.singleProductURL, 'GET');

    const body = await response.json();

    return body;
  }

  async createProduct(data: Product): Promise<Product>{

    const response = await this.authService.AuthenticatedRequest(this.createProductURL, 'POST', data);
    const body = await response.json();

    console.log("Body de la réponse méthode createProduct : " + body);

    return body;
  }

  async updateProduct(data: Product){

  }
}
