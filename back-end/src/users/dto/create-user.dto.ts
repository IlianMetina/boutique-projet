import { IsBoolean, IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @IsOptional()
  confirmedPassword?: string;

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
  newsletter: boolean;

}
