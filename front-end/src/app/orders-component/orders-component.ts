import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

interface User {

  firstName?: string;
  lastName?: string;
  street: string;
  city: string;
  zipCode: string;
  country?: string;
}

interface Product {

  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  categoryId: number;
}

interface ProductInOrder {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: string;
  product: Product;
}

interface Order {

  id: number;
  userId: number;
  status: string;
  total: string;
  createdAt: string;
  updatedAt: string;
  productsInOrder: ProductInOrder[]
  user: User;
}

@Component({
  selector: 'app-orders-component',
  imports: [],
  templateUrl: './orders-component.html',
  styleUrl: './orders-component.css'
})
export class OrdersComponent implements OnInit {

  private authService = inject(AuthService);
  private allOrdersUrl = 'http://localhost:3000/orders/all';
  private currentOrdersUrl = 'http://localhost:3000/orders/pending/';
  private shippedOrdersUrl = 'http://localhost:3000/orders/shipped/';
  private cancelledOrdersUrl = 'http://localhost:3000/orders/cancelled/';
  orders: Order[] = [];
  orderDate = signal<string>('');

  async ngOnInit() {  
    
    const token = this.authService.getToken();
    if(!token){

      throw new Error("Erreur lors de la récupération du token");
    }

    const userId = this.authService.getIdFromToken(token);
    if(!userId){

      throw new Error("Erreur lors de la récupération de l'userId");
    }

    const allResponse = await this.authService.AuthenticatedRequest(this.allOrdersUrl, 'GET');
    if(!allResponse){

      throw new Error("Erreur lors de la récupération des commandes");
    }

    this.orders = allResponse;
  } 

  async onOptionChange(event: Event){

    const selectedOption = (event.target as HTMLSelectElement).value;

    const token = this.authService.getToken();
    if(!token){

      throw new Error("Erreur de récupération du token");
    }

    const userId = this.authService.getIdFromToken(token);
    if(!userId){

      throw new Error("Erreur récupération de l'userId");
    }

    switch(selectedOption){

      case "all":
        console.log("Toutes les commandes");
        const allResponse = await this.authService.AuthenticatedRequest(this.allOrdersUrl, 'GET');
        if(!allResponse){
          
          throw new Error("Erreur récupération commande 'PENDING'");
        }

        console.log("Réponse reçue commandes 'all' :");
        console.log(allResponse);
        if(allResponse && !Array.isArray(allResponse)){
          console.log("All Response n'est pas un tableau")
        }
        this.orders = allResponse;

        return allResponse;

      case "en-cours":
        console.log("En cours");
        const currentResponse = await this.authService.AuthenticatedRequest(this.currentOrdersUrl + userId, 'GET');
        if(!currentResponse){

          throw new Error("Erreur récupération commande 'PENDING'");
        }
        console.log("Réponse reçue commande 'en cours' :");
        console.log(currentResponse);
        this.orders = currentResponse;

        return currentResponse;

      case "livree":
        console.log("livree");
        const shippedResponse = await this.authService.AuthenticatedRequest(this.shippedOrdersUrl + userId, 'GET');
        if(!shippedResponse){
          
          throw new Error("Erreur récupération commande 'PENDING'");
        }

        console.log("Réponse reçue commande 'livree' :");
        console.log(shippedResponse);
        this.orders = shippedResponse;

        return shippedResponse;

      case "annulee":
        console.log("annulee");
        const cancelledResponse = await this.authService.AuthenticatedRequest(this.cancelledOrdersUrl + userId, 'GET');
        if(!cancelledResponse){
          
          throw new Error("Erreur récupération commande 'PENDING'");
        }

        console.log("Réponse reçue commande 'annulee' :");
        console.log(cancelledResponse);
        this.orders = cancelledResponse;

        return cancelledResponse;        
    }
  }

  handleProcessing(){

    // this.authService.

  }

  handleDelivered(){


  }

  handleCancelled(){


  }

  handleAllOrders(){


  }
}

