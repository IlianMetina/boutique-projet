import { Type } from "class-transformer";
import { IsArray, IsDecimal, IsEnum, IsInt, IsString, ValidateNested } from "class-validator";
import { CreateOrderItemDto } from "src/product-in-order/dto/create-order-item.dto";

export class setDeliveryAddressDto {

    @IsString()
    street: string;

    @IsString()
    city: string;

    @IsString()
    zipCode: string;
}
