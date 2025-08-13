import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

interface UserInfos{

  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  city: string;
  street: string;
  zipCode: string;
  country: string;
  conditions: boolean;
  newsletter: boolean;
  role: string;
}

@Component({
  selector: 'app-account-infos-component',
  imports: [],
  templateUrl: './account-infos-component.html',
  styleUrl: './account-infos-component.css'
})
export class AccountInfosComponent implements OnInit {

  private userInfosUrl = 'http://localhost:3000/users/';
  private authService = inject(AuthService);
  userInfos = signal<UserInfos>({
    "firstName": 'Invité',
    "lastName": 'None',
    "phoneNumber": '0606060606',
    "email": 'invite@workhaus.com',
    "street": 'Workhaus Avenue',
    "zipCode": '75001',
    "city": 'Paris',
    "country": 'France',
    "id": 0,
    "conditions": true,
    "newsletter": false,
    "role": 'CUSTOMER'
  });

  async ngOnInit() {
    
    const token = this.authService.getToken();
    if(!token) throw new Error("Erreur récupération token");
    const userId = this.authService.getIdFromToken(token);
    if(!userId) throw new Error("Erreur récupération userId");

    const response = await this.authService.AuthenticatedRequest(this.userInfosUrl + userId, 'GET');
    if(!response) throw new Error("Erreur récupération userInfos");
    console.log("UserInfos récupérées AccountInfosComponent :");
    console.log(response);

    this.userInfos.set(response);
  } 
}
