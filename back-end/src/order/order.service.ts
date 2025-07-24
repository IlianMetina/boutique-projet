import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../../prisma/prisma.service'
import { Order } from './entities/order.entity';
import { OrderStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export interface Basket {

  id: number;
  status: string;
  total: Decimal;
}

@Injectable()
export class OrderService {

  constructor(private readonly prisma: PrismaService){}

  async create(createOrderDto: CreateOrderDto, userId: number) {

    console.log("UserId reçu par la méthode create : ", createOrderDto.userId);

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

    return this.prisma.order.findUnique({
      where: {
        id: id,
      },

      include: {
        productsInOrder: {
          include: {
            product: true
          }
        }
      },
      
    });
  }

 async update(id: number, updateOrderDto: UpdateOrderDto) {

  const updateData: any = {};
  
  if (updateOrderDto.status) {
    updateData.status = updateOrderDto.status;
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

    console.log("UserID du joueur : ", userId);

    let basket = await this.prisma.order.findFirst({where: {
      userId: userId,
      status: 'BASKET',
    },
    include: {
      productsInOrder: true,
    }
  });

    if(!basket){

      return null;
    }

    console.log("Détail du panier récupéré : ");
    console.log(basket);

    return basket;
  }

  async findBasketOrderId(userId: number){

    console.log("Id de l'utilisateur lié au panier que l'on souhaite trouver : ", userId);
    console.log("Type de cet ID : " + typeof userId);
    console.log("Critères de recherche Prisma :");
    console.log({
    userId: userId,
    // status: 'BASKET',
    });

    const basket = await this.prisma.order.findFirst({

      where: {
        userId: Number(userId),
        status: 'BASKET',
      },
    });

    if(!basket){

      console.log("8888888777777777 ERREUR RÉCUPÉRATION DU PANIER !! 888888888877777777");
      return null
    }

    console.log("((((((( OrderId Récupérer findBasketOrderId : )))))))))");
    console.log(basket.id);
    console.log("((((((( OrderId Récupérer findBasketOrderId : )))))))))")
    return {message: "basketId récupérer", id: basket.id};
  }

  async calculateOrderTotal(orderId: number){

    const productsInOrder = await this.prisma.productInOrder.findMany({
      where: { orderId },
      select: {
        price: true,
        quantity: true,
      },
    });

    console.log("------Produits présents dans la BDD pour l'order " + orderId + "------");
    console.log(productsInOrder);
    console.log("------Produits présents dans la BDD pour l'order " + orderId + "------");

    const total = productsInOrder.reduce((sum: Decimal, item: {price: Decimal; quantity: number}) =>{

      return sum.add(item.price.mul(item.quantity));

    }, new Decimal(0));

    console.log("------Total prix de la commande : ------")
    console.log(total); 
    console.log("------Total prix de la commande : ------")

    const totalToInt = total.toNumber();

    await this.prisma.order.update({
      where: {id: orderId},
      data: {total: totalToInt}
    });

    return totalToInt;
  }

async getProductPrice(productId: number): Promise<number> {

  const product = await this.prisma.product.findUnique({
    where: { id: productId },
    select: { price: true },
  });

  if (!product) {
    throw new Error(`Product with ID ${productId} not found`);
  }

  return product.price.toNumber(); // Convert Decimal to number
}

async addProductToCart(userId: number, productId: number, quantity: number) {

  const basket = await this.findBasket(userId);

  if (!basket) {
    throw new Error('No basket found for this user.');
  }

  await this.prisma.productInOrder.create({
    data: {
      orderId: basket.id,
      productId,
      quantity,
      price: await this.getProductPrice(productId), // Récupérer le prix du produit
    },
  });

  // Recalculez le total après l'ajout
  const total = await this.calculateOrderTotal(basket.id);
  console.log(`Total mis à jour pour la commande ${basket.id}: ${total}`);
}

  
}
