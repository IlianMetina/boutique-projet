import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { PrismaService } from 'prisma/prisma.service';
import { OrderItem } from './entities/order-item.entity';
import { ProductInOrder } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

interface Basket {

  userId: number;
  status: string;
  total: Decimal;
}

@Injectable()
export class OrderItemService {

  constructor(private readonly prisma: PrismaService){}

  async create(createOrderItemDto: CreateOrderItemDto, userId: number) {

    const basket = this.getOrCreateBasket()

    const isProductExist = await this.isProductExists(createOrderItemDto.orderId, createOrderItemDto.productId);
    if(isProductExist){
      
      return this.updateProductQuantity(createOrderItemDto);
    }

    const orderItem = new OrderItem();
    orderItem.setOrderID(createOrderItemDto.orderId);
    orderItem.setPrice(createOrderItemDto.price);
    orderItem.setProductItemID(createOrderItemDto.productId);
    orderItem.setQuantity(createOrderItemDto.quantity);

    const testTotal: number = this.calculateOrderProductPrice(orderItem);

    console.log("---------------------------------------");
    console.log("Total valeur produit : " + testTotal)
    console.log("---------------------------------------");


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

  calculateOrderProductPrice(orderItem: OrderItem): number{

    const total = this.calculateOrderProductPrice(orderItem)
    console.log("variable total = ", total);

    return total;
  }

  async isProductExists(orderId: number, productId: number): Promise<boolean>{

    const isProduct = await this.prisma.productInOrder.findFirst({
      where: {
        orderId: orderId,
        productId: productId,
      }});

    if(isProduct != null){

      return true;

    }else{

      return false;
    }
  }

  async updateProductQuantity(updateOrderItemDto: UpdateOrderItemDto): Promise<ProductInOrder>{

    if(updateOrderItemDto.orderId == undefined || updateOrderItemDto.productId == undefined){

      throw new Error("orderId ou productId est undefined");
    }

    return this.prisma.productInOrder.update({

      where: {

        orderId_productId: {
          orderId: updateOrderItemDto.orderId,
          productId: updateOrderItemDto.productId,
        }
      },
      data: {
        quantity: {increment: 1},
      },
    });
  }

async getOrCreateBasket(userId: number): Promise<Basket>{

  let basket = await this.prisma.order.findFirst({
    where: {
      userId: userId,
      status: 'BASKET',
    },
  });

  if (!basket) {
    basket = await this.prisma.order.create({
      data: {
        userId: userId,
        status: 'BASKET',
        total: 0,
      },
    });
  }

  return basket;
}
}
