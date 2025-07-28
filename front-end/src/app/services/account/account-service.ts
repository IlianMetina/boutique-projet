import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private ordersPlacedUrl = "http://localhost:3000/orders/basket/all/";
  private pendingOrdersUrl = "http://localhost:3000/orders/";
  private getNameUrl = "http://localhost:3000/users/";
  private authService = inject(AuthService);

  constructor() {}

  async getAllUserOrders(){

    const token = this.authService.getToken();
    if(!token){

      throw new Error("Impossible de récupérer le token utilisateur");
    }
    const userId = this.authService.getIdFromToken(token);
    if(!userId){

      throw new Error("Erreur lors de la récupération de l'userId");
    }

    const response = await fetch(this.ordersPlacedUrl + userId);
    if(!response){

      console.log("!response de getAllUserOrders :");
      console.log(response);
    }

    console.log("Response de getAllUserOrders :");
    console.log(response);

    const body = await response.json();
    console.log("Body récupérer getAllUserOrders accountService :");
    console.log(body);

    return body;
  }

  async getPendingOrders(){ // A modifier pour que ça fetch seulement les paniers avec statut "pending"
    
    const response = await fetch(this.pendingOrdersUrl);

    if(!response){

      console.log("!response de getPendingOrders :");
      console.log(response);
    }

    console.log("Response de getPendingOrders :");
    console.log(response);
  }

  async getUserName(){

    const token = this.authService.getToken();
    if(!token){

      throw new Error("Impossible de récupérer le token utilisateur");
    }
    const userId = this.authService.getIdFromToken(token);
    if(!userId){

      throw new Error("Erreur lors de la récupération de l'userId");
    }

    const response = await fetch(this.getNameUrl + userId);
    const body = await response.json();

    return body.firstName;
  }


}

