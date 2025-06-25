/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service.service';
import { User, Prisma } from  '@prisma/client';

@Injectable()
export class UserServiceService {

  constructor(private prisma: PrismaService) {}

  

}
