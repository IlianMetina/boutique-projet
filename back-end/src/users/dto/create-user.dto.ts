import { IsBoolean, IsEmail, IsOptional, IsString, Matches, MinLength } from "class-validator";

export class CreateUserDto {

  @IsString()
  @MinLength(2)
  firstName: string;

  @IsString()
  @MinLength(2)
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @Matches(/^\+?[0-9]{7,15}$/)
  phoneNumber: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
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
