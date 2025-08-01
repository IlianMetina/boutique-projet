import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './product-in-order/product-in-order.module';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [DatabaseModule, ProductsModule, UsersModule, AuthModule, CategoriesModule, OrderModule, OrderItemModule, StripeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
