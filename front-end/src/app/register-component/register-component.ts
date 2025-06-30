import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';

interface RegisterData {

  firstname: string,
  lastname: string,
  email: string,
  phoneNumber: string,
  password: string,
  confirmedPassword: string,
  address: {street: string, city: string, zipCode: string, country: string},
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

    console.log("logs email : " + this.myForm.value.email)
    console.log("logs nom de famille : " + this.myForm.value.lastname)
    console.log("logs prénom : " + this.myForm.value.firstname)
    console.log("logs téléphone : " + this.myForm.value.phoneNumber)
    console.log("logs password : " + this.myForm.value.password)
    console.log("logs prénom : " + this.myForm.value.confirmedPassword)
    console.log("logs prénom : " + this.myForm.value.address)
    console.log("logs prénom : " + this.myForm.value.city)
    console.log("logs prénom : " + this.myForm.value.zipCode)
    console.log("logs prénom : " + this.myForm.value.country)
    console.log("logs prénom : " + this.myForm.value.conditions)
    console.log("logs prénom : " + this.myForm.value.newsletter)

  }

}
