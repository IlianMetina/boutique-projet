import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAuthDto: Prisma.UserUpdateInput) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
