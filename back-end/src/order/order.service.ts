import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../../prisma/prisma.service'
import { Order } from './entities/order.entity';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrderService {

  constructor(private readonly prisma: PrismaService){}

  create(createOrderDto: CreateOrderDto) {

    const order = new Order();

    order.setStatus(createOrderDto.status as OrderStatus);
    order.setTotal(createOrderDto.total);
    order.setUserID(createOrderDto.userId);

    return this.prisma.order.create({

      data: order,
    });
  }

  findAll() {
    return this.prisma.order.findMany();
  }

  findOne(id: number) {
    return this.prisma.order.findUnique({where: {id}});
  }

 update(id: number, updateOrderDto: UpdateOrderDto) {
  const updateData: any = {};
  
  if (updateOrderDto.status) {
    updateData.status = updateOrderDto.status as OrderStatus;
  }
  
  if (updateOrderDto.total) {
    updateData.total = updateOrderDto.total;
  }

  return this.prisma.order.update({
    where: { id }, 
    data: updateData,
  });
}

  remove(id: number) {
    return this.prisma.order.delete({where: {id}});
  }
}
