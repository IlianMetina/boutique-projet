import { Injectable } from '@nestjs/common';
import { OrderService } from 'src/order/order.service';
import Stripe from 'stripe';

@Injectable()
export class StripeService {

    private stripe: Stripe;

    constructor(private orderService: OrderService){

        const secretKey = process.env.STRIPE_SECRET_KEY;
        if(!secretKey){
            throw new Error("Erreur lors de la récupération de la clé API");
        }
        this.stripe = new Stripe(secretKey, {
            apiVersion: '2025-07-30.basil',
        });
    }

    async createCheckoutSession(orderId: number){

        const order = await this.orderService.findUserBasket(orderId);
        if(!order){
            console.log("Erreur récupération commande checkOutStripe");
            throw new Error("No order found");
        }

        const line_items = order.productsInOrder.map(item => ({

            price_data: {
                currency: 'eur',
                product_data: {
                    name: item.product.name,
                    description: item.product.description || '',
                },
                unit_amount: Math.round(Number(item.product.price) * 100),
            },
            quantity: item.quantity
        }))

        const session = await this.stripe.checkout.sessions.create({
            
            mode:'payment',
            payment_method_types: ['card'],
            line_items,
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`
        });

        return {url: session.url};
    }
}


