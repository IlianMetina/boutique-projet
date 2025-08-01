import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {

    constructor(private readonly stripeService: StripeService){}

    @Post('checkout')
    async checkout(@Body() body: {orderId: number}){
        const orderId = body.orderId;
        console.log("OrderId reçu : POUR STRIPE CONTROLLER ", orderId);
        if(!orderId) throw new NotFoundException('orderId non reçu');
        
        const session = await this.stripeService.createCheckoutSession(orderId);
        return {url: session.url};
    }
}
