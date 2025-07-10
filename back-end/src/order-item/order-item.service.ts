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

    return this.prisma.productInOrder.create({
      data: orderItem,
    });
  }

  findAll() {
    return this.prisma.productInOrder.findMany();
  }

  findOne(id: number) {
    return this.prisma.productInOrder.findUnique({where: {id}});
  }

  update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    return this.prisma.productInOrder.update({where: {id}, data: updateOrderItemDto})
  }

  remove(id: number) {
    return this.prisma.productInOrder.delete({where: {id}});
  }
}
