import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AccountService } from '../services/account/account-service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-orders-component',
  imports: [],
  templateUrl: './orders-component.html',
  styleUrl: './orders-component.css'
})
export class OrdersComponent implements OnInit {

  private authService = inject(AuthService);
  orders = signal([]); // ?

  async ngOnInit() {  
    
  } 
}
