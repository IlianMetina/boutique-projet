import { Transform } from "class-transformer";
import { IsString, IsInt, IsDecimal } from "class-validator";

export class CreateProductDto{

    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsDecimal()
    @Transform(({ value }) => Number(value))
    price: number;

    @IsString()
    imageUrl: string;

    @IsInt()
    stock: number;

    @IsInt()
    categoryId: number;
}