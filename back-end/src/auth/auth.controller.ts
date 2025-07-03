import { Controller, Get, Body, Patch, Param, Delete, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma, User } from '@prisma/client';
import { ConnectAuthDto } from './dto/connect-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async connect(@Body() connectAuthDto: ConnectAuthDto) {

    

  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.authService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  // eslint-disable-next-line prettier/prettier
  async update(@Param('id') id: string, @Body() updateAuthDto: Prisma.UserUpdateInput): Promise<User> {
    return await this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<User> {
    return this.authService.remove(+id);
  }
}
