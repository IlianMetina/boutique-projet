import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Validators } from '@angular/forms';

export interface RegisterData {

  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  password: string,
  confirmedPassword: string,
  city: string,
  zipCode: string,
  country: string,
  street: string,
  conditions: boolean,
  newsletter: boolean
}

@Component({
  selector: 'app-register-component',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css'
})

export class RegisterComponent {

  myForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    password: new FormControl(''),
    confirmedPassword: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    zipCode: new FormControl(''),
    country: new FormControl(''),
    conditions: new FormControl(false),
    newsletter: new FormControl(false)
  })

  constructor(private authService: AuthService){}

  onSubmit(): void  {

    if (this.myForm.invalid) {
      console.error("Form is invalid");
      return;
    }

    if (this.myForm.value.password !== this.myForm.value.confirmedPassword) {
      console.error("Passwords do not match");
      return;
    }

    const registerUser: RegisterData = {
      firstName: this.myForm.value.firstName || '',
      lastName: this.myForm.value.lastName || '',
      email: this.myForm.value.email || '',
      phoneNumber: this.myForm.value.phoneNumber || '',
      password: this.myForm.value.password || '',
      confirmedPassword: this.myForm.value.confirmedPassword || '',
      street: this.myForm.value.address || '',
      city: this.myForm.value.city || '',
      zipCode: this.myForm.value.zipCode || '',
      country: this.myForm.value.country || '',
      conditions: this.myForm.value.conditions || false,
      newsletter: this.myForm.value.newsletter || false
    }

    this.authService.postData(registerUser).then((response) => {
      console.log("User registered successfully", response);
      this.myForm.reset();
    }).catch((error) => {
      console.error("Error registering user", error);
    });
  }

}
