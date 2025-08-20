import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Order } from '../orders-component/orders-component';
import { CartService } from '../services/cart/cart-service';

interface User {

  firstName: string;
  lastName: string;
  street: string;
  city: string;
  zipCode: string;
  country: string;
  email: string;
  phoneNumber: string;
}

@Component({
  selector: 'app-livraison-component',
  imports: [FormsModule, RouterLink],
  templateUrl: './livraison-component.html',
  styleUrl: './livraison-component.css'
})
export class LivraisonComponent implements OnInit{

  private router = inject(Router);
  private authService = inject(AuthService);
  private userUrl = 'http://localhost:3000/users/';
  private postOrderAdressUrl = 'http://localhost:3000/orders/delivery';
  private getOrderUrl = 'http://localhost:3000/orders/recap/';
  private checkOutUrl = 'http://localhost:3000/stripe/checkout/';
  private cartService = inject(CartService);
  user = signal<User | null>(null);
  order = signal<Order | null>(null);
  street: string = '';
  zipCode: string = '';
  city: string = '';

  async ngOnInit() {

    try{
      const userInfos = await this.getUserInfos();
      this.user.set(userInfos);
      console.log("User set infos :", this.user());

      const orderInfos = await this.getOrderInfos();
      this.order.set(orderInfos);

    }catch(error){

    }
  }

  get productsInOrder() {
    return this.order()?.productsInOrder ?? [];
  }

  async getOrderInfos(){
    
    const token = this.authService.getToken();
    if(!token) throw new Error("Erreur récupération token");
    const userId = this.authService.getIdFromToken(token);
    if(!userId) throw new Error("Erreur récupération userId");
    
    try{
      console.log("URL fetch order :", this.getOrderUrl + userId);
      const order = await this.authService.AuthenticatedRequest(this.getOrderUrl + userId, 'GET');
      this.order.set(order);
      console.log("Commande récupérée : ", order);
      
      console.log("(!)(!)(!)(!) getOrderInfos TEST (!)(!)(!)(!)");
      return order;

    }catch(error){

      console.log("Erreur récupération commande", error);
      return null;
    }
  }

  async getUserInfos(): Promise<User | null>{

    const token = this.authService.getToken()
    if(!token){

      throw new Error("Erreur lors de la récupération du token");
    }
    const userId = this.authService.getIdFromToken(token)
    if(!userId){

      throw new Error("Erreur lors de la récupération de l'userId");
    }

    const response = await this.authService.AuthenticatedRequest(this.userUrl + userId, 'GET');
    console.log(response);

    return response;
  }

  async onSubmit(): Promise<void>{

    const payload = {

      street: this.street,
      zipCode: this.zipCode,
      city: this.city,
    }

    if(!this.street || !this.zipCode || !this.city){

      throw new Error("Champs invalides");
    }

    console.log("---------Payload récupérer livraison :--------");
    console.log(payload);

    this.authService.AuthenticatedRequest(this.postOrderAdressUrl, 'POST', payload);
    await this.checkOut();
    
  }

  getSubTotal(): number {

    const order = this.order();
    // console.log('------ ORDER RÉCUPÉREE getSubTotal-----------');
    // console.log(order);
    if(!order) throw new Error("Erreur lors du calcul subTotal");

    const subTotal = order.productsInOrder.reduce((sum: number, item: { product: { price: any; }; quantity: number; }) => {
      const price = item.product?.price ? Number(item.product.price) : 0;
      const quantity = item.quantity ?? 0;
      return sum + (price * quantity);
    }, 0);

    return Number(subTotal.toFixed(2));
  }

  async checkOut(){

    const token = this.authService.getToken();
    if(!token) throw new Error("Erreur lors de la récupération du token");
    const userId = this.authService.getIdFromToken(token);
    if(!userId) throw new Error("Erreur lors de la récupération de l'userId");
    const orderId = await this.cartService.getOrderIdbyUser(userId);
    if(!orderId) throw new Error("Erreur lors de la récupération de l'orderId");

    const response = await this.authService.AuthenticatedRequest(this.checkOutUrl, 'POST', {orderId});
    if(!response) throw new Error("Erreur requête CheckOut");
    console.log(response);
    if(response && response.url){
      window.location.href = response.url;
    }
  } 

}
