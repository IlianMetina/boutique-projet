import { Module } from '@nestjs/common';
import { OrderItemService } from './product-in-order-service';
import { OrderItemController } from './product-in-order-controller';
import { PrismaService } from 'prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [OrderItemController],
  providers: [OrderItemService, PrismaService],
})
export class OrderItemModule {}
