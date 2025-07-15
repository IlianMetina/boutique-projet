import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";

export const UserId = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const authHeader = request.header.authorization;
        if(!authHeader){

            throw new UnauthorizedException('Token absent');
        }

        const token = authHeader.split(' ')[1];
        if(!token){

            throw new UnauthorizedException('Token invalide');
        }

        try{

            const payload = JSON.parse()
            
        }catch(err){


        }

    },
);