import { UserRole } from "@prisma/client";

export class UserDto {

  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  city: string;
  street: string;
  zipCode: string;
  country: string;
  conditions: boolean;
  newsletter: boolean | null;
  role: UserRole;

}