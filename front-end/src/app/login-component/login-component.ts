import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-component',
  imports: [FormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css'
})
export class LoginComponent {

  onSubmit(form: NgForm): void {

    if(form.valid){

      console.log(form.value);

      const userEmail = form.value.email;
      const userPassword = form.value.password;

      console.log(userEmail, userPassword);
    }
  }

}
