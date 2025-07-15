import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwt(email: string, userID: number, role: string): Promise<string> {
    const payload = { email, sub: userID, role };

    return this.jwtService.sign(payload);
  }
}