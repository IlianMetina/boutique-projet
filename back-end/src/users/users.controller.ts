import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CheckLogsDto } from './dto/check-logs.dto';

@Controller('users')
export class UsersController {
  // The UsersController is responsible for handling HTTP requests related to users.
  // It uses the UsersService to perform operations on user data.
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {

    if(createUserDto.checkPassword()){

      console.log('create users : ', createUserDto);
      return this.usersService.create(createUserDto);

    }else {

      return;
    }

  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post('login')
  async login(@Body() checkLogsDto: CheckLogsDto): Promise<boolean> {

    const isValid = await this.usersService.isPasswordCorrect(checkLogsDto)

    if(isValid){

      return {}
    }
  

  }
}
