import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../../prisma/prisma.service'
import { Order } from './entities/order.entity';
import { OrderStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { setDeliveryAddressDto } from './dto/set-delivery-address.dto';

export interface Basket {

  id: number;
  status: string;
  total: Decimal;
}

export interface AdminOrder {

  id: number;
  total: string;
  status: string;
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

  findAll(userId: number) {

    return this.prisma.order.findMany({where: {
      userId: userId,
      
    },
    include: {
      productsInOrder: {
        include: {
          product: true,
        },
      },
      user: {
        select: {
          city: true,
          street: true,
          zipCode: true,
        }
      }
    },
    });
  }

  async findUserBasket(id: number) {

    const basket = await this.prisma.order.findUnique({
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
    console.log("Panier récupéré findOne : ");
    console.log(basket);
    return basket;
  }

  async findOneByOrderId(userId: number){

    const orderId = await this.findBasketOrderId(userId);
    if(!orderId) throw new Error("Erreur de récupération de l'orderId");

     const basket = await this.prisma.order.findUnique({
      where: {
        id: orderId,
      },

      include: {
        productsInOrder: {
          include: {
            product: true
          }
        }
      },
      
    });
    console.log("Panier récupéré findOne : ");
    console.log(basket);
    return basket;
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

  async findAllBasketsByUser(userId: number): Promise<number | null>{

    console.log("Entrée méthode findAllBasketsByUser");
    const orders = await this.prisma.order.findMany({
      where: {
        userId: userId,
        status: { in: ['DELIVERED', 'PENDING', 'PROCESSING', 'SHIPPED']}
    }});

    const ordersCount = orders.length;
    console.log("Nombre de commandes de l'utilisateur ", userId);
    console.log(ordersCount);
    return ordersCount;
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

  async findShippedOrders(userId: number){

    let orders = await this.prisma.order.findMany({
      where: {
        userId: userId,
        status: 'SHIPPED',
      },
      include: {

        productsInOrder: true,
      }
    });

    if(!orders){

      console.log("Aucune order trouvée avec le statut 'SHIPPED'");
      return null;
    }

    return orders;
  }

  async findCancelledOrders(userId: number){

    let orders = await this.prisma.order.findMany({
      where: {
        userId: userId,
        status: 'CANCELLED',
      },
      include: {
        productsInOrder: true,
      }
    });

    console.log("Commande(s) récupérée(s) :");
    console.log(orders);

    if(!orders || orders.length < 1){

      console.log("Aucune order trouvée avec le statut 'CANCELLED'");
      return null;
    }

    return orders;
  }

  async findCurrentOrders(userId: number){

    let orders = await this.prisma.order.findMany({
      where: {
        userId: userId,
        status: {
          in: ['PENDING', 'PROCESSING'],
        }
      },
      include: {
        productsInOrder: true,
      },
    });

    console.log("Commande(s) récupérée(s) :");
    console.log(orders);

    if(!orders || orders.length < 1){

      console.log("Aucune order trouvée avec le statut 'PENDING'");
      return null;
    }

    return orders;
  }

  async countCurrentOrders(userId: number): Promise<number>{

    let orders = await this.prisma.order.findMany({
      where: {
        userId: userId,
        status: 'PENDING',
      },
    });

    console.log("Commande(s) récupérée(s) :");
    console.log(orders);

    if(!orders || orders.length < 1){

      console.log("Aucune order trouvé avec le statut 'PENDING'");
      return 0;
    }

    const pendingOrdersCount = orders.length;
    console.log("Nombre de commandes pour le statut pending :");
    console.log(pendingOrdersCount);

    return pendingOrdersCount;
  }

  async adminOrdersDisplay(): Promise<AdminOrder>{

    let orders = await this.prisma.order.findMany();

    console.log("Commande(s) récupérée(s) :");
    console.log(orders);

    if(!orders || orders.length < 1){

      console.log("Aucunes commandes trouvées");
      throw new Error("Erreur récupération commandes");
    }

    // const ordersDisplayFormat = {

    //   id: orders.id
    // }

    throw new Error("Erreur récupération commandes");

  }

  async findBasketOrderId(userId: number): Promise<number | null>{

    console.log("Id de l'utilisateur lié au panier que l'on souhaite trouver : ", userId);
    // console.log("Type de cet ID : " + typeof userId);
    // console.log("Critères de recherche Prisma :");
    console.log({
    userId: userId,
    status: 'BASKET',
    });

    const basket = await this.prisma.order.findFirst({

      where: {
        userId: Number(userId),
        status: 'BASKET',
      },
    });

    if(!basket){

      console.log(" ERREUR RÉCUPÉRATION DU PANIER findBasketOrderId");
      return null;
    }

    console.log("((((((( OrderId Récupérer findBasketOrderId : )))))))))");
    console.log(basket.id);
    console.log("((((((( OrderId Récupérer findBasketOrderId : )))))))))")
    return basket.id ? basket.id : null;
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
  
  /* Vérifier utilité de cette méthode */
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

  /* Vérifier utilité de cette méthode */
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

  async saveDeliveryAddress(address: setDeliveryAddressDto, userId: number){

    console.log("Addresse reçue : ");
    console.log(address);
    const orderId = await this.findBasketOrderId(userId);
    if(!orderId){
      throw new Error("Erreur récupération OrderID");
    }
    const updatedAddress = await this.prisma.order.update({
      where: {id: orderId},
      data: address,
    });

    return updatedAddress;
  }
}
