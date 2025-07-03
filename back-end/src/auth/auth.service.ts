import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { ConnectAuthDto } from './dto/connect-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Jwt } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

  constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService){}

  async connect(connectAuthDto: ConnectAuthDto) {

  
  }

  async checkJwt(token: Jwt){

    // Check le jwt en le comparant à celui qui serait stocké en BDD, ou le stocké seulement dans les cookies et le récupérer pour le comparer ?

  }

  async generateJwt(email: string, userID: number): Promise<string> {

    const payload = { email, sub: userID};

    return this.jwtService.sign(payload);
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
