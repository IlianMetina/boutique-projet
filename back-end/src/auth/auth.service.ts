import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { ConnectAuthDto } from './dto/connect-auth.dto';

@Injectable()
export class AuthService {

  constructor(private readonly prisma: PrismaClient){}

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
    updateAuthDto: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.update(id, updateAuthDto);
  }

  async remove(id: number): Promise<User> {
    return this.remove(id);
  }
}
