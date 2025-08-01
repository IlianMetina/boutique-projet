import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { OrderModule } from 'src/order/order.module';

@Module({
  imports: [OrderModule],
  providers: [StripeService],
  controllers: [StripeController],
  exports: [StripeService]
})
export class StripeModule {}
