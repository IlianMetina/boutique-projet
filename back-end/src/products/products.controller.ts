/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Prisma } from '@prisma/client';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: Prisma.ProductCreateInput) {
        
    return this.productsService.create(createProductDto);;
  }

  @Get()
  async findAll() {
    return this.productsService.findAll(); 
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(Number(id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: Prisma.ProductUpdateInput) {
    return this.productsService.update(Number(id), updateProductDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productsService.remove(Number(id));
  }
}
