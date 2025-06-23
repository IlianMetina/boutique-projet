import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserServiceService } from './services/users/user.service/user.service.service';
import { AuthServiceService } from './services/auth/auth.service/auth.service.service';
import { PrismaServiceService } from './prisma/prisma.service/prisma.service.service';
import { PrismaServiceService } from './prisma.service/prisma.service.service';
import { PrismaServiceService } from './prisma/prisma.service/prisma.service.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, UserServiceService, AuthServiceService, PrismaServiceService],
})
export class AppModule {}
