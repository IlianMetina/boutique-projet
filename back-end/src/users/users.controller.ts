import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { UserDto } from './dto/user-response.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {

  // The UsersController is responsible for handling HTTP requests related to users.
  // It uses the UsersService to perform operations on user data.

  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto): Promise<User | void> {  

    console.log('Début de la méthode create');
    console.log(
      'mot de passe : ',
      createUserDto.password + ' confirmedPassword : ',
      createUserDto.confirmedPassword,
    );

    if (createUserDto.password === createUserDto.confirmedPassword) {
      console.log('create users : ', createUserDto);

      const hashedPassword = await this.usersService.hashPassword(
        createUserDto.password,
      );

      console.log('Mot de passe hashé : ' + hashedPassword);

      return this.usersService.create(createUserDto);
    } else {
      return;
    }
  }

  @Get('all')
  @UseGuards(AuthGuard)
  async findAll(): Promise<UserDto[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string): Promise<UserDto | null> {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(+id);
  }
}