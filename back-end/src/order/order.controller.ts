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
  @UseGuards(AuthGuard)
  create(@Body() createOrderDto: CreateOrderDto, @UserId() userId: number) {
    createOrderDto.userId = userId;
    return this.orderService.create(createOrderDto, userId);
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

  @Get('basket/:userId')
  // @UseGuards(AuthGuard)
  async getBasket(@Param('userId') userId: number) {
    const basket = await this.orderService.findBasket(userId);
    if (!basket) {
      return { message: 'No basket found for this user.' };
    }
    return basket;
  }

  @Get('basket/user/:userId')
  async findBasketOrderId(@Param('userId') userId: number){
    return this.orderService.findBasketOrderId(Number(userId));
  }

   @Get('basket/all/:userId')
  async findAllBasketsByUser(@Param('userId') userId: number){
    return this.orderService.findAllBasketsByUser(Number(userId));
  }

  @Patch(':id')
  // @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    await this.orderService.calculateOrderTotal(Number(id));
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete('remove/:id')
  // @UseGuards(AuthGuard)
  async remove(@Param('id') id: string) {
    await this.orderService.calculateOrderTotal(Number(id));
    return this.orderService.remove(+id);
  }
}
