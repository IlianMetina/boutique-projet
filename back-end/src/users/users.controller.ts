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
import { User } from 'generated/prisma';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UsersController {
  // The UsersController is responsible for handling HTTP requests related to users.
  // It uses the UsersService to perform operations on user data.
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(
    @Body() checkLogsDto: CheckLogsDto,
  ): Promise<{ success: boolean; token: string }> {
    // Rajouter token: jwt après success: boolean

    const isValid = await this.usersService.isPasswordCorrect(checkLogsDto);
    console.log(isValid ? 'Mot de passe correct' : 'Mot de passe incorrect');

    if (isValid) {
      // Créer le token jwt et le return ? Puis isPlateformBrowser == true, cookies.set(token) ? LoginComponent
      const token = await this.authService.generateJwt(checkLogsDto.email, 1);
      console.log('Token généré avec succès : ', token);
      return { success: true, token: token };
    } else {
      throw new Error('!!! Identifiants incorrects !!!');
    }
  }

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
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User | null> {
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
