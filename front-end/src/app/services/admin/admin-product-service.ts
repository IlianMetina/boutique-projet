import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

interface addProduct {

  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  categoryId: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminProductService {

  private createProductUrl = 'http://localhost:3000/products/create';
  private authService = inject(AuthService);

  constructor() {}

  async adminAddProduct(product: addProduct){

    return this.authService.AuthenticatedRequest(this.createProductUrl, 'POST', product);
    

  }

  async adminUpdateProduct(){


  }

  async adminDeleteProduct(){


  }
}
