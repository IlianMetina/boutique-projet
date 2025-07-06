export class CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmedPassword?: string;
  city: string;
  street: string;
  zipCode: string;
  country: string;
  conditions: boolean;
  newsletter: boolean;

  checkPassword() {
    // Check si this.password && this.confirmedPassword not null
    if (this.password == this.confirmedPassword) {
      return true;
    } else {
      return false;
    }
  }
}
