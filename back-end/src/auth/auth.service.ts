import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { ConnectAuthDto } from './dto/connect-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

  constructor(private readonly prisma: PrismaService){}

  async connect(connectAuthDto: ConnectAuthDto) {

  
  }

  async findAll(): Promise<User[]> {
    return this.findAll();
  }

  async findOne(id: number): Promise<User> {
    return this.findOne(id);
  }

  async update(
    id: number,
    updateAuthDto: UpdateAuthDto,
  ): Promise<User> {
    return this.update(id, updateAuthDto);
  }

  async remove(id: number): Promise<User> {
    return this.remove(id);
  }
}
