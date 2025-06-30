import { Injectable } from '@angular/core';
import { RegisterData } from '../../register-component/register-component';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl = 'http://localhost:3000/auth';

  saveUser(data: RegisterData): Promise <RegisterData> {

    const saveUser = fetch(this.apiUrl).then(res => res.json());
    return saveUser;
  }

}
