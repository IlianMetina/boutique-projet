import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {

    const product = new Product();

    product.setProductName(createProductDto.name);
    product.setProductDescription(createProductDto.description);
    product.setProductPrice(createProductDto.price);
    product.setImageUrl(createProductDto.imageUrl);
    product.setProductStock(createProductDto.stock);
    product.setCategoryId(createProductDto.categoryId);

    return this.prisma.product.create({
      data: product,
    });
  }

  async findAll() {
    
    console.log("Entrée méthode findAll products.service");

    return this.prisma.product.findMany();
  }

  async findOne(id: number) {

    console.log("Entrée méthode findOne products.service");
    return this.prisma.product.findUnique({ where: { id } });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {

    console.log("Entrée méthode update products.service");

    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {

    console.log("Entrée méthode remove products.service");

    console.log("ID du produit à supprimer : " + id);

    const product = await this.prisma.product.findUnique({where: {id}});

    if(!product){

      throw new Error("Le produit correspondant à l'ID " + id + " n'existe pas.")
    }

    return this.prisma.product.delete({
      where: { id },
    });
  }
}
