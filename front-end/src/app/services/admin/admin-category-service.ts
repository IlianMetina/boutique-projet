import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

interface newCategory {

  name: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminCategoryService {

  private authService = inject(AuthService);
  private createCategoryUrl = 'http://localhost:3000/categories/create';

  constructor() {}

  async addCategory(category: newCategory){

    return this.authService.AuthenticatedRequest(this.createCategoryUrl, 'POST', category);
    
  }

  async updateCategory(category: newCategory){


  }

  async deleteCategory(categoryName: string){

    
  }
}
