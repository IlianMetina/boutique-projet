import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';

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

interface tokenPayload {

  sub: number;
  email: string;
  role: string;
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
  isAuthenticated = false;

  constructor(private cookieService: CookieService) {}

  /* Méthode qui s'occupe d'envoyer les informations d'inscription au serveur */
  async register(data: RegisterData): Promise<{status: string}>{

    const response = fetch(this.usersUrl, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },

      body: data ? JSON.stringify(data) : undefined,

    });

    const status = (await response).json();

    return status;
  }

  /* Méthode qui s'occupe d'envoyer les informations de connexion au serveur */
  async connect(data: Login): Promise<LoginResponse> {

    const response = await fetch(this.loginUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      
      body: data ? JSON.stringify(data) : undefined,
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
        secure: false, // A modifier en prod, "true"
        sameSite: 'Lax',
      });
    }

    // Token créer puis stocké, on considère donc le client comme connecté : true
    this.isAuthenticated = true; 

    console.log('Status de la connexion : ', status);
    console.log("Token reçu : ", status.token);

    return status;
  }

  logOut(){

    this.isAuthenticated = false;

    if(isPlatformBrowser(this.platformID)){

      this.cookieService.delete('token', '/');
    }
  }

  isUserAuthenticated(): boolean{

    const token = this.getToken()
    if(!token){

      return false;
    }

    const userId = this.getIdFromToken(token);
    console.log("userId récupérer : ");
    console.log(userId);
    if(userId){

      return true;
    }else{

      return false;
    }
  }

  /* Récupération du token dans les cookies si on est sur le navigateur */
  getToken(): string | null {

    console.log("---------- isPlatformBrowser ? --------");
    console.log(isPlatformBrowser(this.platformID));

    if(isPlatformBrowser(this.platformID)){

      const token = this.cookieService.get('token');
      console.log('------------------------');
      console.log("Récupération du token :");
      console.log('------------------------');
      console.log(token);
      if(token != null){

        return token;

      }else {

        return null;
      }
    }

    return null;
  }

  /* Méthode pour enregistrer le token dans les headers */
  getAuthHeaders(): HeadersInit {

    const token = this.getToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if(token){

      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  /* Méthode de requête polyvalente intégrant le token pour vérification de l'utilisateur */
  async AuthenticatedRequest(url: string, method: string, data?: any){
 
    const response = await fetch(url, {

      method: method,
      headers: this.getAuthHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });

    const body = await response.json();

    return body;
  }

  /* Récupérer l'ID utilisateur présent dans le payload du token */
  getIdFromToken(token: string): number{

    const decodedToken: tokenPayload = jwtDecode(token);

    console.log("--------TOKEN ID----------");
    console.log(decodedToken.sub);
    console.log(decodedToken.email);
    console.log(decodedToken.role);
    console.log("--------TOKEN ID----------");

    return decodedToken.sub;
  }

}

