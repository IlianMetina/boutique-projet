import { IsDecimal, IsInt } from "class-validator";

export class CreateOrderItemDto {

    @IsInt()
    productId: number;

    @IsInt()
    quantity: number;
}
