import { UserRole } from "@prisma/client";
import { IsBoolean, IsEmail, IsEnum, IsInt, IsString } from "class-validator";

export class UserDto {

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  city: string;

  @IsString()
  street: string;

  @IsString()
  zipCode: string;

  @IsString()
  country: string;

  @IsBoolean()
  conditions: boolean;

  @IsBoolean()
  newsletter: boolean | null;

  @IsEnum(UserRole)
  role: UserRole;
}