import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { CheckLogsDto } from './dto/check-logs.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    console.log('createdUserDTO = : ' + createUserDto.firstName);

    const user = new User();

    const passwordHashed = this.hashPassword(createUserDto.password);

    user.setEmail(createUserDto.email);
    user.setPassword(await passwordHashed);
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

  hashPassword(password: string): Promise<string> {
    const saltRounds: number = 10;

    return bcrypt.hash(password, saltRounds);
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
