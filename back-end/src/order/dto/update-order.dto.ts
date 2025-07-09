import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(OmitType(CreateOrderDto, ['userId', 'orderItems'] as const)) {}
