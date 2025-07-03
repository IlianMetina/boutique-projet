import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    console.log('createdUserDTO = : ' + createUserDto.firstName);

    const user = new User();

    user.setEmail(createUserDto.email)
        .setPassword(createUserDto.password)
        .setFirstName(createUserDto.firstName)
        .setLastName(createUserDto.lastName)
        .setPhoneNumber(createUserDto.phoneNumber)
        .setCity(createUserDto.city)
        .setStreet(createUserDto.street)
        .setZipCode(createUserDto.zipCode)
        .setCountry(createUserDto.country)
        .setConditions(createUserDto.conditions)
        .setNewsletter(createUserDto.newsletter);

    return this.prisma.user.create({
      data: user,
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
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
}
