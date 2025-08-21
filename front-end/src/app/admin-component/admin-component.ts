import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AdminProductService } from '../services/admin/admin-product-service';
import { AdminCategoryService } from '../services/admin/admin-category-service';

interface AdminOrder {

  id: number;
  total: string;
  status: string;
}

interface Category {

  id: number;
  description: string;
  name: string;
}

@Component({
  selector: 'app-admin-component',
  imports: [ReactiveFormsModule],
  templateUrl: './admin-component.html',
  styleUrl: './admin-component.css'
})
export class AdminComponent implements OnInit{
  
  private ordersCountUrl = 'http://localhost:3000/orders/total';
  private clientsCountUrl = 'http://localhost:3000/users/total';
  private categoriesUrl = 'http://localhost:3000/categories/all';
  private authService = inject(AuthService);
  private adminProductService = inject(AdminProductService);
  private adminCategoryService = inject(AdminCategoryService);
  ordersCount = signal<number>(0);
  clientsCount = signal<number>(0);
  categories = signal<Category[]>([]);
  orders = signal<AdminOrder[]>([]);
  
  myCategoryForm = new FormGroup({
    categoryName: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-zÀ-ÿ\s\-']{2,30}$/),
    ]),

    categoryDescription: new FormControl('', [])
  })

  myProductForm = new FormGroup({

    productName: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[\wÀ-ÿ\s\-'.]{2,50}$/),
    ]),

    productPrice: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+([.,]\d{1,2})?$/),
    ]),

    productCategory: new FormControl('', [
      Validators.required,
    ]),

    productDescription: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),

    productStock: new FormControl('', [
      Validators.required,
    ]),

    productImage: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/i),
    ])
  });

  async ngOnInit(): Promise<void> {

    console.log("Orders récupérées:");
    const orders = await this.authService.AuthenticatedRequest(this.ordersCountUrl, 'GET');
    const categories = await this.authService.AuthenticatedRequest(this.categoriesUrl, 'GET');
    if(!categories) console.log('|||||||| ERREUR RÉCUPÉRATION DES CATÉGORIES');
    console.log("categories :", categories);
    this.categories.set(categories);
    console.log(orders);
    console.log("Taille orders :", orders.length);
    if(orders.statusCode == '404' || orders.statusCode == '500'){
      console.log("Erreur récupération des ordersCount");
      this.ordersCount.set(0);
    
    }else{
      this.orders.set(orders);
      this.ordersCount.set(orders.length);
    }
    const clients = await this.authService.AuthenticatedRequest(this.clientsCountUrl, 'GET');
    console.log("Client récupérés :");
    console.log(clients);
    if(!clients){
      console.log("Erreur récupération clientsCount");
      this.clientsCount.set(0);
    } 

    this.clientsCount.set(clients);
  }

  onSubmitCategory(): void {

    console.log("Entrée on submit :");
    console.log(this.myCategoryForm.value);
    console.log(this.myCategoryForm.status);

     if (this.myCategoryForm.invalid) {
      console.error("Form is invalid");
      return;
    }

     const createCategory = {
      name: this.myCategoryForm.value.categoryName || '',
      description: this.myCategoryForm.value.categoryDescription || '',
    }

    this.adminCategoryService.addCategory(createCategory);

  }

  onSubmitProduct(): void {

    console.log("Entrée on submit :");
    console.log(this.myProductForm.value);

     if (this.myProductForm.invalid) {
      console.error("Form is invalid");
      return;
    }

    console.log("CategoryID récupérer : ", this.myProductForm.value.productCategory);

    const createProduct = {
      name: this.myProductForm.value.productName || '',
      description: this.myProductForm.value.productDescription || '',
      price: Number(this.myProductForm.value.productPrice) || 0,
      imageUrl: this.myProductForm.value.productImage || '',
      stock: Number(this.myProductForm.value.productStock) || 0,
      categoryId: Number(this.myProductForm.value.productCategory) || 0,
    }


    console.log("Produit qui va etre créer : ");
    console.log(createProduct);


    this.adminProductService.adminAddProduct(createProduct);
    

  }
}
