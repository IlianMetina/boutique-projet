import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CheckLogsDto } from './dto/check-logs.dto';
import * as bcrypt from 'bcrypt';
import { User as PrismaUser, UserRole } from '@prisma/client';
import { User } from './entities/user.entity';

type UserWithoutPassword = {

  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  city: string;
  street: string;
  zipCode: string;
  country: string;
  conditions: boolean;
  newsletter: boolean | null;
  role: UserRole;
}

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    console.log('createdUserDTO = : ' + createUserDto.firstName);

    const user = new User();

    const passwordHashed = await this.hashPassword(createUserDto.password);

    user.setEmail(createUserDto.email);
    user.setPassword(passwordHashed);
    user.setFirstName(createUserDto.firstName);
    user.setLastName(createUserDto.lastName);
    user.setPhoneNumber(createUserDto.phoneNumber);
    user.setCity(createUserDto.city);
    user.setStreet(createUserDto.street);
    user.setZipCode(createUserDto.zipCode);
    user.setCountry(createUserDto.country);
    user.setConditions(createUserDto.conditions);
    user.setNewsletter(createUserDto.newsletter);

    return this.prisma.user.create({
      data: user,
    });
  }

  async findAll() {
    
    return this.prisma.user.findMany({ select: {

      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phoneNumber: true,
      city: true,
      street: true,
      zipCode: true,
      country: true,
      conditions: true,
      newsletter: true,
      role: true,

    } });
  }

  async getUsersCount(): Promise<number> {

    const users = await this.prisma.user.findMany();
    if(!users){
      console.log("Aucun utilisateur trouvé");
      return 0;
    }

    return users.length;
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id }, select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phoneNumber: true,
      city: true,
      street: true,
      zipCode: true,
      country: true,
      conditions: true,
      newsletter: true,
      role: true,
    }});
  }

  async findByEmail(email: string){

    return this.prisma.user.findUnique({where: {email}, select: {

      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phoneNumber: true,
      city: true,
      street: true,
      zipCode: true,
      country: true,
      conditions: true,
      newsletter: true,
      role: true,

    }});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds: number = 10;

    return bcrypt.hash(password, saltRounds);
  }

  async isUserExists(email: string): Promise<UserWithoutPassword | null>{

    return this.findByEmail(email);

  }

  async isPasswordCorrect(checkLogsDto: CheckLogsDto): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { email: checkLogsDto.email },
      select: { password: true },
    });

    if (!user) {
      return false;
    }

    return await bcrypt.compare(checkLogsDto.password, user.password);
  }
}
