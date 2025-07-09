import { Type } from "class-transformer";
import { IsArray, IsDecimal, IsEnum, IsInt, ValidateNested } from "class-validator";
import { CreateOrderItemDto } from "src/order-item/dto/create-order-item.dto";

export class CreateOrderDto {

    @IsInt()
    userId: number;

    @IsEnum(['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'])
    status: string;

    @IsDecimal()
    total: number;

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => CreateOrderItemDto)
    orderItems: CreateOrderItemDto[]
}
