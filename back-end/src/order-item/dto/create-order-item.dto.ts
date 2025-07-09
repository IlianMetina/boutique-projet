import { IsDecimal, IsInt } from "class-validator";

export class CreateOrderItemDto {

    @IsInt()
    orderId: number;

    @IsInt()
    productId: number;

    @IsInt()
    quantity: number;

    @IsDecimal()
    price: number;
}
