import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header-component/header-component';
import { FooterComponent } from './footer-component/footer-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet , HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
  
})
export class App {
  protected title = 'Workhaus meubles télétravail';
}

