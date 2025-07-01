import { Injectable } from '@angular/core';

interface RegisterData {

  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  password: string,
  confirmedPassword?: string,
  street: string,
  city: string,
  zipCode: string,
  country: string,
  conditions: boolean,
  newsletter: boolean
}


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl = 'http://localhost:3000/users'

  constructor() {}

  async postData(data: RegisterData): Promise<{status: string}>{

    const response = fetch(this.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    })

    const status = (await response).json();

    return status;
  }
}
