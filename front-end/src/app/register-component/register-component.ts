import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

export interface RegisterData {

  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  password: string,
  confirmedPassword?: string,
  city: string,
  zipCode: string,
  country: string,
  street: string,
  conditions: boolean,
  newsletter: boolean
}

function isPasswordMatch(group: AbstractControl): ValidationErrors | null{

  const password = group.get('password')?.value;
  const confirmedPassword = group.get('confirmedPassword')?.value;

  if(password == confirmedPassword){

    return null;
  
  }else{

    return {isMatching: false};
  }
}

@Component({
  selector: 'app-register-component',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css'
})

export class RegisterComponent {

  myForm = new FormGroup({
    firstName: new FormControl('',[
        Validators.required,
        Validators.pattern(/^[A-Za-zÀ-ÿ\-'\s]{2,}$/),
    ]),

    lastName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-zÀ-ÿ\-'\s]{2,}$/),
    ]),

    email: new FormControl('', [Validators.required, Validators.email]),

    phoneNumber: new FormControl('', [
      Validators.required, 
      Validators.pattern(/^\+?[0-9]{7,15}$/),
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/),
    ]),

    confirmedPassword: new FormControl('', [Validators.required]),
    street: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[\wÀ-ÿ0-9\s\.,'\-]{3,}$/),
    ]),

    city: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-zÀ-ÿ\-'\s]{2,}$/),
    ]),

    zipCode: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{5}$/),
    ]),

    country: new FormControl('', [
      Validators.required,

    ]),

    conditions: new FormControl(false, [Validators.requiredTrue]),
    newsletter: new FormControl(false)

  }, {validators: isPasswordMatch});

  constructor(private authService: AuthService, private router: Router){}

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
      confirmedPassword: this.myForm.value.confirmedPassword || '',
      password: this.myForm.value.password || '',
      street: this.myForm.value.street || '',
      city: this.myForm.value.city || '',
      zipCode: this.myForm.value.zipCode || '',
      country: this.myForm.value.country || '',
      conditions: this.myForm.value.conditions || false,
      newsletter: this.myForm.value.newsletter || false
    }

    console.log("Registering user:", registerUser);

    this.authService.register(registerUser).then((response) => {
      console.log("User registered successfully", response);
      this.myForm.reset();
      this.router.navigate(['/login']);

    }).catch((error) => {
      console.error("Error registering user", error);
    });
  }

}
