import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private allOrdersUrl = "http://localhost:3000/orders/all/";
  private pendingOrdersUrl = "http://localhost:3000/orders/";
  private getNameUrl = "http://localhost:3000/users/";
  private authService = inject(AuthService);

  constructor() {}

  async getAllOrders(){

    const response = await fetch(this.allOrdersUrl);
    if(!response){

      console.log("!response de getAllOrders :");
      console.log(response);
    }

    console.log("Response de getAllOrders :");
    console.log(response);
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

    console.log("Réponse getUserName AccountService : ");
    console.log(response);

  }


}

