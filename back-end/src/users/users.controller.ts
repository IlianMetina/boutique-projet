import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CheckLogsDto } from './dto/check-logs.dto';
import { Jwt } from 'jsonwebtoken';

@Controller('users')
export class UsersController {
  // The UsersController is responsible for handling HTTP requests related to users.
  // It uses the UsersService to perform operations on user data.
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {

    if(createUserDto.checkPassword()){

      console.log('create users : ', createUserDto);

      const hashedPassword = await this.usersService.hashPassword(createUserDto.password);

      console.log("Mot de passe hashé : " + hashedPassword);

      return this.usersService.create(createUserDto);

    }else {

      return;
    }
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post('login')
  async login(@Body() checkLogsDto: CheckLogsDto): Promise<{success: boolean}> { // Rajouter token: jwt après success: boolean

    const isValid = await this.usersService.isPasswordCorrect(checkLogsDto)

    if(isValid){

      // Créer le token jwt et le return ? Puis isPlateformBrowser == true, cookies.set(token) ? LoginComponent
      return {success: true}

    }else {

      return {success: false}
    }


  }
}
