import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

interface RegisterData {

  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  password: string,
  confirmedPassword?: string,
  street: string,
  city: string,
  zipCode: string,
  country: string,
  conditions: boolean,
  newsletter: boolean
}

interface Login {

  email: string;
  password: string;
}

interface LoginResponse {

  success: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private usersUrl = 'http://localhost:3000/users/register';
  private loginUrl = 'http://localhost:3000/auth/login';
  private platformID = inject(PLATFORM_ID);
  private isAuthenticated = false;

  constructor(private cookieService: CookieService) {}

  async register(data: RegisterData): Promise<{status: string}>{

    const response = fetch(this.usersUrl, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },

      body: JSON.stringify(data),
    });

    const status = (await response).json();

    return status;
  }

  async connect(data: Login): Promise<LoginResponse> {

    const response = await fetch(this.loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    })

    const status = await response.json();
  
    if(!status.token){
      
      throw new Error('Token manquant dans la réponse');
    }

    const token = status.token;
    
    if(isPlatformBrowser(this.platformID)){

      this.cookieService.set('token', token, {
        expires: 10,
        path: '/',
        secure: true,
        sameSite: 'Lax',
      });
    }

    console.log('Status de la connexion : ', status);
    console.log("Token reçu : ", status.token);

    return status;
  }

}
