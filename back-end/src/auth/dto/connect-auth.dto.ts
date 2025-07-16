import { IsEmail, IsString } from "class-validator";

export class ConnectAuthDto {

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}