import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';

export interface RegisterData {

  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  password: string,
  confirmedPassword: string,
  street: string,
  city: string,
  zipCode: string,
  country: string 
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

  constructor(private authService: AuthService){}

   myForm = new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl(''),
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

  
  onSubmit(): void {

    const formValue = this.myForm.value;
    
    const registerData: RegisterData = {
      
      firstName: formValue.firstname ?? '',
      lastName: formValue.lastname ?? '',
      email: formValue.email ?? '',
      phoneNumber: formValue.phoneNumber ?? '',
      password: formValue.password ?? '',
      confirmedPassword: formValue.confirmedPassword ?? '',
      street: formValue.address ?? '',
      city: formValue.city ?? '',
      zipCode: formValue.zipCode ?? '',
      country: formValue.country ?? '',
      conditions: formValue.conditions ?? false,
      newsletter: formValue.newsletter ?? false
    }

    
    this.authService.postData(registerData).then((response)=> {
      
      console.log("Statut de la réponse : ", response);
    })
    
  }

}

    // console.log("logs email : " + this.myForm.value.email)
    // console.log("logs nom de famille : " + this.myForm.value.lastname)
    // console.log("logs prénom : " + this.myForm.value.firstname)
    // console.log("logs téléphone : " + this.myForm.value.phoneNumber)
    // console.log("logs password : " + this.myForm.value.password)
    // console.log("logs confirmedPassword : " + this.myForm.value.confirmedPassword)
    // console.log("logs address : " + this.myForm.value.address)
    // console.log("logs city : " + this.myForm.value.city)
    // console.log("logs zipCode : " + this.myForm.value.zipCode)
    // console.log("logs country : " + this.myForm.value.country)
    // console.log("logs conditions : " + this.myForm.value.conditions)
    // console.log("logs newsletter : " + this.myForm.value.newsletter)
