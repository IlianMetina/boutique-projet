import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { FormsModule } from '@angular/forms';

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
  imports: [FormsModule],
  templateUrl: './livraison-component.html',
  styleUrl: './livraison-component.css'
})
export class LivraisonComponent implements OnInit{

  private authService = inject(AuthService);
  private userUrl = 'http://localhost:3000/users/';
  private postOrderAdressUrl = 'http://localhost:3000/orders/delivery';
  user = signal<User | null>(null);
  street: string = '';
  zipCode: string = '';
  city: string = '';

  async ngOnInit() {

    try{
      const userInfos = await this.getUserInfos();
      this.user.set(userInfos);
      console.log("User set infos :", this.user());

    }catch(error){

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

  onSubmit(){

    const payload = {

      street: this.street,
      zipCode: this.zipCode,
      city: this.city,
    }

    console.log("---------Payload récupérer livraison :--------");
    console.log(payload);

    const response = this.authService.AuthenticatedRequest(this.postOrderAdressUrl, 'POST', payload);

    return response;
  }

}
