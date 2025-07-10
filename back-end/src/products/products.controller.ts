/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Prisma } from '@prisma/client';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create') 
  async create(@Body() createProductDto: CreateProductDto) {
    console.log("Entrée méthode create products.controller");
    console.log("-----------------------------------------");
    console.log("Infos reçus createProductDto : ", createProductDto);

    return this.productsService.create(createProductDto);
  }

  @Get('all')
  async findAll() {
    return this.productsService.findAll(); 
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(Number(id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(Number(id), updateProductDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productsService.remove(Number(id));
  }
}
