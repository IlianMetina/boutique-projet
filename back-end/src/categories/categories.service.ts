import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {

  constructor(private readonly prisma: PrismaService){}

  create(createCategoryDto: CreateCategoryDto) {
    console.log("Entrée méthode create categories.service");

    const category = new Category();

    category.setCategoryDescription(createCategoryDto.description);
    category.setNameCategory(createCategoryDto.name);

    return this.prisma.category.create({
      data: category
    })
  }

  findAll() {

    return this.prisma.category.findMany();
  }

  findOne(id: number) {
    return this.prisma.category.findUnique({where: {id}})
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: {id},
      data: updateCategoryDto,
    });
  }

  remove(id: number) {
    return this.prisma.category.delete({where: {id}});
  }
}
