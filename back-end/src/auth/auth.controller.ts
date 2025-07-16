import { Controller, Get, Body, Patch, Param, Delete, Post, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { ConnectAuthDto } from './dto/connect-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UsersService, private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() connectAuthDto: ConnectAuthDto,
  ): Promise<{ success: boolean; token: string }> {

    const isValid = await this.userService.isPasswordCorrect(connectAuthDto);
    console.log(isValid ? 'Mot de passe correct' : 'Mot de passe incorrect');

    if (isValid) {

      const user = await this.userService.isUserExists(connectAuthDto.email);

      if(!user){

        throw new UnauthorizedException('Utilisateur non trouvé');
      }

      const token = await this.authService.generateJwt(connectAuthDto.email, user.id, user.role);
      console.log('Token généré avec succès : ', token);

      return { success: true, token: token };

    } else {
      
      throw new UnauthorizedException('!!! Identifiants incorrects !!!');
    }
  }
}
