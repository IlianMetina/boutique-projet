import { IsString } from "class-validator";

export class CheckLogsDto {

  @IsString()
  password: string;
  
  @IsString()
  email: string;
}
