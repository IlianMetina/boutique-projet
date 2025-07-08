import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from 'src/auth/dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto,
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

  async update(id: number, updateProductDto: Prisma.ProductUpdateInput) {

    console.log("Entrée méthode update products.service");

    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {

    console.log("Entrée méthode remove products.service");

    return this.prisma.product.delete({
      where: { id },
    });
  }
}
