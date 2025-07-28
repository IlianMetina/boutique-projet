import { Component, inject, OnInit, signal } from '@angular/core';
import { AccountService } from '../services/account/account-service';

@Component({
  selector: 'app-account-infos-component',
  imports: [],
  templateUrl: './account-infos-component.html',
  styleUrl: './account-infos-component.css'
})
export class AccountInfosComponent implements OnInit {

  private accountService = inject(AccountService);

  async ngOnInit() {
    
    
  }
}
