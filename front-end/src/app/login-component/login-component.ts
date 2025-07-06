import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';

interface Login {

  email: string;
  password: string;
}

@Component({
  selector: 'app-login-component',
  imports: [FormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css'
})
export class LoginComponent {

  constructor(private authService: AuthService){}

  onSubmit(form: NgForm): void {

    if(form.valid){

      console.log(form.value);

      const userInfos: Login = { 
        email: form.value.email,
        password: form.value.password,
      }

      const token = this.authService.connect(userInfos);
      console.log(token);
      
      console.log(userInfos);
    }
  }

}
