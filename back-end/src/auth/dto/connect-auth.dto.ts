import { IsEmail, IsString } from "class-validator";

export class Connect {

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}