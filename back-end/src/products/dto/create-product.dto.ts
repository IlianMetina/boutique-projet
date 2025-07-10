import { Transform } from "class-transformer";
import { IsString, IsInt, IsDecimal, IsNumber } from "class-validator";

export class CreateProductDto{

    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    price: number;

    @IsString()
    imageUrl: string;

    @IsInt()
    stock: number;

    @IsInt()
    categoryId: number;
}