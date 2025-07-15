import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../../prisma/prisma.service'
import { Order } from './entities/order.entity';
import { OrderStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export interface Basket {

  userId: number;
  status: string;
  total: Decimal;
}

@Injectable()
export class OrderService {

  constructor(private readonly prisma: PrismaService){}

  async create(createOrderDto: CreateOrderDto) {

    const userBasket = await this.findBasket(createOrderDto.userId);
    if(userBasket != null){

      return userBasket;
    }

    const order = new Order();

    order.setUserID(createOrderDto.userId);
    order.setStatus(createOrderDto.status as OrderStatus);
    order.setTotal(createOrderDto.total);

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

  async findBasket(userId: number): Promise<Basket | null>{

    let basket = await this.prisma.order.findFirst({where: {
      userId: userId,
      status: 'BASKET',
    }});

    if(!basket){

      return null;
    }

    return basket;
  }
}
