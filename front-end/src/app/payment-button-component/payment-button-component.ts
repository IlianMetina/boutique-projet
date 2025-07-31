import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';


@Component({
  selector: 'app-payment-button-component',
  imports: [],
  templateUrl: './payment-button-component.html',
  styleUrl: './payment-button-component.css'
})
export class PaymentButtonComponent {

  private authService = inject(AuthService);
  private checkoutUrl = 'http://localhost:3000/stripe/checkout'

  async checkout(){

    const response = await this.authService.AuthenticatedRequest(this.checkoutUrl, 'POST')
  }
}
