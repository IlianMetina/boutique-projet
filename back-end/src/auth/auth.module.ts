import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'FalseSecretKey123',
      signOptions: { expiresIn: '24h' },
    }),
  ],

  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}
