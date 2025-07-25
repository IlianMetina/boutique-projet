import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { PrismaService } from 'prisma/prisma.service';
import { OrderItem } from './entities/order-item.entity';
import { ProductInOrder } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { OrderService } from 'src/order/order.service';

interface Basket {

  id: number;
  userId: number;
  status: string;
  total: Decimal;
}

@Injectable()
export class OrderItemService {

  constructor(private readonly prisma: PrismaService, private readonly orderService: OrderService){}

  /* Méthode qui permet d'ajouter un produit au panier */
  async create(createOrderItemDto: CreateOrderItemDto, userId: number) {

    let basket;
    
    if(createOrderItemDto.orderId){

      basket = await this.prisma.order.findUnique({where: {id: createOrderItemDto.orderId}});
      if(!basket){
        throw new Error("Aucune Order trouvée");
      }

      if(basket.userId !== userId){
        throw new Error("Modification d'un utilisateur de manière non autorisée");
      }

    }else{

      basket = await this.getOrCreateBasket(userId);
    }


    const isProductExist = await this.isProductExists(basket.id, createOrderItemDto.productId); 

    const product = await this.prisma.product.findUnique({
      where: {id: createOrderItemDto.productId},
      select: {price: true}
    });

    if(!product){

      throw new Error("Produit introuvable");
    }

    if(isProductExist){
      
      const updateDto: UpdateOrderItemDto = {

        orderId: basket.id,
        productId: createOrderItemDto.productId,
        quantity: createOrderItemDto.quantity,
        price: product.price.toNumber(),
      };

      const updated = this.updateProductQuantity(updateDto);
      await this.orderService.calculateOrderTotal(basket.id);
      return updated;
    }

    const orderItem = new OrderItem();
    orderItem.setOrderID(basket.id);
    orderItem.setPrice(product.price.toNumber());
    orderItem.setProductItemID(createOrderItemDto.productId);
    orderItem.setQuantity(createOrderItemDto.quantity);


    const created = await this.prisma.productInOrder.create({
      data: orderItem,
    });

    await this.orderService.calculateOrderTotal(basket.id);
    return created;
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

  async remove(productId: number, orderId: number) {
    console.log("id reçu pour suppression produit", productId);
    const productInOrder = await this.prisma.productInOrder.findFirst({
      where: {
        orderId: orderId,
        productId: productId,
      },
    });

  if (!productInOrder) {
    console.log("Aucun produit associé à l'id ", productId);
    throw new Error("Aucun produit associé à l'ID");
  }
    return await this.prisma.productInOrder.delete({where: {id: productInOrder.id}});
  }

  /* Méthode qui vérifie si un produit X est déjà présent dans le panier */
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

  /* Méthode qui s'occupe d'incrémenter la quantité d'un produit s'il est déjà présent dans le panier */
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
        quantity: updateOrderItemDto.quantity, 
        price: updateOrderItemDto.price,
      },
    });
  }

/* Méthode qui vérifie si un panier avec le statut "BASKET" pour un utilisateur X existe, sinon on en crée un */
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
