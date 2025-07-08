import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async generateJwt(email: string, userID: number, role: string): Promise<string> {
    const payload = { email, sub: userID, role };

    return this.jwtService.sign(payload);
  }
}
