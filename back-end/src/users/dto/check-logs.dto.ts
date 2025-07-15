import { IsString } from "class-validator";

export class CheckLogsDto {

  @IsString()
  email: string;
  
  @IsString()
  password: string;
  
}
