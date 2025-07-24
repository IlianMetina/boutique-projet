import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { CartService } from '../services/cart/cart-service';


@Component({
  selector: 'app-header-component',
  imports: [RouterModule, RouterLink],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css'
})
export class HeaderComponent {

  constructor(public authService: AuthService){}

  isUserConnected(){

    return this.authService.isUserAuthenticated() ? 'Mon compte' : 'Se connecter';
  }

  cartCount(){
    
  }
}
