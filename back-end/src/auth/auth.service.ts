import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { User } from 'generated/prisma';

@Injectable()
export class AuthService {
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
