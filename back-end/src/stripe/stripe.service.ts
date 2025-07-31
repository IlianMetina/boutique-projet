import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import * as dotenv from 'dotenv';

@Injectable()
export class StripeService {

    private stripe: Stripe;

    constructor(){

        const secretKey = process.env.STRIPE_SECRET_KEY;
        if(!secretKey){
            throw new Error("Erreur lors de la récupération de la clé API");
        }
        this.stripe = new Stripe(secretKey, {
            apiVersion: '2025-07-30.basil',
        });
    }

    async createCheckoutSession(){

        const session = await this.stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: 'Produit test',
                        },
                        unit_amount: 2000,
                    },
                    quantity: 1,
                },
            ],
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        });

        return {url: session.url};
    }
}


