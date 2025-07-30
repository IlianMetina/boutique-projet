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

    console.log("UserId reçu méthode create OrderItemService :", userId);

    console.log("OrderId méthode create OrderItemService : ");
    let orderId = await this.orderService.findBasketOrderId(userId);
    console.log("OrderId méthode create OrderItemService : ", orderId);
    
    if(orderId == null || !orderId){

      console.log("Aucun orderId trouvé pour le userId " + userId + "avec le statut 'PENDING'");
      const basket = await this.getOrCreateBasket(userId);
      orderId = basket.id;
      console.log("-_-_-_-_- [ orderId récupérer lors de création panier :", orderId + " ] -_-_-_-_-");
      
    }
    
    const isProductExist = await this.isProductExists(orderId, createOrderItemDto.productId); 
    console.log("IsProduct Existing ? : ", isProductExist);
    
    if(isProductExist){

      const existingProduct = await this.prisma.productInOrder.findFirst({
        where: {
          orderId: orderId,
          productId: createOrderItemDto.productId,
        }
      });

      

      console.log("-_-_-_-_- [ Quantité DTO récupérée lors de création panier :", createOrderItemDto.quantity + " ] -_-_-_-_-");
      
      const updateDto: UpdateOrderItemDto = {

        productId: createOrderItemDto.productId,
        quantity: existingProduct!.quantity + 1,
      };

      console.log("-_-_-_-_- [ Quantité existingproduct récupérée lors de création panier :", existingProduct!.quantity + " ] -_-_-_-_-");
      
      const updated = await this.updateProductQuantity(updateDto, orderId);
      await this.orderService.calculateOrderTotal(orderId);
      return updated;
    }
      
    const product = await this.prisma.product.findUnique({
      where: {id: createOrderItemDto.productId},
      select: {price: true}
    });

    if(!product){

      throw new Error("Produit introuvable");
    }

    const orderItem = new OrderItem();
    orderItem.setProductItemID(createOrderItemDto.productId);
    orderItem.setQuantity(createOrderItemDto.quantity);
    orderItem.price = product.price.toNumber();
    orderItem.orderId = orderId;

    const created = await this.prisma.productInOrder.create({
      data: orderItem,
    });

    await this.orderService.calculateOrderTotal(orderId);
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
  async updateProductQuantity(updateOrderItemDto: UpdateOrderItemDto, userId: number): Promise<ProductInOrder>{

    console.log("Dto reçue updateOrderItemDto: ", updateOrderItemDto);
    console.log("UserId reçu méthode updateProductQuantity OrderItemService:", userId);

    let orderId = await this.orderService.findBasketOrderId(userId);

    console.log("OrderId", orderId, "retrouvé correspondant à l'userId updateProductQuantity", userId);

    if(!orderId || !updateOrderItemDto.productId){

      throw new Error("orderId ou productId est undefined");
    }

    const updatedProduct = await this.prisma.productInOrder.update({

      where: {

        orderId_productId: {
          orderId: orderId,
          productId: updateOrderItemDto.productId,
        }
      },
      data: {
        quantity: updateOrderItemDto.quantity, 
      },
    });

    await this.orderService.calculateOrderTotal(orderId);
    return updatedProduct;
  }

/* Méthode qui vérifie si un panier avec le statut "BASKET" pour un utilisateur X existe, sinon on en crée un */
async getOrCreateBasket(userId: number): Promise<Basket>{

  let basket = await this.prisma.order.findFirst({
    where: {
      userId: userId,
      status: 'BASKET',
    },
  });

  console.log("Panier trouvé : ");
  console.log(basket);

  if (!basket) {
    basket = await this.prisma.order.create({
      data: {
        userId: userId,
        status: 'BASKET',
        total: 0,
      },
    });
  }

  console.log("Panier trouvé : ");
  console.log(basket);

  return basket;
}
}
