import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UserId } from 'src/decorator/user-id.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  // @UseGuards(AuthGuard)
  create(@Body() createOrderDto: CreateOrderDto, @UserId() userId: number) {
    createOrderDto.userId = userId;
    return this.orderService.create(createOrderDto);
  }

  @Get('all')
  // @UseGuards(AuthGuard)
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  // @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  // @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete('remove/:id')
  // @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
