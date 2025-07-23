import { Test, TestingModule } from '@nestjs/testing';
import { OrderItemController } from './product-in-order-controller';
import { OrderItemService } from './product-in-order-service';

describe('OrderItemController', () => {
  let controller: OrderItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderItemController],
      providers: [OrderItemService],
    }).compile();

    controller = module.get<OrderItemController>(OrderItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
