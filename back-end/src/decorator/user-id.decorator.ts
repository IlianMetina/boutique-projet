import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';

export const UserId = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        console.log('Authorization Header userId Decorator : ', authHeader);
        if(!authHeader){

            throw new UnauthorizedException('Token absent');
        }

        const token = authHeader.split(' ')[1];
        console.log('---------------TOKEN-------------');
        console.log(token);
        console.log('---------------TOKEN-------------');
        if(!token){

            throw new UnauthorizedException('Token invalide');
        }

        try{

            const secret = process.env.JWT_SECRET;
            console.log('----------SECRET_JWT-----------');
            console.log(secret);
            console.log('----------SECRET_JWT-----------');
            if(!secret){

                throw new Error("Erreur lors de la récupération");
            }

            const payload = jwt.verify(token, secret);

            console.log('----------PAYLOAD-----------');
            console.log(payload);
            console.log('----------PAYLOAD-----------');

            return payload[data || "sub"];

        }catch(err){

            throw new UnauthorizedException("Erreur de validité du token");
        }
    },
);