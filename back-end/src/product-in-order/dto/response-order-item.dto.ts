import { IsArray, IsNumber } from "class-validator";

export class ResponseOrderItemDto {

    @IsNumber()
    orderId: number;

    @IsNumber()
    price: number;




}