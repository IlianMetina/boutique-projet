import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {

  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  confirmedPassword?: string;
  city?: string;
  street?: string;
  zipCode?: string;
  country?: string; 
  conditions?: boolean;
  newsletter?: boolean;
}
