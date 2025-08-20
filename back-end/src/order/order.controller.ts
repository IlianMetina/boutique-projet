import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UserId } from 'src/decorator/user-id.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { setDeliveryAddressDto } from './dto/set-delivery-address.dto';
import { AdminGuard } from 'src/admin/admin-guard';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  create(@Body() createOrderDto: CreateOrderDto, @UserId() userId: number) {
    createOrderDto.userId = userId;
    return this.orderService.create(createOrderDto, userId);
  }
  
  @Post('delivery')
  @UseGuards(AuthGuard)
  saveAddress(@Body() setAddressDto: setDeliveryAddressDto, @UserId() userId: number) {
    return this.orderService.saveDeliveryAddress(setAddressDto, userId);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Get('total')
  async recentOrders(){
    console.log("Entrée méthode countTotalOrders");
    return this.orderService.adminOrdersDisplay();
  }

  @Get('all')
  @UseGuards(AuthGuard)
  findAll(@UserId() userId: number) {
    return this.orderService.findAll(userId);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    console.log("Entrée Order controller findOne pour l'id :", id);
    return this.orderService.findUserBasket(+id);
  }

  @Get('recap/:id')
  @UseGuards(AuthGuard)
  findOneByOrderId(@Param('id') id: string) {
    console.log("Entrée Order controller findOne pour l'id :", id);
    return this.orderService.findOneByOrderId(+id);
  }

  @Get('basket/:userId')
  @UseGuards(AuthGuard)
  async getBasket(@Param('userId') userId: number) {
    const basket = await this.orderService.findBasket(userId);
    if (!basket) {
      return { message: 'No basket found for this user.' };
    }
    return basket;
  }

  /* ----- Récupération des commandes en fonction d'un statut ----- */

  @UseGuards(AuthGuard)
  @Get('cancelled/:userId')
  async findCancelledOrders(@Param('userId') userId: number){
    return this.orderService.findCancelledOrders(Number(userId));
  }

  @UseGuards(AuthGuard)
  @Get('shipped/:userId')
    async findShippedOrders(@Param('userId') userId: number){
    return this.orderService.findShippedOrders(Number(userId));
  }

  @UseGuards(AuthGuard)
  @Get('pending/:userId')
    async findCurrentOrders(@Param('userId') userId: number){
    return this.orderService.findCurrentOrders(Number(userId));
  }

  /* ----- Récupération des commandes en fonction d'un statut ----- */

  @UseGuards(AuthGuard)
  @Get('current/:userId')
  async countCurrentOrders(@Param('userId') userId: number){
    return this.orderService.countCurrentOrders(Number(userId));
  }


  @UseGuards(AuthGuard)
  @Get('basket/user/:userId')
  async findBasketOrderId(@Param('userId') userId: number){
    return this.orderService.findBasketOrderId(Number(userId));
  }

  @UseGuards(AuthGuard)
  @Get('basket/all/:userId')
  async findAllBasketsByUser(@Param('userId') userId: number){
    return this.orderService.findAllBasketsByUser(Number(userId));
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    await this.orderService.calculateOrderTotal(Number(id));
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete('remove/:id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string) {
    await this.orderService.calculateOrderTotal(Number(id));
    return this.orderService.remove(+id);
  }
}
