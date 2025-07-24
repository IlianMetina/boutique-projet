import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrderItemService } from './product-in-order-service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserId } from 'src/decorator/user-id.decorator';

@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  create(@Body() createOrderItemDto: CreateOrderItemDto, @UserId() userId: number) {
    console.log('---------------------------------------');
    console.log("Id de l'utilisateur concerné : ", userId);
    console.log('---------------------------------------');
    return this.orderItemService.create(createOrderItemDto, userId);
  }

  @Get('all')
  // @UseGuards(AuthGuard)
  findAll() {
    return this.orderItemService.findAll();
  }
  
  @Get(':id')
  // @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.orderItemService.findOne(+id);
  }

  @Patch(':id')
  // @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateOrderItemDto: UpdateOrderItemDto) {
    return this.orderItemService.update(+id, updateOrderItemDto);
  }

  @Delete('remove/:id')
  // @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.orderItemService.remove(+id);
  }
}