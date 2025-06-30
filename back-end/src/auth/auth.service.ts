import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';


@Injectable()
export class AuthService {

  async findAll() {
    return this.findAll();
  }

  async findOne(id: number) {
    return this.findOne(id);
  }

  async update(id: number, updateAuthDto: Prisma.UserUpdateInput) {
    return this.update(id, updateAuthDto);
  }

  async remove(id: number) {
    return this.remove(id);
  }

}
