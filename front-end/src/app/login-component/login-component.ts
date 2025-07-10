import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

interface Login {

  email: string;
  password: string;
}

@Component({
  selector: 'app-login-component',
  imports: [FormsModule, RouterLink],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css'
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router){}

  onSubmit(form: NgForm): void {

    if(form.valid){

      console.log(form.value);

      const userInfos: Login = { 
        email: form.value.email,
        password: form.value.password,
      }

      const token = this.authService.connect(userInfos);
      console.log(token);
      this.router.navigate(['/']);

      
      console.log(userInfos);
    }
  }

}
