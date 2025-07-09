import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { PrismaService } from 'prisma/prisma.service';
import { OrderItem } from './entities/order-item.entity';

@Injectable()
export class OrderItemService {

  constructor(private readonly prisma: PrismaService){}

  create(createOrderItemDto: CreateOrderItemDto) {

    const orderItem = new OrderItem();
    orderItem.setOrderItemID(createOrderItemDto.orderId);
    orderItem.setPrice(createOrderItemDto.price);
    orderItem.setProductItemID(createOrderItemDto.productId);
    orderItem.setQuantity(createOrderItemDto.quantity);

    return this.prisma.orderItem.create({
      data: orderItem,
    });
  }

  findAll() {
    return this.prisma.orderItem.findMany();
  }

  findOne(id: number) {
    return this.prisma.orderItem.findUnique({where: {id}});
  }

  update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    return this.prisma.orderItem.update({where: {id}, data: updateOrderItemDto})
  }

  remove(id: number) {
    return this.prisma.orderItem.delete({where: {id}});
  }
}
